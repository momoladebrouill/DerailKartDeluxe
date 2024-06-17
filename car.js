import * as THREE from "https://cdn.skypack.dev/three@0.136.0";

// roues de la voiture
function createWheels() {
  const geometry = new THREE.BoxBufferGeometry(12, 12, 33);
  const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
  const wheel = new THREE.Mesh(geometry, material);
  return wheel;
}

// voiture en question
function createCar() {
  const car = new THREE.Group();
  
  const backWheel = createWheels();
  backWheel.position.y = 6;
  backWheel.position.x = -18;
  car.add(backWheel);
  
  const frontWheel = createWheels();
  frontWheel.position.y = 6;  
  frontWheel.position.x = 18;
  car.add(frontWheel);

  const main = new THREE.Mesh(
    new THREE.BoxBufferGeometry(60, 15, 30),
    new THREE.MeshLambertMaterial({ color: 0x78b14b })
  );
  main.position.y = 12;
  car.add(main);

  const cabin = new THREE.Mesh(
    new THREE.BoxBufferGeometry(33, 12, 24),
    new THREE.MeshLambertMaterial({ color: 0xffffff })
  );
  cabin.position.x = -6;
  cabin.position.y = 25.5;
  car.add(cabin);
	car.rotateY(-Math.PI/2)
	const car2 = new THREE.Group();
	car2.add(car)
	car2.rotateZ(Math.PI/4)
  return car2;
}

let coronaSafetyDistance = 5.0
let DEGTORAD = 0.01745327;

export default class Car {
  constructor(scene) {
    this.group = createCar();
		this.velocity = 0.0;
		this.speed = 0.0;
    this.group.position.set(0, 0, 0);
		this.stop = 1;
		this.temp = new THREE.Vector3;
		this.dir = new THREE.Vector3;
		this.a = new THREE.Vector3;
		this.b = new THREE.Vector3;

		let scalefact = 0.01
		this.group.scale.set(scalefact,scalefact,scalefact)
    scene.add(this.group);

    //les trucs des voitures et tout
    this.wheels = 4;
  }

  update(keys,camera,goal,follow){
		let mesh = this.group;
		this.speed = 0.0
		if ( keys.w )
			this.speed = 0.05;
		else if ( keys.s )
			this.speed = -0.05;

		this.velocity += ( this.speed - this.velocity ) * .3;
		mesh.translateZ( this.velocity );

		if ( keys.a )
			mesh.rotateY(0.05);
		else if ( keys.d )
			mesh.rotateY(-0.05);


		this.a.lerp(mesh.position, 0.5);
		this.b.copy(goal.position);

		this.dir.copy( this.a ).sub( this.b ).normalize();
		const dis = this.a.distanceTo( this.b ) - coronaSafetyDistance;
		goal.position.addScaledVector( this.dir, dis );
		goal.position.lerp(this.temp, 0.2);
		this.temp.setFromMatrixPosition(follow.matrixWorld);

		camera.lookAt( mesh.position );
  }
}
