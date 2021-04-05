import * as THREE from '../libs/three.module.js'

class MyShape extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    var material = new THREE.MeshNormalMaterial();

    var points = [];
    var randomPoints = [];

    points.push (new THREE.Vector3 (0, 2, 0));      //Punta superior
    points.push (new THREE.Vector3 (0.1, 1, 0));
    points.push (new THREE.Vector3 (1.2, 1.2, 0));  //Punta recta dcha
    points.push (new THREE.Vector3 (0.3, 0.8, 0));
    points.push (new THREE.Vector3 (1, 0, 0));      //Punta abajo dcha
    points.push (new THREE.Vector3 (0, 0.8, 0));
    points.push (new THREE.Vector3 (-1, 0, 0));     //Punta abajo izda
    points.push (new THREE.Vector3 (-0.3, 0.8, 0));
    points.push (new THREE.Vector3 (-1.2, 1.2, 0)); //Punta recta izda
    points.push (new THREE.Vector3 (-0.1, 1, 0));

    for ( var i = 0; i < 5; i ++ ) {
               randomPoints[i] = ( new THREE.Vector3( ( i - 4.5 ) * 50, THREE.Math.randFloat( - 5, 5 ), THREE.Math.randFloat( - 5, 5 ) ) );
    }

    var randomSpline = new THREE.CatmullRomCurve3( randomPoints );

    var star = new THREE.Shape(points);

    const extrudeSettings = {
    	steps: 1,
    	depth: 1,
    	bevelEnabled: true,
    	bevelThickness: 0.5,
    	bevelSize: 1,
    	bevelOffset: 0.5,
    	bevelSegments: 9
    };

    const extrudeSettings2 = {
    	steps: 1,
    	depth: 1,
    	extrudePath: randomSpline
    };

    var extrObj= new THREE.Mesh ( new THREE.ExtrudeGeometry (star, extrudeSettings), material );
    var extrColumn =  new THREE.Mesh( new THREE.ExtrudeGeometry (star, extrudeSettings2), material );

    extrColumn.position.set(1,0,0);

    this.add(extrObj);
    this.add(extrColumn);
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
    this.rotation.y += 0.01;
    this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    //this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
  }
}

export { MyShape };
