import * as THREE from "https://cdn.skypack.dev/three@0.136.0";


// les élèments globaux 
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0xffffaa);


camera.position.z = 3
camera.position.y = 5
camera.lookAt(0,0,0);

// ambient light
var ambientLight = new THREE.AmbientLight ( 0xffffff, 0.2)
scene.add( ambientLight )

// directional light
var directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0)
directionalLight.position.set(10, 10, 10)
scene.add( directionalLight )

document.body.appendChild(renderer.domElement);


// rotate camera with arrow keys

document.addEventListener('keydown', (e) => {
	if (e.key === 'ArrowLeft') {
		camera.position.x -= 0.1
	}
	if (e.key === 'ArrowRight') {
		camera.position.x += 0.1
	}
	if (e.key === 'ArrowUp') {
		camera.position.y += 0.1
	}
	if (e.key === 'ArrowDown') {
		camera.position.y -= 0.1
	}
})

renderer.setAnimationLoop(() => {
	cube.rotation.x += 0.02;
  cube.rotation.y += 0.015;
  renderer.render(scene, camera);
});

// basic cube
var geometry = new THREE.BoxGeometry( 1, 1, 1)
var material = new THREE.MeshStandardMaterial( { color: 0xff00000, flatShading: true, metalness: 0, roughness: 1 })
var cube = new THREE.Mesh ( geometry, material )
scene.add(cube)


const planeGeometry = new THREE.PlaneGeometry( 2, 2 );
const planeMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
scene.add( plane );

//plane.rotation.set(new THREE.Vector3( 0, 0, Math.PI / 2));


function onWindowResize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(innerWidth, innerHeight);
  labelRenderer.setSize(innerWidth, innerHeight);
}

