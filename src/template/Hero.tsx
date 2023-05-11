import { OrbitControls, Stars, Text } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import Audiowide from "../assets/audiowide.json";
import { Vector3 } from "three";
import { FaChevronDown } from "react-icons/fa";
import ParticleName from "./ParticleName";
import Magic from "../tests/intParticle";

extend({ TextGeometry });

const Hero = ({ user: user }: { user: any }) => {
  const font = new FontLoader().parse(Audiowide);
  const jsmithTextOpts = {
    font,
    size: 0.5,
    height: 0.05,
  };

  const jsmithPos = new Vector3(-4, 0.5, 0);
  const saPos = new Vector3(-4, 0, 0);

  const saTextOpts = {
    font,
    size: 0.2,
    height: 0.01,
  };

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
  return (
    <section id="hero">
      {/* <Magic /> */}
      {/* <div id="background1">
        <img src={homeBackground} />
      </div> */}
      <div id="bio_wrap">
        <span id="hero_three_name">
          {/* {user.firstName} {user.lastName} */}
          {/* <ParticleName name={user.firstName + " " + user.lastName} size={7} title={user.title} titleSize={5} /> */}
        </span>
        <div id="hero_bio">
          <div id="hero_bio_intro">Hey, I go by</div>
          <div id="hero_bio_title">
            I like to design and build things as a <span id="hero_bio_titleHighlight">{user.title}</span>.
          </div>
        </div>
      </div>
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
