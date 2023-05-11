import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

class Particle {
  constructor(options = {}) {
    const { x = 0, y = 0, color = "#fff", radius = 5 } = options;
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Star {
  constructor() {
    this.startPosition = { x: 0, y: 0, z: 0 };
    this.endPosition = { x: 0, y: 0, z: 0 };
    this.position = { x: 0, y: 0, z: 0 };
    this.velocity = { x: 0, y: 0, z: 0 };
    this.speed = Math.random() * 1 + 1;
    this.radius = Math.random() * 0.2 + 0.1;
    this.clock = new THREE.Clock();
    this.explode = true;
    this.exploding = true;
    this.gravitySource = null;
    this.fallingToSource = false;
    this.fallVelocity = new THREE.Vector3();
    this.sparkling = false;
    this.bounce = false;
    this.trajectory = [];
    this.trajectoryIndex = 0;
    this.btVector3 = new Ammo.btVector3();
    this.scene = null;
    this.rigidBody = null;
    this.colGroup = colGroupStar;
    this.colAgainst = colGroupText;

    let startSphereRadius = 0.1;
    let endSphereRadius = Math.random() * 75 + 50;

    this.startLocation = this.randomSpherePoint(0, 0, 0, startSphereRadius);
    this.endLocation = this.randomSpherePoint(0, 0, 0, endSphereRadius);
    this.endLocation[2] = Math.abs(this.endLocation[2]) * -1;

    let startPos = new THREE.Vector3(this.startLocation[0], this.startLocation[1], this.startLocation[2]);
    let endPos = new THREE.Vector3(this.endLocation[0], this.endLocation[1], this.endLocation[2]);
    let dir = endPos.sub(startPos);
    this.velocity = new Ammo.btVector3(dir.x * this.speed, dir.y * this.speed, dir.z * this.speed);

    //simulate 3 seconds of velocity
    this.position.x = this.startLocation[0] + this.velocity.x() * 4;
    this.position.y = this.startLocation[1] + this.velocity.y() * 4;
    this.position.z = this.startLocation[2] + this.velocity.z() * 4;

    let newSpeed = 1 / (this.speed * 400) + this.radius / 20;
    this.velocity = new Ammo.btVector3(this.velocity.x() * newSpeed, this.velocity.y() * newSpeed, this.velocity.z() * newSpeed);

    const geo = new THREE.SphereGeometry(this.radius, 32, 32);
    const red = 200 + Math.round(Math.random() * 50);
    const green = 255 - Math.round(Math.random() * 55);
    const blue = 200 + Math.round(Math.random() * 50);

    this.emissive1 = Math.random() * 2 + 0.2;
    this.emissive2 = this.emissive1 + Math.random() * 0.2 + 0.1;
    this.emissive1 = 1.0;

    const material = new THREE.MeshStandardMaterial({ emissive: "rgb(" + red + "," + green + "," + blue + ")", emissiveIntensity: this.emissive1 });
    const sphere = new THREE.Mesh(geo, material);

    sphere.position.x = this.position.x;
    sphere.position.y = this.position.y;
    sphere.position.z = this.position.z;

    this.star = sphere;
    this.time = 0;
    this.scene = this.star;

    //ammo
    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(this.position.x, this.position.y, this.position.z));
    transform.setRotation(new Ammo.btQuaternion(0, 0, 0, 1));
    let motionState = new Ammo.btDefaultMotionState(transform);

    let colShape = new Ammo.btSphereShape(this.radius);
    colShape.setMargin(0.05);

    let localInertia = new Ammo.btVector3(0, 0, 0);
    colShape.calculateLocalInertia(1, localInertia);

    let rbInfo = new Ammo.btRigidBodyConstructionInfo(1, motionState, colShape, localInertia);
    let body = new Ammo.btRigidBody(rbInfo);

    body.setLinearVelocity(this.velocity);

    this.star.userData.physicsBody = body;
    this.rigidBody = body;
  }

  setExplode(explode) {
    this.explode = explode;
  }

  setGSource(gSource) {
    // console.log(gSource);
    this.gravitySource = gSource;
  }

  addToTrajectory(position) {
    this.trajectory.push(position);
  }

  setPosition(x, y, z) {
    this.star.position.x = x;
    this.star.position.y = y;
    this.star.position.z = z;
  }

  add(scene) {
    scene.add(this.star);
  }

  update() {
    //set position
    this.position.x = this.star.position.x;
    this.position.y = this.star.position.y;
    this.position.z = this.star.position.z;

    if (Math.floor(this.clock.getElapsedTime()) % 2 == 0 && Math.floor(this.clock.getElapsedTime()) > 0 && this.exploding) {
      //every second half the speed
      // let vel = this.star.userData.physicsBody.getLinearVelocity();
      // let newSpeed = (1 / (this.speed * 400)) + (this.radius / 20);
      // this.star.userData.physicsBody.setLinearVelocity(new Ammo.btVector3(vel.x() * newSpeed, vel.y() * newSpeed, vel.z() * newSpeed));
      this.exploding = false;
    }

    if (this.exploding) {
      return;
    }

    // if (Math.round(this.clock.getElapsedTime()) % 15 == 0 && this.sparkling && !this.bounce) {
    //     this.bounce = true;
    // }

    // if (Math.round(this.clock.getElapsedTime()) % 10 == 0 && this.sparkling && this.bounce) {
    //     let vel = this.star.userData.physicsBody.getLinearVelocity();
    //     this.star.userData.physicsBody.setLinearVelocity(new Ammo.btVector3(vel.x() * -1, vel.y() * -1, vel.z() * -1));
    //     this.bounce = false;
    // }

    if (this.trajectory.length > 1 && !this.gravitySource && this.trajectoryIndex <= this.trajectory.length) {
      this.gravitySource = this.trajectory[this.trajectoryIndex];
      this.trajectoryIndex++;
    }

    if (this.trajectoryIndex >= this.trajectory.length && this.trajectory.length > 1) {
      this.trajectoryIndex = 0;
    }

    //Apply force towards planet
    //get source of gravity
    //get nearest position
    if (!this.gravitySource) {
      return;
    }

    //get distance from this rigid to source of gravity
    let vec = new THREE.Vector3();
    let starPos = this.star.getWorldPosition(vec);
    // let starPos = this.star.position;
    let dist = this.gravitySource.distanceTo(starPos);

    if (dist > 300) {
      this.gravitySource = null;
      this.trajectory = [];
      return;
    }

    if (dist < 0.2) {
      // if (!this.sparkling) {
      //     this.star.userData.physicsBody.setLinearVelocity(new Ammo.btVector3(0, 0, -0.8));
      //     this.sparkling = true;
      // }

      // this.star.userData.physicsBody.setLinearVelocity(new Ammo.btVector3(0, 0, 0));
      this.gravitySource = null;
      return;
    }

    let fallVelocity = this.getFallVelocity();
    let speed = 2;
    this.btVector3.setX(fallVelocity.x * speed);
    this.btVector3.setY(fallVelocity.y * speed);
    this.btVector3.setZ(fallVelocity.z * speed);
    this.star.userData.physicsBody.setLinearVelocity(this.btVector3);
  }

  updatePhysics(tmpTrans) {
    //update rigids
    let objAmmo = this.rigidBody;
    let ms = objAmmo.getMotionState();

    if (!ms) {
      return;
    }

    ms.getWorldTransform(tmpTrans);
    let p = tmpTrans.getOrigin();
    let q = tmpTrans.getRotation();
    this.star.position.set(p.x(), p.y(), p.z());
    this.star.quaternion.set(q.x(), q.y(), q.z(), q.w());
  }

  getFallVelocity() {
    let vec = new THREE.Vector3();
    let starPos = this.star.getWorldPosition(vec);
    return new THREE.Vector3(this.gravitySource.x, this.gravitySource.y, this.gravitySource.z).sub(starPos);
  }

  randomSpherePoint(x0, y0, z0, radius) {
    var u = Math.random();
    var v = Math.random();
    var theta = 2 * Math.PI * u;
    var phi = Math.acos(2 * v - 1);
    var x = x0 + radius * Math.sin(phi) * Math.cos(theta);
    var y = y0 + radius * Math.sin(phi) * Math.sin(theta);
    var z = z0 + radius * Math.cos(phi);
    return [x, y, z];
  }
}

class World {
  constructor() {
    this.container = document.querySelector("#canvas");
    this.scene = new THREE.Scene();
    this.physics = null;
    this.tempTrans = new Ammo.btTransform();
    this.worldObjects = [];
    this.clock = new THREE.Clock();

    this.setup();
    this.setupPhysics();
    console.log(this.container);
  }

