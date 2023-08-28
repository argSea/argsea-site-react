import React, { useEffect } from "react";
import imageParticles from "../scripts/imageParticles";
import iInterests from "../interfaces/Interests";

const Interests = ({ interests }: { interests: iInterests[] }) => {
  useEffect(() => {
    // get height of #root
    const root = document.getElementById("root") as HTMLDivElement;
    const canvas = document.getElementById("interests-canvas") as HTMLCanvasElement;

    // set canvas to size of root minus view height
    canvas.width = root.clientWidth;
    canvas.height = root.clientHeight - window.innerHeight - 5;

    const partGen = imageParticles(interests, canvas);
  }, []);

  return <></>;
};

export default Interests;
