import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'
import {ThreeBSP} from '../libs/ThreeBSP.js'

class MyPacman extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

    this.createGUI(gui, titleGui);

    //Creamos el pacman
    var amarillo  = new THREE.MeshPhongMaterial({color: 0xffee00});
    amarillo.side = THREE.DoubleSide;

    var head_geom = new THREE.SphereGeometry ( 14, 32, 32, 0, 2*Math.PI, 0, 0.5 * Math.PI );
    var ojo_geom  = new THREE.CylinderGeometry( 2, 2, 32, 32 );
    var jaw_geom  = new THREE.SphereGeometry ( 14, 32, 32, 0, 2*Math.PI, 0, 0.5 * Math.PI );

    jaw_geom.rotateX(Math.PI)
    ojo_geom.rotateX(Math.PI / 2);

    ojo_geom.translate(6,6,0);
    jaw_geom.translate(0,0.3,0);

    var head_bsp  = new ThreeBSP(head_geom);
    var ojo_bsp   = new ThreeBSP(ojo_geom);

    var pacman_bsp = head_bsp.subtract(ojo_bsp);

    this.pacman = pacman_bsp.toMesh(amarillo);
    this.jaw    = new THREE.Mesh( jaw_geom, amarillo );

    this.pacman.geometry.computeFaceNormals();
    this.pacman.geometry.computeVertexNormals();
    this.pacman.geometry.rotateY(3 * Math.PI / 2);

    this.movil = new THREE.Object3D();
    this.movil.add(this.pacman);
    this.movil.add(this.jaw);
    this.add(this.movil);


    //Creamos el recorrido
    var recorrido = [
      new THREE.Vector3 (-50, 0, 0),
      new THREE.Vector3 (-50, 0, -100),
      new THREE.Vector3 (75, 0, -75),
      new THREE.Vector3 (100, 0, 0),
      new THREE.Vector3 (35, 0, 50),
      new THREE.Vector3 (35, 0, 150),
      new THREE.Vector3 (-50, 0, 150),
      new THREE.Vector3 (-50, 0, 0),
    ];

    this.curva = new THREE.CatmullRomCurve3(recorrido);

    var points = this.curva.getPoints(50);
    var curva_geom = new THREE.BufferGeometry().setFromPoints(points);
    var negro = new THREE.LineBasicMaterial({color: 0x000000});
    var spline = new THREE.Line(curva_geom, negro);

    this.add(spline);

    var origen_arr = {p: 0};
    var destino_arr = {p: 0.5};

    var loop_arr = new TWEEN.Tween(origen_arr).to(destino_arr, 6000).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(()=>{
        var pos = this.curva.getPointAt(origen_arr.p);
        this.movil.position.copy(pos);
        var tangente = this.curva.getTangentAt(origen_arr.p);
        pos.add(tangente);

        this.movil.lookAt(pos);
    });

    var origen_abj = {p: 0.5};
    var destino_abj = {p: 1};

    var loop_abj = new TWEEN.Tween(origen_abj).to(destino_abj, 4000).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(()=>{
        var pos = this.curva.getPointAt(origen_abj.p);
        this.movil.position.copy(pos);
        var tangente = this.curva.getTangentAt(origen_abj.p);
        pos.add(tangente);

        this.movil.lookAt(pos);
    }).onComplete(()=>{loop_arr.start();});

    loop_arr.chain(loop_abj);
    loop_arr.start();

  }

  createGUI (gui,titleGui) {
    this.guiControls = new function () {
    }
  }

  update () {
    TWEEN.update();

    this.jaw.rotation.x = (this.jaw.rotation.x + 0.03) % (Math.PI/3.5);
  }
  }

export { MyPacman };
