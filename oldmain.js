import * as THREE from "https://cdn.skypack.dev/three@0.136.0";


// les élèments globaux 
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
camera.lookAt( 0,0,0);
camera.position.z = 5

// ambient light
var ambientLight = new THREE.AmbientLight ( 0xffffff, 1.0)
scene.add( ambientLight )


let renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0xaaaaaa);
document.body.appendChild(renderer.domElement);


// rotate camera with arrow keys

document.addEventListener('keydown', (e) => {
	let shift = 1.0
	if (e.key === 'ArrowLeft') {
		camera.position.x -= shift
	}
	if (e.key === 'ArrowRight') {
		camera.position.x += shift
	}
	if (e.key === 'ArrowUp') {
		camera.position.y += shift
	}
	if (e.key === 'ArrowDown') {
		camera.position.y -= shift
	}
	if (e.key === 'z') {
		camera.position.z -= shift
	}
	if (e.key === 's') {
		camera.position.z += shift
	}
})

renderer.setAnimationLoop(() => {
	cube.rotation.x += 0.04
  renderer.render(scene, camera);
});

// basic cube
var geometry = new THREE.BoxGeometry( 1, 1, 1)
var material = new THREE.MeshStandardMaterial( { color: 0xff00000, flatShading: true, metalness: 0, roughness: 1 })
var cube = new THREE.Mesh ( geometry, material )
scene.add(cube)



function onWindowResize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(innerWidth, innerHeight);
  labelRenderer.setSize(innerWidth, innerHeight);
}

