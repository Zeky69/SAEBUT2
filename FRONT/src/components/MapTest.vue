<template>
  <div id="container" style="background-color: #D9D9D9; width: 90vw; height: 900px; max-width: 90vw; margin: 5vw; overflow: hidden; display: flex; user-select: none;" >
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
        <br>
        <label for="rotationInput">Rotation du bâtiment :</label>
        <br>
        <input type="range" id="rotationInput" v-model="rotation" min="0" max="360" step="1"/>
        <span>{{ this.rotation }}°</span>
        <br>
        <button id="btn1" @click="refreshcalmyfuncpls(1)" class="custom-btn" :disabled="idbatafficher == -1" :class="{ 'disabled-btn': idbatafficher == -1 }">Place Batiment</button>

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

//importer service/mapPrestataires.js
import {getAllEmp,getOneEmp,getOneBat, updateEmpFree, createBat, getAllBat} from '../services/mapPrestataire.service.js';

/*   getAllEmp,
getOneEmp
createEmp,
    deleteEmp,
    getAllbat,
    createbat,
    deletebat*/


import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Sky } from 'three/addons/objects/Sky.js';
export default {
  name: 'TestMap',
  data : () => ({
    loaded: null,
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
    previewgroupe: null,
    previewbatiewbatiment: null,
    rotation: null,
    light: null,
    ambientLight: null,
    idbatafficher: -1,
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
    prestataire: "calixte",
    testshape: [],


    //style save batiment_bdd[0] = {name: "batiment1", type: "batiment", position: {x: 0, y: 0, z: 0}, rotation: {x: 0, y: 0, z: 0}, name_of_emp: "emp1", prestataire_id: "prestataire1", status: "en cours"}

    //style save emplacement_bdd[0] = {name: "emp1", type: "emplacement", position: {x: 0, y: 0, z: 0}, orientation: "none", free: true}



  }),
  watch: {
    idbatafficher() {

      // Appeler la fonction batvitrine avec la nouvelle valeur
      this.batvitrine();
      this.previewbat();

    },
    rotation(){
      this.previewbatiewbatiment.rotation.z = this.rotation * Math.PI / 180;
    }
  },
  methods: {

    handleResize() {
      // Logique de gestion du redimensionnement
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      const scene1Container = this.$refs.scene1Container;
      this.renderer.setSize(window.innerWidth, scene1Container.offsetHeight);
      this.renderer.outputEncoding = THREE.LinearToneMapping;
    },

    async findObjectByName(object, name) {
      // Vérifier si l'objet actuel a le nom recherché
      if (object.name === name) {
        return object;
      }

      // Si l'objet a des enfants, parcourir récursivement chaque enfant
      if (object.children) {
        for (const child of object.children) {
          const foundObject = await this.findObjectByName(child, name);
          if (foundObject) {
            return foundObject;
          }
        }
      }

      // Aucun objet trouvé avec le nom donné dans cette branche
      return null;
    },

    async previewbat() {
      console.log("previewbat")
      if (this.idbatafficher !== -1) {
        // Retirez tous les enfants de la vitrine
        while (this.previewgroupe.children.length > 0) {
          this.previewgroupe.remove(this.previewgroupe.children[0]);
        }

        // Ajoutez le nouvel objet à la vitrine
        console.log("batiment", this.batiment)
        console.log("bat a afficher", this.batiment[this.idbatafficher].name)
        var objet_model = await this.findObjectByName(this.loaded, this.batiment[this.idbatafficher].name)
        console.log("objet_model", objet_model)
        var objet = objet_model.clone();
        objet.position.set(0, objet.position.y, 0);
        objet.name = this.batiment[this.idbatafficher].name;
        this.previewbatiewbatiment = objet;
        //mettre en gris
        this.previewbatiewbatiment.material.color.setHex(0x7e7e7e);
        this.previewgroupe.add(objet);
        this.rotation;
        this.previewbatiewbatiment.position.x = this.selectab[0]["obj"].position.x;
        this.previewbatiewbatiment.position.z = this.selectab[0]["obj"].position.z;
        console.log("previewgroupe", this.previewgroupe)
      }
    },


    async batvitrine() {
      console.log("rentrer dans vitrine")
      console.log("idbat", this.idbatafficher)
      console.log(this.loaded)
      if (this.idbatafficher !== -1) {
        // Retirez tous les enfants de la vitrine
        while (this.vitrine.children.length > 0) {
          this.vitrine.remove(this.vitrine.children[0]);
        }

        // Ajoutez le nouvel objet à la vitrine
        console.log("batiment", this.batiment)
        console.log("bat a afficher", this.batiment[this.idbatafficher].name)
        var objet_model = await this.findObjectByName(this.loaded, this.batiment[this.idbatafficher].name)
        console.log("objet_model", objet_model)
        var objet = objet_model.clone();
        objet.position.set(0, objet.position.y, 0);
        objet.name = this.batiment[this.idbatafficher].name;
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
        this.camera2.position.set(25, 50, 45);
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
      // Obtenir la liste des intersections
      var selectionnes = this.raycaster.intersectObjects(this.selectionables.children);
      if (selectionnes.length) {
        return selectionnes[0].object;
      } else {
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
        return 0;
      }
    },


    async onMouseClick(event) {
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
        if (this.selectedObject.name.slice(0,3) == "bat") {
          let found;
          found = await getOneBat({name: this.selectedObject.name, posx: this.selectedObject.position.x, posz: this.selectedObject.position.z});
          if (found != []){
            found = true;
          }
          else {
            found = false;
          }

          console.log("bat");
          console.log("found", found)
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
          if (this.selectedObject.name.slice(0,3) == "emp") {
            let found;
            found = await getOneEmp({name: this.selectedObject.name, posx: this.selectedObject.position.x, posz: this.selectedObject.position.z});
            if (found != []){
              found = true;
            }
            else {
              found = false;
            }

            if (this.selectab.length == 0 && found) {
              // Toggle the 'active' class on the selectmenu div
              document.getElementById('selectmenu').classList.toggle('supr');
              document.getElementById('selectmenu').classList.toggle('closed');

              document.getElementById('add').classList.toggle('active');
              document.getElementById('scene1').classList.toggle('active');
              this.creationscene2()
                this.selectedObject.material.color.setHex(0xff0000);
                var info2 = {obj: this.selectedObject, mat: originmat, col: origineColor, type: "emp"}
                this.selectab.push(info2);
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

    async clearpreviewbat() {
      console.log("clearpreviewbat")
      if (this.idbatafficher !== -1) {
        // Retirez tous les enfants de la vitrine
        while (this.previewgroupe.children.length > 0) {
          this.previewgroupe.remove(this.previewgroupe.children[0]);
        }
      }
    },

    async refreshcalmyfuncpls(mode) {
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
          let found;
          let empbdd = null;
          found = await getOneEmp({name: this.selectab[0]["obj"].name, posx: this.selectab[0]["obj"].position.x, posz: this.selectab[0]["obj"].position.z});
          if (found != []){
            empbdd = found[0];
            found = true;

          }
          else {
            found = false;
          }
          if(!found){
            console.log("emp n'est pas dans la bdd")
            return
          }
          console.log("temoijdkljdkljzskldjklsjlk")
          console.log(this.idbatafficher)
          console.log(this.batiment[this.idbatafficher].name)
          console.log("load", this.loaded)
          var batiment_bdd_found = await this.findObjectByName(this.loaded, this.batiment[this.idbatafficher].name)
          var batimentadd = batiment_bdd_found.clone();
          var mat = batimentadd.material.clone();
          var battobdd = batimentadd.toJSON()
          try{
            battobdd.images[0].url = "none"
          } catch (e) {
            console.log("pas d'image")
          }
          batimentadd.material = mat;
          var posx= empbdd.posx;
          var posz= empbdd.posz;
          var y = batimentadd.position.y;

          var databat = {
            name: batimentadd.name,
            emp_uuid: this.selectab[0]["obj"].name,
            posx: posx,
            posy: y,
            posz: posz,
            prestataire_id: this.prestataire,
          }

          this.clearpreviewbat();

          batimentadd.position.set(posx, y, posz);
          //to do rota
          batimentadd.castShadow = true;
          batimentadd.receiveShadow = true;
          batimentadd.material.color.setHex(0xffa500);
          this.selectionables.add(batimentadd);

          await createBat(databat);

          let data = {
            name: this.selectab[0]["obj"].name,
            posx: databat.posx,
            posz: databat.posz,
            batid: this.batiment[2].id,
          }

          await updateEmpFree(data);

          ///to do gerer les asset pour save dans la bdd
          //style save batiment_bdd[0] = {name: "batiment1", type: "batiment", position: {x: 0, y: 0, z: 0}, rotation: {x: 0, y: 0, z: 0}, name_of_emp: "emp1", prestataire_id: "prestataire1"}


          this.selectab[0]["obj"].material = this.selectab[0]["mat"]

          //mettre en gris
          this.selectab[0]["obj"].material.color.setHex(0x7e7e7e);
          this.nonselectionables.add(this.selectab[0]["obj"])
        } else {
          if (this.selectab[0]["type"] == "bat") {
            let found;
            let batbdd = null;
            var indice_bdd;
            var xpos = this.selectab[0]["obj"].position.x;
            var zpos = this.selectab[0]["obj"].position.z;
            found = await getOneBat({name: this.selectab[0]["obj"].name, posx: this.selectab[0]["obj"].position.x, posz: this.selectab[0]["obj"].position.z});
            if (found != []){
              batbdd = found[0];
              console.log("batbdd", batbdd)
              found = true;
            }
            else {
              found = false;
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
      obj.traverse((child) => {
        if (child.isMesh && !childtab.includes(child)) {
            childtab.push(child);
          this.findchild(child, childtab);
        }
      });
    },

    async debugprestafunc() {
      console.log("debugprestafunc")
      //mettre le batiment 2 sur l'emplacement 4  au nom de calixte

      //style save batiment_bdd[0] = {name: "batiment1", type: "batiment", position: {x: 0, y: 0, z: 0}, rotation: {x: 0, y: 0, z: 0}, name_of_emp: "emp1", prestataire_id: "prestataire1"}

      //style save emplacement_bdd[0] = {name: "emp1", type: "emplacement", position: {x: 0, y: 0, z: 0}, orientation: "none", free: true}
      var emp = await this.findObjectByName(this.loaded, this.emp[4])
      console.log("emp", emp)
      var posx = emp.position.x;
      var posz = emp.position.z;
      //var empbdd = await getOneEmp({name: emp.name, posx: posx, posz : posz});
      console.log("batiment", this.batiment)
      var bat = await this.findObjectByName(this.loaded, this.batiment[2].name)
      var batjson = bat.toJSON()
      try{
        batjson.images[0].url = "none"
      } catch (e) {
        console.log("pas d'image")
      }
      var test1 = {
        objet: batjson,
        posx: posx,
        posy: bat.position.y,
        posz: posz,
        prestataire_id: "calixte",
        status: "accepted"
      }

      await createBat(test1);

      let data = {
        name: emp.name,
        posx: test1.posx,
        posz: test1.posz,
        batid: this.batiment[2].id,
      }

      await updateEmpFree(data);


      //mettre le batiment 6 sur l'emplacement 1  au nom de prestataire1

      var emp2 = await this.findObjectByName(this.loaded, this.emp[1])
      console.log("emp", emp2)
      var posx2 = emp2.position.x;
      var posz2 = emp2.position.z;
      //var empbdd = await getOneEmp({name: emp.name, posx: posx, posz : posz});
      console.log("batiment", this.batiment)
      var bat2 = await this.findObjectByName(this.loaded, this.batiment[6].name)
      var batjson2 = bat2.toJSON()
      try{
        batjson2.images[0].url = "none"
      } catch (e) {
        console.log("pas d'image")
      }
      var test2 = {
        objet: batjson2,
        posx: posx2,
        posy: bat2.position.y,
        posz: posz2,
        prestataire_id: "calixte",
        status: "waiting"
      }

      await createBat(test2);

      data = {
        name: emp2.name,
        posx: test2.posx,
        posz: test2.posz,
        batid: this.batiment[6].id,
      }

      await updateEmpFree(data);

      //mettre le batiment 7 sur l'emplacement 7  au nom de prestataire1

      var emp3 = await this.findObjectByName(this.loaded, this.emp[7])
      console.log("emp", emp3)
      var posx3 = emp3.position.x;
      var posz3 = emp3.position.z;
      //var empbdd = await getOneEmp({name: emp.name, posx: posx, posz : posz});
      console.log("batiment", this.batiment)
      var bat3 = await this.findObjectByName(this.loaded, this.batiment[7].name)
      var batjson3 = bat3.toJSON()
      try{
        batjson3.images[0].url = "none"
      } catch (e) {
        console.log("pas d'image")
      }
      var test3 = {
        objet: batjson3,
        posx: posx3,
        posy: bat3.position.y,
        posz: posz3,
        prestataire_id: "prestataire1",
        status: "accepted"
      }

      await createBat(test3);

      data = {
        name: emp3.name,
        posx: test3.posx,
        posz: test3.posz,
        batid: this.batiment[7].id,
      }

      await updateEmpFree(data);

    },


    async setup() {
      //await this.debugprestafunc()
      console.log("setup")
      const texture_bat = new THREE.TextureLoader().load('map/mapData/albedo.jpg');
      const material_bat = new THREE.MeshPhongMaterial({map: texture_bat});

      this.emplacement_bdd = await getAllEmp();
      console.log("emplacement_bdd", this.emplacement_bdd)
      for (let i = 0; i < this.emplacement_bdd.length; i++) {
          console.log("emplacement", this.emplacement_bdd[i])
          var matricepoints = this.emplacement_bdd[i].matricepoints.matricepoints
          console.log("mat", matricepoints)

        //pour chaque point mettre les coordonné de 2D a 3D
          for(let j = 0 ; j < matricepoints.length ; j++){
            let newPoint = this.point2Dto3D(matricepoints[i][0],matricepoints[i][1] )
            console.log("newpoint", j, " :  ", newPoint)
          }
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
            if (this.batiment_bdd[i].prestataire_id != this.prestataire) {
              this.nonselectionables.add(batiment_clone);
            } else {
              if (this.batiment_bdd[i].status == "accepted") {
                //mettre en vert
                batiment_clone.material.color.setHex(0x00ff00);
                this.selectionables.add(batiment_clone);
              } else {
                if (this.batiment_bdd[i].status == "waiting") {
                  //metre en orange
                  batiment_clone.material.color.setHex(0xffa500);
                  this.selectionables.add(batiment_clone);
                }
              }

            }
          }
        }
      }

      this.camera.rotation.x = -0.7;
      this.camera.position.set(120, 100, 160);

      console.log("selectionables", this.selectionables)
      console.log("nonselectionables", this.nonselectionables)


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
            if (this.children[i].name.slice(0, 3) == "emp") {
              this.emp.push(this.children[i].name)
              var objetdata = this.children[i].toJSON()
              try{
                objetdata.images[0].url = "none"
              } catch (e) {
                console.log("pas d'image")
              }
              //var data = {objet: objetdata ,idModel: this.children[i].id,posx: this.children[i].position.x , posy: this.children[i].position.y, posz: this.children[i].position.z}
              //createEmp(data)


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
        }
        // Assurez-vous d'appeler la fonction de résolution (ici, je suppose que vous avez une promesse basée sur votre code précédent)

        resolve();
      }, undefined, (error) => {
        console.error(error);
        reject();
      });
      });

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



    async start(){
        this.testshape = [[-119.60863494873047-25,101.35678100585938-25], [-119.60863494873047-25, 101.35678100585938+25], [-119.60863494873047+25,101.35678100585938+25 ], [-119.60863494873047+25, 101.35678100585938-25]]
        this.showLoadingScreen();
        await this.loadfinal();
        const test = await this.matriceTo3DEmp(this.testshape);
        this.selectionables.add(test);
        await this.setup();
        console.log("aftersetup", this.selectionables)
        this.scene.add(this.selectionables);
        this.scene.add(this.nonselectionables);
        this.scene.add(this.previewgroupe);
        this.scene.add(this.groupe_sol);
        this.scene.add(this.light);
        this.scene.add(this.ambientLight);
        this.renderer.render(this.scene, this.camera);
        this.animate();
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
//var id_prestataire = "calixte";

    this.selectionables = new THREE.Group();
    this.nonselectionables = new THREE.Group();
    this.previewgroupe = new THREE.Group();
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
    this.resizeListener = this.handleResize.bind(this);
    window.addEventListener('resize', this.resizeListener);



    this.start();


  },
  beforeDestroy() {
    this.renderer.domElement.removeEventListener('mousemove', this.onMouseMove);
    this.renderer.domElement.removeEventListener('click', this.onMouseClick);

    window.removeEventListener('resize', this.resizeListener);
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
