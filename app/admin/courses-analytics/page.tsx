"use client";

import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import CoursesAnalytics from "../../components/Admin/Analytics/CoursesAnalytics";

const Page = () => {
  return (
    <>
      <AdminProtected>
        <Heading
          description="SangELearning is a platform for students to learn and get help from teachers"
          title="SangELearning - Admin"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex h-[200vh] ">
          <div className="1500px:w-[16%] w-1/5 ">
            <AdminSidebar />
          </div>

          <div className="w-[85%] ">
            <DashboardHero />
            <CoursesAnalytics />
          </div>
        </div>
      </AdminProtected>
    </>
  );
};

export default Page;
