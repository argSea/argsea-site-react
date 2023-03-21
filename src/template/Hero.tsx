import { OrbitControls, Stars, Text } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import Audiowide from "../assets/audiowide.json";
import { Vector3 } from "three";

extend({ TextGeometry });

const Hero = () => {
  const font = new FontLoader().parse(Audiowide);
  const jsmithTextOpts = {
    font,
    size: 5,
    height: 0.1,
  };

  const jsmithPos = new Vector3(-25, -30, -50);
  const saPos = new Vector3(-15, -35, -50);

  const saTextOpts = {
    font,
    size: 2,
    height: 0.1,
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
      {/* <div id="background1">
        <img src={homeBackground} />
      </div> */}
      <Canvas>
        <mesh position={jsmithPos}>
          <textGeometry args={["Justin Smith", jsmithTextOpts]} />
        </mesh>
        <mesh position={saPos}>
          <textGeometry args={["Systems Architect", saTextOpts]} />
        </mesh>
      </Canvas>
      <div id="background_container">
        <div id="hero_background" style={{ backgroundImage: "url(" + homeBackground + ")" }}></div>
      </div>
    </section>
  );
};

export default Hero;
