import * as THREE from '../libs/three.module.js'

class MyPendulum extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();

  	this.createGUI(gui, titleGui);

		this.creaPenduloMovil();
		this.creaPenduloBase();

  		this.penduloCompleto = new THREE.Object3D; //Los péndulos colgarán de este nodo
  		this.penduloCompleto.add(this.conjuntoMovil);
  		this.penduloCompleto.add(this.penduloBase);

  		// Y añadirlo como hijo del Object3D (el this)
  		this.add(this.penduloCompleto);
  	}

  	creaPenduloMovil() {
      //Materiales
      var material = new THREE.MeshNormalMaterial();
      var negro    = new THREE.MeshPhongMaterial({color: 0x141414});

      //Geometrías
      var geom_penduloPeque = new THREE.BoxGeometry(2.0, 10.0, 1.0);
      var geom_eje = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 10);

      //Mesh
  		this.penduloPeque = new THREE.Mesh(geom_penduloPeque, material);
  		this.penduloPeque.geometry.translate(0.0,-5.0,1.5);

  		this.ejePenduloMovil = new THREE.Mesh(geom_eje, negro);
      this.ejePenduloMovil.geometry.rotateX(Math.PI*0.5);
  		this.ejePenduloMovil.geometry.translate(0,-0.25,2.0);


  		// Formar nodos del modelo jerárquico
  		this.penduloMovil = new THREE.Object3D();
  		this.penduloMovil.translateY(1);
  		this.penduloMovil.add(this.penduloPeque);
  		this.conjuntoMovil = new THREE.Object3D();
  		this.conjuntoMovil.add(this.penduloMovil);
  		this.conjuntoMovil.add(this.ejePenduloMovil);
  	}

  	creaPenduloBase() {
      //Materiales
      var azul     = new THREE.MeshPhongMaterial({color: 0x3683c7});
      var azul2    = new THREE.MeshPhongMaterial({color: 0x56c6e8});


  		this.extensible = new THREE.Mesh(new THREE.BoxGeometry(2, 5, 2),azul);
  		this.extensible.geometry.translate(0, -2.5, 0);
  		this.extensible.translateY(-2);

  		var g_partes_verdes = new THREE.BoxGeometry(2, 4, 2);
  		var mat_verde = new THREE.MeshPhongMaterial({color: "#00ff00"});
  		this.penduloBase_arr = new THREE.Mesh(g_partes_verdes, mat_verde);
  		this.penduloBase_abj = new THREE.Mesh(g_partes_verdes, mat_verde);
  		this.add(this.penduloBase_abj);
  		this.add(this.penduloBase_arr);

  		var contornoEje = new THREE.Shape();
  		contornoEje.absarc(0, 0.7, 0.7, 0, 2 * Math.PI);
  		var geomEje = new THREE.ExtrudeGeometry(contornoEje, {depth: 0.3, bevelEnabled: false});
  		this.ejePenduloBase = new THREE.Mesh(geomEje,
  		                                   new THREE.MeshPhongMaterial({color: "#ffc0cb"}));
  		this.ejePenduloBase.geometry.translate(0, -0.7, 1);

  		// Formar nodos del modelo jerárquico
  		this.penduloBase = new THREE.Object3D();
  		this.penduloBase.add(this.extensible);
  		this.penduloBase.add(this.penduloBase_arr);
  		this.penduloBase.add(this.penduloBase_abj);
  		this.penduloBase.add(this.ejePenduloBase);
  	}

  	createGUI(gui, titleGui) {
  		this.guiControls = new function () {
  			this.alt_rojo = 5.0;
  			this.alfa = 0.0;

  			this.alt_azul = 10.0;
  			this.beta = 0.0;
  			this.pos_azul = 10.0;

  			// Un botón para dejarlo todo en su posición inicial
  			// Cuando se pulse se ejecutará esta función.
  			this.reset = function () {
  				this.alt_rojo = 5.0;
  				this.alfa = 0.0;

  				this.alt_azul = 10.0;
  				this.beta = 0.0;
  				this.pos_azul = 10.0;
  			}
  		}

  		// Carpetas
  		var folder = gui.addFolder(titleGui);
  		var folder1 = gui.addFolder("Péndulo grande");
  		var folder2 = gui.addFolder("Péndulo pequeño");

  		var that = this;
  		folder1.add(this.guiControls, 'alt_rojo', 5.0, 10.0, 0.1).name('Longitud : ').listen();
  		folder1.add(this.guiControls, 'alfa', -Math.PI/4.0, Math.PI/4.0, 0.1).name('Ángulo : ').listen();

  		folder2.add(this.guiControls, 'alt_azul', 10.0, 20.0, 0.1).name('Longitud : ').listen();
  		folder2.add(this.guiControls, 'beta', -Math.PI/4.0, Math.PI/4.0, 0.1).name('Ángulo : ').listen();
  		folder2.add(this.guiControls, 'pos_azul', 10.0, 90.0, 1.0).name('Posicion (%) : ').listen();

  		folder.add(this.guiControls, 'reset').name('[ Reset ]');
  	}

  	update() {
  		// Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
  		// Primero, el escalado
  		// Segundo, la rotación en Z
  		// Después, la rotación en Y
  		// Luego, la rotación en X
  		// Y por último la traslación
  		this.extensible.scale.y = this.guiControls.alt_rojo / 5.0; // Longitud del péndulo superior
  		this.penduloCompleto.rotation.z = this.guiControls.alfa; // Oscilación del péndulo superior
  		this.penduloBase_abj.position.y = -this.guiControls.alt_rojo - 4.0;

  		this.penduloMovil.scale.y = this.guiControls.alt_azul / 10.0;  // Longitud del péndulo inferior
  		this.conjuntoMovil.rotation.z = this.guiControls.beta; // Oscilación del péndulo inferior
  		this.conjuntoMovil.position.y = - 2 - ((this.guiControls.pos_azul * this.guiControls.alt_rojo) / 100); // Posición del eje del péndulo inferior
  	}
  }


  export { MyPendulum };
