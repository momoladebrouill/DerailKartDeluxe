import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import Car from "./car.js"
import World from "./world.js"
var camera, scene, renderer, mesh, goal, keys, follow;

var time = 0;
var newPosition = new THREE.Vector3();
var matrix = new THREE.Matrix4();

let car;
let world;
init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 50 );
    camera.position.set( 0, 2.0, 0 );
    
    scene = new THREE.Scene();
    camera.lookAt( scene.position );

		const light = new THREE.AmbientLight(0xffffff,1.0);
		//scene.add(light)

		car = new Car(scene);
		world = new World(scene);
    goal = new THREE.Object3D;
    follow = new THREE.Object3D;
    follow.position.z = -0.6;
    car.group.add( follow );
    
    goal.add( camera );
 

    
    var gridHelper = new THREE.GridHelper( 40, 40 );
   // scene.add( gridHelper );
    
    //scene.add( new THREE.AxesHelper() );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
  
keys = {
    a: false,
    s: false,
    d: false,
    w: false
  };
  
  document.body.addEventListener( 'keydown', function(e) {
    
    const key = e.code.replace('Key', '').toLowerCase();
    if ( keys[ key ] !== undefined )
      keys[ key ] = true;
    
  });
  document.body.addEventListener( 'keyup', function(e) {
    
    const key = e.code.replace('Key', '').toLowerCase();
    if ( keys[ key ] !== undefined )
      keys[ key ] = false;
    
  });

}



function animate() {
    requestAnimationFrame( animate );
		const speed = car.update(keys,camera,goal,follow)
		world.update(speed)
    renderer.render( scene, camera );
}
