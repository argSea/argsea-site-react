import { FaChevronDown } from "react-icons/fa";
import particleGenerator from "../../scripts/hero";
import { useEffect, useRef } from "react";
import { isMobile, MobileView, isDesktop } from "react-device-detect";
import "./styles/hero_animations.scss";
import "./styles/hero.css";
import iUser from "../../interfaces/iUser";
import React from "react";
import { queueWrite } from "glitched-writer";

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
  const ghostItems = [user.firstName + " " + user.lastName, user.title, "Software Engineer", "Systems Admin", "Software Architect", "DevOps Engineer"];

  var finalBackground = `url(${backgroundSizes["2x"]})`;
  if (isMobile) {
    finalBackground = `url(${backgroundSizes["1x"]})`;
  }

  useEffect(() => {
    if (user === null) {
      return;
    }

    if (isMobile) {
      queueWrite(ghostItems, ghostRef.current, "neo", 1000, true);
    }

    if (isDesktop) {
      const starStuff = document.getElementById("starStuff");
      // add canvas to starStuff with an id of introcanvas
      const canvas = document.createElement("canvas");
      canvas.id = "introcanvas";
      starStuff?.appendChild(canvas);
      particleGenerator(canvas, ghostItems);
    }
  }, [user]);

  return (
    <section id="hero">
      <div id="starStuff">
        <MobileView className="hero_title_container">
          <div id="hero_title">
            <h1 ref={ghostRef}></h1>
          </div>
        </MobileView>
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