  setup() {
    this.camera = new THREE.PerspectiveCamera(50, this.container.clientWidth / this.container.clientHeight, 0.1, 5000);
    this.camera.position.set(0, 0, 50);

    this.setupLights();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.container,
      alpha: true,
    });

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setAnimationLoop(() => {
      this.render();
    });

    // const controls = new OrbitControls(this.camera, this.renderer.domElement);

    window.addEventListener("resize", this.onWindowResize.bind(this));
  }

  setupPhysics() {
    let colConfig = new Ammo.btDefaultCollisionConfiguration();
    let dispatcher = new Ammo.btCollisionDispatcher(colConfig);
    let overlappingPairCache = new Ammo.btDbvtBroadphase();
    let solver = new Ammo.btSequentialImpulseConstraintSolver();

    this.physics = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, colConfig);
    this.physics.setGravity(new Ammo.btVector3(0, 0, 0));
  }

  setupLights() {
    //light
    let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.1);
    hemiLight.color.setHSL(0.6, 0.6, 0.6);
    hemiLight.groundColor.setHSL(0.1, 1, 0.4);
    hemiLight.position.set(0, 50, 0);
    this.scene.add(hemiLight);

    //dir light
    let dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(-1, 1.75, 1);
    dirLight.position.multiplyScalar(100);
    this.scene.add(dirLight);

    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;

    let d = 50;

    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    dirLight.shadow.camera.far = 13500;
  }

  addToWorld(object) {
    this.scene.add(object.scene);
    this.worldObjects.push(object);

    if (object.rigidBody !== null) {
      this.physics.addRigidBody(object.rigidBody, object.colGroup, object.colAgainst);
    }
  }

  render() {
    this.worldObjects.forEach((wObject) => {
      wObject.update();
    });

    this.update();

    this.renderer.render(this.scene, this.camera);
  }

  update() {
    let deltaTime = this.clock.getDelta();
    this.physics.stepSimulation(deltaTime, 10);

    this.worldObjects.forEach((rigid) => {
      if (typeof rigid.rigidBody === "undefined") {
        return;
      }

      rigid.updatePhysics(this.tempTrans);
    });
  }

  onWindowResize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }
}

