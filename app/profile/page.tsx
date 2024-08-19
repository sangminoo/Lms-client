"use client";

import React, { FC, useState } from "react";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import Protected from "../hooks/userProtected";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

type Props = {};

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  return (
    <>
     <div className="min-h-screen">
        <Protected>
          <Heading
            title={`${user?.name} profile - SangELearning`}
            description="ELearning is a platform for students to learn and get help from teachers"
            keywords="Programming,MERN,Redux,Machine Learning"
          />
          <Header
            open={open}
            activeItem={activeItem}
            setOpen={setOpen}
            setRoute={setRoute}
            route={route}
          />
          <Profile user={user} />
          <Footer />
          <br />
          <br />
        </Protected>
     </div>
    </>
  );
};

export default Page;
