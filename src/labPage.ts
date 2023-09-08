import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

// 創建場景
const scene = new THREE.Scene();

// 創建攝影機
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;
// camera.position.y = -0;

// 創建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

// 創建正方體
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00, // 材質顏色
  transparent: true, // 啟用透明度
  opacity: 0.5, // 設置透明度（0為完全透明，1為完全不透明）
  metalness: 0.5, // 金屬感（0為非金屬，1為完全金屬）
  roughness: 0.1, // 粗糙度（0為光滑，1為非常粗糙）
});

const cube = new THREE.Mesh(geometry, material);

const spotLight = new THREE.SpotLight(0xffffff); // 顏色設為白色
spotLight.position.set(-100, -10, 100); // 位置在物體背後
spotLight.angle = Math.PI / 3; // 設置為30度，可以根據需要調整

// 創建聚光燈的目標位置
const targetObject = new THREE.Object3D();
targetObject.position.set(0, 0, 0); // 這裡可以設置你希望聚光燈照射的目標位置

// 設置聚光燈的目標
spotLight.target = targetObject;
scene.add(targetObject);
scene.add(spotLight);

loader.load(
  "/3Dpicbot.glb",
  function (gltf) {
    gltf.scene.scale.set(0.8, 0.8, 0.8);
    scene.add(gltf.scene);
    gltf.scene.position.y = -2;
    const animate = () => {
      requestAnimationFrame(animate);
      gltf.scene.rotation.y += 0.01;
      // gltf.scene.rotation.x += 0.01;
      renderer.render(scene, camera);
    };
    animate();
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// 添加滑鼠事件監聽器
const onMouseMove = (event: MouseEvent) => {
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  camera.position.x = mouseX * 1;
  camera.position.y = mouseY * 1;
  camera.lookAt(0, 0, 0);
};

window.addEventListener("mousemove", onMouseMove);

// 創建一個粒子幾何體
const particleGeometry = new THREE.BufferGeometry();

// 創建粒子材質，這裡可以使用THREE.PointsMaterial
const particleMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.05, // 粒子大小，可以根據需要調整
  opacity: 0.5, // 不透明度，使光束看起來有一些透明感
  transparent: true, // 啟用透明度
  blending: THREE.AdditiveBlending, // 使用加法混合模式，增強光束效果
});

// 創建粒子的位置數據
const positions = [];
for (let i = 0; i < 400; i++) {
  const x = (Math.random() - 0.5) * 10;
  const y = (Math.random() - 0.5) * 10;
  const z = (Math.random() - 0.5) * 10;
  positions.push(x, y, z);
}

// 添加位置數據到幾何體中
particleGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(positions, 3)
);

// 創建粒子系統
const particleSystem = new THREE.Points(particleGeometry, particleMaterial);

// 將粒子系統添加到場景中
scene.add(particleSystem);

const targetCameraPosition = new THREE.Vector3(0,0,5); // 目標攝影機位置
const cameraTransitionDuration = 10000; // 過渡持續時間（毫秒）
let cameraTransitionStartTime = 0; // 過渡開始時間

// 更新粒子位置
function updateParticles() {
  const positions = particleGeometry.getAttribute("position");

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    let z = positions.getZ(i) + 0.01; // 在Z軸方向上移動，可以根據需要調整速度

    // 檢查是否超出範圍，如果是，重置位置
    if (z > 10) {
      z = -2; // 重置到起始位置
    }

    positions.setXYZ(i, x, y, z);
  }

  positions.needsUpdate = true;
}
interface update {
  StartTime: Date | number; 
  x: number | undefined;
  y: number | undefined;
  z: number | undefined;
}
// 在按鈕點擊時觸發平滑過渡攝影機
export function moveCam(x:number,y:number,z:number) {
  cameraTransitionStartTime = Date.now(); // 記錄過渡的起始時間
  targetCameraPosition.set(x,y,z); // 設置目標攝影機位置
}

// 在渲染循環中更新攝影機位置
function updateCameraPosition() {
  const now = Date.now();
  const deltaTime = now - cameraTransitionStartTime;

  if (deltaTime >= cameraTransitionDuration) {
    // 過渡結束，設置攝影機位置為目標位置
    camera.position.copy(targetCameraPosition);
  } else {
    // 過渡中，計算新的攝影機位置
    const progress = deltaTime / cameraTransitionDuration;
    camera.position.lerp(targetCameraPosition, progress);
  }

  camera.lookAt(0, 0, 0);
  renderer.render(scene, camera);
}

// 渲染循環
const animate = () => {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  updateParticles();
  updateCameraPosition(); // 更新攝影機位置
};

export function pageTemplate(div: HTMLElement) {
  // 渲染場景
  animate();

  // 清除滑鼠事件監聽器
  window.removeEventListener("mousemove", onMouseMove);

  div.appendChild(renderer.domElement);
}