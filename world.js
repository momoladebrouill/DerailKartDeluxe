import * as THREE from "https://cdn.skypack.dev/three@0.136.0";

function createFloor(color) {
	const geometry = new THREE.PlaneGeometry( 5, 100 );
	const material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide} );
	const plane = new THREE.Mesh( geometry, material );
	return plane;
}

export default class World {
	constructor(scene) {
		this.group = new THREE.Group()

		let bas = createFloor(0x660099);
		bas.rotateY(-Math.PI/2.0)
		bas.rotateX(-Math.PI/4.0)
		this.group.add(bas)

		let gauche = createFloor(0xff0000);
		this.group.add(gauche)
		scene.add(this.group);
	}
}

