"use client";

import { useGetUserAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { styles } from "../styles/style";
import CourseCard from "../components/Course/CourseCard";
import Footer from "../components/Footer";

const CoursesPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");

  const { data, isLoading } = useGetUserAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});

  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");
  console.log(search);

  useEffect(() => {
    if (category === "All") {
      setCourses(data?.courses);
    }
    if (category !== "All") {
      setCourses(
        data?.courses?.filter((item: any) => item.categories === category)
      );
    }

    if (search) {
      setCourses(
        data?.courses?.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [data, category, search]);

  const categories = categoriesData?.layout.categories;

  // console.log(data);

  return (
    <>
      {isLoading && <Loader />}
      {
        <>
          <Header
            activeItem={1}
            route={route}
            open={open}
            setOpen={setOpen}
            setRoute={setRoute}
          />

          <div className="w-[95%] 800px:w-[85%] m-auto min-h-[90vh]">
            <Heading
              title={`All courses - ELearning`}
              description="ELearning is a programming community."
              keywords={`programming community, coding skills, expert insights, collaboration, growth`}
            />
            <br />
            <div className="w-full flex items-center flex-wrap">
              <div
                className={`h-[35px] ${
                  category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
                }
                        m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer
                    `}
                onClick={() => setCategory("All")}
              >
                All
              </div>

              {categories &&
                categories.map((item: any, index: number) => (
                  <>
                    <div className="" key={index}>
                      <div
                        className={`h-[35px] ${
                          category === item.title
                            ? "bg-[crimson]"
                            : "bg-[#5050cb]"
                        } 
                        m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                        onClick={() => {
                          setCategory(item.title);
                        }}
                      >
                        {item.title}
                      </div>
                    </div>
                  </>
                ))}
            </div>

            {courses && courses.length === 0 && (
              <p
                className={`${styles.label} justify-center min-h-[50vh] flex items-center`}
              >
                {search
                  ? "No courses found!"
                  : "No courses found in this category. Please try another one!"}
              </p>
            )}

            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
              {courses &&
                courses.map((item: any, index: number) => (
                  <>
                    <CourseCard key={index} item={item} />
                  </>
                ))}{" "}
            </div>
          </div>

          <Footer />
        </>
      }
    </>
  );
};

const Page = () => (
  <Suspense fallback={<Loader />}>
    <CoursesPage />
  </Suspense>
);

export default Page;
