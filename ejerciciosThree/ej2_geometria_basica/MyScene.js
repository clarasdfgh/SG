import * as THREE from '../libs/three.module.js'
import { GUI } from '../libs/dat.gui.module.js'
import { TrackballControls } from '../libs/TrackballControls.js'


import { MyCube } from './MyCube.js'
import { MyCone } from './MyCone.js'
import { MyCylinder } from './MyCylinder.js'
import { MySphere } from './MySphere.js'
import { MyThorus } from './MyThorus.js'
import { MyD20 } from './MyD20.js'


class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();

    this.renderer = this.createRenderer(myCanvas);
    this.gui = this.createGUI ();
    this.createLights ();
    this.createCamera ();


    this.axis_cubo = new THREE.AxesHelper (5);
    this.add (this.axis_cubo);
    this.axis_cubo.position.set(-5,5,0);

    this.cubo = new MyCube(this.gui, "Controles del Cubo");
    this.add (this.cubo);


    this.axis_cone = new THREE.AxesHelper (5);
    this.add (this.axis_cone);
    this.axis_cone.position.set(0,5,0);

    this.cone = new MyCone(this.gui, "Controles del Cono");
    this.add (this.cone);


    this.axis_cyl = new THREE.AxesHelper (5);
    this.add (this.axis_cyl);
    this.axis_cyl.position.set(5,5,0);

    this.cyl = new MyCylinder(this.gui, "Controles del Cilindro");
    this.add (this.cyl);


    this.axis_sph = new THREE.AxesHelper (5);
    this.add (this.axis_sph);
    this.axis_sph.position.set(-5,-5,0);

    this.sph = new MySphere(this.gui, "Controles de la Esfera");
    this.add (this.sph);


    this.axis_toro = new THREE.AxesHelper (5);
    this.add (this.axis_toro);
    this.axis_toro.position.set(0,-5,0);

    this.toro = new MyThorus(this.gui, "Controles del Toro");
    this.add (this.toro);


    this.axis_d20 = new THREE.AxesHelper (5);
    this.add (this.axis_d20);
    this.axis_d20.position.set(5,-5,0);

    this.d20 = new MyD20(this.gui, "Controles del D20");
    this.add (this.d20);
  }

  createCamera () {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.camera.position.set (20, 10, 20);

    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);

    this.cameraControl = new TrackballControls (this.camera, this.renderer.domElement);

    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;

    this.cameraControl.target = look;
  }

  createGUI () {
    var gui = new GUI();

    this.guiControls = new function() {

      this.lightIntensity = 0.5;
      this.axisOnOff = true;
    }

    var folder = gui.addFolder ('Luz y Ejes');

    folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');
    folder.add (this.guiControls, 'axisOnOff').name ('Mostrar ejes : ');

    return gui;
  }

  createLights () {
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);

    this.add (ambientLight);

    this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
    this.spotLight.position.set( 60, 60, 40 );

    this.add (this.spotLight);
  }

  createRenderer (myCanvas) {
    var renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    $(myCanvas).append(renderer.domElement);

    return renderer;
  }

  getCamera () {
    return this.camera;
  }

  setCameraAspect (ratio) {
    this.camera.aspect = ratio;
    this.camera.updateProjectionMatrix();
  }

  onWindowResize () {
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  update () {
    this.spotLight.intensity = this.guiControls.lightIntensity;
    this.axis_cubo.visible = this.guiControls.axisOnOff;

    this.cameraControl.update();

    this.cubo.update();
    this.cone.update();
    this.cyl.update();
    this.sph.update();
    this.toro.update();
    this.d20.update();

    this.renderer.render (this, this.getCamera());

    requestAnimationFrame(() => this.update())
  }
}


$(function () {
  var scene = new MyScene("#WebGL-output");

  window.addEventListener ("resize", () => scene.onWindowResize());

  scene.update();
});
