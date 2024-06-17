import * as THREE from "https://cdn.skypack.dev/three@0.136.0";

export default class Tree {
  constructor() {
		this.mesh = new THREE.Group()
    this.obj = new THREE.CylinderGeometry(0.1, 0.1, 1.0, 20);
    this.material = new THREE.MeshLambertMaterial({ color: 0x33ff33 })
    let mesh = new THREE.Mesh(this.obj, this.material);
    let pointLight = new THREE.PointLight(0x00ff00, 1, 14);
    pointLight.position.set(0,  1.0, 0);
		this.mesh.add(pointLight)
		this.mesh.add(mesh)
  }
}
