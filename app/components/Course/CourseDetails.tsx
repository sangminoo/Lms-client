import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import {
  IoCheckmarkDoneOutline,
  IoCheckmarkOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import CourseContentList from "./CourseContentList";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { format } from "timeago.js";
import Image from "next/image";
import { GoCheckCircleFill } from "react-icons/go";
import toast from "react-hot-toast";

type Props = {
  data: any;
  stripePromise: any;
  clientSecret: string;
  setRoute?: any;
  setOpen?: any;
};

const CourseDetails = ({
  data,
  clientSecret,
  stripePromise,
  setRoute,
  setOpen: openAuthModal,
}: Props) => {
  // const { user } = useSelector((state: any) => state.auth);
  const {
    data: userData,
    isLoading,
    isSuccess,
    refetch,
  } = useLoadUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  // console.log(data);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>();
  // console.log(data);
  // console.log(stripePromise);
  // console.log(clientSecret);
  // const user = userData?.user;

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  // console.log(user);

  const discountPercentage =
    ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;
  const discountPercentagePrice = discountPercentage.toFixed(0);

  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);

  const handleOrder = (e: any) => {
    if (user) {
      setOpen(true);
      console.log(user);
    } else {
      // toast.error("Notice: Login to checkout");
      setRoute("Login");
      openAuthModal(true);
    }
  };

  return (
    <>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              {data?.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={data?.ratings} />
                <h5 className="text-black dark:text-white">
                  {data?.review?.length} Reviews
                </h5>
              </div>
              <h5 className="text-black dark:text-white">
                {data?.purchased} Students
              </h5>
            </div>

            <br />
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              What you will learn from this course?
            </h1>
            <div>
              {data?.benefits?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}

              <br />
              <br />
            </div>
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              What are the prerequisites for starting this course?
            </h1>
            {data?.prerequisites?.map((item: any, index: number) => (
              <div className="w-full flex 800px:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkOutline
                    size={20}
                    className="text-black dark:text-white"
                  />
                </div>
                <p className="pl-2 text-black dark:text-white">{item.title}</p>
              </div>
            ))}
            <br />
            <br />
            <div>
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                Course Overview
              </h1>
              <CourseContentList data={data?.courseData} isDemo />
            </div>
            <br />
            <br />
            {/* Course description */}
            <div className="w-full">
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                Course Details
              </h1>
              <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
                {data?.description}
              </p>
            </div>

            <br />
            <br />
            <div className="w-full">
              <div className="800px:flex items-center">
                <Ratings rating={data?.rating} />
                <div className="mb-2 800px:mb-[unset]" />
                <h5 className="text-[25px] font-Poppins text-black dark:text-white">
                  {Number.isInteger(data?.ratings)
                    ? data?.ratings.toFixed(1)
                    : data?.ratings.toFixed(2)}
                  Course Rating • {data?.reviews?.length} Reviews
                </h5>
              </div>
              <br />
              {(data?.reviews && [...data.reviews].reverse())?.map(
                (item: any, index: number) => (
                  <div key={index} className="w-full pb-4">
                    <div className="flex">
                      <div className="w-[50px] h-[50px]">
                        <Image
                          src={
                            item.user.avatar
                              ? item.user.avatar.url
                              : "https://res.cloudinary.com/dmrruxyjk/image/upload/v1721202437/avatars/xbqjwrhydjusf92pp1mj.png"
                          }
                          alt=""
                          width={50}
                          height={50}
                          className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                      </div>

                      <div className="hidden 800px:block pl-2">
                        <div className="flex items-center">
                          <h5 className="text-[18px] pr-2 text-black dark:text-white">
                            {item.user.name}
                          </h5>
                          <Ratings rating={item.rating} />
                        </div>
                        <p className="text-black dark:text-white">
                          {item.comment}
                        </p>
                        <small className="text-[#000000d1] dark:text-[#ffffff83] italic">
                          {format(item.createdAt)}
                        </small>
                      </div>
                      <div className="pl-2 flex 800px:hidden items-center">
                        <h5 className="text-[18px] pr-2 text-black dark:text-white">
                          {item.user.name}
                        </h5>
                        <Ratings rating={item.rating} />
                      </div>
                    </div>

                    {/* Replies */}
                    {item.commentReplies.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="w-full flex 800px:ml-16 my-5 text-black dark:text-white"
                      >
                        <div>
                          <Image
                            src={
                              item.user.avatar
                                ? item.user.avatar.url
                                : "https://res.cloudinary.com/dmrruxyjk/image/upload/v1721202437/avatars/xbqjwrhydjusf92pp1mj.png"
                            }
                            alt=""
                            width={50}
                            height={50}
                            className="w-[50px] h-[50px] rounded-full object-cover"
                          />
                        </div>
                        <div className="pl-2">
                          <h5 className="text-[20px] flex items-center">
                            {item.user.name}{" "}
                            {item.user.role === "admin" && (
                              <GoCheckCircleFill
                                className="ml-2 dark:text-white text-blue-500"
                                size={20}
                              />
                            )}
                          </h5>
                          <p>{item.comment}</p>
                          <small className="text-[#ffffff83]  italic">
                            {format(item.createdAt)}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="w-full  800px:w-[35%] relative">
            <div className="sticky top-[100px] left-0 z-50 w-full">
              <CoursePlayer title={data?.title} videoUrl={data?.demoUrl} />

              <div className="flex items-center">
                <h1 className="pt-5 text-[25px] text-black dark:text-white">
                  {data?.price === 0 ? "Free" : data?.price + "$"}
                </h1>
                <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white">
                  {data?.estimatedPrice}$
                </h5>
                <h4 className="pl-5 pt-4 text-[22px] text-black dark:text-white">
                  {discountPercentagePrice}% Off
                </h4>
              </div>
              <div className="flex items-center">
                {isPurchased ? (
                  <Link
                    href={`/course-access/${data?._id}`}
                    className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-red-500`}
                  >
                    Enter to course
                  </Link>
                ) : (
                  <div
                    className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-red-500`}
                    onClick={handleOrder}
                  >
                    Buy now {data?.price}$
                  </div>
                )}
              </div>
              <br />
              <p className="pb-1 text-black dark:text-white">
                • Source code included
              </p>
              <p className="pb-1 text-black dark:text-white">
                • Full lifetime access
              </p>
              <p className="pb-1 text-black dark:text-white">
                • Certificate of completion
              </p>
              <p className="pb-1 text-black dark:text-white">
                • Premium Support
              </p>
            </div>
          </div>
        </div>

        <>
          {open && (
            <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 flex items-center justify-center z-50">
              <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3">
                <IoCloseOutline
                  size={40}
                  className="text-black cursor-pointer float-end"
                  onClick={() => setOpen(false)}
                />

                <div className="w-full">
                  {stripePromise && clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <CheckOutForm setOpen={setOpen} data={data} user={user} />
                    </Elements>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default CourseDetails;
