import { Stars, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Hero = () => {
  return (
    <section id="hero">
      <Canvas>
        {/* <OrbitControls /> */}
        <Stars />
        <Text scale={[0.5, 0.5, 0.5]} color="white" anchorX="center" anchorY="middle">
          argSea
        </Text>
      </Canvas>
    </section>
  );
};

export default Hero;
