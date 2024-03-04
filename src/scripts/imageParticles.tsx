import {
  Points,
  AdditiveBlending,
  BufferGeometry,
  ShaderMaterial,
  TextureLoader,
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  Vector3,
  Float32BufferAttribute,
  MathUtils,
  Color,
} from "three";
import iInterests from "../interfaces/iTechInterest";

const DIST = 1000;

function createInterestParticles(interests: iInterests[], canvas: HTMLElement) {
  // initialization
  const scene = new Scene();
  const camera = new PerspectiveCamera(65, canvas.clientWidth / canvas.clientHeight, 1, 10000);
  const renderer = new WebGLRenderer({ alpha: true, canvas: canvas as HTMLCanvasElement });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  camera.position.set(0, 0, DIST);

  const material = new ShaderMaterial({
    uniforms: {
      pointTexture: {
        value: new TextureLoader().load("/particle.png"),
      },
      size: { value: 2.5 },
      scale: { value: window.innerHeight / 2 },
      timeOffset: { value: 0 },
    },
    blending: AdditiveBlending,
    transparent: true,
    depthTest: false,
    vertexShader: `
      uniform float size;
      uniform float scale;
      uniform float timeOffset;
      attribute float time;
      attribute vec4 customColor;
      varying vec4 vColor;
      varying float twinkle;
      void main() {
        vColor = customColor;
        twinkle = time + timeOffset;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_PointSize = size * ( scale / length( mvPosition.xyz ) );
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform sampler2D pointTexture;
      varying float twinkle;
      varying vec4 vColor;
      void main() {
        float time = twinkle;
        float sine = sin( time );
        float c = abs( sine );
        gl_FragColor = vec4( vColor.rgb, c );
      }
    `,
  });

  // get z depth of geometry
  const zDepth = camera.position.z;

  // get the bounds of the viewport
  const widthAtZ = visibleWidthAtZDepth(zDepth, camera);
  const heightAtZ = visibleHeightAtZDepth(zDepth, camera);

  let offsets = [] as Vector3[];
  const worker = new Worker(new URL("./particleWorker.ts", import.meta.url), { type: "module" });
  for (const interest of interests) {
    const offset = generateOffset(widthAtZ, heightAtZ, offsets, 600);
    offsets.push(offset);

    console.log(interest);
    const image = interest.icon.src;
    const sizeMod = interest.interestLevel;
    const scale = (canvas.clientWidth / 10000) * sizeMod;

    var offsetX = offset.x;
    var offsetY = offset.y;

    // create a web worker to generate the particles
    worker.postMessage({ image, offsetX, offsetY, scale });
  }

  worker.onmessage = (e) => {
    console.log("worker finished", e.data);
    const vertices = e.data.vertices as number[];
    const colors = e.data.customColor as number[];
    const times = e.data.time as number[];
    const offsetX = e.data.offsetX as number;
    const offsetY = e.data.offsetY as number;
    const scale = e.data.scale as number;

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
    geometry.setAttribute("customColor", new Float32BufferAttribute(colors, 4));
    geometry.setAttribute("time", new Float32BufferAttribute(times, 1));
    geometry.rotateZ(Math.random() * Math.PI * 2);
    geometry.scale(scale, scale, scale);

    // move to offset
    geometry.translate(offsetX, offsetY, 0);
    geometry.computeBoundingSphere();
    const points = new Points(geometry, material);
    scene.add(points);
  };

  const animate = () => {
    // increment time for twinkle effect
    material.uniforms.timeOffset.value += 0.01;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  animate();
}

function generateOffset(visibleWidth: number, visibleHeight: number, offsets: Vector3[], minDistance = 100) {
  const edgeBuffer = 1; // buffer distance from the edge
  const centerBuffer = visibleWidth / 5; // buffer distance from the center
  const maxAttempts = 25; // maximum number of attempts to generate a valid offset
  let newOffset = new Vector3(0, 0, 0);

  const left = -visibleWidth / 5;
  const right = visibleWidth / 5;
  const top = visibleHeight / 5;
  const bottom = -visibleHeight / 5;
  const center = new Vector3(0, 0, 0);

  for (let i = 0; i < maxAttempts; i++) {
    // generate x within left and right bounds
    let x = Math.random() * (right - left) + left;
    // generate y within top and bottom bounds
    let y = Math.random() * (top - bottom) + bottom;

    // If the offset is too close to the center, generate a new offset
    if (Math.abs(x - center.x) < centerBuffer) {
      x = Math.random() * (right - left) + left;
    }

    if (Math.abs(y - center.y) < centerBuffer) {
      y = Math.random() * (top - bottom) + bottom;
    }

    newOffset = new Vector3(x, y, 0);

    let tooClose = false;
    for (const offset of offsets) {
      const distance = newOffset.distanceTo(offset);
      if (distance < minDistance) {
        tooClose = true;
        break;
      }
    }

    if (!tooClose) {
      return newOffset;
    }
  }

  return newOffset;
}

function visibleHeightAtZDepth(depth: number, camera: PerspectiveCamera) {
  const cameraOffset = camera.position.z;
  if (depth < cameraOffset) depth -= cameraOffset;
  else depth += cameraOffset;

  // vertical fov in radians
  const vFOV = MathUtils.degToRad(camera.fov);
  // Math.abs to ensure the result is always positive
  return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
}

function visibleWidthAtZDepth(depth: number, camera: PerspectiveCamera) {
  const height = visibleHeightAtZDepth(depth, camera);
  return height * camera.aspect;
}

export default createInterestParticles;
