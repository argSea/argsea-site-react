import { Canvas } from "@react-three/fiber";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";
import Audiowide from "../assets/audiowide.json";
import { BufferGeometry, Box3, ShapeGeometry, TextureLoader, Color, Vector3, Float32BufferAttribute, ShaderMaterial, AdditiveBlending, Points } from "three";

class argText {
  text: string;
  pos: { x: number; y: number; z: number };
  size: number;
  scene: any;
  particles: Points<any>;
  geoCopy: any;
  font: Font;

  constructor({ text, size, pushBack, particleMultiplier }: { text: string; size: number; pushBack: number; particleMultiplier: number }) {
    this.text = text;
    this.pos = { x: 0, y: 0, z: -pushBack };
    this.size = size;
    this.scene = null;
    this.particles = new Points();
    this.geoCopy;

    // const font = loader.load("/audiowide.json", function (font) {
    const font = new FontLoader().parse(Audiowide);
    this.font = font;
    const particle = new TextureLoader().load("/particle.png");

    let self = this;

    //create text from points
    let thePoints = [];
    let shapes = font.generateShapes(self.text, self.size) as any;
    let geometry = new ShapeGeometry(shapes);

    geometry.computeBoundingBox();
    geometry.center();

    const xMid = -0.5 * ((geometry.boundingBox as Box3).max.x - (geometry.boundingBox as Box3).min.x);
    const yMid = ((geometry.boundingBox as Box3).max.y - (geometry.boundingBox as Box3).min.y) / 2.85;

    for (let i = 0; i < shapes.length; i++) {
      let shape = shapes[i];

      //check for holes
      if (shape.holes && shape.holes.length > 0) {
        for (let j = 0; j < shape.holes.length; j++) {
          shapes.push(shape.holes[j]);
        }
      }
    }

    let colors = [];
    let sizes = [];

    let color = new Color();
    for (let i = 0; i < shapes.length; i++) {
      let shape = shapes[i];
      let numPoints = particleMultiplier * shape.getLength();
      let points = shape.getSpacedPoints(shape.type === "Path" ? numPoints / 2 : numPoints);

      for (let q = 0; q < points.length; q += 2) {
        let point = points[q];
        const vec = new Vector3(point.x, point.y, 0);
        thePoints.push(vec);
        colors.push(color.r, color.g, color.b);
        sizes.push(1);
      }
    }

    let gParticles = new BufferGeometry().setFromPoints(thePoints);
    gParticles.translate(xMid, yMid, self.pos.z);
    gParticles.setAttribute("customColor", new Float32BufferAttribute(colors, 3));
    gParticles.setAttribute("size", new Float32BufferAttribute(sizes, 1));

    const material = new ShaderMaterial({
      uniforms: {
        color: { value: new Color(0xffffff) },
        pointTexture: { value: particle },
      },
      vertexShader: (document.getElementById("vertexshader") as HTMLElement).textContent as string,
      fragmentShader: (document.getElementById("fragmentshader") as HTMLElement).textContent as string,
      blending: AdditiveBlending,
      depthTest: false,
      transparent: true,
    });

    self.particles = new Points(gParticles, material);
    self.scene = self.particles;

    self.geoCopy = new BufferGeometry();
    self.geoCopy.copy(self.particles.geometry);
  }

  update() {}
}

// create the main app component
export default function ParticleName({
  name: name,
  size: size,
  title: title,
  titleSize: titleSize,
}: {
  name: string;
  size: number;
  title: string;
  titleSize: number;
}) {
  var text = new argText({ text: name, size: size, pushBack: 50, particleMultiplier: 10 });
  var titleText = new argText({ text: title, size: titleSize, pushBack: 80, particleMultiplier: 7 });
  return (
    <Canvas style={{ width: "100%", height: "100%" }}>
      <mesh position={new Vector3(text.pos.x, text.pos.y, 0)}>
        {/* render Points within a mesh */}
        <points geometry={text.scene.geometry} material={text.scene.material} />
      </mesh>
      <mesh position={new Vector3(titleText.pos.x, titleText.pos.y - 8, 0)}>
        {/* render Points within a mesh */}
        <points geometry={titleText.scene.geometry} material={titleText.scene.material} />
      </mesh>
    </Canvas>
  );
}
