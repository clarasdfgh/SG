import * as THREE from '../libs/three.module.js'

class MyClock extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui,titleGui);

    this.creaReloj();

    var negro    = new THREE.MeshPhongMaterial({color: 0x141414});
    var sphGeom  = new THREE.SphereGeometry( 1.5, 10, 10 );
    this.marcador = new THREE.Mesh (sphGeom, negro);

    this.marcador.translateX(6);
    this.movil = new THREE.Object3D();
		this.movil.add(this.marcador);
		this.tiempo_anterior = Date.now();

    this.add (this.movil);
  }

  creaReloj(){
    var sphGeom = new THREE.SphereGeometry( 2, 10, 10 );
    var sphMat  = new THREE.MeshNormalMaterial();

    this.reloj     = new Array()
    var angulo     = 0;
    var incremento = (2 * Math.PI) / 12.0;
    var radio = 10;

    for(var i=0; i<12; i++){
      this.reloj.push(new THREE.Mesh(sphGeom, sphMat));
      this.reloj[i].translateX(Math.cos(angulo) * radio);
      this.reloj[i].translateZ(-Math.sin(angulo) * radio);

      this.add(this.reloj[i]);
      angulo += incremento;
    }
  }

  createGUI (gui,titleGui) {
    this.guiControls = new function () {
      this.velocidad = 1.0;

      this.reset = function () {
        this.velocidad = 1.0;

      }
    }

    var folder = gui.addFolder (titleGui);

    folder.add (this.guiControls, 'velocidad', -30.0, 30.0, 1).name ('Velocidad : ').listen();
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }

  update () {
    var ahora = Date.now();

		this.movil.rotation.y -= this.guiControls.velocidad * ((2*Math.PI)/12) * ((ahora - this.tiempo_anterior)/1000.0);

		this.tiempo_anterior = ahora;
  }
}

export { MyClock };
