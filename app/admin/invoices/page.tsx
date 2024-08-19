"use client";

import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import AllInvoices from "@/app/components/Admin/Order/AllInvoices";
import { useState } from "react";

const Page = () => {
  const [open, setOpen] = useState(false);

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
            <DashboardHeader open={open} setOpen={setOpen} />
            <AllInvoices />
          </div>
        </div>
      </AdminProtected>
    </>
  );
};

export default Page;
