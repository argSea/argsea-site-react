import { FaChevronDown } from "react-icons/fa";
import ParticleGenerator from "../../scripts/hero";
import { useEffect, useState, useRef } from "react";
import { isMobile, MobileView, isDesktop } from "react-device-detect";
import "./styles/hero_animations.scss";
import "./styles/hero.css";
import iUser from "../../interfaces/iUser";
import React from "react";
import { queueWrite, write } from "glitched-writer";

// set bgOnly to false by default
const Hero = ({ user: user }: { user: iUser }) => {
  const backgroundImagesMobile = user?.pictures.map((picture) => picture.image.src) || [];
  // const firstNameRef = useRef<HTMLHeadingElement>(null) as React.MutableRefObject<HTMLHeadingElement>;
  // const titleRef = useRef<HTMLHeadingElement>(null) as React.MutableRefObject<HTMLHeadingElement>;
  const ghostRef = useRef<HTMLHeadingElement>(null) as React.MutableRefObject<HTMLHeadingElement>;
  const imageSeed = Math.round(Math.random() * (backgroundImagesMobile.length - 1));
  const homeBackground = backgroundImagesMobile[imageSeed];
  const backgroundSizes = {
    "1x": homeBackground + "/900/0",
    "2x": homeBackground,
  };
  const ghostItems = [user.firstName + " " + user.lastName, user.title, "Software Engineer", "Software Architect", "Systems Admin", "DevOps Engineer"];

  var finalBackground = `url(${backgroundSizes["2x"]})`;
  if (isMobile) {
    finalBackground = `url(${backgroundSizes["1x"]})`;
  }

  useEffect(() => {
    if (user === null) {
      return;
    }

    // set firstNameRef and titleRef
    const firstName = user.firstName + " " + user.lastName;
    const title = user.title;

    const writeOptions = {
      letterize: true,
      interval: 10,
    };

    // write(user.firstName + " " + user.lastName, firstNameRef.current, writeOptions);

    queueWrite(ghostItems, ghostRef.current, "neo", 1000, true);
    // animateText(firstName, title, 100);

    if (isDesktop && false) {
      const starStuff = document.getElementById("starStuff");
      // add canvas to starStuff with an id of introcanvas
      const canvas = document.createElement("canvas");
      canvas.id = "introcanvas";
      starStuff?.appendChild(canvas);
      const partGen = new ParticleGenerator(canvas, user.firstName + " " + user.lastName, user.title);
    }
  }, [user]);

  return (
    <section id="hero">
      <div id="starStuff">
        {/* <MobileView> */}
        <div id="hero_title">
          <h1 ref={ghostRef}></h1>
          {/* <h1 ref={titleRef}></h1> */}
        </div>
        {/* </MobileView> */}
      </div>
      <div id="hero_down_arrow_container">
        <a href="#aboutme">
          <FaChevronDown size={75} id="hero_down_arrow" />
        </a>
      </div>
      <div id="background_container">
        <div id="hero_background" style={{ backgroundImage: finalBackground }}></div>
      </div>
    </section>
  );
};

export default Hero;
