import {
  AdditiveBlending,
  Box3,
  BufferGeometry,
  Camera,
  Color,
  Float32BufferAttribute,
  LoadingManager,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  Raycaster,
  Scene,
  ShaderMaterial,
  ShapeGeometry,
  Texture,
  TextureLoader,
  Vector2,
  Vector3,
  WebGLRenderer,
  sRGBEncoding,
} from "three";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";
import Audiowide from "../assets/audiowide.json";
import { useRef } from "react";
import { domToReact } from "html-react-parser";
import { Canvas } from "@react-three/fiber";

export default function Magic() {
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const canvasRef = useRef<HTMLCanvasElement>(canvas);
  const font = new FontLoader().parse(Audiowide);
  const particle = new TextureLoader().load("https://res.cloudinary.com/dfvtkoboz/image/upload/v1605013866/particle_a64uzf.png");
  // const environment = new Environment(font, particle, canvas);
  const height = canvas?.height as number;
  const width = canvas?.width as number;
  const aspect = width / height;

  console.log(aspect);
  console.log(height);
  console.log(width);

  const camera = new PerspectiveCamera(65, aspect, 1, 10000);
  camera.position.set(0, 0, 100);

  const raycaster = new Raycaster();
  const mouse = new Vector2(-200, 200);
  const color = new Color();

  const particles = new CreateParticles(font, particle, camera, raycaster, mouse, color);
  particles.createText();

  return (
    <Canvas ref={canvasRef} camera={camera}>
      <mesh>
        <points geometry={particles.particles.geometry} material={particles.particles.material} />
      </mesh>
    </Canvas>
  );
}

class Environment {
  font: Font;
  particle: any;
  container: any;
  scene: any;
  // camera: any;
  // renderer: any;
  createParticles: any;

  constructor(font: Font, particle: any, container: any) {
    this.font = font;
    this.particle = particle;
    this.container = container;
    this.scene = new Scene();
    // this.createCamera();
    // this.createRenderer();
    this.setup();
    this.bindEvents();
  }

  bindEvents() {
    // window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  setup() {
    // this.createParticles = new CreateParticles(this.scene, this.font, this.particle, this.camera, this.renderer);
  }

  render() {
    this.createParticles.render();
    // this.renderer.render(this.scene, this.camera);
  }

  createCamera() {
    // this.camera = new PerspectiveCamera(65, this.container.clientWidth / this.container.clientHeight, 1, 10000);
    // this.camera.position.set(0, 0, 100);
  }

  createRenderer() {
    // this.renderer = new WebGLRenderer();
    // this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    // this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // this.renderer.outputEncoding = sRGBEncoding;
    // this.container.appendChild(this.renderer.domElement);
    // this.renderer.setAnimationLoop(() => {
    //   this.render();
    // });
  }

  onWindowResize() {
    // this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    // this.camera.updateProjectionMatrix();
    // this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }
}

class CreateParticles {
  scene: any;
  font: any;
  particleImg: any;
  camera: any;
  renderer: any;
  raycaster: any;
  mouse: any;
  colorChange: any;
  buttom: any;
  data: any;
  planeArea: any;
  currenPosition: any;
  particles: any;
  positions: any;
  colors: any;
  sizes: any;
  particlesGeometry: any;
  particlesMaterial: any;
  particlesMesh: any;
  textGeometry: any;
  textMaterial: any;
  textMesh: any;
  geometryCopy: any;

  constructor(font: Font, particleImg: Texture, camera: any, raycaster: any, mouse: any, colorChange: any) {
    // this.scene = scene;
    this.font = font;
    this.particleImg = particleImg;
    this.camera = camera;
    // this.renderer = renderer;

    // this.raycaster = new Raycaster();
    this.raycaster = raycaster;
    this.mouse = mouse;
    this.colorChange = colorChange;
    // this.mouse = new Vector2(-200, 200);

    // this.colorChange = new Color();

    this.buttom = false;

    this.data = {
      text: "FUTURE\nIS NOW",
      amount: 1500,
      particleSize: 1,
      particleColor: 0xffffff,
      textSize: 16,
      area: 250,
      ease: 0.05,
    };

    this.setup();
    // this.bindEvents();
  }

  createPlaneGeometry() {
    const geometry = new PlaneGeometry(this.visibleWidthAtZDepth(100, this.camera), this.visibleHeightAtZDepth(100, this.camera));
    const material = new MeshBasicMaterial({ color: 0x00ff00, transparent: true });
    this.planeArea = new Mesh(geometry, material);
    this.planeArea.visible = false;
  }

  setup() {
    this.createPlaneGeometry();
    this.createText();
  }

  bindEvents() {
    document.addEventListener("mousedown", this.onMouseDown.bind(this));
    document.addEventListener("mousemove", this.onMouseMove.bind(this));
    document.addEventListener("mouseup", this.onMouseUp.bind(this));
  }

  onMouseDown(event: any) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const vector = new Vector3(this.mouse.x, this.mouse.y, 0.5);
    vector.unproject(this.camera);
    const dir = vector.sub(this.camera.position).normalize();
    const distance = -this.camera.position.z / dir.z;
    this.currenPosition = this.camera.position.clone().add(dir.multiplyScalar(distance));

    const pos = this.particles.geometry.attributes.position;
    this.buttom = true;
    this.data.ease = 0.01;
  }

  onMouseUp() {
    this.buttom = false;
    this.data.ease = 0.05;
  }

