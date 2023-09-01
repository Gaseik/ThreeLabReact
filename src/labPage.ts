import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

export function pageTemplate(div: HTMLElement) {
  // 創建場景
  const scene = new THREE.Scene();

  // 創建攝影機
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

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
  //   scene.add(cube);

//   const ambientLight = new THREE.AmbientLight(0x404040); // 顏色設置為灰色
//   scene.add(ambientLight);
  // 創建光源
//   const light = new THREE.PointLight(0xffffff);
//   light.position.set(0, 0, -10); // 位置在物體背後
//   scene.add(light);

  const spotLight = new THREE.SpotLight(0xffffff); // 顏色設為白色
  spotLight.position.set(0, 0, -1000); // 位置在物體背後
  spotLight.angle = Math.PI / 3; // 設置為30度，可以根據需要調整

  // 創建聚光燈的目標位置
  const targetObject = new THREE.Object3D();
  targetObject.position.set(0, 0, 0); // 這裡可以設置你希望聚光燈照射的目標位置

  // 設置聚光燈的目標
  spotLight.target = targetObject;
  scene.add(targetObject);
  scene.add(spotLight);

  loader.load(
    "/arcade.glb",
    function (gltf) {
      gltf.scene.scale.set(0.005, 0.005, 0.005);
      scene.add(gltf.scene);
      const animate = () => {
        requestAnimationFrame(animate);

        gltf.scene.rotation.y += 0.01;
        // gltf.scene.rotation.x += 0.01;
        renderer.render(scene, camera);
      };
      animate()
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
    // camera.position.x = mouseX * 6;
    camera.position.y = mouseY * 6;
    camera.lookAt(0, 0, 0);
  };

  window.addEventListener("mousemove", onMouseMove);

  // 渲染場景
  const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  };

  animate();

  // 清除滑鼠事件監聽器
  window.addEventListener("mousemove", onMouseMove);

  div.appendChild(renderer.domElement);
}
