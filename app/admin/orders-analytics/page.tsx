"use client";

import dynamic from "next/dynamic";

import Heading from "@/app/utils/Heading";
const AdminSidebar = dynamic(
  () => import("../../components/Admin/sidebar/AdminSidebar"),
  { ssr: false }
);
const OrdersAnalytics = dynamic(
  () => import("../../components/Admin/Analytics/OrdersAnalytics"),
  { ssr: false }
);
const DashboardHeader = dynamic(
  () => import("@/app/components/Admin/DashboardHeader"),
  { ssr: false }
);

const Page = () => {
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
            <OrdersAnalytics />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
