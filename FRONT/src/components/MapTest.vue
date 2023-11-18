<template>
  <div id="container" style="background-color: #D9D9D9; width: 90vw; height: 900px; max-width: 90vw; margin: 5vw; overflow: hidden; display: flex;" >
      <div class="scene1" id="scene1" ref="scene1Container">      </div>

    <div class="selectmenu closed" id="selectmenu" >
      <div class="add" id="add">
        <h2>previsualisation du batiment</h2>
        <div class="scene2" ref="scene2Container" style="height: 30vh; width: 100%; background-color: beige; margin-bottom: 15px;"></div>
        <label for="batidInput">Sélectionnez un bâtiment :</label>
        <select id="batidInput" v-model="idbatafficher">
          <option value="0" disabled selected>Sélectionnez un bâtiment</option>
          <option v-for="batimentsolo in batiment" :key="batimentsolo.id" :value="batimentsolo.id">{{ batimentsolo.name }}</option>
        </select>
        <button id="btn1" @click="refreshcalmyfuncpls(1)" class="custom-btn" :disabled="idbatafficher == 0" :class="{ 'disabled-btn': idbatafficher == 0 }">Place Batiment</button>
      </div>
      <div class="remove" id="remove">
        <button id="btn1" @click="refreshcalmyfuncpls(2)" class="custom-btn">remove Batiment</button>
      </div>
    </div>
    <div id="loadingScreen" class="loading-screen">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';

//import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Sky } from 'three/addons/objects/Sky.js';
//import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';