class argText {
  constructor(text, size) {
    this.text = text;
    this.pos = { x: -10, y: -5, z: -50 };
    this.size = size;
    this.scene = null;
    this.particles;
    this.geoCopy;

    const manager = new THREE.LoadingManager();
    const loader = new FontLoader(manager);
    const particle = new THREE.TextureLoader(manager).load("/public/particle.png");

    let fontType = null;
    const font = loader.load("/public/audiowide.json", function (font) {
      fontType = font;
    });

    let self = this;

    manager.onLoad = function () {
      //create text from points
      let thePoints = [];
      let shapes = fontType.generateShapes(self.text, self.size);
      let geometry = new THREE.ShapeGeometry(shapes);

      geometry.computeBoundingBox();
      geometry.center();

      const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
      const yMid = (geometry.boundingBox.max.y - geometry.boundingBox.min.y) / 2.85;

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

      let color = new THREE.Color();
      for (let i = 0; i < shapes.length; i++) {
        let shape = shapes[i];
        let numPoints = 10 * shape.getLength();
        let points = shape.getSpacedPoints(shape.type === "Path" ? numPoints / 2 : numPoints);

        for (let q = 0; q < points.length; q += 2) {
          let point = points[q];
          const vec = new THREE.Vector3(point.x, point.y, 0);
          thePoints.push(vec);
          colors.push(color.r, color.g, color.b);
          sizes.push(1);
        }
      }

      let gParticles = new THREE.BufferGeometry().setFromPoints(thePoints);
      gParticles.translate(xMid, yMid, self.pos.z);
      gParticles.setAttribute("customColor", new THREE.Float32BufferAttribute(colors, 3));
      gParticles.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(0xffffff) },
          pointTexture: { value: particle },
        },
        vertexShader: document.getElementById("vertexshader").textContent,
        fragmentShader: document.getElementById("fragmentshader").textContent,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
      });

      this.particles = new THREE.Points(gParticles, material);
      self.scene = this.particles;

      this.geoCopy = new THREE.BufferGeometry();
      this.geoCopy.copy(this.particles.geometry);

      worldInterface(self);
    };
  }

  update() {}
}

let wPhysics;
let scene;
let stars = [];
let rigidBodies = [];
let sa = "Systems Architect";
let world;
Ammo().then(start);

let colGroupText = 1;
let colGroupStar = 2;

let worldInterface = (object) => {
    this.world.addToWorld(object);
}

let start = () => {
  console.log("Ammo Started");

  world = new World();
  let jsText = new argText("argSea", 6)

  for (var i = 0; i < 2000; i++) {
    const star = new Star();
    world.addToWorld(star);
  }
};

