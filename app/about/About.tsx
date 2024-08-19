import { styles } from "../styles/style";

const About = () => {
  return (
    <div className="text-back dark:text-white ">
      <br />
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        What is{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          SanGELearning
        </span>
        ?
      </h1>
      <br />
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <p className="text-[18px] font-Poppins">
          When we started Codecademy, our goal was to give anyone in the world
          the ability to learn the skills they’d need to succeed in the 21st
          century. We set out to create a new, interactive way of learning —
          making it engaging, flexible, and accessible for as many people as
          possible. Since then, we have helped millions of people worldwide
          unlock modern technical skills and reach their full potential through
          code. ✨
          <br />
          <br />
          We want to create a world where anyone can build something meaningful
          with technology, and everyone has the learning tools, resources, and
          opportunities to do so. Code contains a world of possibilities — all
          that’s required is the curiosity and drive to learn. At Codecademy, we
          are committed to empowering all people, regardless of where they are
          in their coding journeys, to continue to learn, grow, and make an
          impact on the world around them.
          <br />
          <br />
          We want to create a world where anyone can build something meaningful
          with technology, and everyone has the learning tools, resources, and
          opportunities to do so. Code contains a world of possibilities — all
          that’s required is the curiosity and drive to learn. At Codecademy, we
          are committed to empowering all people, regardless of where they are
          in their coding journeys, to continue to learn, grow, and make an
          impact on the world around them.
        </p>
        <br />
        <p className="font-Cursive text-[22px] ">RealllllSangmino</p>
        <h5 className="text-[18px] font-Poppins ">
          Founder and CEO of SangMino
        </h5>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default About;