  onMouseMove(event: any) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  render() {
    const time = ((0.001 * performance.now()) % 12) / 12;
    const zigzagTime = (1 + Math.sin(time * 2 * Math.PI)) / 6;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObject(this.planeArea);

    if (intersects.length > 0) {
      const pos = this.particles.geometry.attributes.position;
      const copy = this.geometryCopy.attributes.position;
      const coulors = this.particles.geometry.attributes.customColor;
      const size = this.particles.geometry.attributes.size;

      const mx = intersects[0].point.x;
      const my = intersects[0].point.y;
      const mz = intersects[0].point.z;

      for (var i = 0, l = pos.count; i < l; i++) {
        const initX = copy.getX(i);
        const initY = copy.getY(i);
        const initZ = copy.getZ(i);

        let px = pos.getX(i);
        let py = pos.getY(i);
        let pz = pos.getZ(i);

        this.colorChange.setHSL(0.5, 1, 1);
        coulors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
        coulors.needsUpdate = true;

        size.array[i] = this.data.particleSize;
        size.needsUpdate = true;

        let dx = mx - px;
        let dy = my - py;
        const dz = mz - pz;

        const mouseDistance = this.distance(mx, my, px, py);
        let d = (dx = mx - px) * dx + (dy = my - py) * dy;
        const f = -this.data.area / d;

        if (this.buttom) {
          const t = Math.atan2(dy, dx);
          px -= f * Math.cos(t);
          py -= f * Math.sin(t);

          this.colorChange.setHSL(0.5 + zigzagTime, 1.0, 0.5);
          coulors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
          coulors.needsUpdate = true;

          if (px > initX + 70 || px < initX - 70 || py > initY + 70 || py < initY - 70) {
            this.colorChange.setHSL(0.15, 1.0, 0.5);
            coulors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
            coulors.needsUpdate = true;
          }
        } else {
          if (mouseDistance < this.data.area) {
            if (i % 5 == 0) {
              const t = Math.atan2(dy, dx);
              px -= 0.03 * Math.cos(t);
              py -= 0.03 * Math.sin(t);

              this.colorChange.setHSL(0.15, 1.0, 0.5);
              coulors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
              coulors.needsUpdate = true;

              size.array[i] = this.data.particleSize / 1.2;
              size.needsUpdate = true;
            } else {
              const t = Math.atan2(dy, dx);
              px += f * Math.cos(t);
              py += f * Math.sin(t);

              pos.setXYZ(i, px, py, pz);
              pos.needsUpdate = true;

              size.array[i] = this.data.particleSize * 1.3;
              size.needsUpdate = true;
            }

            if (px > initX + 10 || px < initX - 10 || py > initY + 10 || py < initY - 10) {
              this.colorChange.setHSL(0.15, 1.0, 0.5);
              coulors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
              coulors.needsUpdate = true;

              size.array[i] = this.data.particleSize / 1.8;
              size.needsUpdate = true;
            }
          }
        }

        px += (initX - px) * this.data.ease;
        py += (initY - py) * this.data.ease;
        pz += (initZ - pz) * this.data.ease;

        pos.setXYZ(i, px, py, pz);
        pos.needsUpdate = true;
      }
    }
  }

  createText() {
    let thePoints: any[] = [];

    let shapes = this.font.generateShapes(this.data.text, this.data.textSize);
    let geometry = new ShapeGeometry(shapes);
    geometry.computeBoundingBox();

    const xMid = -0.5 * ((geometry.boundingBox as Box3).max.x - (geometry.boundingBox as Box3).min.x);
    const yMid = ((geometry.boundingBox as Box3).max.y - (geometry.boundingBox as Box3).min.y) / 2.85;

    geometry.center();

    let holeShapes = [];

    for (let q = 0; q < shapes.length; q++) {
      let shape = shapes[q];

      if (shape.holes && shape.holes.length > 0) {
        for (let j = 0; j < shape.holes.length; j++) {
          let hole = shape.holes[j];
          holeShapes.push(hole);
        }
      }
    }
    shapes.push.apply(shapes, holeShapes);

    let colors: any[] = [];
    let sizes: any[] = [];

    for (let x = 0; x < shapes.length; x++) {
      let shape = shapes[x];

      const amountPoints = shape.type == "Path" ? this.data.amount / 2 : this.data.amount;

      let points = shape.getSpacedPoints(amountPoints);

      points.forEach((element: any, z: any) => {
        const a = new Vector3(element.x, element.y, 0);
        thePoints.push(a);
        colors.push(this.colorChange.r, this.colorChange.g, this.colorChange.b);
        sizes.push(1);
      });
    }

    let geoParticles = new BufferGeometry().setFromPoints(thePoints);
    geoParticles.translate(xMid, yMid, 0);

    geoParticles.setAttribute("customColor", new Float32BufferAttribute(colors, 3));
    geoParticles.setAttribute("size", new Float32BufferAttribute(sizes, 1));

    const material = new ShaderMaterial({
      uniforms: {
        color: { value: new Color(0xffffff) },
        pointTexture: { value: this.particleImg },
      },
      vertexShader: (document.getElementById("vertexshader") as HTMLElement).textContent as string,
      fragmentShader: (document.getElementById("fragmentshader") as HTMLElement).textContent as string,

      blending: AdditiveBlending,
      depthTest: false,
      transparent: true,
    });

    this.particles = new Points(geoParticles, material);
    // this.scene.add(this.particles);

    this.geometryCopy = new BufferGeometry();
    this.geometryCopy.copy(this.particles.geometry);
  }

  visibleHeightAtZDepth(depth: number, camera: any) {
    const cameraOffset = camera.position.z;
    if (depth < cameraOffset) depth -= cameraOffset;
    else depth += cameraOffset;

    const vFOV = (camera.fov * Math.PI) / 180;

    return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
  }

  visibleWidthAtZDepth(depth: number, camera: any) {
    const height = this.visibleHeightAtZDepth(depth, camera);
    return height * camera.aspect;
  }

  distance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }
}
