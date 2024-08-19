"use client";

import { useState } from "react";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import About from "./About";
import Footer from "../components/Footer";
const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2);
  const [route, setRoute] = useState("Login");

  return (
    <>
      <div >
        <Heading
          description="ELearning is a learning management system for helping programmers."
          title="About us - ELearning"
          keywords="programming,mern"
        />

        <Header
          activeItem={activeItem}
          open={open}
          setOpen={setOpen}
          route={route}
          setRoute={setRoute}
        />
        <About />
        <Footer />
      </div>
    </>
  );
};

export default Page;