function createJS() {
  gltf = 0;

  const pos = { x: -0, y: 15, z: -200 };
  const quat = { x: 0, y: 0, z: 0, w: 1 };
  const scale = { x: 50, y: 50, z: 50 };
  const mass = 0;

  let loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/node_modules/three/examples/js/libs/draco");
  loader.setDRACOLoader(dracoLoader);
  loader.load("/template/js2.gltf", (gltf) => {
    const logo = gltf.scene.children[0];
    logo.position.set(pos.x, pos.y, pos.z);
    logo.scale.set(scale.x, scale.y, scale.z);
    logo.visible = false;
    // let uniforms = {
    //     offset: {type: "f", value: 1}
    // };
    // logo.material = new THREE.ShaderMaterial({
    //     uniforms: uniforms,
    //     vertexShader:  outline_shader.vertex_shader,
    //     fragmentShader: outline_shader.fragment_shader
    // });
    logo.updateMatrixWorld(true);
    logo.lookAt(new THREE.Vector3(0, 0, 0));
    // camera.lookAt(logo.localToWorld(logo.position));
    console.log(logo.localToWorld(logo.position));
    scene.add(logo);

    //physics
    // let transform = new Ammo.btTransform();
    // transform.setIdentity();
    // transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
    // transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));

    // let motionState = new Ammo.btDefaultMotionState(transform);
    // let localInertia = new Ammo.btVector3(0, 0, 0);

    // let shape = createTriangleShapeByGeometry(logo.geometry);
    // logo.geometry.verticesNeedUpdate = true;
    // shape.setMargin(0.05);

    // shape.calculateLocalInertia(mass, localInertia);

    // let rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia);
    // let body = new Ammo.btRigidBody(rbInfo);

    // wPhysics.addRigidBody(body, colGroupText, colGroupStar);

    // logo.userData.physicsBody = body;

    // planet = logo;

    // rigidBodies.push(logo);

    gltf = logo;

    let positions = logo.geometry.getAttribute("position").array;
    let points = [];
    let pLength = 0;
    for (let i = 0; i < positions.length; i += 3) {
      let x = positions[i];
      let y = positions[i + 1];
      let z = positions[i + 2];

      let worldPoint = logo.localToWorld(new THREE.Vector3(x, y, z));
      points.push(worldPoint);

      stars.forEach((star) => {
        star.addToTrajectory(worldPoint);
      });

      pLength++;
    }

    stars.forEach((star) => {
      star.trajectoryIndex = Math.round(Math.random() * pLength);
    });

    // for (let i = 1; i < stars.length; i++) {
    //     //every 5th star
    //     //get random number
    //     let rand = Math.round(Math.random() * 6);
    //     if (true) {//rand % 3 === 0) {
    //         stars[i].setGSource(points[Math.round(Math.random() * points.length)]);
    //     }
    // }
  });
}

function createSA() {
  const pos = { x: -68, y: 0, z: -200 };

  const loader = new FontLoader();
  loader.load("/public/audiowide.json", function (font) {
    const fontGeo = new TextGeometry(sa, {
      font: font,
      size: 10,
      height: 1,
      curveSegments: 2,
      bevelEnabled: false,
      bevelThickness: 10,
      bevelSize: 8,
      bevelOffset: 0,
      bevelSegments: 5,
    });

    const fontMat = new THREE.MeshStandardMaterial({ emissive: 0xffffff, transparent: true, opacity: 0.6 });
    // let uniforms = {
    //     offset: {type: "f", value: 2}
    // };
    // const fontMat = new THREE.ShaderMaterial({
    //     uniforms: uniforms,
    //     vertexShader:  outline_shader.vertex_shader,
    //     fragmentShader: outline_shader.fragment_shader
    // });
    const fontMesh = new THREE.Mesh(fontGeo, fontMat);
    // fontMesh.position.z = -50;
    // fontMesh.position.x -= 10;
    // fontMesh.position.y -= 5;
    fontMesh.position.set(pos.x, pos.y, pos.z);

    scene.add(fontMesh);
  });
}

