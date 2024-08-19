"use client";

import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import EditHero from "../../components/Admin/Customization/EditHero";
import DashboardHero from "../../components/Admin/DashboardHero";

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
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>

          <div className="w-[85%] ">
            <DashboardHero />
            <EditHero />
          </div>
        </div>
      </AdminProtected>
    </>
  );
};

export default Page;
