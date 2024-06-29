import * as THREE from "https://cdn.skypack.dev/three@0.136.0";

export default class Tree {
  constructor() {
		this.group = new THREE.Group()

		// couleur, intensité, distance
    /*let pointLight = new THREE.PointLight(0xffffff, 1.5, 4.0);
    pointLight.position.set(0, 2.0, 0);
		this.group.add(pointLight)*/
		// rayon top, rayon bot, hauteur, nombre de sommets
    this.obj = new THREE.CylinderGeometry(0.1, 0.1, 1.0, 20);
    this.material = new THREE.MeshLambertMaterial({ color: 0x3d251e })
    let tronc = new THREE.Mesh(this.obj, this.material);
		this.group.add(tronc)

    this.obj = new THREE.CylinderGeometry(0.0, 0.2, 0.5, 3+Math.floor(Math.random()*17));
    this.material = new THREE.MeshLambertMaterial({ color: 0x33ff33 })
    let feuilles = new THREE.Mesh(this.obj, this.material);
		feuilles.position.y = 0.7
		this.group.add(feuilles)

		this.position = this.group.position
  }
}
