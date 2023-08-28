import React from "react";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import Audiowide from "../assets/audiowide.json";

const font = new FontLoader().parse(Audiowide);
const Font = React.createContext(font);

const map = new Map();
map.set("font", font);

function Globals(string: string) {
  return map.get(string);
}

export default Globals;
