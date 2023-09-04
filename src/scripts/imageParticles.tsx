import {
  Points,
  AdditiveBlending,
  BufferGeometry,
  Color,
  ShaderMaterial,
  TextureLoader,
  PerspectiveCamera,
  WebGLRenderer,
  sRGBEncoding,
  BufferAttribute,
  Scene,
  ImageLoader,
  Vector3,
  Float32BufferAttribute,
  Uniform,
} from "three";
import iInterests from "../interfaces/iInterests";

function imageParticles(interests: iInterests[], canvas: any) {
  console.log(interests);
  console.log(canvas);
  const allParticles: { points: Points; reverse: boolean }[] = [];

  //setups
  const camera = new PerspectiveCamera(65, canvas.clientWidth / canvas.clientHeight, 1, 10000);
  camera.position.set(0, 0, 1000);
  const renderer = new WebGLRenderer({ canvas: canvas, alpha: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = sRGBEncoding;

  const scene = new Scene();

  // load image
  const loader = new ImageLoader();

  for (let i = 0; i < interests.length; i++) {
    const image = loader.load(interests[i].icon, () => {
      console.log("image loaded");

      console.log(image);

      // create particles from image
      const particles = generateParticles(canvas, camera, image, interests[i].interestLevel, allParticles);
      // copy particles

      // add particles to allParticles
      allParticles.push({ points: particles, reverse: false });

      // add particles to scene
      scene.add(allParticles[i].points);
    });
  }

  render(renderer, scene, camera, allParticles);

  // window.addEventListener("resize", () => {
  //   onWindowResize(image_url, canvas);
  // });
}

function generateParticles(canvas: HTMLCanvasElement, camera: PerspectiveCamera, image: HTMLImageElement, sizeModifier: number, allParticles: any[]) {
  let positions: any[] = [];
  let colors: any[] = [];
  let colorsCopy: any[] = [];
  // get aspect ratio of image
  const aspectRatio = image.width / image.height;
  const width = 128;
  const height = width / aspectRatio;

  // draw image to get its data
  const tempCanvas = document.createElement("canvas");
  const ctx = tempCanvas.getContext("2d");
  tempCanvas.width = width;
  tempCanvas.height = height;
  ctx!.imageSmoothingEnabled = true;
  ctx!.clearRect(0, 0, width, height);
  ctx!.drawImage(image, 0, 0, width, height);
  const imgData = ctx!.getImageData(0, 0, width, height);

  // remove transparent pixels and black pixels
  for (let i = 0; i < imgData.data.length; i += 4) {
    if (imgData.data[i + 3] > 0 || imgData.data[i] > 0 || imgData.data[i + 1] > 0 || imgData.data[i + 2] > 0) {
      const x = (i / 4) % width;
      const y = Math.floor(Math.floor(i / width) / 4);
      const color = new Color(imgData.data[i] / 255, imgData.data[i + 1] / 255, imgData.data[i + 2] / 255);
      const colorCopy = new Color(imgData.data[i] / 255, imgData.data[i + 1] / 255, imgData.data[i + 2] / 255);

      const a = new Vector3(x - width / 2, -y + height / 2, Math.random() * -20 + 20);

      // more distance between particles as they get further away from the center of the image
      // a.multiplyScalar(1 + a.length() * 0.01);

      positions.push(a);
      colors.push(color.r, color.g, color.b, 1);
      colorsCopy.push(colorCopy.r, colorCopy.g, colorCopy.b, 1);
    }
  }

  const geometry = new BufferGeometry().setFromPoints(positions);

  // random rotation
  geometry.rotateZ(Math.random() * Math.PI * 2);

  // random scale, larger sizeModifier means larger scale, also take into account viewport
  const scale = (canvas.clientWidth / 20000) * sizeModifier;
  geometry.scale(scale, scale, scale);

  // get center of geometry
  geometry.computeBoundingSphere();
  const center = geometry.boundingSphere!.center;

  // get z depth of geometry
  const zDepth = center.z;

  // get the bounds of the viewport
  const widthAtZ = visibleWidthAtZDepth(zDepth, camera);
  const heightAtZ = visibleHeightAtZDepth(zDepth, camera);

  // get the left and right bounds of the viewport
  const left = -widthAtZ / 2;
  const right = widthAtZ / 2;
  const top = heightAtZ / 2;
  const bottom = -heightAtZ / 2;

  // move geometry to a random location within the viewport, making sure it is at least 2/3 visible and making sure it is not overlapping with other geometries in the scene
  let x = 0;
  let y = 0;
  let overlap = true;
  while (overlap) {
    x = Math.random() * (right - left) + left;
    y = Math.random() * (top - bottom) + bottom;

    // check if geometry is overlapping with other geometries
    overlap = false;
    for (let i = 0; i < allParticles.length; i++) {
      const otherGeometry = allParticles[i].points.geometry;
      otherGeometry.computeBoundingSphere();
      const otherCenter = otherGeometry.boundingSphere!.center;
      const otherRadius = otherGeometry.boundingSphere!.radius;

      const distance = Math.sqrt(Math.pow(otherCenter.x - x, 2) + Math.pow(otherCenter.y - y, 2));
      if (distance < otherRadius + geometry.boundingSphere!.radius) {
        overlap = true;
      }
    }
  }

  geometry.translate(x, y, 0);

  // log position of geometry
  console.log(geometry.attributes.position);

  // randomly remove some colors, removing less the larger the z depth
  const colsToRemove = Math.round(colors.length * (1 - zDepth / 10));
  const colorsToRemove = randomlyRemove(new Float32BufferAttribute(colors, 4), colsToRemove);
  geometry.setAttribute("customColor", new Float32BufferAttribute(colorsToRemove.colors.array, 4));
  geometry.setAttribute("customColorDefaults", new Float32BufferAttribute(colorsToRemove.colors.clone().array, 4));

  // randomly remove some colors
  const numToRemove = Math.round(colors.length * 0.99);
  const customColorToRemove = randomlyRemove(geometry.attributes.customColor.clone() as BufferAttribute, numToRemove);
  geometry.setAttribute("customColorToRemove", new Float32BufferAttribute(customColorToRemove.colors.array, 4));

  const material = new ShaderMaterial({
    uniforms: {
      pointTexture: {
        value: new TextureLoader().load("/particle.png"),
      },
      size: { value: 2.5 },
      scale: { value: window.innerHeight / 2 },
    },
    blending: AdditiveBlending,
    transparent: true,
    depthTest: false,
    vertexShader: `
      uniform float size;
      uniform float scale;
      attribute vec4 customColor;
      varying vec4 vColor;
      void main() {
        vColor = customColor;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_PointSize = size * ( scale / length( mvPosition.xyz ) );
        gl_Position = projectionMatrix * mvPosition;
        //outline shader
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform sampler2D pointTexture;
      varying vec4 vColor;
      void main() {
        gl_FragColor = vColor;
        gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
      }
    `,
  });

  const particles = new Points(geometry, material);

  return particles;
}

// twinkle effect
function sparkle(particles: Points) {
  const geometry = particles.geometry;
  const positions = geometry.attributes.position;

  for (let i = 0; i < positions.count; i++) {
    // randomly change the z position of the particle, make it slower
    if (Math.random() < 0.000001) {
      positions.setZ(i, positions.getZ(i) + Math.random() * 2 - 1);
      positions.needsUpdate = true;
    }
  }
}

function fade(color1: BufferAttribute, color2: BufferAttribute, desc: boolean = false) {
  // lerp between the old alphas and the new alphas
  const lerpThreshold = 0.0015;
  for (let i = 0; i < color1.count; i++) {
    // lerp alphas
    const oldAlpha = color1.getW(i);
    const newAlpha = color2.getW(i);
    let lerpAlpha = 0;
    if (desc) {
      lerpAlpha = Math.max(oldAlpha - lerpThreshold, newAlpha);
    } else {
      lerpAlpha = Math.min(oldAlpha + lerpThreshold, newAlpha);
    }

    color1.setW(i, lerpAlpha);
  }

  color1.needsUpdate = true;

  //check if color1's alpha and color2's alpha are the same
  let allMatch = true;
  for (let i = 0; i < color1.count; i++) {
    if (color1.getW(i) !== color2.getW(i)) {
      allMatch = false;
    }
  }

  return allMatch;
}

function randomlyRemove(colors: BufferAttribute, numToRemove: number) {
  // randomly set some alphas to 0
  for (let i = 0; i < numToRemove; i++) {
    const index = Math.round(Math.random() * colors.count);
    colors.setW(index, 0);
  }

  colors.needsUpdate = true;

  return { colors: colors };
}

function render(renderer: WebGLRenderer, scene: any, camera: PerspectiveCamera, particles: any) {
  for (let i = 0; i < particles.length; i++) {
    let geometry = particles[i].points.geometry;
    if (particles[i].reverse) {
      particles[i].reverse = !fade(geometry.attributes.customColor, geometry.attributes.customColorDefaults, false);
    } else {
      particles[i].reverse = fade(geometry.attributes.customColor, geometry.attributes.customColorToRemove, true);
    }
  }

  renderer.render(scene, camera);

  // run at 140fps
  // setTimeout(() => {
  requestAnimationFrame(() => render(renderer, scene, camera, particles));
  // }, 1000 / 140);
}

const visibleHeightAtZDepth = (depth: any, camera: PerspectiveCamera) => {
  // compensate for cameras not positioned at z=0
  const cameraOffset = camera.position.z;
  if (depth < cameraOffset) depth -= cameraOffset;
  else depth += cameraOffset;

  // vertical fov in radians
  const vFOV = (camera.fov * Math.PI) / 180;

  // Math.abs to ensure the result is always positive
  return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
};

const visibleWidthAtZDepth = (depth: any, camera: PerspectiveCamera) => {
  const height = visibleHeightAtZDepth(depth, camera);
  return height * camera.aspect;
};

// function onWindowResize(image: string, canvas: HTMLCanvasElement) {
//   imageParticles(image, canvas);
// }

export default imageParticles;
