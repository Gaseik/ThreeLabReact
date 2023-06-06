import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { TransformControls } from "three/addons/controls/TransformControls.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { EXRLoader } from "three/addons/loaders/EXRLoader.js";

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(500, 500);
const camera = new THREE.PerspectiveCamera(75, 500 / 500, 0.1, 10000);
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();
orbit.addEventListener("change", render);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

const control = new TransformControls(camera, renderer.domElement);
control.addEventListener("change", renders);

control.addEventListener("dragging-changed", function (event) {
  orbit.enabled = !event.value;
});
control.attach(cube)
scene.add(control)


const loader = new GLTFLoader();
const animationActions: THREE.AnimationAction[] = [];

let mixer: THREE.AnimationMixer;
let modelReady = false;
const clock = new THREE.Clock();








export function modelLoader(model: boolean) {
  scene.remove.apply(scene, scene.children);
  scene.add(hemiLight);
  if (model) {
    scene.add(cube);
    scene.add(control);
    control.attach(cube)
  } else {
    loader.load(
      "/an_animated_cat.glb",
      function (gltf) {
        gltf.scene.scale.set(0.1, 0.1, 0.1);

        scene.add(gltf.scene);
        scene.add(control);
        control.attach(gltf.scene)
        const animations = gltf.animations;

        mixer = new THREE.AnimationMixer(gltf.scene);
        const animationAction = mixer.clipAction(animations[0]);
        animationActions.push(animationAction);
        animationAction.play();
        modelReady = true;
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
  }
}

function renders() {

  renderer.render(scene, camera);
}

export function render(div: HTMLElement) {
  div.appendChild(renderer.domElement);

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x = 0.01;
    cube.rotation.y = 0.01;
    if (modelReady) mixer.update(clock.getDelta());
   
    renders();
  }
  if (WebGL.isWebGLAvailable()) {
    // Initiate function or other initializations here
    animate();
  } else {
    const warning = WebGL.getWebGLErrorMessage();
    div.appendChild(warning);
  }
}

export function changeColor() {
  let i = Math.floor(Math.random() * 5);
  switch (i) {
    case 0:
      cube.material.color.setHex(0xffffff);
      break;
    case 1:
      cube.material.color.setHex(0xfb4807);
      break;
    case 2:
      cube.material.color.setHex(0xa259ff);
      break;
    case 3:
      cube.material.color.setHex(0xd7137f);
      break;
    case 4:
      cube.material.color.setHex(0x13d761);
      break;
    default:
      cube.material.color.setHex(0xf22fff);
  }
}

let mesh = new THREE.Mesh();
let num = 0;
new THREE.TextureLoader().load("/textureimage.jpg", function (texture) {
  let materialNew = new THREE.MeshBasicMaterial({ map: texture });

  mesh = new THREE.Mesh(geometry, materialNew);
});

export function changeTexture() {
  console.log(num);
  if (num % 2 === 0) {
    scene.add(mesh);
    scene.remove(cube);
    control.attach( mesh );
  } else {
    scene.remove(mesh);
    scene.add(cube);
    control.attach( cube );
  }
  num = num + 1;
}

let exrCubeRenderTarget;
let exrBackground;
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();
THREE.DefaultLoadingManager.onLoad = function () {
  pmremGenerator.dispose();
};

export function addEnvirment() {
  new EXRLoader().load("/memorial.exr", function (texture, textureData) {
    texture.mapping = THREE.EquirectangularReflectionMapping;

    exrCubeRenderTarget = pmremGenerator.fromEquirectangular(texture);
    exrBackground = texture;

    scene.background = exrBackground;

    renders();
  });
}

export function controlMode (mode:TransformControls.controlMode) {
    control.setMode(mode)
}