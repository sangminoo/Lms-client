import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Loader from "@/app/components/Loader/Loader";
import Heading from "@/app/utils/Heading";
import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import { useEffect, useState } from "react";
import CourseDetails from "./CourseDetails";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishableKeyQuery,
} from "@/redux/features/orders/ordersApi";
import { loadStripe } from "@stripe/stripe-js";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);

  const { data, isLoading, refetch } = useGetCourseDetailsQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const { data: config } = useGetStripePublishableKeyQuery({});
  const [course, setCourse] = useState([]);
  const [createPaymentIntent, { data: paymentIntentData, error }] =
    useCreatePaymentIntentMutation();
  // console.log(data.course);

  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (config) {
      const publishableKey = config?.publishableKey;
      setStripePromise(loadStripe(publishableKey));
    }

    if (data) {
      const amount = Math.round(data.course.price * 100);
      // console.log(amount);
      createPaymentIntent({ amount });
    }
  }, [config, data]);

  useEffect(() => {
    setCourse(data?.course);
    refetch();
  }, [data]);

  useEffect(() => {
    if (paymentIntentData) {
      console.log("paymentIntentData:", paymentIntentData);
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  useEffect(() => {
    if (error) {
      console.error("Error creating payment intent:", error);
    }
  }, [error]);

  // console.log("paymentIntentData:", paymentIntentData);
  console.log(course);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <Heading
              title={data?.course?.name + " - ELearning"}
              description={
                "ELearning is a programming community which is developed by Sang Mino for helping programmers"
              }
              keywords={data?.course?.tags}
            />
            <Header
              route={route}
              setRoute={setRoute}
              open={open}
              setOpen={setOpen}
              activeItem={1}
            />
            {stripePromise && (
              <CourseDetails
                // data={data.course}
                data={course}
                stripePromise={stripePromise}
                clientSecret={clientSecret}
                setRoute={setRoute}
                setOpen={setOpen}
              />
            )}
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default CourseDetailsPage;
