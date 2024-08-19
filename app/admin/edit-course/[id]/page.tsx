"use client ";

import AdminSidebar from "../../../components/Admin/sidebar/AdminSidebar";
import Heading from "@/app/utils/Heading";
import CreateCourse from "../../../components/Admin/Course/CreateCourse";
import EditCourse from "../../../components/Admin/Course/EditCourse";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import { useParams } from "next/navigation";

const Page = ({ params }: any) => {
  const id = params?.id;
  console.log(id);
  
  return (
    <>
      <div>
        <Heading
          description="SangELearning is a platform for students to learn and get help from "
          title="SangELearning - Admin"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex">
          <div className="1500px:w-[16%] w-1/5 ">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHeader />
            {/* <CreateCourse /> */}
            <EditCourse id={id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
