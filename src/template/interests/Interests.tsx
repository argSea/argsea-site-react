import React, { useEffect, useRef } from "react";
import createInterestParticles from "../../scripts/imageParticles";
import iInterests from "../../interfaces/iTechInterest";
import { isMobile } from "react-device-detect";
import { Canvas } from "@react-three/fiber";
import "./styles/interests.css";

const Interests = ({ interests }: { interests: iInterests[] }) => {
  useEffect(() => {
    // if on mobile, just skip
    if (isMobile) {
      return;
    }

    const outerContainer = document.getElementById("root") as HTMLDivElement;
    const container = document.getElementById("interest-canvas-container") as HTMLDivElement;
    // add canvas to root with an id of interests-canvas
    // const canvas = document.getElementById("interest-canvas")?.getElementsByTagName("canvas")[0] as HTMLCanvasElement;
    const canvas = document.createElement("canvas");
    canvas.id = "interest-canvas";
    canvas.setAttribute("style", "width: 100%; height: 100%;");
    console.log(canvas);

    container.appendChild(canvas);

    // get view height
    const vh = window.innerHeight * 0.01;
    // set container height to body minus #content
    // container.style.height = outerContainer.clientHeight - 50 * vh + "px";

    const partGen = createInterestParticles(interests, canvas);

    // rObserver.observe(outerContainer);

    // return function cleanup() {
    //   rObserver.disconnect();
    // };
  }, []);

  return (
    <div id="interest-canvas-container">
      {/* <Canvas id="interest-canvas">
        <mesh visible={false}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="red" />
        </mesh>
      </Canvas> */}
    </div>
  );
};

export default Interests;