export default {
  name: 'TestMap',
  data : () => ({
    sky: null,
    sun: null,
    sky2: null,
    sun2: null,
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
    light: null,
    ambientLight: null,
    idbatafficher: 0,
    vitrine: null,
    scene2: null,
    camera2: null,
    renderer2: null,
    controls3: null,
    texture_emp: null,
    empGroupe: null,
    groupe_sol: null,
    ambientLightscene2: null,
    scene2Container: null,
    prestataire: "calixte"


    //style save batiment_bdd[0] = {name: "batiment1", type: "batiment", position: {x: 0, y: 0, z: 0}, rotation: {x: 0, y: 0, z: 0}, name_of_emp: "emp1", prestataire_id: "prestataire1"}

    //style save emplacement_bdd[0] = {name: "emp1", type: "emplacement", position: {x: 0, y: 0, z: 0}, orientation: "none", free: true}



  }),
  watch: {
    idbatafficher() {

      // Appeler la fonction batvitrine avec la nouvelle valeur
      this.batvitrine();

    }
  },
  methods: {

    batvitrine() {
      console.log("rentrer dans vitrine")
      console.log("idbat", this.idbatafficher)
      if (this.idbatafficher !== 0) {
        // Retirez tous les enfants de la vitrine
        while (this.vitrine.children.length > 0) {
          this.vitrine.remove(this.vitrine.children[0]);
        }

        // Ajoutez le nouvel objet à la vitrine
        const objet = this.batiment[this.idbatafficher - 1].child.clone();
        objet.name = this.batiment[this.idbatafficher - 1].child.name;
        objet.material = this.batiment[this.idbatafficher - 1].material;
        objet.position.set(0, 0, 0);
        console.log("objet", objet)
        this.vitrine.add(objet);
        console.log("vitrien", this.vitrine)
        console.log("batiment", this.batiment)
        console.log("scene2", this.scene2)
      }
    },

    creationscene2() {
      //test


      setTimeout(() => {
        this.scene2 = new THREE.Scene();
        this.scene2Container = this.$refs.scene2Container;

        this.camera2 = new THREE.PerspectiveCamera(75, this.scene2Container.offsetWidth / this.scene2Container.offsetHeight, 0.1, 1000);
        this.renderer2 = new THREE.WebGLRenderer();
        this.renderer2.setSize(window.innerWidth, window.innerHeight);
        this.scene2Container.appendChild(this.renderer2.domElement);
        this.renderer2.setSize(this.scene2Container.offsetWidth, this.scene2Container.offsetHeight);
        this.controls3 = new OrbitControls(this.camera2, this.renderer2.domElement);
        this.sky2 = new Sky();
        this.sky2.scale.setScalar(450000);
        this.scene2.add(this.sky2);

// Réglages pour le ciel
        this.sky2.material.uniforms.turbidity.value = 0.3;
        this.sky2.material.uniforms.rayleigh.value = 0.2;
        this.sky2.material.uniforms.mieCoefficient.value = 0.005;
        this.sky2.material.uniforms.mieDirectionalG.value = 0.7;

// Réglages pour le soleil
        this.sun2 = new THREE.Vector3();
        this.sun2.setFromSphericalCoords(1, 1.2 ,2*Math.PI + Math.PI / 5);
        this.sky2.material.uniforms.sunPosition.value.copy(this.sun2);


        this.ambientLightscene2 = new THREE.AmbientLight(0x404040);
        this.ambientLightscene2.intensity = 10; // Intensité de la lumière ambiante
        this.scene2.add(this.ambientLightscene2);
        this.controls3.update();
        this.scene2.add(this.vitrine);
        this.camera2.rotation.x = -0.5;
        this.camera2.position.set(2.5, 5, 4.5);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 1, 0);
        this.scene2.add(directionalLight);
        

      }, 310);
      ////

    },

    deletscene2() {
      this.scene2Container.removeChild(this.scene2Container.firstChild)
    },

    onMouseMove(event) {
      var position = new THREE.Vector2();
      var domRect = this.renderer.domElement.getBoundingClientRect();
      position.x = ((event.clientX - domRect.left) / domRect.width) * 2 - 1;
      position.y = -((event.clientY - domRect.top) / domRect.height) * 2 + 1;

      var temp = this.getSelectionneLePlusProche2(position);

      if (temp == 1) {
        this.selectedObject = this.getSelectionneLePlusProche(position);
      } else {
        this.selectedObject = 0
      }
      // Vérifier si l'objet est sélectionnable
      if (this.selectedObject != 0) {
        // Changer le curseur en pointeur
        this.renderer.domElement.style.cursor = 'pointer';
      } else {
        // Rétablir le curseur par défaut
        this.renderer.domElement.style.cursor = 'auto';
      }
    },


    getSelectionneLePlusProche(position) {
      // Mise à jour de la position du rayon à lancer.
      this.raycaster.setFromCamera(position, this.camera);
      console.log("raycastr", this.selectionables.children)
      // Obtenir la liste des intersections
      var selectionnes = this.raycaster.intersectObjects(this.selectionables.children);
      if (selectionnes.length) {
        return selectionnes[0].object;
      } else {
        console.log("pas sur un obj")
        return null
      }
    },

    getSelectionneLePlusProche2(position) {
      // Mise à jour de la position du rayon à lancer.
      this.raycaster.setFromCamera(position, this.camera);
      // Obtenir la liste des intersections
      var selectionnes = this.raycaster.intersectObjects(this.selectionables.children);
      if (selectionnes.length) {
        return 1;
      } else {
        console.log("pas sur un obj");
        return 0;
      }
    },


    onMouseClick(event) {
      var position = new THREE.Vector2();
      var domRect = this.renderer.domElement.getBoundingClientRect();
      position.x = ((event.clientX - domRect.left) / domRect.width) * 2 - 1;
      position.y = -((event.clientY - domRect.top) / domRect.height) * 2 + 1;
      var temp = this.getSelectionneLePlusProche2(position);

      if (temp == 1) {
        this.selectedObject = this.getSelectionneLePlusProche(position);
      } else {
        this.selectedObject = 0
      }


      var originmat;
      var origineColor;
      if (this.selectedObject) {
        originmat = this.selectedObject.material.clone();
        origineColor = this.selectedObject.material.color.getHex();
      }


      if (this.selectedObject != 0) {
        if (this.selectedObject.name.slice(-3) == "bat") {
          let found;
          for(let h = 0;h<this.batiment_bdd.length;h++){
            if(this.batiment_bdd[h].name == this.selectedObject.name){
              if (this.batiment_bdd[h].position.x == this.selectedObject.position.x && this.batiment_bdd[h].position.y == this.selectedObject.position.y && this.batiment_bdd[h].position.z == this.selectedObject.position.z){
                found = true;
                break;
              }
            }
          }
          console.log("bat");
          if (this.selectab.length == 0 && found) {
            // Toggle the 'active' class on the selectmenu div
            document.getElementById('selectmenu').classList.toggle('closed');
            document.getElementById('selectmenu').classList.toggle('supr');
            document.getElementById('remove').classList.toggle('active');
            document.getElementById('scene1').classList.toggle('active');

            this.selectedObject.material.color.setHex(0xff0000);
            var info = {obj: this.selectedObject, mat: originmat, col: origineColor, type: "bat"}
            this.selectab.push(info);
          } else {
            if (this.selectedObject.uuid == this.selectab[0]["obj"].uuid) {
              // Toggle the 'active' class on the selectmenu div
              document.getElementById('selectmenu').classList.toggle('closed');

              document.getElementById('scene1').classList.toggle('active');
              //wait 300ms
              setTimeout(() => {
                document.getElementById('remove').classList.toggle('active');
                document.getElementById('selectmenu').classList.toggle('supr');
              }, 300);
              this.selectedObject.material = this.selectab[0]["mat"].clone()
              this.selectedObject.material.color.setHex(this.selectab[0]["col"])
              this.selectab.pop(0)
              this.selectedObject = 0
            } else {
              console.log("un objet est deja select")
              this.selectedObject = 0
            }
          }
        } else {
          if (this.selectedObject.name.slice(-3) == "emp") {
            let found;
            var indice_emp_bdd;
            for (let h = 0; h < this.emplacement_bdd.length; h++) {
              if (this.emplacement_bdd[h].name == this.selectedObject.name) {
                if(this.emplacement_bdd[h].position.x == this.selectedObject.position.x && this.emplacement_bdd[h].position.y == this.selectedObject.position.y && this.emplacement_bdd[h].position.z == this.selectedObject.position.z){
                  found = true;
                  indice_emp_bdd = h;
                  break;
                }

              }
            }

            if (this.selectab.length == 0 && found) {
              // Toggle the 'active' class on the selectmenu div
              document.getElementById('selectmenu').classList.toggle('supr');
              document.getElementById('selectmenu').classList.toggle('closed');

              document.getElementById('add').classList.toggle('active');
              document.getElementById('scene1').classList.toggle('active');
              this.creationscene2()
              if (this.emplacement_bdd[indice_emp_bdd].free) {
                ///mettre l'emp en rouge
                this.selectedObject.material.color.setHex(0xff0000);
                var info2 = {obj: this.selectedObject, mat: originmat, col: origineColor, type: "emp"}
                this.selectab.push(info2);
              } else {
                console.log("l'emp est deja pris")
                this.selectedObject = 0
                console.log(this.selectedObject)
              }
            } else {
              if (this.selectedObject.name == this.selectab[0]["obj"].name) {
                // Toggle the 'active' class on the selectmenu div
                document.getElementById('selectmenu').classList.toggle('closed');

                document.getElementById('scene1').classList.toggle('active');
                //wait 300ms
                setTimeout(() => {
                  document.getElementById('add').classList.toggle('active');
                  document.getElementById('selectmenu').classList.toggle('supr');
                }, 300);
                this.deletscene2()
                this.selectedObject.material = this.selectab[0]["mat"]
                this.selectedObject.material.color.setHex(this.selectab[0]["col"])
                this.selectab.pop(0)
                this.selectedObject = 0
              } else {
                console.log("un objet est deja select")
                this.selectedObject = 0
              }

            }


          }
        }
      }
    },

    refreshcalmyfuncpls(mode) {
      console.log("refresh")
      if (this.selectab.length == 1 && this.idbatafficher >= 0 && this.idbatafficher <= this.batiment.length) {

        if (mode == 1) {
          this.deletscene2()
          document.getElementById('selectmenu').classList.toggle('closed');

          document.getElementById('scene1').classList.toggle('active');
          //wait 300ms
          setTimeout(() => {
            document.getElementById('add').classList.toggle('active');
            document.getElementById('selectmenu').classList.toggle('supr');
          }, 300);


        }
        if (mode == 2) {
          document.getElementById('selectmenu').classList.toggle('closed');

          document.getElementById('scene1').classList.toggle('active');
          //wait 300ms
          setTimeout(() => {
            document.getElementById('remove').classList.toggle('active');
            document.getElementById('selectmenu').classList.toggle('supr');
          }, 300);

        }
        //var uuid = this.selectab[0]["obj"].uuid;
        if (this.selectab[0]["type"] == "emp") {
          var indice_emp_bdd;
          for (let h = 0; h < this.emplacement_bdd.length; h++) {
            if (this.emplacement_bdd[h].name == this.selectab[0]["obj"].name) {
              if(this.emplacement_bdd[h].position.x == this.selectab[0]["obj"].position.x && this.emplacement_bdd[h].position.y == this.selectab[0]["obj"].position.y && this.emplacement_bdd[h].position.z == this.selectab[0]["obj"].position.z){
                indice_emp_bdd = h;
                break;
              }
            }
          }

          var batimentadd = this.batiment[this.idbatafficher - 1]["child"].clone();
          batimentadd.material = this.batiment[this.idbatafficher - 1]["material"].clone();
          var pos = this.emplacement_bdd[indice_emp_bdd].position;
          var y = batimentadd.position.y;


          batimentadd.position.set(pos.x, y, pos.z);
          //to do rota
          batimentadd.castShadow = true;
          batimentadd.receiveShadow = true;
          batimentadd.material.color.setHex(0xffa500);
          this.selectionables.add(batimentadd);



          ///to do gerer les asset pour save dans la bdd
          //style save batiment_bdd[0] = {name: "batiment1", type: "batiment", position: {x: 0, y: 0, z: 0}, rotation: {x: 0, y: 0, z: 0}, name_of_emp: "emp1", prestataire_id: "prestataire1"}
          var batsave = {
            name: this.batiment[this.idbatafficher - 1]["child"].name,
            type: "batiment",
            position: {x: pos.x, y: y, z: pos.z},
            rotation: {x: 0, y: 0, z: 0},
            name_of_emp: this.selectab[0]["obj"].name,
            prestataire_id: "prestataire1"
          }
          this.batiment_bdd.push(batsave)


          this.selectab[0]["obj"].material = this.selectab[0]["mat"]

          //mettre en gris
          this.selectab[0]["obj"].material.color.setHex(0x7e7e7e);
          this.nonselectionables.add(this.selectab[0]["obj"])
          this.emplacement_bdd[indice_emp_bdd].free = false
          console.log("kmlkfmlqskmlqsklfkslqk",this.emplacement_bdd[indice_emp_bdd].free)
        } else {
          if (this.selectab[0]["type"] == "bat") {
            let found;
            var indice_bdd;
            var xpos = this.selectab[0]["obj"].position.x;
            var zpos = this.selectab[0]["obj"].position.z;
            for (let h = 0; h < this.batiment_bdd.length; h++) {
              if (this.batiment_bdd[h].name == this.selectab[0]["obj"].name) {
                if (this.batiment_bdd[h].position.x == this.selectab[0]["obj"].position.x && this.batiment_bdd[h].position.y == this.selectab[0]["obj"].position.y && this.batiment_bdd[h].position.z == this.selectab[0]["obj"].position.z) {
                  found = true;
                  indice_bdd = h;
                  break;
                }
              }
            }
            if (found) {
              let name_emp = this.batiment_bdd[indice_bdd].name_of_emp;
              for (let h = 0; h < this.emplacement_bdd.length; h++) {
                if (this.emplacement_bdd[h].name == name_emp) {
                  if (this.emplacement_bdd[h].position.x == xpos && this.emplacement_bdd[h].position.z == zpos) {
                    this.emplacement_bdd[h].free = true;
                    console.log("indice ")
                    let childRemoved = false;
                    var emp_to_rmove = null
                    this.nonselectionables.traverse((child) => {
                      if (!childRemoved && child.name == name_emp) {
                        if (child.position.x == xpos && child.position.z == zpos) {
                          emp_to_rmove = child
                          childRemoved = true; // Indiquer que l'enfant a été supprimé
                        }
                      }
                    });
                    break;
                  }
                }
              }
              this.batiment_bdd.splice(indice_bdd, 1);
              emp_to_rmove.material.color.setHex(this.emp[0].material.color.getHex());
              this.selectionables.add(emp_to_rmove)
              this.selectionables.remove(this.selectab[0]["obj"]);

            }
          }



        }
        while (this.selectab.length > 0) {
          console.log("pop")
          this.selectab.pop(0);
        }
        this.selectedObject = 0
      } else {
        console.log("selectionné un batiment a retirer ")
      }
    },

    findchild(obj, childtab) {
      var id = 0;
      obj.traverse((child) => {
        if (child.isMesh) {
          var found = false;
          for (var i = 0; i < childtab.length; i++) {
            if (childtab[i] == child) {
              found = true;
            }
          }
          if (!found) {
            var name = child.name;
            var type = {fst: "", snd: ""};

            var newAsset = {
              _id: id,
              name: name,
              type: type,
              orientation: "none",
              position: child.position,
            };

            if (name.slice(-3) == "bat") {
              type = {fst: "bat"};
              newAsset.type = type;
              newAsset.position = {x: 0, y: child.position.y, z: 0};
            } else {
              if (name.slice(-3) == "emp") {
                type = {fst: "emp"};
                newAsset.type = type;
                newAsset.position = child.position;
              } else {
                type = {fst: "sol"};
                newAsset.type = type;
                newAsset.position = child.position;
              }
            }

            if (this.asset.find((x) => x.name === child.name) == undefined) {
              id++;
              this.asset.push(newAsset);
            }
            childtab.push(child);
            this.findchild(child, childtab);
          }
        }
      });
    },

    debugprestafunc(){
      console.log("debugprestafunc")
      console.log("batiment_bdd", this.batiment_bdd)
      console.log("emplacement_bdd", this.emplacement_bdd)
      //mettre le batiment 2 sur l'emplacement 4  au nom de calixte
      this.emplacement_bdd[4].free = false;

      //style save batiment_bdd[0] = {name: "batiment1", type: "batiment", position: {x: 0, y: 0, z: 0}, rotation: {x: 0, y: 0, z: 0}, name_of_emp: "emp1", prestataire_id: "prestataire1"}

      //style save emplacement_bdd[0] = {name: "emp1", type: "emplacement", position: {x: 0, y: 0, z: 0}, orientation: "none", free: true}
      var test1 = {
        name: this.batiment[2].name,
        type: "batiment",
        position: {x: this.emp[4]["child"].position.x, y: this.batiment[2]["child"].position.y, z: this.emp[4]["child"].position.z},
        rotation: {x: 0, y: 0, z: 0},
        name_of_emp: this.emp[4]["child"].name,
        prestataire_id: "calixte"
      }
      this.batiment_bdd.push(test1)


      //mettre le batiment 6 sur l'emplacement 1  au nom de prestataire1
      this.emplacement_bdd[1].free = false;

      var test2 = {
        name: this.batiment[6].name,
        type: "batiment",
        position: {x: this.emp[1]["child"].position.x, y: this.batiment[6]["child"].position.y, z: this.emp[1]["child"].position.z},
        rotation: {x: 0, y: 0, z: 0},
        name_of_emp: this.emp[1]["child"].name,
        prestataire_id: "prestataire1"
      }
      this.batiment_bdd.push(test2)


    },


    setup() {
      this.debugprestafunc()
      console.log("setup")


      for (var g = 0;g<this.emp.length;g++){
          let indice_bdd;
          let found;
          for(let h = 0;h<this.emplacement_bdd.length;h++){
            if(this.emplacement_bdd[h].name == this.emp[g]["child"].name){
                found = true;
                indice_bdd = h;
                if(found){
                  const emp_clone = this.emp[g]["child"].clone();
                  const pos = this.emplacement_bdd[indice_bdd].position;
                  emp_clone.position.set(pos.x, pos.y, pos.z);
                  emp_clone.rotation.x = 0;
                  emp_clone.rotation.y = 0;
                  emp_clone.rotation.z = 0;
                  emp_clone.castShadow = true;
                  emp_clone.receiveShadow = true;
                  emp_clone.name = this.emp[g]["child"].name;
                  emp_clone.material = this.emp[g]["material"];
                  if(!this.emplacement_bdd[indice_bdd].free){
                    //mettre en gris
                    emp_clone.material.color.setHex(0x808080);
                    this.nonselectionables.add(emp_clone);
                  }

                     else{
                    this.selectionables.add(emp_clone);

                  }
                }

              }

            }
          }

      for (let y = 0; y < this.batiment.length; y++) {
        let indice_bdd;
        let found;
        for(let h = 0;h<this.batiment_bdd.length;h++){
          if(this.batiment_bdd[h].name == this.batiment[y]["child"].name){
            found = true;
            indice_bdd = h;
            if (found) {
              var batiment_clone = this.batiment[y]["child"].clone();
              const pos = this.batiment_bdd[indice_bdd].position;
              batiment_clone.position.set(pos.x, pos.y, pos.z);
              batiment_clone.rotation.x = 0;
              batiment_clone.rotation.y = 0;
              batiment_clone.rotation.z = 0;
              batiment_clone.castShadow = true;
              batiment_clone.receiveShadow = true;
              batiment_clone.name = this.batiment[y]["child"].name;
              batiment_clone.material = this.batiment[y]["material"];
              console.log("batiment_clone", this.batiment_bdd[indice_bdd].prestataire_id)
              if (this.batiment_bdd[indice_bdd].prestataire_id == this.prestataire) {
                this.nonselectionables.add(batiment_clone);
              } else {
                //mettre en vert
                batiment_clone.material.color.setHex(0x00ff00);
                this.selectionables.add(batiment_clone);
              }
          }
        }

        }
      }

      this.camera.rotation.x = -0.5;
      this.camera.position.set(6, 10, 8);

      //todo check use
      const texture_emp = new THREE.TextureLoader().load('map/mapData/tex_socle.jpg');
      const texture_bat = new THREE.TextureLoader().load('map/mapData/albedo.jpg');
      const material_emp = new THREE.MeshPhongMaterial({map: texture_emp});
      const material_bat = new THREE.MeshPhongMaterial({map: texture_bat});
      for (var i = 0; i < this.batiment.length; i++) {
        this.batiment[i].material = material_bat;
      }
      for (var j = 0; j < this.emp.length; j++) {
        this.emp[j].material = material_emp;
      }


    },


    loadfinal() {
      return new Promise((resolve, reject) => {

      const loader = new GLTFLoader();
      loader.load('map/mapData/map_try4.glb', (gltf) => {
        const loadedGltf = gltf.scene;


        this.findchild(loadedGltf, this.children);

        var indicebat = 0;
        var indiceemp = 0;

        for (var i = 0; i < this.children.length; i++) {
          if (this.children[i].name.slice(-3) == "bat") {
            indicebat++;
            const child = this.children[i];
            const material = child.material;
            const positionY = child.position.y;

            // Créez un objet ou un tableau imbriqué pour stocker les informations
            const buildingInfo = {
              child: child,
              material: material,
              positionY: positionY,
              name: child.name,
              id: indicebat
            };

            // Ajoutez l'objet à votre tableau principal
            this.batiment.push(buildingInfo);

            console.log("buildinf", buildingInfo);

            this.children[i].castShadow = true;
            this.children[i].receiveShadow = true;
          } else {
            if (this.children[i].name.slice(-3) == "emp") {
              indiceemp++;

              const child = this.children[i];
              const material = child.material;
              const positionY = child.position.y;
              const free = true;
              const id = indiceemp;

              // Créez un objet ou un tableau imbriqué pour stocker les informations
              const empInfo = {
                child: child,
                material: material,
                positionY: positionY,
                name: child.name,
                free: free,
                id: id
              };

              // Ajoutez l'objet à votre tableau principal
              this.emp.push(empInfo);

              // ajuter l'objet a la bbd pour test
              let position1 = {x: child.position.x, y: child.position.y, z: child.position.z}
              let addbbd = {name: child.name, type: "emplacement", position: position1 , orientation: "none", free: true}
              this.emplacement_bdd.push(addbbd)



              this.children[i].castShadow = true;
              this.children[i].receiveShadow = true;

            } else {
              const texturesol = new THREE.TextureLoader().load('map/mapData/grass.jpg');
              texturesol.wrapS = THREE.RepeatWrapping;
              texturesol.wrapT = THREE.RepeatWrapping;
              texturesol.repeat.set(2, 2);
              const material_sol = new THREE.MeshPhongMaterial({ map: texturesol });
              this.children[i].material = material_sol;
              this.children[i].receiveShadow = true;
              this.groupe_sol.add(this.children[i]);
            }
          }
        }
        console.log(this.emp)
        console.log(this.empGroupe)
        // Assurez-vous d'appeler la fonction de résolution (ici, je suppose que vous avez une promesse basée sur votre code précédent)
        console.log("loadfinalfin");
        resolve();
      }, undefined, (error) => {
        console.error(error);
        reject();
      });
      });

    },



    async start(){
        this.showLoadingScreen();
        await this.loadfinal();
        this.setup();
        console.log("aftersetup", this.selectionables)
        this.scene.add(this.selectionables);
        this.scene.add(this.nonselectionables);
        this.scene.add(this.groupe_sol);
        this.scene.add(this.light);
        this.scene.add(this.ambientLight);
        this.renderer.render(this.scene, this.camera);
        this.animate();
        console.log("setupfin", this.selectionables)
        this.hideLoadingScreen();

        const geometry = new THREE.BoxGeometry(0.01, 0.01, 0.01);
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        const cube = new THREE.Mesh(geometry, material);
        this.vitrine.add(cube);
        this.scene2.add(this.vitrine);



        this.animateScene2();
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


    animateScene2() {
      requestAnimationFrame(this.animateScene2);
      this.controls3.update();
      this.vitrine.rotation.y += 0.01;
      this.renderer2.render(this.scene2, this.camera2);
    },

    animate() {
      requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    },
  },


  mounted() {

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      const scene1Container = this.$refs.scene1Container;
      this.renderer.setSize(window.innerWidth, scene1Container.offsetHeight);
    });

    this.scene = new THREE.Scene();
    //90% de la largueur de l'ecran
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.shadowMap.enabled = true;
    const scene1Container = this.$refs.scene1Container;
    this.renderer.setSize(window.innerWidth, scene1Container.offsetHeight);
    scene1Container.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);



