"use client";

import { useState } from "react";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import Faq from "../components/FAQ/FAQ";
import Footer from "../components/Footer";
const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(4);
  const [route, setRoute] = useState("Login");

  return (
    <>
      <div className="min-h-screen">
        <Heading
          description="ELearning is a learning management system for helping programmers."
          title="Policy us - ELearning"
          keywords="programming,mern"
        />

        <Header
          activeItem={activeItem}
          open={open}
          setOpen={setOpen}
          route={route}
          setRoute={setRoute}
        />
        <Faq />
        <Footer />
      </div>
    </>
  );
};

export default Page;
