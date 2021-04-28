import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

class MyAnimation extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui, titleGui);

    //Creamos la nave
    var cono_geom = new THREE.ConeGeometry( 0.5, 1.5, 3 );
    var material = new THREE.MeshNormalMaterial();

    this.cono = new THREE.Mesh( cono_geom, material );
    this.cono.rotation.x = Math.PI / 2;

    this.nave = new THREE.Object3D()

    //Creamos el recorrido
    var recorrido = [
      new THREE.Vector3 (0, 0, 0),
      new THREE.Vector3 (-3, 0, -3),
      new THREE.Vector3 (-4, 0, -2.5),
      new THREE.Vector3 (-5, 0, 0),
      new THREE.Vector3 (-4, 0, 2.5),
      new THREE.Vector3 (-3, 0, 3),
      new THREE.Vector3 (0, 0, 0),
      new THREE.Vector3 (3, 0, -3),
      new THREE.Vector3 (4, 0, -2.5),
      new THREE.Vector3 (5, 0, 0),
      new THREE.Vector3 (4, 0, 2.5),
      new THREE.Vector3 (3, 0, 3),
      new THREE.Vector3 (0, 0, 0)
    ];

    this.curva = new THREE.CatmullRomCurve3(recorrido);

    var points = this.curva.getPoints(50);
    var curva_geom = new THREE.BufferGeometry().setFromPoints(points);
    var negro = new THREE.LineBasicMaterial({color: 0x000000});
    var spline = new THREE.Line(curva_geom, negro);

    this.nave.add(this.cono);
    this.add(this.nave);
    this.add(spline);

    var origen_izda = {p: 0};
    var destino_izda = {p: 0.5};

    var loop_izda = new TWEEN.Tween(origen_izda).to(destino_izda, 4000).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(()=>{
        var pos = this.curva.getPointAt(origen_izda.p);
        this.nave.position.copy(pos);
        var tangente = this.curva.getTangentAt(origen_izda.p);
        pos.add(tangente);

        this.nave.lookAt(pos);
    });

    var origen_dcha = {p: 0.5};
    var destino_dcha = {p: 1};

    var loop_dcha = new TWEEN.Tween(origen_dcha).to(destino_dcha, 8000).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(()=>{
        var pos = this.curva.getPointAt(origen_dcha.p);
        this.nave.position.copy(pos);
        var tangente = this.curva.getTangentAt(origen_dcha.p);
        pos.add(tangente);

        this.nave.lookAt(pos);
    }).onComplete(()=>{loop_izda.start();});

    loop_izda.chain(loop_dcha);
    loop_izda.start();

  }

  createGUI (gui,titleGui) {
    this.guiControls = new function () {
    }
  }

  update () {
    TWEEN.update();
  }
}

export { MyAnimation };