//const canvasElement = document.querySelector('[data-engine="three.js r156"]');

    this.ambientLight = new THREE.AmbientLight(0x404040); // Couleur en hexadécimal
    this.ambientLight.intensity = 10; // Intensité de la lumière ambiante
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
//var id_prestataire = "calixte";

    this.selectionables = new THREE.Group();
    this.nonselectionables = new THREE.Group();
    this.raycaster = new THREE.Raycaster();

    this.empGroupe = new THREE.Group();
    this.groupe_sol = new THREE.Group();
    this.vitrine = new THREE.Group();




// scene 2
    this.scene2 = new THREE.Scene();
    this.scene2Container = this.$refs.scene2Container;
    this.camera2 = new THREE.PerspectiveCamera(75, this.scene2Container.offsetWidth/this.scene2Container.offsetHeight , 0.1, 1000);
    this.renderer2 = new THREE.WebGLRenderer();
    this.renderer2.setSize(window.innerWidth, window.innerHeight);
    this.controls3 = new OrbitControls(this.camera2, this.renderer2.domElement);
///mettre un fond vert
    this.scene2.background = new THREE.Color(0x00ff00);

    this.ambientLightscene2 = new THREE.AmbientLight(0x404040); // Couleur en hexadécimal
    this.ambientLightscene2.intensity = 10; // Intensité de la lumière ambiante
    this.scene2.add(this.ambientLightscene2);
    this.sky2 = new Sky();
    this.sky2.scale.setScalar(450000);
    this.scene2.add(this.sky2);

