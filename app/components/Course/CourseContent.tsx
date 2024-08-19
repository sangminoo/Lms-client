import { useGetCourseContentQuery } from "@/redux/features/courses/coursesApi";
import { FC, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import Header from "../Header";
import CourseContentList from "./CourseContentList";

type Props = {
  id: string;
  user: any;
};

const CourseContent: FC<Props> = ({ id, user}) => {
  const { data: contentData, isLoading, refetch } = useGetCourseContentQuery(id, {refetchOnMountOrArgChange: true});
  
  // console.log(contentData?.content);
  const data = contentData?.content;
  // console.log(isLoading);

  const [activeVideo, setActiveVideo] = useState(0);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");


  
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            activeItem={1}
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
          />
          <div className="w-full grid 800px:grid-cols-10">
            <Heading
              description={"Anythings"}
              keywords={data[activeVideo]?.tags}
              title={data[activeVideo]?.title}
            />
            <div className="col-span-7">
              <CourseContentMedia
                data={data}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                user={user}
                refetch={refetch}
              />
            </div>
            <div className="hidden 800px:block 800px:col-span-3">
              <CourseContentList
                setActiveVideo={setActiveVideo}
                data={data}
                activeVideo={activeVideo}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseContent;
