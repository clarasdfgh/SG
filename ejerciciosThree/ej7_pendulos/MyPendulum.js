import * as THREE from '../libs/three.module.js'

class MyPendulum extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    var material = new THREE.MeshNormalMaterial();
    var negro = new THREE.MeshPhongMaterial({color: 0x141414});

    var parent_geom= new THREE.BoxBufferGeometry (1,7,1);
    var child_geom = new THREE.BoxBufferGeometry (0.4,6,0.4);

    var penduloParent = new THREE.Mesh (parent_geom, material);
    var penduloChild = new THREE.Mesh (child_geom, negro);

    penduloParent.position.set(0,5,0);
    penduloChild.position.set(0,-3,0.5);

    this.add (penduloParent);
    penduloParent.add(penduloChild);
  }

  createGUI (gui,titleGui) {
    this.guiControls = new function () {
      this.sizeY = 1.0;
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
    var parent = folder.addFolder("Controles péndulo parent");
    var child = folder.addFolder("Controles péndulo child");

    parent.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name ('Tamaño Y : ').listen();
    parent.add (this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.1).name ('Rotación Z : ').listen();
    parent.add (this.guiControls, 'posX', -20.0, 20.0, 0.1).name ('Posición X : ').listen();
    parent.add (this.guiControls, 'posY', 0.0, 10.0, 0.1).name ('Posición Y : ').listen();
    parent.add (this.guiControls, 'posZ', -20.0, 20.0, 0.1).name ('Posición Z : ').listen();

    child.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name ('Tamaño Y : ').listen();
    child.add (this.guiControls, 'rotZ', 0.0, Math.PI/2, 0.1).name ('Rotación Z : ').listen();
    child.add (this.guiControls, 'posX', -20.0, 20.0, 0.1).name ('Posición X : ').listen();
    child.add (this.guiControls, 'posY', 0.0, 10.0, 0.1).name ('Posición Y : ').listen();
    child.add (this.guiControls, 'posZ', -20.0, 20.0, 0.1).name ('Posición Z : ').listen();

    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  update () {
    this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }
}

export { MyPendulum };
