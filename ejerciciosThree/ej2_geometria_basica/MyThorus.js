import * as THREE from '../libs/three.module.js'

class MyThorus extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    var toroGeom = new THREE.TorusGeometry( 1.5, 1, 10, 10 );
    var toroMat = new THREE.MeshNormalMaterial();
    var toro = new THREE.Mesh (toroGeom, toroMat);

    this.add (toro);
  }

  createGUI (gui,titleGui) {
    this.guiControls = new function () {
      this.sizeX = 1.0;
      this.sizeY = 1.0;
      this.sizeZ = 1.0;

      this.reset = function () {
        this.sizeX = 1.0;
        this.sizeY = 1.0;
        this.sizeZ = 1.0;
      }
    }

    var folder = gui.addFolder (titleGui);

    folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name ('Tamaño X : ').listen();
    folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name ('Tamaño Y : ').listen();
    folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name ('Tamaño Z : ').listen();

    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  update () {
    this.rotation.y += 0.03;
    //this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }
}

export { MyThorus };
