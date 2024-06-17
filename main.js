import * as THREE from "https://cdn.skypack.dev/three@0.136.0";

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 2000);
camera.lookAt(scene.position);
let renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0xaaffaa);
document.body.appendChild(renderer.domElement);



renderer.setAnimationLoop(() => {

  renderer.render(scene, camera);
});

function onWindowResize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(innerWidth, innerHeight);
  labelRenderer.setSize(innerWidth, innerHeight);
}

