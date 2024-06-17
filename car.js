import * as THREE from "https://cdn.skypack.dev/three@0.136.0";


export default class Car {
  constructor(scene) {
    this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
    this.material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.mesh.position.set(0, 0, 0);
    scene.add(this.mesh);
    
    this.position = this.mesh.position;

    //les trucs des voitures et tout
    this.wheels = 4;
  }

  update(){
    this.position.x += 0.01;
  }
}
