import { FaChevronDown } from "react-icons/fa";
import ParticleGenerator from "../../scripts/hero";
import { useEffect } from "react";
import { isMobile, MobileView } from "react-device-detect";
import "./styles/hero.css";
import iUser from "../../interfaces/iUser";

// set bgOnly to false by default
const Hero = ({ user: user }: { user: iUser }) => {
  const backgroundImagesMobile = user?.pictures.map((picture) => picture.image.src) || [];

  const imageSeed = Math.round(Math.random() * (backgroundImagesMobile.length - 1));
  const homeBackground = backgroundImagesMobile[imageSeed];
  const backgroundSizes = {
    "1x": homeBackground + "/900/0",
    "2x": homeBackground,
  };

  var finalBackground = `url(${backgroundSizes["2x"]})`;
  if (isMobile) {
    finalBackground = `url(${backgroundSizes["1x"]})`;
  }

  //useEffect to run at start of page load
  useEffect(() => {
    // if on mobile, just skip
    if (isMobile) {
      return;
    }

    if (user === null) {
      return;
    }
    const starStuff = document.getElementById("starStuff");
    // add canvas to starStuff with an id of introcanvas
    const canvas = document.createElement("canvas");
    canvas.id = "introcanvas";
    starStuff?.appendChild(canvas);
    const partGen = new ParticleGenerator(canvas, user.firstName + " " + user.lastName, user.title);
  }, [user]);

  return (
    <section id="hero">
      <div id="starStuff">
        <MobileView>
          <div id="hero_title">
            <h1>{user.firstName + " " + user.lastName}</h1>
            <h2>{user.title}</h2>
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
