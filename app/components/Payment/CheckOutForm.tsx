import { FC, useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { styles } from "@/app/styles/style";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import socketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  setOpen: any;
  data: any;
  user: any;
};

const CheckOutForm: FC<Props> = ({ data, setOpen, user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>(null);
  const [loadUser, setLoadUser] = useState(false);
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const {} = useLoadUserQuery({ skip: loadUser ? false : true });
  const [isLoading, setIsLoading] = useState(false);

  console.log(data);
  console.log(user);

  // const handleError =  (error: any) => {
  //   if (error.data && typeof error.data.message === "string") {
  //     toast.error(error.data.message);
  //   } else {
  //     toast.error("An unexpected error occurred");
  //   }
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      // confirmParams: {
      //   // Make sure to change this to your payment completion page
      //   return_url: `${window.location.origin}/completion`,
      // },
    });
    // console.log(paymentIntent);

    if (error) {
      setMessage(error.message);
      toast.error("Something went wrong");
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      // createOrder({ courseId: data._id, payment_info: paymentIntent });
      toast.success("Payment successfully");

      createOrder({
        courseId: data._id,
        payment_info: paymentIntent,
      });
    }
  };

  useEffect(() => {
    if (orderData) {
      // console.log(orderData);

      setLoadUser(true);

      socketId.emit("notification", {
        title: "New order",
        message: `You have a new order from ${data.name}`,
        userId: user._id,
      });
      setOpen(false);
      redirect(`/course-access/${data._id}`);
    }

    // if (error) {
    //   if ("data" in error) {
    //     const errorMessage = error as any;
    //     toast.error(errorMessage.data.message);
    //   }
    // }

    if (error) {
      // handleError(error);

      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [orderData, error]);

  return (
    <>
      <br />

      <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement
          id="link-authentication-element"
          // Access the email value like so:
          // onChange={(event) => {
          //  setEmail(event.value.email);
          // }}
          //
          // Prefill the email field like so:
          // options={{defaultValues: {email: 'foo@bar.com'}}}
        />
        <PaymentElement id="payment-element" />
        <br />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text" className={`${styles.button} mt-2 !h-[35px]`}>
            {isLoading ? (
              <div className="spinner animate-bounce" id="spinner">
                Paying...
              </div>
            ) : (
              // "Paying..."
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
      <br />
    </>
  );
};

export default CheckOutForm;
