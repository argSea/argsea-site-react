import React, { useEffect, useRef } from "react";
import imageParticles from "../../scripts/imageParticles";
import iInterests from "../../interfaces/iTechInterest";
import { isMobile } from "react-device-detect";
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
    const canvas = document.createElement("canvas");
    canvas.id = "interest-canvas";
    // set canvas to size of root minus view height
    // const rObserver = new ResizeObserver((entries) => {
    //   canvas.width = (hookRef.current as HTMLDivElement).clientWidth;
    //   canvas.height = (hookRef.current as HTMLDivElement).clientHeight - window.innerHeight - 5;
    // });

    container?.appendChild(canvas);

    // get view height
    const vh = window.innerHeight * 0.01;
    // set container height to body minus 101vh
    container.style.height = outerContainer.clientHeight - 101 * vh + "px";

    const partGen = imageParticles(interests, canvas);

    // rObserver.observe(outerContainer);

    // return function cleanup() {
    //   rObserver.disconnect();
    // };
  }, []);

  return <div id="interest-canvas-container"></div>;
};

export default Interests;
