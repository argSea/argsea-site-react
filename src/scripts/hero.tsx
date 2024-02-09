import {
  AdditiveBlending,
  Box3,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Shape,
  ShapeGeometry,
  TextureLoader,
  WebGLRenderer,
  sRGBEncoding,
} from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import Jetbrains from "../assets/audiowide.json";

const particleGenerator = (canvas: HTMLElement, words: string[]) => {
  console.log("ParticleGenerator");

  // functions
  const onWindowResize = () => {
    // set canvas size to window size
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    // move camera further away the smaller the screen gets
    setCameraZed();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  };

  const generatePositions = (shapes: Shape[]) => {
    let holeShapes: any[] = [];

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

    let positions: any[] = [];

    for (let x = 0; x < shapes.length; x++) {
      let shape = shapes[x];

      const amountPoints = shape.type == "Path" ? pAmount / 2 : pAmount;

      let points = shape.getSpacedPoints(amountPoints);

      points.forEach((element: any, z: any) => {
        positions.push(element.x + xMid, element.y + yMid, 0);
      });
    }

    return positions;
  };

  const randomSpherePoint = (x0: number, y0: number, z0: number, radius: number) => {
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
  };

  const lerpParticles = (particles: any, particlesCopy: any, area: number, ease: number) => {
    let newParticles: any[] = [];
    let lerped = true;
    for (var i = 0; i < particles.length; i += 3) {
      let initX = particlesCopy[i];
      let initY = particlesCopy[i + 1];
      let initZ = particlesCopy[i + 2];

      let px = particles[i];
      let py = particles[i + 1];
      let pz = particles[i + 2];

      px += (initX - px) * ease;
      py += (initY - py) * ease;
      pz += (initZ - pz) * ease;

      newParticles.push(px, py, pz);

      if (Math.abs(px - initX) > 0.01 || Math.abs(py - initY) > 0.01 || Math.abs(pz - initZ) > 0.01) {
        lerped = false;
      }
    }

    return { particles: newParticles, lerped: lerped };
  };

  const explodeParticles = (particles: any, particlesCopy: any, area: number, ease: number) => {
    let newParticles: any[] = [];
    for (var i = 0; i < particles.length; i += 3) {
      let initX = particlesCopy[i];
      let initY = particlesCopy[i + 1];
      let initZ = particlesCopy[i + 2];

      let st = randomSpherePoint(0, 0, 0, pRadius / 2);
      let mx = st[0];
      let my = st[1];
      let mz = st[2];
      let px = particles[i];
      let py = particles[i + 1];
      let pz = particles[i + 2];

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
      const f = -area / d;
      const t = Math.atan2(dy, dx);
      px -= f * Math.cos(t);
      py -= f * Math.sin(t);

      px += (initX - px) * ease;
      py += (initY - py) * ease;
      pz += (initZ - pz) * ease;

      newParticles.push(px, py, pz);
    }

    return newParticles;
  };

  const setCameraZed = () => {
    // responsive camera z
    camera.position.z = window.innerWidth > 1200 ? 100 : 100 * (1200 / window.innerWidth);
    console.log("Inner width:" + window.innerWidth);
  };

  window.addEventListener("resize", onWindowResize);

  // global settings
  const fps = 45;
  const font = new FontLoader().parse(Jetbrains);
  const particleImage = new TextureLoader().load("/star.png");

  // particle settings
  var shapeGeometry: ShapeGeometry = new ShapeGeometry();
  const pAmount = 500;
  const pSize = 1;
  const pScale = window.innerHeight / 2;
  const pColor = new Color(0xffffff);
  const pTextSize = 12;
  const pArea = 2000;
  const pAnimationEase = 0.25;
  const pRadius = 300;
  var xMid = 0;
  var yMid = 0;

  const scene = new Scene();
  const camera = new PerspectiveCamera(65, canvas.clientWidth / canvas.clientHeight, 1, 10000);
  const renderer = new WebGLRenderer({ alpha: true, canvas: canvas as HTMLCanvasElement });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = sRGBEncoding;
  camera.position.set(0, 5, 0);
  setCameraZed();

  // geo settings
  const geometry = new BufferGeometry();
  const material = new ShaderMaterial({
    uniforms: {
      pointTexture: { value: particleImage },
      color: { value: pColor },
      size: { value: pSize },
      scale: { value: pScale },
    },
    vertexShader: `
    uniform float size;
    uniform float scale;

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_PointSize = size * ( scale / length( mvPosition.xyz ) );
      gl_Position = projectionMatrix * mvPosition;
    }
    `,
    fragmentShader: `
    uniform vec3 color;
    uniform sampler2D pointTexture;
    varying vec3 vColor;
    void main() {
      gl_FragColor = vec4( color, 1.0 );
      gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
    }
    `,
    blending: AdditiveBlending,
    depthTest: false,
    transparent: true,
  });

  console.log(words);

  // create positions for each word
  const shapePositions: any[] = [];
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const wordShape = font.generateShapes(word, pTextSize);

    shapeGeometry = new ShapeGeometry(wordShape);
    shapeGeometry.computeBoundingBox();
    xMid = -0.5 * ((shapeGeometry.boundingBox as Box3).max.x - (shapeGeometry.boundingBox as Box3).min.x);
    yMid = ((shapeGeometry.boundingBox as Box3).max.y - (shapeGeometry.boundingBox as Box3).min.y) / 2.85;
    shapeGeometry.center();

    const positions = generatePositions(font.generateShapes(word, pTextSize));

    shapePositions.push(positions);
  }

  // get largest word
  let largestWord = shapePositions[0];
  for (let i = 1; i < shapePositions.length; i++) {
    if (shapePositions[i].length > largestWord.length) {
      largestWord = shapePositions[i];
    }
  }

  // go through each word, and add positions to everything but the largest word
  for (let i = 0; i < shapePositions.length; i++) {
    if (shapePositions[i].length < largestWord.length) {
      for (let j = shapePositions[i].length; j < largestWord.length; j++) {
        let sp = randomSpherePoint(0, 0, 0, pRadius);
        shapePositions[i].push(sp[0], sp[1], sp[2]);
      }
    }
  }

  // set an initial position to something crazy
  let initialPositions: any[] = [];
  let particleSpeeds: any[] = [];
  for (let i = 0; i < largestWord.length; i++) {
    let sp = randomSpherePoint(0, 0, 0, pRadius);
    initialPositions.push(sp[0], sp[1], sp[2]);

    // set particle speeds
    particleSpeeds.push(Math.random() * 50 + 50, Math.random() * 50 + 50, Math.random() * 50 + 50);
  }

  geometry.setAttribute("position", new Float32BufferAttribute(initialPositions, 3));

  scene.add(new Points(geometry, material));

  // render loop at fps
  let currParticles = initialPositions;
  let currIndex = -1;
  let now = Date.now();
  let then = Date.now();
  const interval = 1000 / fps;
  const explodeTimeout = 200;
  const swapTextTimeout = 2000;
  let explodeThen = Date.now();
  let swapTextThen = Date.now();
  let startExplode = false;
  let restore = true;
  let explode = false;
  const render = () => {
    requestAnimationFrame(render);

    now = Date.now();
    const delta = now - then;

    if (delta > interval) {
      then = now - (delta % interval);
      renderer.render(scene, camera);

      if (startExplode && !explode) {
        explodeThen = Date.now();
        startExplode = false;
        explode = true;
      }

      const exDelta = now - explodeThen;

      if (exDelta > explodeTimeout && explodeThen > 0) {
        explodeThen = -1;
        explode = false;
        restore = true;
      }

      const swDelta = now - swapTextThen;

      if (swDelta > swapTextTimeout && swapTextThen > 0) {
        swapTextThen = -1;
        startExplode = true;
        currIndex++;

        if (currIndex >= shapePositions.length) {
          currIndex = 0;
        }
      }

      if (restore) {
        console.log("restoring");
        const lerp = lerpParticles(currParticles, shapePositions[currIndex], pArea, pAnimationEase);
        currParticles = lerp.particles;
        restore = !lerp.lerped;

        geometry.setAttribute("position", new Float32BufferAttribute(currParticles, 3));

        if (!restore) {
          swapTextThen = Date.now();
        }
      }

      if (explode) {
        console.log("exploding");
        currParticles = explodeParticles(currParticles, shapePositions[currIndex], pArea, pAnimationEase);

        geometry.setAttribute("position", new Float32BufferAttribute(currParticles, 3));
      }
    }
  };

  render();
};

export default particleGenerator;