// Réglages pour le ciel
    this.sky2.material.uniforms.turbidity.value = 0.3;
    this.sky2.material.uniforms.rayleigh.value = 0.2;
    this.sky2.material.uniforms.mieCoefficient.value = 0.005;
    this.sky2.material.uniforms.mieDirectionalG.value = 0.7;

// Réglages pour le soleil
    this.sun2 = new THREE.Vector3();


// Position du soleil
    this.sun2.setFromSphericalCoords(1, 1.2 ,2*Math.PI + Math.PI / 5);
    this.controls3.update();
// Vous pouvez également ajouter des lumières ou des contrôles spécifiques à cette scène si nécessaire




/// scene 2 fin






    this.renderer.domElement.addEventListener('mousemove', this.onMouseMove);
    this.renderer.domElement.addEventListener('click', this.onMouseClick);


    this.start();


  },
};
</script>

<style>



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


.custom-btn {
  margin: 10px;
  background-color: #28a745; /* couleur verte */
  color: #fff; /* couleur du texte blanc */
  padding: 10px 15px; /* rembourrage du bouton */
  border: none; /* pas de bordure */
  border-radius: 5px; /* coins arrondis */
  cursor: pointer; /* curseur main au survol */
  font-size: 16px; /* taille du texte */
}

.custom-btn:hover {
  background-color: #218838; /* couleur verte légèrement plus foncée au survol */
}

.disabled-btn {
  background-color: #6c757d; /* Couleur grise pour le bouton désactivé */
  color: #fff; /* Couleur du texte blanc pour le bouton désactivé */
  cursor: not-allowed; /* Curseur "not-allowed" pour indiquer que le bouton est désactivé */
  /* Ajoutez d'autres styles désactivés si nécessaire */
}

.disabled-btn:hover {
  background-color: #6c757d; /* Gardez la couleur grise au survol pour le bouton désactivé */
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

.add{
  display: none;
}

.add.active{
  display: block;
}

.remove{
  display: none;
}

.remove.active{
  display: block;
}

</style>
