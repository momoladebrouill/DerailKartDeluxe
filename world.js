import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import Tree from "./tree.js"

const WORLDWIDTH = 5.0
const WALLHEIGHT = 0.5
const XMAX = 100.0
function createFloor(w,color) {
	const geometry = new THREE.PlaneGeometry(w, 100 );
	const material = new THREE.MeshStandardMaterial( {color: color, side: THREE.DoubleSide} );
	const plane = new THREE.Mesh( geometry, material );
	return plane;
}

export default class World {
	constructor(scene) {
		this.group = new THREE.Group()

		let bas = createFloor(WORLDWIDTH,0x555555);
		bas.rotateY(-Math.PI/2.0)
		bas.rotateX(-Math.PI/4.0)
		this.group.add(bas)

		let gauche = createFloor(WALLHEIGHT, 0x660099);
		gauche.position.y = WALLHEIGHT*0.75 -0.1
		gauche.position.z = WORLDWIDTH/2.0 
		gauche.rotateZ(-Math.PI/4.0)
		this.group.add(gauche)
		
		let droite = gauche.clone()
		droite.position.z = -WORLDWIDTH/2.0
		this.group.add(droite)


		this.treeqqty = 100
		this.arbres = new THREE.Group()
		for(let i = 0; i < this.treeqqty; i++){
			let arbre = new Tree()
			arbre.position.z = (Math.random() - 0.5)* WORLDWIDTH
			arbre.position.x = 2*  (Math.random()-0.5) * XMAX 
			arbre.group.rotateZ(-Math.PI/8.0)
			this.arbres.add(arbre.group)
		}
		this.arbres.rotateZ(Math.PI/4.0)
		this.group.add(this.arbres)

		scene.add(this.group);
	}
	update(speed){
		for (let i = 0; i < this.treeqqty; i++){
			let tree = this.arbres.children[i]
			tree.position.x -=0.1 * speed
			if(tree.position.x > XMAX){
				tree.position.x = -XMAX;
				tree.position.z = (Math.random() -0.5) * WORLDWIDTH
			}
		}
	}
}

