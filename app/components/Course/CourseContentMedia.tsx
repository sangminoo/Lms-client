import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import {
  useAddAnswerInQuestionMutation,
  useAddAnswerInReviewCourseMutation,
  useAddNewQuestionMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { GoCheckCircleFill } from "react-icons/go";
import { MdOutlineMessage } from "react-icons/md";
import { format } from "timeago.js";
import socketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia: FC<Props> = ({
  activeVideo,
  data,
  id,
  setActiveVideo,
  user,
  refetch,
}) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  // console.log(user);
  // console.log(isReviewReply);

  // const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [reply, setReply] = useState<{ [key: string]: string }>({});

  const [questionId, setQuestionId] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [activeReviewReplyId, setActiveReviewReplyId] = useState<string | null>(
    null
  );

  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();

  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );

  const course = courseData?.course;

  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewInCourseMutation();

  // console.log(user);
  // console.log(activeBar);
  // console.log(data[activeBar]?._id);s
  // console.log(questionId);
  // console.log({
  //   answer,
  //   courseId: id,
  //   contentId: data[activeBar]?._id,
  //   questionId: questionId,
  // });
  const [
    addQuestion,
    {
      isSuccess: successAddQuestion,
      error,
      isLoading: questionCreationLoading,
    },
  ] = useAddNewQuestionMutation();

  const [
    addAnswerInReviewCourse,
    {
      isSuccess: successAddReplyReview,
      error: errorAnswerReview,
      isLoading: replyReviewCreationLoading,
    },
  ] = useAddAnswerInReviewCourseMutation();

  const isReviewExist = course?.reviews?.find(
    (item: any) => item._id === user._id
  );

  // console.log( data[activeVideo]);

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question can't be empty");
    } else {
      const currentContentId = data[activeVideo]._id; // Lưu contentId hiện tại
      console.log(currentContentId);

      // console.log({
      //   question,
      //   courseId: id,
      //   contentId: currentContentId,
      // });

      addQuestion({
        question,
        courseId: id,
        contentId: currentContentId,
      });
    }
  };

  useEffect(() => {
    if (successAddQuestion) {
      setQuestion("");
      refetch();
      toast.success("Question added successfully");
      socketId.emit("notification", {
        title: "New question received",
        message: `You have a new question from ${data[activeVideo].title}`,
        userId: user._id,
      });
    }
    if (answerSuccess) {
      setAnswers((prev) => ({ ...prev, [questionId]: "" }));
      refetch();
      toast.success("Answer added successfully");
      if (user.role !== "admin") {
        socketId.emit("notification", {
          title: "New reply received",
          message: `You have a new question reply in ${data[activeVideo].title}`,
          userId: user._id,
        });
      }
    }

    if (reviewSuccess) {
      setReview(""), setRating(0), courseRefetch();
      toast.success("Review successfully! Thanks for your feedback");
      socketId.emit("notification", {
        title: "New review received",
        message: `You have a new answer from ${data[activeVideo].title}`,
        userId: user._id,
      });
    }
    if (successAddReplyReview) {
      setReply((prev) => ({ ...prev, [reviewId]: "" })), courseRefetch();
      toast.success("Reply to review successfully");
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = answerError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = reviewError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (errorAnswerReview) {
      if ("data" in errorAnswerReview) {
        const errorMessage = errorAnswerReview as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    successAddQuestion,
    error,
    answerError,
    answerSuccess,
    reviewSuccess,
    reviewError,
    successAddReplyReview,
    errorAnswerReview,
  ]);

  const handleAnswerSubmit = (questionId: string) => {
    // console.log({
    //   // answer,
    //   answer: answers[questionId],
    //   courseId: id,
    //   contentId: data[activeVideo]._id,
    //   questionId: questionId,
    // });

    // console.log(answers);
    // console.log(answers[questionId]);

    addAnswerInQuestion({
      // answer,
      answer: answers[questionId],
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };

  const handleInputChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value })); // Sửa: Cập nhật giá trị input dựa trên questionId
  };

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review can't be empty");
    } else {
      // console.log({ review, rating, courseId: id });
      addReviewInCourse({ review, rating, courseId: id });
    }
  };

  const handleReviewReply = (reviewId: string, value: string) => {
    setReviewId(reviewId);
    setReply((prev) => ({ ...prev, [reviewId]: value })); // Sửa: Cập nhật giá trị input dựa trên questionId

    // console.log(reply);
  };

  const handleToggleReviewReplies = (reviewId: string) => {
    // if (reviewId) {
    //   setActiveReviewReplyId(reviewId);
    //   setIsReviewReply(true);
    // }
    // setIsReviewReply(false);

    setActiveReviewReplyId((prev) => (prev === reviewId ? null : reviewId));
    setIsReviewReply(!isReviewReply);
  };

  // console.log(course.reviews[4]);
  // console.log(data);

  const handleReplyReviewSubmit = async () => {
    // console.log({
    //   comment: reply[reviewId],
    //   courseId: id,
    //   reviewId: reviewId,
    // });
    addAnswerInReviewCourse({
      comment: reply[reviewId],
      courseId: id,
      reviewId: reviewId,
    });
  };

  return (
    <>
      <div className="w-[95%] 800px:w-[86%] py-4 m-auto min-h-screen">
        <CoursePlayer
          title={data[activeVideo]?.title}
          videoUrl={data[activeVideo]?.videoUrl}
        />

        <div className="w-full flex items-center justify-between my-3">
          <div
            className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${
              activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
            }`}
            onClick={() =>
              setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
            }
          >
            <AiOutlineArrowLeft className="mr-2" />
            Prev Lesson
          </div>

          <div
            className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${
              activeVideo === data.length - 1
            } && "!cursor-no-drop opacity-[.8]"
            }`}
            onClick={() =>
              setActiveVideo(
                data && data.length - 1 === activeVideo
                  ? activeVideo
                  : activeVideo + 1
              )
            }
          >
            Next Lesson
            <AiOutlineArrowRight className="ml-2" />
          </div>
        </div>

        <h1 className="pt-2 text-[25px] font-[600] text-black dark:text-white">
          {data[activeVideo].title}
        </h1>
        <br />
        <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
          {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
            <h5
              key={index}
              className={`800px:text-[20px]  cursor-pointer ${
                activeBar === index
                  ? "text-red-500"
                  : "text-black dark:text-white "
              }`}
              onClick={() => setActiveBar(index)}
            >
              {text}
            </h5>
          ))}
        </div>
        <br />
        {activeBar === 0 && (
          <div className="">
            <p className="text-[18px] whitespace-pre-line mb-3 text-black dark:text-white">
              {data[activeVideo]?.description}
            </p>
          </div>
        )}

        {activeBar === 1 && (
          <div>
            {data[activeVideo]?.links.map((item: any, index: number) => (
              <div key={index} className="mb-5">
                <h2 className="800px:text-[20px] 800px:inline-block dark:text-white text-black">
                  {item.title && item.title + " :"}
                </h2>

                <a
                  className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
                  href={item.url}
                >
                  {item.url}
                </a>
              </div>
            ))}
          </div>
        )}

        {activeBar === 2 && (
          <>
            <div className="flex w-full">
              <Image
                src={
                  user.avatar
                    ? user.avatar.url
                    : "https://res.cloudinary.com/dmrruxyjk/image/upload/v1721202437/avatars/xbqjwrhydjusf92pp1mj.png"
                }
                alt=""
                width={50}
                height={50}
                className="w-[50px] h-[50px] rounded-full object-cover"
              />

              <textarea
                name=""
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                id=""
                cols={40}
                rows={5}
                placeholder="Write your question..."
                className="outline-none bg-transparent ml-3 border text-black dark:text-white dark:border-[#ffffff57] shadow-sm 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
              />
            </div>
            <div className="w-full flex justify-end">
              <div
                className={`${
                  styles.button
                } !w-[120px] !h-[40px] text-[18px] mt-5 
                  ${questionCreationLoading && "cursor-no-drop"}
                  `}
                onClick={questionCreationLoading ? () => {} : handleQuestion}
              >
                Submit
              </div>
            </div>
            <br />
            <br />
            <div
              className="w-full
h-[1px] bg-[#ffffff3b]"
            ></div>
            <div>
              <CommentReply
                data={data}
                activeVideo={activeVideo}
                // answer={answer}
                // setAnswer={setAnswer}
                answers={answers} // Sửa: Truyền state answers cho component CommentReply
                handleInputChange={handleInputChange} // Sửa: Truyền hàm handleInputChange cho component CommentReply
                handleAnswerSubmit={handleAnswerSubmit} // Sửa: Truyền hàm handleAnswerSubmit cho component CommentReply
                // handleAnswerSubmit={handleAnswerSubmit}
                answerCreationLoading={answerCreationLoading}
                user={user}
                setQuestionId={setQuestionId}
              />
            </div>
          </>
        )}

        {activeBar === 3 && (
          <>
            <div className="w-full h-full mb-10">
              {!isReviewExist && (
                <>
                  <div className="flex w-full">
                    <Image
                      src={
                        isReviewExist
                          ? user.avatar.url
                          : "https://res.cloudinary.com/dmrruxyjk/image/upload/v1721202437/avatars/xbqjwrhydjusf92pp1mj.png"
                      }
                      alt=""
                      width={50}
                      height={50}
                      className="w-[50px] h-[50px] rounded-full object-cover"
                    />
                    <div className="w-full">
                      <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black">
                        Give a Rating <span className="text-red-500">*</span>
                      </h5>
                      <div className="flex w-full ml-2 pb-3">
                        {[1, 2, 3, 4, 5].map((i) =>
                          rating >= i ? (
                            <>
                              <AiFillStar
                                key={i}
                                className="mr-1 cursor-pointer"
                                color="rgb(246, 186, 0)"
                                size={25}
                                onClick={() => setRating(i)}
                              />{" "}
                            </>
                          ) : (
                            <>
                              <AiOutlineStar
                                key={i}
                                className="mr-1 cursor-pointer"
                                color="rgb(246, 186, 0)"
                                size={25}
                                onClick={() => setRating(i)}
                              />
                            </>
                          )
                        )}
                      </div>
                      <textarea
                        name=""
                        id=""
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        cols={40}
                        rows={5}
                        placeholder="Write your comment here..."
                        className="outline-none bg-transparent 800px:ml-3 border shadow-sm text-black dark:text-white  dark:border-[#ffffff57] w-[95%] 800px:w-full p-2 rounded text-[18px] font-Poppins"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full flex justify-end">
                    <div
                      className={`${
                        styles.button
                      } !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2 
                      ${reviewCreationLoading && "cursor-no-drop"}
                    `}
                      // ${isLoading && "cursor-no-drop"}
                      //  onClick={isLoading ? null : handleReviewFSubmit}
                      onClick={
                        reviewCreationLoading ? () => {} : handleReviewSubmit
                      }
                    >
                      Submit
                    </div>
                  </div>
                </>
              )}
              <br />
              <div className="w-full  h-full dark:bg-[#ffffff3b] bg-gray-300/15 p-2 rounded-md text-black dark:text-white">
                <h5 className="text-[18px] font-semibold flex items-center">
                  {course.reviews.length} feedback (Ratings:{" "}
                  <span className="ml-2" style={{ color: "rgb(246, 186, 0)" }}>
                    {parseFloat(course.ratings.toFixed(1))}
                  </span>{" "}
                  <AiFillStar className="ml-1 " color="rgb(246, 186, 0)" /> )
                </h5>
                <div className="w-full">
                  {(course?.reviews && [...course.reviews].reverse())?.map(
                    (item: any, index: number) => (
                      <div key={index} className="w-full my-5">
                        <div className="w-full flex">
                          <div>
                            <Image
                              src={
                                isReviewExist
                                  ? user.avatar.url
                                  : "https://res.cloudinary.com/dmrruxyjk/image/upload/v1721202437/avatars/xbqjwrhydjusf92pp1mj.png"
                              }
                              alt=""
                              width={50}
                              height={50}
                              className="w-[50px] h-[50px] rounded-full object-cover"
                            />
                          </div>
                          <div className="ml-2">
                            <h1 className="text-[18px]">{item?.user.name}</h1>
                            <Ratings rating={item.rating} />
                            <p>{item.comment}</p>
                            <small className="text-[#ffffff83]">
                              {format(item.createdAt)}
                            </small>
                          </div>
                        </div>

                        {user.role === "admin" && (
                          <span
                            className={`${styles.label} pl-14 cursor-pointer hover:font-semibold`}
                            onClick={() => {
                              handleToggleReviewReplies(item._id);
                              // setIsReviewReply(!isReviewReply);
                            }}
                          >
                            Reply
                          </span>
                        )}
                        {activeReviewReplyId === item._id && (
                          <div className="w-full relative">
                            <input
                              type="text"
                              placeholder="Enter your reply..."
                              value={reply[item._id]}
                              onChange={(e) =>
                                handleReviewReply(item._id, e.target.value)
                              }
                              className={`${styles.input} pr-20  rounded-sm border-b border-x-0 border-t-0 w-[90%] ml-[1px]`}
                            />
                            <button
                              className={`absolute right-0 top-4 disabled:text-gray-400 disabled:hover:font-medium disabled:cursor-not-allowed hover:font-semibold font-medium border rounded-md  !w-[60px]`}
                              disabled={reply[item._id] === ""}
                              onClick={handleReplyReviewSubmit}
                            >
                              Submit
                            </button>
                          </div>
                        )}

                        {/* CommentReplies to review */}
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
                              <small className="text-[#ffffff83]">
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
            </div>
          </>
        )}
      </div>
    </>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  // answer,
  // setAnswer,
  answers, // Thêm: Thêm state answers vào props của component CommentReply
  setAnswers,
  handleInputChange, // Thêm: Thêm hàm handleInputChange vào props của component CommentReply
  handleAnswerSubmit, // Thêm: Thêm hàm handleAnswerSubmit vào props của component CommentReply
  answerCreationLoading,
  user,
  setQuestionId,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].questions.map((item: any, index: number) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            index={index}
            // answer={answer}
            // setAnswer={setAnswer}
            handleInputChange={handleInputChange}
            answers={answers}
            setAnswers={setAnswers}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            answerCreationLoading={answerCreationLoading}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  data,
  activeVideo,
  item,
  index,
  // answer,
  // setAnswer,
  answers,
  setAnswers,
  setQuestionId,
  handleInputChange,
  handleAnswerSubmit,
  answerCreationLoading,
}: any) => {
  // console.log(item);

  const [replyActive, setReplyActive] = useState(false);
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  const handleToggleReplies = (questionId: string) => {
    setActiveReplyId((prev) => (prev === questionId ? null : questionId));

    setQuestionId(questionId);
    // console.log(activeReplyId);
    // console.log(questionId);
  };
  // console.log(item);
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
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
          <div className="pl-3 ">
            <h5 className="text-[20px] dark:text-white text-black flex items-center">
              {item?.user.name}
              {item.user.role === "admin" && (
                <GoCheckCircleFill
                  className="ml-2 dark:text-white text-blue-500"
                  size={20}
                />
              )}
            </h5>

            <p className=" dark:text-white text-black">{item?.question}</p>

            <small className="dark:text-gray-300 text-black italic">
              - {!item.createdAt ? "" : format(item.createdAt)}
            </small>
          </div>
        </div>
        {/*  */}
        <div className="flex items-center gap-x-4">
          <span
            className="800px:pl-16  dark:text-[#ffffff83] text-black cursor-pointer mr-2"
            // onClick={() => {
            //     // if(item._id === )

            //   setReplyActive(!replyActive);
            //   setActiveReplyId()
            //   setQuestionId(item._id);
            // }}
            onClick={() => handleToggleReplies(item._id)}

            // onClick={() => {
            //   setActiveReplyId(activeReplyId === item._id ? null : item._id);
            //   setQuestionId(item._id);
            // }}
          >
            {!replyActive
              ? item.questionReplies.length > 1
                ? "All replies"
                : "Reply"
              : "Hide Reply"}
          </span>
          <div
            className="flex "
            // onClick={() => setReplyActive(true)}
            onClick={() => handleToggleReplies(item._id)}
          >
            <MdOutlineMessage
              size={20}
              className="cursor-pointer  text-black dark:text-white"
              // fill={}
            />

            <span className="pl-1 mt-[-4px] cursor-pointer dark:text-[#ffffff83] text-black">
              {item.questionReplies.length === 0
                ? ""
                : item.questionReplies.length > 1
                ? item.questionReplies.length + " comments"
                : item.questionReplies.length + " comment"}
            </span>
          </div>
        </div>
        {activeReplyId === item._id && (
          <div>
            <>
              <div className="w-full flex relative">
                <input
                  type="text"
                  placeholder="Enter your answer..."
                  // value={answer}
                  value={answers[item._id] || ""} // Thêm: Lấy giá trị từ state answers dựa trên questionId
                  // onChange={(e: any) => setAnswer(e.target.value)}
                  onChange={
                    (e) => handleInputChange(item._id, e.target.value) // Thêm: Gọi hàm handleInputChange khi input thay đổi
                  }
                  onClick={() => setQuestionId(item._id)}
                  className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#000000027] dark:text-white text-black p-[5px] w-[95%] ${
                    answers[item._id] === "" ||
                    (answerCreationLoading && "cursor-not-allowed")
                  }`}
                />

                <button
                  type="submit"
                  className="absolute right-0 bottom-1 text-black dark:text-white disabled:text-gray-400 disabled:dark:text-gray-400"
                  onClick={() => handleAnswerSubmit(item._id)}
                  // disabled={answer === ""}
                  disabled={answers[item._id] === ""}
                >
                  Submit
                </button>
              </div>
              <br />
            </>

            {/*  */}
            {item.questionReplies.map((item: any) => (
              <div
                key={item}
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
                  <p>{item.answer}</p>
                  <small className="text-[#ffffff83]">
                    {format(item.createdAt)}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;
