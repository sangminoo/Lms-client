"use client";

import { FC, useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import {
  useEditCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";

type Props = {
  id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  const { isLoading, data, refetch } = useGetAllCoursesQuery([], {
    refetchOnMountOrArgChange: true,
  });

  const editCourseData: any =
    data && data.courses.find((item: any) => item._id === id);

  // console.log(editCourseData);

  const [
    editCourse,
    { isSuccess: editSuccess, isLoading: isLoadingUpdate, error: editError },
  ] = useEditCourseMutation();

  useEffect(() => {
    if (editSuccess) {
      toast.success("Course updated successfully");
      redirect("/admin/courses");
    }

    if (editError) {
      if ("data" in editError) {
        const errorMessage = editError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isLoading, editSuccess, editError]);

  const [active, setActive] = useState(0);
  useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData.name,
        description: editCourseData.description,
        categories: editCourseData.categories,
        price: editCourseData.price,
        estimatedPrice: editCourseData?.estimatedPrice,
        tags: editCourseData.tags,
        level: editCourseData.level,
        demoUrl: editCourseData.demoUrl,
        thumbnail: editCourseData?.thumbnail?.url,
      });

      setBenefits(editCourseData.benefits);
      setPrerequisites(editCourseData.prerequisites);
      setCourseContentData(editCourseData.courseData);
    }
  }, [editCourseData]);

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    categories: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoLength: "",
      videoSection: "Untitled section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});

  const handleSubmit = async () => {
    // Format benefits array
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));

    // format prerequisites array
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    // format course content array
    const formattedContentData = courseContentData.map((courseContent) => ({
      videoUrl: courseContent.videoUrl,
      title: courseContent.title,
      description: courseContent.description,
      videoLength: courseContent.videoLength,
      videoSection: courseContent.videoSection,
      links: courseContent.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: courseContent.suggestion,
    }));

    // Prepare our data object
    const data = {
      name: courseInfo?.name,
      description: courseInfo?.description,
      categories: courseInfo?.categories,
      price: courseInfo?.price,
      estimatedPrice: courseInfo?.estimatedPrice,
      tags: courseInfo?.tags,
      thumbnail: courseInfo?.thumbnail,
      level: courseInfo?.level,
      demoUrl: courseInfo?.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedContentData,
    };

    setCourseData(data);
  };

  console.log(courseInfo);
  console.log(CourseContent);
  console.log(courseContentData);
  console.log(courseData);

  const handleCourseCreate = async (e: any) => {
    const data = courseData;
    console.log(data);
    console.log(editCourseData?._id);

    const id = editCourseData?._id;
    await editCourse({ id, data });
  };

  return (
    <>
      <div className="w-full flex min-h-screen">
        <div className="w-[80%]">
          {active === 0 && (
            <CourseInformation
              courseInfo={courseInfo}
              setCourseInfo={setCourseInfo}
              active={active}
              setActive={setActive}
            />
          )}

          {active === 1 && (
            <CourseData
              benefits={benefits}
              setBenefits={setBenefits}
              prerequisites={prerequisites}
              setPrerequisites={setPrerequisites}
              active={active}
              setActive={setActive}
            />
          )}
          {active === 2 && (
            <CourseContent
              active={active}
              setActive={setActive}
              courseContentData={courseContentData}
              setCourseContentData={setCourseContentData}
              handleSubmit={handleSubmit}
            />
          )}
          {active === 3 && (
            <CoursePreview
              active={active}
              setActive={setActive}
              handleCourseCreate={handleCourseCreate}
              courseData={courseData}
              isEdit={true}
            />
          )}
        </div>
        <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
          <CourseOptions active={active} setActive={setActive} />
        </div>
      </div>
    </>
  );
};

export default EditCourse;
