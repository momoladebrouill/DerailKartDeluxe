import * as THREE from "https://cdn.skypack.dev/three@0.136.0";

// roues de la voiture
function createWheels() {
  const geometry = new THREE.BoxBufferGeometry(12, 12, 33);
  const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
  const wheel = new THREE.Mesh(geometry, material);
  return wheel;
}

function createLight(isBack,color, radius) {
	const group = new THREE.Group(); 
	const light = new THREE.PointLight(color, 1.0, radius);
	group.add(light)


	const geometry = new THREE.SphereGeometry(2.5, 32, 32);
	const material = new THREE.MeshBasicMaterial({ color: color});
	const sphere = new THREE.Mesh(geometry, material);
	group.add(sphere);

	const doublegroup = new THREE.Group()

	const droite = group.clone()
	droite.position.z = -10
	doublegroup.add(droite)
	group.position.z = 10
	doublegroup.add(group)

	return doublegroup;
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


	//is back ? ; color ; radius of light
	const backLight = createLight(true,0xff0000,0.2)
  backLight.position.y  = 15
	backLight.position.x = -30
	car.add(backLight)

	const frontLight = createLight(false,0xffffff,15.0)
  frontLight.position.y  = 15
	frontLight.position.x = 30
	car.add(frontLight)

	const upLight = createLight(false,0xff7f00,1.0)
	upLight.position.y = 31
	car.add(upLight)

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

let coronaSafetyDistance = 2.0;
let DEGTORAD = 0.01745327;

export default class Car {
  constructor(scene) {
    this.group = createCar();
		this.velocity = 0.0;
    this.direction = 0;
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
		if ( keys.w ) this.velocity += 0.01;
		else if ( keys.s ) this.velocity -= 0.01;

    this.direction = 0;
    if ( keys.a ) this.direction += 1;
    else if ( keys.d ) this.direction += -1;

    this.velocity *= 0.9;

		// ROUES
		// on accelere les roues selon l'orientation du véhicule
		let vitessepente = -mesh.rotation.y / 10
    this.group.children[0].children[0].rotation.z -= this.velocity + vitessepente;
    this.group.children[0].children[1].rotation.z -= this.velocity + vitessepente;
    let v = this.group.children[0].children[1].rotation.y;
    this.group.children[0].children[1].rotation.y = - ( v - this.direction )/2;

	  mesh.rotateY(this.direction * this.velocity * 0.6);
		mesh.translateZ( this.velocity );

		this.a.lerp(mesh.position, 0.5);
		this.b.copy(goal.position);

		this.dir.copy( this.a ).sub( this.b ).normalize();
		const dis = this.a.distanceTo( this.b ) - coronaSafetyDistance;
		goal.position.addScaledVector( this.dir, dis );
		goal.position.lerp(this.temp, 0.2);
		this.temp.setFromMatrixPosition(follow.matrixWorld);
		mesh.position.x = 0.0
		mesh.position.y = 0.0

		camera.lookAt( mesh.position );
		camera.position.z -= (camera.position.z - mesh.position.z)/2
		// renvoie la vitesse en vertical de la voiture
		return mesh.rotation.y + 0.5 * ( (keys.w ? -1.0 : 0.0) + (keys.s ? 1.0 : 0.0) )
  }
}
