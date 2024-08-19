import { FC } from "react";
import CoursePlayer from "../../../utils/CoursePlayer";
import { styles } from "@/app/styles/style";
import Ratings from "@/app/utils/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit: boolean;
};

const CoursePreview: FC<Props> = ({
  active,
  courseData,
  handleCourseCreate,
  setActive,
  isEdit,
}) => {
  console.log(courseData);

  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const prevBtn = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    handleCourseCreate();
  };

  return (
    <>
      <div className="w-[90%] m-auto py-5 mb-5">
        <div className="w-full relative ">
          <div className="w-full mt-10">
            <CoursePlayer
              videoUrl={courseData?.demoUrl}
              title={courseData.courseContent?.map((item: any) => item.title)}
            />
            <div className="flex items-center gap-x-4 mb-4 justify-end w-[90%]">
              <div className="bg-red-600 font-semibold me-2 px-2.5 py-1 rounded dark:bg-red-600 ">
                <h4 className="text-[16px] ">{discountPercentagePrice}%</h4>
              </div>

              <h1 className="pt-5 text-[25px] font-semibold   text-black dark:text-white ">
                {courseData.price === 0 ? "Free" : `${courseData?.price}$`}
              </h1>
              <h5
                className="pl-3 text-[20px] mt-2 line-through opacity-80  text-black dark:text-white
              "
              >
                {courseData?.estimatedPrice}$
              </h5>
            </div>

            <div className="flex items-center">
              <div
                className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[crimson]  cursor-not-allowed`}
              >
                {Number(courseData.price) === 0
                  ? "FREE"
                  : `BUY NOW ${courseData?.price}$`}
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter discount code..."
                className={`${styles.input} 1500px:!w-[50%] 1100px:!w-[60%] ml-3 !mt-0`}
              />
              <div
                className={`${styles.button} !w-[120px] my-3  ml-4 font-Poppins cursor-pointer`}
              >
                Apply
              </div>
            </div>
            <p className="pb-1 text-black dark:text-white">
              • Source code included
            </p>
            <p className="pb-1 text-black dark:text-white">
              • Full lifetime access
            </p>
            <p className="pb-1 text-black dark:text-white">
              • Certificate of completion
            </p>
            <p className="pb-3 800px:pb-1 text-black dark:text-white">
              • Premium support
            </p>
          </div>
          <div className="w-full">
            <div className="w-full 800px:pr-5">
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                {courseData?.name}
              </h1>
              <div className="flex items-center justify-between pt-3 text-black dark:text-white">
                <div className="flex items-center">
                  <Ratings rating={0} />
                  <h5>0 Reviews</h5>
                </div>
                <h5>0 Students</h5>
              </div>

              <br />
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                What you will learn from this course?
              </h1>
            </div>

            {courseData?.benefits?.map((item: any, index: number) => (
              <div className="w-full flex 800px:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDoneOutline size={20} />
                </div>
                <p className="pl-2 text-black dark:text-white">{item.title}</p>
              </div>
            ))}
            <br />
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              What are the prerequisites for starting this course?
            </h1>

            {courseData?.prerequisites?.map((item: any, index: number) => (
              <div className="w-full flex 800px:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDoneOutline size={20} />
                </div>
                <p className="pl-2 text-black dark:text-white">{item.title}</p>
              </div>
            ))}
            <br />

            {/* Course description */}
            <div className="w-full text-black dark:text-white">
              <h1 className="text-[25px] font-Poppins font-[600]">
                Course Details
              </h1>
              {courseData?.description}
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="w-full flex items-center justify-between">
          <div
            className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
            onClick={() => prevBtn()}
          >
            Prev
          </div>
          <div
            className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
            onClick={() => handleOptions()}
          >
            {isEdit ? "Update" : "Create"}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePreview;