function createBlock() {
  //init
  let pos = { x: 0, y: -15, z: 0 };
  let scale = { x: 50, y: 2, z: 50 };
  let quat = { x: 0, y: 0, z: 0, w: 1 };
  let mass = 0;

  //three
  let blockPlane = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshPhongMaterial({ color: 0xa0afa4 }));

  blockPlane.position.set(pos.x, pos.y, pos.z);
  blockPlane.scale.set(scale.x, scale.y, scale.z);

  blockPlane.castShadow = true;
  blockPlane.receiveShadow = true;

  scene.add(blockPlane);

  //ammo
  let transform = new Ammo.btTransform();
  transform.setIdentity();
  transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
  transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.x, quat.w));

  let motionState = new Ammo.btDefaultMotionState(transform);
  let colShape = new Ammo.btBoxShape(new Ammo.btVector3(scale.x * 0.5, scale.y * 0.5, scale.z * 0.5));
  colShape.setMargin(0.05);

  let localInertia = new Ammo.btVector3(0, 0, 0);
  colShape.calculateLocalInertia(mass, localInertia);

  let rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, colShape, localInertia);
  let body = new Ammo.btRigidBody(rbInfo);

  wPhysics.addRigidBody(body, colGroupStar, colGroupText);
  blockPlane.userData.physicsBody = body;

  rigidBodies.push(blockPlane);
}

function createBall() {
  const pos = { x: -10, y: -5, z: -0 };
  let radius = 2;
  let quat = { x: 0, y: 0, z: 0, w: 1 };
  let mass = 0;

  //three
  let ball = new THREE.Mesh(new THREE.SphereBufferGeometry(radius), new THREE.MeshPhongMaterial({ color: 0xff0505 }));

  ball.position.set(pos.x, pos.y, pos.z);
  // ball.castShadow = true;
  // ball.receiveShadow = true;
  ball.visible = true;

  scene.add(ball);

  //ammo
  let transform = new Ammo.btTransform();
  transform.setIdentity();
  transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
  transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
  let motionState = new Ammo.btDefaultMotionState(transform);

  let colShape = new Ammo.btSphereShape(radius);
  colShape.setMargin(0.05);

  let localInertia = new Ammo.btVector3(0, 0, 0);
  colShape.calculateLocalInertia(mass, localInertia);

  let rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, colShape, localInertia);
  let body = new Ammo.btRigidBody(rbInfo);

  wPhysics.addRigidBody(body, colGroupText, colGroupStar);

  ball.userData.physicsBody = body;
  // rigidBodies.push(ball);

  planet = ball;
}

function createMaskBall() {
  let pos = { x: 1, y: 0, z: 0 };
  let radius = 2;
  let quat = { x: 0, y: 0, z: 0, w: 1 };
  let mass = 1;

  //three
  let ball = new THREE.Mesh(new THREE.SphereBufferGeometry(radius), new THREE.MeshPhongMaterial({ color: 0x00ff08 }));

  ball.position.set(pos.x, pos.y, pos.z);
  ball.castShadow = true;
  ball.receiveShadow = true;

  scene.add(ball);

  //ammo
  let transform = new Ammo.btTransform();
  transform.setIdentity();
  transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
  transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
  let motionState = new Ammo.btDefaultMotionState(transform);

  let colShape = new Ammo.btSphereShape(radius);
  colShape.setMargin(0.05);

  let localInertia = new Ammo.btVector3(0, 0, 0);
  colShape.calculateLocalInertia(mass, localInertia);

  let rbInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, colShape, localInertia);
  let body = new Ammo.btRigidBody(rbInfo);

  wPhysics.addRigidBody(body, colGroupStar, colGroupText);

  ball.userData.physicsBody = body;
  rigidBodies.push(ball);
}

function createTriangleShapeByGeometry(geometry) {
  let mesh = new Ammo.btTriangleMesh();
  let positions = geometry.getAttribute("position").array;
  let triangles = [];

  for (let i = 0; i < positions.length; i += 3) {
    triangles.push({
      x: positions[i],
      y: positions[i + 1],
      z: positions[i + 2],
    });
  }

  let vecA = new Ammo.btVector3(0, 0, 0);
  let vecB = new Ammo.btVector3(0, 0, 0);
  let vecC = new Ammo.btVector3(0, 0, 0);

  for (let i = 0; i < triangles.length - 3; i += 3) {
    vecA.setX(triangles[i].x);
    vecA.setY(triangles[i].y);
    vecA.setZ(triangles[i].z);

    vecB.setX(triangles[i + 1].x);
    vecB.setY(triangles[i + 1].y);
    vecB.setZ(triangles[i + 1].z);

    vecC.setX(triangles[i + 2].x);
    vecC.setY(triangles[i + 2].y);
    vecC.setZ(triangles[i + 2].z);

    mesh.addTriangle(vecA, vecB, vecC, true);
  }

  Ammo.destroy(vecA);
  Ammo.destroy(vecB);
  Ammo.destroy(vecC);

  const shape = new Ammo.btConvexTriangleMeshShape(mesh, true);

  return shape;
}