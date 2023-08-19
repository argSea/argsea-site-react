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

class Environment {
  font: Font;
  particle: any;
  container: any;
  scene: any;
  camera: any;
  renderer: any;
  createParticles: any;
  text: string;

  constructor(font: Font, particle: any, container: any, text: string) {
    console.log("Environment");
    this.font = font;
    this.particle = particle;
    this.container = container;
    this.scene = new Scene();
    this.text = text;
    this.createCamera();
    this.createRenderer();
    this.setup();
    this.bindEvents();

    this.render();

    console.log(this);
  }

  bindEvents() {
    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  setup() {
    let mouse = new Vector2(-200, 200);
    let colorChange = new Color();
    let raycaster = new Raycaster();
    this.createParticles = new CreateParticles(this.scene, this.font, this.particle, this.text, this.camera, raycaster, this.renderer, mouse, colorChange);
  }

  render() {
    this.createParticles.render();
    this.renderer.render(this.scene, this.camera);

    setTimeout(() => {
      requestAnimationFrame(() => {
        this.render();
      });
    }, 1000 / 120);
  }

  createCamera() {
    this.camera = new PerspectiveCamera(65, this.container.clientWidth / this.container.clientHeight, 1, 10000);
    this.camera.position.set(0, 5, 100);
  }

  createRenderer() {
    // this.renderer = new WebGLRenderer();
    //get renderer from canvas
    this.renderer = new WebGLRenderer({ canvas: this.container, antialias: true, alpha: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputEncoding = sRGBEncoding;
    // this.container.appendChild(this.renderer.domElement);
    // this.renderer.setAnimationLoop(() => {
    //   this.render();
    // });
  }

  onWindowResize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
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
  currenPosition: any;
  particles: any;
  positions: any;
  colors: any;
  sizes: any;
  particlesGeometry: any;
  particlesMaterial: any;
  particlesMesh: any;
  textGeometry: any;
  textString: string;
  textMaterial: any;
  textMesh: any;
  geometryCopy: any;
  tuppom: any;
  jsmithParticles: any;
  sysArchParticles: any;
  jsmithCopy: any;
  sysArchCopy: any;
  pause: any;
  swap: any;

  constructor(scene: any, font: Font, particleImg: Texture, text: string, camera: any, raycaster: any, renderer: any, mouse: any, colorChange: any) {
    this.swap = true;
    this.scene = scene;
    this.font = font;
    this.particleImg = particleImg;
    this.camera = camera;
    this.renderer = renderer;
    this.raycaster = raycaster;
    this.mouse = mouse;
    this.colorChange = colorChange;
    this.buttom = true;
    this.tuppom = false;
    this.pause = false;
    this.textString = text;
    this.data = {
      text: this.textString,
      amount: 500,
      particleSize: 1,
      particleColor: 0xffffff,
      textSize: 12,
      area: 10000,
      ease: 0.08,
      radius: 250,
    };

    this.setup();
    this.bindEvents();

    console.log(this);
  }

  setup() {
    this.jsmithParticles = this.createText(this.data.text, this.data.textSize);
    this.sysArchParticles = this.createText("Systems Architect", this.data.textSize);

    this.jsmithCopy = new BufferGeometry();
    this.sysArchCopy = new BufferGeometry();
    this.jsmithCopy.copy(this.jsmithParticles.geometry);
    this.sysArchCopy.copy(this.sysArchParticles.geometry);

    this.particles = this.sysArchParticles;
    this.geometryCopy = this.jsmithCopy;

    this.scene.add(this.particles);

    this.particles = this.randomizeParticles(this.particles, this.data.radius);
  }

  bindEvents() {
    window.addEventListener("mousedown", this.onMouseDown.bind(this));
  }

  onMouseDown(event: any) {
    this.swapText();
    this.tuppom = true;
  }

  swapText() {
    if (this.geometryCopy == this.jsmithCopy) {
      this.geometryCopy = this.sysArchCopy;
    } else {
      this.geometryCopy = this.jsmithCopy;
    }
  }

  explodeParticles(particles: any, particlesCopy: any) {
    const pos = particles.geometry.attributes.position;
    const copy = particlesCopy.attributes.position;
    const colors = particles.geometry.attributes.customColor;

    for (var i = 0, l = pos.count; i < l; i++) {
      const initX = copy.getX(i);
      const initY = copy.getY(i);
      const initZ = copy.getZ(i);
      let sp = this.randomSpherePoint(0, 0, 0, this.data.radius);
      let mx = sp[0];
      let my = sp[1];
      let mz = sp[2];
      let px = pos.getX(i);
      let py = pos.getY(i);
      let pz = pos.getZ(i);

      this.colorChange.setHSL(1, 1, 1);
      colors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
      colors.needsUpdate = true;

      //if px nan
      if (isNaN(px)) {
        px = initX;
      }
      if (isNaN(py)) {
        py = initY;
      }
      if (isNaN(pz)) {
        pz = initZ;
      }

      let dx = mx - px;
      let dy = my - py;
      let dz = mz - pz;

      const d = (dx = mx - px) * dx + (dy = my - py) * dy;
      const f = -this.data.area / d;

      const t = Math.atan2(dy, dx);
      px -= f * Math.cos(t);
      py -= f * Math.sin(t);

      px += (initX - px) * this.data.ease;
      py += (initY - py) * this.data.ease;
      pz += (initZ - pz) * this.data.ease;

      pos.setXYZ(i, px, py, pz);
      pos.needsUpdate = true;
    }

    return particles;
  }

  randomizeParticles(particles: any, radius: number) {
    const pos = particles.geometry.attributes.position;
    const colors = particles.geometry.attributes.customColor;

    for (var i = 0, l = pos.count; i < l; i++) {
      let sp = this.randomSpherePoint(0, 0, 0, radius);
      let mx = sp[0];
      let my = sp[1];
      let mz = sp[2];

      this.colorChange.setHSL(1, 1, 1);
      colors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
      colors.needsUpdate = true;

      pos.setXYZ(i, mx, my, mz);
      pos.needsUpdate = true;
    }

    return particles;
  }

  fakeRandomizeParticles(particles: any) {
    const pos = particles.geometry.attributes.position;
    const colors = particles.geometry.attributes.customColor;

    for (var i = 0, l = pos.count; i < l; i++) {
      let mx = pos.getX(i);
      let my = pos.getY(i);
      let mz = pos.getZ(i);

      this.colorChange.setHSL(1, 1, 1);
      colors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
      colors.needsUpdate = true;

      pos.setXYZ(i, mx, my, mz);
      pos.needsUpdate = true;
    }

    return particles;
  }

  restoreParticles(particles: any, particlesCopy: any) {
    const pos = particles.geometry.attributes.position;
    const copy = particlesCopy.attributes.position;

    for (var i = 0, l = pos.count; i < l; i++) {
      const initX = copy.getX(i);
      const initY = copy.getY(i);
      const initZ = copy.getZ(i);

      let px = pos.getX(i);
      let py = pos.getY(i);
      let pz = pos.getZ(i);

      px += (initX - px) * this.data.ease;
      py += (initY - py) * this.data.ease;
      pz += (initZ - pz) * this.data.ease;

      pos.setXYZ(i, px, py, pz);
      pos.needsUpdate = true;
    }

    return particles;
  }

  render() {
    //after 2 seconds, change this.buttom to false, only run once
    if (this.buttom) {
      setTimeout(() => {
        this.buttom = false;
      }, 100);
    }

    if (this.tuppom) {
      setTimeout(() => {
        this.tuppom = false;
      }, 200);
    }

    if (!this.buttom && !this.pause && !this.tuppom) {
      this.particles = this.restoreParticles(this.particles, this.geometryCopy);
    }

    if (this.tuppom) {
      this.particles = this.explodeParticles(this.particles, this.geometryCopy);
    }

    if (this.swap) {
      setTimeout(() => {
        this.swapText();
        this.swap = true;
        this.tuppom = true;
      }, 4000);
      this.swap = false;
    }

    // this.raycaster.setFromCamera(this.mouse, this.camera);
    // const intersects = this.raycaster.intersectObject(this.planeArea);
    // if (intersects.length > 0) {
    //   const pos = this.particles.geometry.attributes.position;
    //   const copy = this.geometryCopy.attributes.position;
    //   const coulors = this.particles.geometry.attributes.customColor;
    //   const size = this.particles.geometry.attributes.size;
    //   const mx = intersects[0].point.x;
    //   const my = intersects[0].point.y;
    //   const mz = intersects[0].point.z;
    //   for (var i = 0, l = pos.count; i < l; i++) {
    //     const initX = copy.getX(i);
    //     const initY = copy.getY(i);
    //     const initZ = copy.getZ(i);
    //     let px = pos.getX(i);
    //     let py = pos.getY(i);
    //     let pz = pos.getZ(i);
    //     this.colorChange.setHSL(0.5, 1, 1);
    //     coulors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
    //     coulors.needsUpdate = true;
    //     size.array[i] = this.data.particleSize;
    //     size.needsUpdate = true;
    //     let dx = mx - px;
    //     let dy = my - py;
    //     const dz = mz - pz;
    //     const mouseDistance = this.distance(mx, my, px, py);
    //     let d = (dx = mx - px) * dx + (dy = my - py) * dy;
    //     const f = -this.data.area / d;
    //     if (this.buttom) {
    //       const t = Math.atan2(dy, dx);
    //       px -= f * Math.cos(t);
    //       py -= f * Math.sin(t);
    //       this.colorChange.setHSL(0.5 + zigzagTime, 1.0, 0.5);
    //       coulors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
    //       coulors.needsUpdate = true;
    //       if (px > initX + 70 || px < initX - 70 || py > initY + 70 || py < initY - 70) {
    //         this.colorChange.setHSL(0.15, 1.0, 0.5);
    //         coulors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
    //         coulors.needsUpdate = true;
    //       }
    //     } else if (!this.buttom && this.tuppom) {
    //       if (mouseDistance < this.data.area) {
    //         if (i % 5 == 0) {
    //           const t = Math.atan2(dy, dx);
    //           px -= 0.03 * Math.cos(t);
    //           py -= 0.03 * Math.sin(t);
    //           this.colorChange.setHSL(0.15, 1.0, 0.5);
    //           coulors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
    //           coulors.needsUpdate = true;
    //           size.array[i] = this.data.particleSize / 1.2;
    //           size.needsUpdate = true;
    //         } else {
    //           const t = Math.atan2(dy, dx);
    //           px += f * Math.cos(t);
    //           py += f * Math.sin(t);
    //           pos.setXYZ(i, px, py, pz);
    //           pos.needsUpdate = true;
    //           size.array[i] = this.data.particleSize * 1.3;
    //           size.needsUpdate = true;
    //         }
    //         if (px > initX + 10 || px < initX - 10 || py > initY + 10 || py < initY - 10) {
    //           this.colorChange.setHSL(0.15, 1.0, 0.5);
    //           coulors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b);
    //           coulors.needsUpdate = true;
    //           size.array[i] = this.data.particleSize / 1.8;
    //           size.needsUpdate = true;
    //         }
    //       }
    //     }
    //     px += (initX - px) * this.data.ease;
    //     py += (initY - py) * this.data.ease;
    //     pz += (initZ - pz) * this.data.ease;
    //     pos.setXYZ(i, px, py, pz);
    //     pos.needsUpdate = true;
    //   }
    // }
  }

  createText(text: string, size: number) {
    let thePoints: any[] = [];

    let shapes = this.font.generateShapes(text, size);
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

    let particles = new Points(geoParticles, material);

    return particles;
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

  randomSpherePoint(x0: number, y0: number, z0: number, radius: number) {
    var u = Math.random();
    var v = Math.random();
    var theta = 2 * Math.PI * u;
    var phi = Math.acos(2 * v - 1);
    var x = x0 + radius * Math.sin(phi) * Math.cos(theta);
    var y = y0 + radius * Math.sin(phi) * Math.sin(theta);
    var z = z0 + radius * Math.cos(phi);

    if (z > 0) {
      z *= -1;
    }
    return [x, y, z];
  }
}

export default class ParticleGenerator {
  environment: any;
  //constructor
  constructor(canvas: any, text: string) {
    console.log("ParticleGenerator");
    const font = new FontLoader().parse(Audiowide);
    const particle = new TextureLoader().load("http://127.0.0.1:5173/star.png");
    this.environment = new Environment(font, particle, canvas, text);
  }

  render() {
    console.log("render");
    this.environment.render();
  }
}
