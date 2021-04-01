import * as THREE from '../libs/three.module.js'
import {ThreeBSP} from '../libs/ThreeBSP.js'

class MyJollyRoger extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    var material = new THREE.MeshNormalMaterial();
    var negro = new THREE.MeshPhongMaterial({color: 0x141414});
    var amarillo = new THREE.MeshPhongMaterial({color: 0xffef94});

    amarillo.side = THREE.DoubleSide;

    const ojo1_geom = new THREE.CylinderGeometry( 3.5, 3.5, 5, 32 );
    /*const ojo2_geom = new THREE.CylinderGeometry( 3.5, 3.5, 5, 32 );
    const nose_geom = new THREE.CylinderGeometry( 1, 1, 5, 32 );
    */const head_geom = new THREE.SphereGeometry ( 14, 32, 32, 0, 2*Math.PI, 0, Math.PI );
    /*const hat_geom = new THREE.SphereGeometry( 16, 32, 32, 0, 2*Math.PI, 0, 0.5 * Math.PI );
    const rim_geom = new THREE.TorusGeometry( 17, 2, 3, 32, 2*Math.PI );
    const jaw_geom = new THREE.SphereGeometry( 8, 32, 32, 0, 2*Math.PI, 0, Math.PI );

    jaw_geom.translate(0,-11, 0);
    ojo1_geom.translate(5,-4,11);
    ojo2_geom.translate(-5,-4,11);
    nose_geom.translate(0,-8,9);

    rim_geom.rotateX(Math.PI / 2);
    ojo1_geom.rotateX(Math.PI / 1.5);
    ojo2_geom.rotateX(Math.PI / 1.5);
    nose_geom.rotateX(Math.PI / 1.5);
*/
    var ojo1_bsp = new ThreeBSP(ojo1_geom);
  /*  var ojo2_bsp = new ThreeBSP(ojo2_geom);
    var nose_bsp = new ThreeBSP(nose_geom);*/
    var head_bsp = new ThreeBSP(head_geom);
    /*var hat_bsp = new ThreeBSP(hat_geom);
    var rim_bsp = new ThreeBSP(rim_geom);
    var jaw_bsp = new ThreeBSP(jaw_geom);*/

    var skull_bsp = head_bsp.subtract(ojo1_bsp);
    /*skull_bsp = head_bsp.subtract(ojo2_bsp);
    skull_bsp = head_bsp.subtract(nose_bsp);*/

    var skull = skull_bsp.toMesh();
    skull.material = material;

    this.add(skull);

    /*const ojo1 = new THREE.Mesh( ojo1_geom, negro );
    const ojo2 = new THREE.Mesh( ojo2_geom, negro );
    const nose = new THREE.Mesh( nose_geom, negro );
    const head = new THREE.Mesh( head_geom, material );
    const hat =  new THREE.Mesh ( hat_geom, amarillo );
    const rim = new THREE.Mesh( rim_geom, amarillo );
    const jaw = new THREE.Mesh( jaw_geom, material );

    jaw.position.set(0,-11, 0);
    ojo1.position.set(5,-4,11);
    ojo2.position.set(-5,-4,11);
    nose.position.set(0,-8,9);

    rim.rotation.set(Math.PI / 2,0,0);
    ojo1.rotation.set(Math.PI / 1.5,0,0);
    ojo2.rotation.set(Math.PI / 1.5,0,0);
    nose.rotation.set(Math.PI / 1.5,0,0);

    this.add(jaw);
    this.add(head);
    this.add(rim);
    this.add(hat);
    this.add(nose);
    this.add(ojo2);
    this.add(ojo1);*/
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
