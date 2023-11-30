<template>
  <div id="container" style="background-color: #D9D9D9; width: 90vw; height: 900px; max-width: 90vw; margin: 5vw; overflow: hidden; display: flex; user-select: none;" >
    <div class="scene1" id="scene1" ref="scene1Container">      </div>

    <div class="selectmenu closed" id="selectmenu" >
      <div class="infoBat" id="info">
        <h2>information du batiment</h2>
      </div>
    </div>
    <div id="loadingScreen" class="loading-screen">
      <div class="loader"></div>
    </div>
  </div>
</template>


<script>

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Sky } from 'three/addons/objects/Sky.js';

import {getBatdebug, getAllEmp,getOneEmp,getOneBat, getAllBat} from '../services/mapPrestataire.service.js';
export default {
  name: "Map3DUser.vue",
  data : () => ({
    loaded: null,
    sky: null,
    sun: null,
    currentIndex:0,
    isLoading: true,
    idbat: 0,
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    raycaster: null,
    selectedObject: 0,
    asset: [],
    selectab: [],
    children: [],
    batiment: [],
    emp: [],
    emplacement_bdd: [],
    batiment_bdd: [],
    nonselectionables: null,
    selectionables: null,
    rotation: null,
    light: null,
    ambientLight: null,
    texture_emp: null,
    empGroupe: null,
    groupe_sol: null,
    testshape: [],
  }),
  methods: {

    findchild(obj, childtab) {
      obj.traverse((child) => {
        if (child.isMesh && !childtab.includes(child)) {
          childtab.push(child);
          this.findchild(child, childtab);
        }
      });
    },


    loadfinal() {
      return new Promise((resolve, reject) => {



        const loader = new GLTFLoader();
        loader.load('map/mapData/map_belfo.glb', async (gltf) => {

          const loadedGltf = gltf.scene;
          this.loaded = loadedGltf



          this.findchild(loadedGltf, this.children);



          var idbat = -1;

          for (var i = 0; i < this.children.length; i++) {
            console.log("child", this.children[i].name)
            if (this.children[i].name.slice(0,3) == "bat") {
              idbat++;
              const info = {
                id: idbat,
                name: this.children[i].name,
              }
              var texturebat;
              if(this.children[i].name == "bat_confer"){
                texturebat = new THREE.TextureLoader().load('map/mapData/tex/tex_conf.png');
                const mat_bat = new THREE.MeshPhongMaterial({map: texturebat});
                this.children[i].material = mat_bat;
                this.children[i].material.metalness = 0;
                this.children[i].receiveShadow = true;
                this.selectionables.add(this.children[i]);
                console.log("conf", this.children[i])
                console.log("position of conf", this.children[i].position.x, " :  y : ",this.children[i].position.y , "  :  z  :", this.children[i].position.z)
                texturebat = null;
              }
              if(this.children[i].name == "bat_rest"){
                texturebat = new THREE.TextureLoader().load('map/mapData/tex/bat_res_rest.png');
              }
              if(this.children[i].name == "bat_resto2"){
                texturebat = new THREE.TextureLoader().load('map/mapData/tex/bato_res_resto2.png');
              }
              if(this.children[i].name == "bat_roue"){
                texturebat = new THREE.TextureLoader().load('map/mapData/tex/tex_roue.png');
              }
              if(this.children[i].name == "bat_arcade"){
                texturebat = new THREE.TextureLoader().load('map/mapData/tex/tex_arcade.png');
              }
              if(this.children[i].name == "bat_foodtruck"){
                texturebat = new THREE.TextureLoader().load('map/mapData/tex/tex_res_foodtruck.png');
              }
              if(this.children[i].name == "bat_attrfutur"){
                texturebat = new THREE.TextureLoader().load('map/mapData/tex/tex_attrfutur.png');
              }
              if(this.children[i].name.includes("wc")){
                texturebat = new THREE.TextureLoader().load('map/mapData/tex/tex_wc.png');
                const mat_bat = new THREE.MeshPhongMaterial({map: texturebat});
                //flipY
                mat_bat.map.flipY = true;
                this.children[i].material = mat_bat;
                this.children[i].material.metalness = 0;
                this.children[i].receiveShadow = true;
                this.nonselectionables.add(this.children[i]);
                texturebat = null;
              }

              if(texturebat != null){
                const mat_bat = new THREE.MeshPhongMaterial({map: texturebat});
                mat_bat.map.flipY = true;
                this.children[i].material = mat_bat;
                this.children[i].material.metalness = 0;
                this.children[i].receiveShadow = true;
              }
              this.batiment.push(info)

              } else {
                if (this.children[i].name.slice(0, 3) == "sol") {
                  if(this.children[i].name == "sol_sol") {
                    const texturesol = new THREE.TextureLoader().load('map/mapData/tex/tex_solmir.png');
                    const mat_sol = new THREE.MeshPhongMaterial({map: texturesol});
                    this.children[i].material = mat_sol;
                    this.children[i].material.metalness = 0;
                    this.children[i].receiveShadow = true;
                    console.log("sol",this.children[i])
                    this.groupe_sol.add(this.children[i]);
                  }
                  else{
                    const texturesol = new THREE.TextureLoader().load('map/mapData/tex/tex_arrsol.png');
                    texturesol.wrapS = THREE.RepeatWrapping;
                    texturesol.wrapT = THREE.RepeatWrapping;
                    texturesol.repeat.set(2, 2);
                    const material_sol = new THREE.MeshPhongMaterial({map: texturesol});
                    this.children[i].material = material_sol;
                    this.children[i].material.metalness = 0;
                    this.children[i].receiveShadow = true;
                    this.groupe_sol.add(this.children[i]);

                  }
                }
                else {
                  if (this.children[i].name.slice(0, 3) == "dec") {
                    if(this.children[i].name.includes("tree")){
                      const texturetree = new THREE.TextureLoader().load('map/mapData/tex/tex_tree.png');
                      const mattree = new THREE.MeshPhongMaterial({map: texturetree});
                      this.children[i].material = mattree;
                      this.children[i].material.metalness = 0;
                      this.children[i].receiveShadow = true;
                    }
                    if(this.children[i].name.includes("bush")){
                      const texturetree = new THREE.TextureLoader().load('map/mapData/tex/tex_tree.png');
                      const mattree = new THREE.MeshPhongMaterial({map: texturetree});
                      this.children[i].material = mattree;
                      this.children[i].material.metalness = 0;
                      this.children[i].receiveShadow = true;
                    }
                    if(this.children[i].name == "deco_entree"){
                      const texturetree = new THREE.TextureLoader().load('map/mapData/tex/tex_entree.png');
                      const mattree = new THREE.MeshPhongMaterial({map: texturetree});
                      this.children[i].material = mattree;
                      this.children[i].material.metalness = 0;
                      this.children[i].receiveShadow = true;

                    }
                    if(this.children[i].name.includes("R2-D2")){
                      const texturetree = new THREE.TextureLoader().load('map/mapData/tex/tex_r2d2.png');
                      const mattree = new THREE.MeshPhongMaterial({map: texturetree});
                      this.children[i].material = mattree;
                      this.children[i].material.metalness = 0;
                      this.children[i].receiveShadow = true;

                    }
                    if(this.children[i].name.includes("Lamp")){
                      const texturetree = new THREE.TextureLoader().load('map/mapData/tex/tex_arcade.png');
                      const mattree = new THREE.MeshPhongMaterial({map: texturetree});
                      this.children[i].material = mattree;
                      this.children[i].material.metalness = 0;
                      this.children[i].receiveShadow = true;
                    }
                    this.groupe_sol.add(this.children[i]);

                  }
                }
              }
            }

          // Assurez-vous d'appeler la fonction de résolution (ici, je suppose que vous avez une promesse basée sur votre code précédent)

          resolve();
        }, undefined, (error) => {
          console.error(error);
          reject();
        });
      });

    },
    async setup(){
    //await this.debugprestafunc()
    console.log("setup")
    const texture_emp = new THREE.TextureLoader().load('map/mapData/tex/tex_emp.png');
    const texture_bat = new THREE.TextureLoader().load('map/mapData/albedo.jpg');
    const material_emp = new THREE.MeshPhongMaterial({map: texture_emp});
    const material_bat = new THREE.MeshPhongMaterial({map: texture_bat});

    this.emplacement_bdd = await getAllEmp();
    console.log("emplacement_bdd", this.emplacement_bdd)
    for (let i = 0; i < this.emplacement_bdd.length; i++) {
      var matricepoints = this.emplacement_bdd[i].matricepoints.matricepoints
      console.log("mat", matricepoints)

      //pour chaque point mettre les coordonné de 2D a 3D
      for(let j = 0 ; j < matricepoints.length ; j++){
        let newPoint = this.point2Dto3D(matricepoints[i][0],matricepoints[i][1] )
        console.log("newpoint", j, " :  ", newPoint)
      }
      const emp = await this.matriceTo3DEmp(matricepoints);
      emp.position.set(this.emplacement_bdd[i].posx, this.emplacement_bdd[i].posy, this.emplacement_bdd[i].posz);
      this.nonselectionables.add(emp);
    }
    this.batiment_bdd = await getAllBat();
    for (let i = 0; i< this.batiment_bdd.length; i++) {
      for (let j = 0; j < this.batiment.length; j++) {
        if (this.batiment_bdd[i].name == this.batiment[j].name) {

          var batiment_found = await this.findObjectByName(this.loaded, this.batiment[j].name)
          var batiment_clone = batiment_found.clone();
          batiment_clone.position.set(this.batiment_bdd[i].posx, this.batiment_bdd[i].posy, this.batiment_bdd[i].posz);
          batiment_clone.rotation.x = 0;
          batiment_clone.rotation.y = 0;
          batiment_clone.rotation.z = 0;
          batiment_clone.material = material_bat.clone()
          batiment_clone.material.metalness = 0;
          batiment_clone.castShadow = true;
          batiment_clone.receiveShadow = true;
          if(this.batiment_bdd[i].status == "accepted"){
            this.selectionables.add(batiment_clone);
          }
        }
      }
    }

    this.camera.rotation.x = -0.7;
    this.camera.position.set(120, 100, 160);

    console.log("selectionables", this.selectionables)
    console.log("nonselectionables", this.nonselectionables)


    },
    async start(){
      this.showLoadingScreen();
      await this.loadfinal();
      await this.setup();
      this.scene.add(this.selectionables);
      this.scene.add(this.nonselectionables);
      this.scene.add(this.groupe_sol);
      this.scene.add(this.light);
      this.scene.add(this.ambientLight);
      this.renderer.render(this.scene, this.camera);
      this.animate();
      this.hideLoadingScreen();

    },

    point2Dto3D(x, z ) {
      // Bounding box de la map 3D
      const boundingBox = {
        min: { x: -0.9983415603637695, y: -1, z: -1.0045995712280273 },
        max: { x: 1.0016584396362305, y: 1, z: 0.9954003691673279 }
      };

      // Échelle
      const scale = { x: 145.51963806152344, y: 1.8496733903884888, z: 151.32655334472656 };

      // Conversion de la bounding box et de l'échelle
      const adjustedBoundingBox = {
        min: {
          x: boundingBox.min.x * scale.x,
          y: boundingBox.min.y * scale.y,
          z: boundingBox.min.z * scale.z
        },
        max: {
          x: boundingBox.max.x * scale.x,
          y: boundingBox.max.y * scale.y,
          z: boundingBox.max.z * scale.z
        }
      };
      console.log("kjsdkljqskldjklqsjdklqskljd", adjustedBoundingBox)

      // Application de la transformation aux coordonnées 2D
      const point3D = {
        x: x * (adjustedBoundingBox.max.x - adjustedBoundingBox.min.x) + adjustedBoundingBox.min.x,
        y: 10,
        z: z * (adjustedBoundingBox.max.z - adjustedBoundingBox.min.z) + adjustedBoundingBox.min.z
      };

      return point3D;
    },

    async matriceTo3DEmp(matricepoints){
      const points = matricepoints.map(([x, y]) => new THREE.Vector2(x, y));
      // Épaisseur de l'objet
      const depth = 2;
      const shape = new THREE.Shape(points);
      const geome = new THREE.ExtrudeGeometry(shape, { depth: depth, bevelEnabled: false });

      const texture_emp = new THREE.TextureLoader().load('map/mapData/tex/tex_emp.png');
      const material_emp = new THREE.MeshPhongMaterial({map: texture_emp});
      const mesh = new THREE.Mesh(geome, material_emp);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = mesh.position.y + 3;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.name = "emptet";
      return mesh;
    },


    handleResize() {
      // Logique de gestion du redimensionnement
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      const scene1Container = this.$refs.scene1Container;
      this.renderer.setSize(window.innerWidth, scene1Container.offsetHeight);
      this.renderer.outputEncoding = THREE.LinearToneMapping;
    },
    showLoadingScreen() {
      document.getElementById('loadingScreen').style.display = 'flex';
      document.getElementById('scene1').style.display = 'none';
      document.getElementById('selectmenu').style.display = 'none';
    },
    hideLoadingScreen() {
      document.getElementById('loadingScreen').style.display = 'none';
      document.getElementById('scene1').style.display = 'flex';
      document.getElementById('selectmenu').style.display = 'block';
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    },
  },
  mounted() {
    this.scene = new THREE.Scene();
    //90% de la largueur de l'ecran
    const scene1Container = this.$refs.scene1Container;
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.shadowMap.enabled = true;

    this.renderer.setSize(window.innerWidth, scene1Container.offsetHeight);
    scene1Container.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);



//const canvasElement = document.querySelector('[data-engine="three.js r156"]');

    this.ambientLight = new THREE.AmbientLight(0xffffff); // Couleur en hexadécimal
    this.ambientLight.intensity = 2; // Intensité de la lumière ambiante
    this.scene.background = new THREE.Color(0xffffff);

    // Add Sky
    this.sky = new Sky();
    this.sky.scale.setScalar(450000);
    this.scene.add(this.sky);

// Réglages pour le ciel
    this.sky.material.uniforms.turbidity.value = 0.3;
    this.sky.material.uniforms.rayleigh.value = 0.2;
    this.sky.material.uniforms.mieCoefficient.value = 0.005;
    this.sky.material.uniforms.mieDirectionalG.value = 0.7;

// Réglages pour le soleil
    this.sun = new THREE.Vector3();


// Position du soleil
    this.sun.setFromSphericalCoords(1, 1.2 ,2*Math.PI + Math.PI / 5);
    this.sky.material.uniforms.sunPosition.value.copy(this.sun);


    // Réglages pour la lumière directionnelle
    this.light = new THREE.DirectionalLight(0xdddddd, 1);
    this.light.position.copy(this.sun); // Copie la position du soleil pour que la lumière soit dans la même direction
    this.light.castShadow = true;

// Définir les propriétés spécifiques aux ombres pour la lumière

    this.light.castShadow = true;

// Ajouter la lumière à la scène
    this.scene.add(this.light);
    window.dispatchEvent(new Event('resize'));

    this.selectionables = new THREE.Group();
    this.nonselectionables = new THREE.Group();
    this.raycaster = new THREE.Raycaster();

    this.groupe_sol = new THREE.Group();



    this.renderer.domElement.addEventListener('mousemove', this.onMouseMove);
    this.renderer.domElement.addEventListener('click', this.onMouseClick);
    this.resizeListener = this.handleResize.bind(this);
    window.addEventListener('resize', this.resizeListener);



    this.start();

  },
  beforeDestroy() {
    this.renderer.domElement.removeEventListener('mousemove', this.onMouseMove);
    this.renderer.domElement.removeEventListener('click', this.onMouseClick);

    window.removeEventListener('resize', this.resizeListener);
  },
}
</script>



<style scoped>



.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  display: none;
}

.loader {
  border: 8px solid #f3f3f3; /* gris clair */
  border-top: 8px solid #3498db; /* bleu */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.selectmenu {
  width: 30%;
  height: 100%;
  background-color: #D9D9D9;
  transition:right 0.3s ease-in-out;
  min-width: 30%;
}


.selectmenu.closed{
  right: -30%;
}


.scene1{
  user-select: none;
  height: 100%;
  width: 100%;
  transition: width 0.3s ease-in-out;
}

.scene1.active{
  width: 70%;
}

.infoBat{
  display: none;
}

.infoBat.active{
  display: block;
}

</style>