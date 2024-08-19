"use client";

import { useState } from "react";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import Policy from "./Policy";
import Footer from "../components/Footer";
const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(3);
  const [route, setRoute] = useState("Login");

  return (
    <>
      <div>
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
        <Policy />
        <Footer />
      </div>
    </>
  );
};

export default Page;
