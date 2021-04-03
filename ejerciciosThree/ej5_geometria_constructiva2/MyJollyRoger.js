import * as THREE from '../libs/three.module.js'
import {ThreeBSP} from '../libs/ThreeBSP.js'

class MyJollyRoger extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    var material = new THREE.MeshNormalMaterial();

    var ojo1_geom = new THREE.CylinderGeometry( 3.5, 3.5, 5, 32 );
    var head_geom = new THREE.SphereGeometry ( 14, 32, 32, 0, 2*Math.PI, 0, Math.PI );

    ojo1_geom.translate(5,-4,11);
    ojo1_geom.rotateX(Math.PI / 1.5);

    var ojo1_bsp = new ThreeBSP(ojo1_geom);
    var head_bsp = new ThreeBSP(head_geom);

    var skull_bsp = head_bsp.subtract(ojo1_bsp);

    var skull_geom = skull_bsp.toGeometry(material);

    var skull = skull_geom.toMesh(material);
    skull.geometry.computeFaceNormals();
    skull.geometry.computeVertexNormals();

    this.add(skull);
  }

  createGUI (gui,titleGui) {
    this.guiControls = new function () {
      this.sizeX = 1.0;
      this.sizeY = 1.0;
      this.sizeZ = 1.0;

      this.rotX = 0.0;
      this.rotY = 0.0;
      this.rotZ = 0.0;

      this.posX = 0.0;
      this.posY = 0.0;
      this.posZ = 0.0;

      this.reset = function () {
        this.sizeX = 1.0;
        this.sizeY = 1.0;
        this.sizeZ = 1.0;

        this.rotX = 0.0;
        this.rotY = 0.0;
        this.rotZ = 0.0;

        this.posX = 0.0;
        this.posY = 0.0;
        this.posZ = 0.0;
      }
    }

    var folder = gui.addFolder (titleGui);

    folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name ('Tamaño X : ').listen();
    folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name ('Tamaño Y : ').listen();
    folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name ('Tamaño Z : ').listen();

    folder.add (this.guiControls, 'rotX', 0.0, Math.PI/2, 0.1).name ('Rotación X : ').listen();
    folder.add (this.guiControls, 'rotY', 0.0, Math.PI*2, 0.1).name ('Rotación Y : ').listen();
    folder.add (this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.1).name ('Rotación Z : ').listen();

    folder.add (this.guiControls, 'posX', -20.0, 20.0, 0.1).name ('Posición X : ').listen();
    folder.add (this.guiControls, 'posY', 0.0, 10.0, 0.1).name ('Posición Y : ').listen();
    folder.add (this.guiControls, 'posZ', -20.0, 20.0, 0.1).name ('Posición Z : ').listen();

    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  update () {
    this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }
}

export { MyJollyRoger };
