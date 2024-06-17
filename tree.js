import * as THREE from "https://cdn.skypack.dev/three@0.136.0";

export default class Tree {
  constructor(scene, x, y, z) {
    this.obj = new THREE.CylinderGeometry(1, 1, 5, 20);
    this.material = new THREE.MeshLambertMaterial({ color: 0x33ff33 })
    this.mesh = new THREE.Mesh(this.obj, this.material);
    this.mesh.position.set(x, y, z);
    let pointLight = new THREE.PointLight(0x00ff00, 1, 14);
    pointLight.position.set(x, y + 5, z);
    scene.add(pointLight);
    scene.add(this.mesh);
  }
}
