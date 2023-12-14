import { extend } from "@react-three/fiber";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FaChevronDown } from "react-icons/fa";
import ParticleGenerator from "../../scripts/hero";
import { useEffect } from "react";
import "./styles/hero.css";

extend({ TextGeometry });

interface iHero {
  user?: any;
}

// set bgOnly to false by default
const Hero = ({ user = null }: iHero) => {
  const backgroundImagesMobile = [
    "/argsea_home1.png",
    // "/argsea_home2.png",
    // "/argsea_home3.png",
    // "/argsea_home4.png",
    // "/argsea_home5.png",
    "/argsea_mobile_home2.png",
    // "/argsea_mobile_home3.png",
  ];

  const imageSeed = Math.round(Math.random() * (backgroundImagesMobile.length - 1));
  const homeBackground = backgroundImagesMobile[imageSeed];

  //useEffect to run at start of page load
  useEffect(() => {
    if (user === null) {
      return;
    }
    const starStuff = document.getElementById("starStuff");
    // add canvas to starStuff with an id of introcanvas
    const canvas = document.createElement("canvas");
    canvas.id = "introcanvas";
    starStuff?.appendChild(canvas);
    const partGen = new ParticleGenerator(canvas, user.firstName + " " + user.lastName, user.title);
  }, []);

  return (
    <section id="hero">
      <div id="starStuff"></div>
      <div id="hero_down_arrow_container">
        <a href="#aboutme">
          <FaChevronDown size={75} id="hero_down_arrow" />
        </a>
      </div>
      <div id="background_container">
        <div id="hero_background" style={{ backgroundImage: "url(" + homeBackground + ")" }}></div>
      </div>
    </section>
  );
};

export default Hero;
