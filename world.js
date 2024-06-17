import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import Tree from "./tree.js"

const WORLDWIDTH = 5.0
const WALLHEIGHT = 0.5

function createFloor(w,color) {
	const geometry = new THREE.PlaneGeometry(w, 100 );
	const material = new THREE.MeshBasicMaterial( {color: color, side: THREE.DoubleSide} );
	const plane = new THREE.Mesh( geometry, material );
	return plane;
}

export default class World {
	constructor(scene) {
		this.group = new THREE.Group()

		let bas = createFloor(WORLDWIDTH,0x660099);
		bas.rotateY(-Math.PI/2.0)
		bas.rotateX(-Math.PI/4.0)
		this.group.add(bas)

		let gauche = createFloor(WALLHEIGHT, 0xff0000);
		gauche.position.y = WALLHEIGHT*0.75 -0.1
		gauche.position.z = WORLDWIDTH/2.0 
		gauche.rotateZ(-Math.PI/4.0)
		this.group.add(gauche)
		
		let droite = gauche.clone()
		droite.position.z = -WORLDWIDTH/2.0
		this.group.add(droite)

		let arbre = new Tree()
		arbre.mesh.rotateZ(Math.PI/8.0)
		this.group.add(arbre.mesh)

		scene.add(this.group);
	}
}

