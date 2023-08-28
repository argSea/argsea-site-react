import { Canvas } from "@react-three/fiber";
import { BufferGeometry, ShaderMaterial, Vector3 } from "three";
import parse from "html-react-parser";
import Globals from "../../../globals/Globals";
import imageParticles from "../../../scripts/imageParticles";
import { useEffect } from "react";
import { Points } from "@react-three/drei";

interface iInterest {
  name: string;
  icon: string;
  interestLevel: number;
}

const AboutMe = ({ user }: { user: any }) => {
  const aboutMeOpts = {
    font: Globals("font"),
    size: 32,
    height: 0.1,
  };
  const aboutMePos = new Vector3(-125, -10, -50);
  let interestParticles: any;

  // card based contact me section with icons and links to social media and email using user.contacts
  const callToAction = () => {
    return (
      <button id="call-to-action-button" onClick={(event) => (window.location.href = "/#contact-me")}>
        Contact Me
        <span id="radar-animation-1"></span>
      </button>
    );
  };

  return (
    <>
      <Canvas className="section_header" style={{ width: "100%", height: "100px" }}>
        <mesh position={aboutMePos}>
          {/* hide this error */}
          {/* @ts-ignore */}
          <textGeometry args={["About Me", aboutMeOpts]} />
        </mesh>
      </Canvas>
      <div id="aboutme_info">
        <div id="aboutme_text">
          <div id="welcome">
            <div id="welcome_text">
              <span id="big_welcome">Hiya!</span> My name is{" "}
              <span id="colored_name">
                {user.firstName} {user.lastName}
              </span>
              ,
            </div>
          </div>
          {parse(user.about)}
          <div id="call-to-action">{callToAction()}</div>
        </div>
      </div>
    </>
  );
};

export default AboutMe;
