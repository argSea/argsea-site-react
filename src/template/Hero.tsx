import { OrbitControls, Stars, Text } from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import Audiowide from "../../public/audiowide.json";
import { Vector3 } from "three";

extend({ TextGeometry });

const Hero = () => {
  const font = new FontLoader().parse(Audiowide);
  const jsmithTextOpts = {
    font,
    size: 6,
    height: 1,
  };

  const saTextOpts = {
    font,
    size: 2,
    height: 0.1,
  };
  return (
    <section id="hero">
      <Canvas>
        <OrbitControls />
        <Stars factor={2} />
        {/* <Text scale={[0.5, 0.5, 0.5]} color="white" anchorX="center" anchorY="middle">
          Justin Smith
        </Text>
        <Text scale={[0.5, 0.5, 0.5]} color="white" anchorX="center" anchorY="bottom" >
          Systems Architect
        </Text> */}
        <mesh position={new Vector3(-30, -5, -50)}>
          <textGeometry args={["Justin Smith", jsmithTextOpts]} />
        </mesh>
        <mesh position={new Vector3(-15, -10, -50)}>
          <textGeometry args={["Systems Architect", saTextOpts]} />
        </mesh>
      </Canvas>
    </section>
  );
};

export default Hero;
