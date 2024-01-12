<template>
  <div>
    <div id="container" style="background-color: #D9D9D9; width: 90vw; height: 900px; max-width: 90vw; margin: 5vw; overflow: hidden; display: flex; user-select: none;" >
      <div class="scene1" id="scene1" ref="scene1Container">      </div>

      <div class="selectmenu" id="selectmenu" >

        <div class="infoBat" id="info" style="height: 100%;">
          <div class="menutop">
            <h2>information du batiment</h2>
            <div class="closepreview">
              <button id="btn1" @click="closepreview()" ><img class="croix" src="../../../public/croix.svg"> </button>
            </div>
          </div>
          <!-- liste la description le nom et le type -->
          <div class="infoBat2" style="height: 90%">



            <div class="infoBat-content" style="justify-items: center; width: 100%; height: 100%;">

              <h2>Nom : </h2> <span>{{nomBatiment}}</span>
              <h2>Type : </h2> <span>{{typeBatiment}}</span>
              <h2>Description : </h2> <span>{{descriptionBatiment}}</span>


              <FullCalendar :options="calendarOptions"  ref="fullCalendarRef" style="height: 60%;"/>

              <div v-show="selectedEvent != 0">
                <h3>Evenement : </h3> <span>{{selectedEvent.nom}}</span>
                <h3>Type : </h3> <span>{{selectedEvent.type}}</span>
                <h3>Description : </h3> <span>{{selectedEvent.description}}</span>
                <br>
                <button id="reservation" class="custom-btn">reserver une place</button>
              </div>
            </div>


          </div>
        </div>
      </div>
      <div id="loadingScreen" class="loading-screen">
        <div class="loader"></div>
      </div>

    </div>

    <div>
    </div>
    <div class="filtre">
      <!--faire une check box pour chaque type de batiment dans this.typeBatiment-->
      <div class="typeBatiment toggle-container" v-for="bat in typeBatiment" v-bind:key="bat.id_type">
        <label class="toggle">
          <input type="checkbox" :id="bat.id_type" :value="bat.id_type" v-model="typeBatimentcheck" @change="checkboxChanged(bat.id_type)">
          <span class="slider"></span>

        </label>
        <span class="label">{{bat.libelle}}</span>
    </div>

  </div>
  </div>

</template>


<script>

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Sky } from 'three/addons/objects/Sky.js';

import FullCalendar from "@fullcalendar/vue";


import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

import  {getOneBatUUID,getAllBat,getBatType} from '../../services/mapPrestataire.service.js';
import  {getEventUUID,getEvent} from '../../services/scene.service.js';
import dispon from '../../services/reservation.js';


//getBatbyEmpUUID,getOneEmpUUID,getOneEmp
export default {
  components: {
    FullCalendar,
  },
  name: "Map3DUser.vue",
  data(){
    return {
    //nbactivité: 0,


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
    nomBatiment: null,
    typeBatiment: [],
    descriptionBatiment: null,
    typeBatimentcheck: [],
    currentEvents: [],
    nom_Event: "",
    selectedEvent: 0,
    calendarOptions: {
      height: '70%',
      plugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin, // needed for dateClick,
      ],
      headerToolbar: {
        left: "prev,next",
        center: "title",
        right: "timeGridFourDay,timeGridDay",
      },
      initialView: "timeGridFourDay",
      // alternatively, use the `events` setting to fetch from a feed
      /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
      slotLabelFormat: [
        {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }
      ],
      //faire un event de 8h a 14h
      initialDate: '2024-06-01',
      slotDuration: '00:30',
      events: this.currentEvents ? this.currentEvents.map(event => ({
        title: event.nom,
        start: event.start,
        end: event.end,
        color: event.color,
        description: event.description,
      })) : [],
      //show description on click
      eventClick: async (info) => {
        tippy(info.el, {
          content: info.event.extendedProps.description,
        })
        if (info.event._def.publicId == this.selectedEvent.id_reservation) {
          console.log("jklsfjcklsdvnc,kqsdcvnk,qsdnc qsd,k n,qsdn jkqsnjkdvnqkdklalllo")
          let id = this.selectedEvent.id_batiment;
          this.selectedEvent = 0;
          await this.refreshcalendare(id);

          this.uuidsceneSelect = 0;
        } else {
          const event = await dispon.getDispoByID(info.event._def.publicId);

          this.selectedEvent = event[0];
          await this.refreshcalendare(event[0].id_batiment);
        }

      },
      views: {
        timeGridFourDay: {
          type: 'timeGrid',
          duration: { days: 4 },
          buttonText: '4 day',
          dayHeaderFormat: { weekday: "long", month: "numeric", day: "numeric", omitCommas: true },
          slotDuration: '00:30',
          slotLabelFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
        },
        timeGridDay: { // Assurez-vous que cette configuration est correcte pour la vue timeGridDay
          type: 'timeGrid',
          duration: {days: 1},
          buttonText: '1 day',
          allDaySlot: false,
          dayHeaderFormat: {weekday: "long", month: "numeric", day: "numeric", omitCommas: true},
          slotDuration: '00:30',
        },
      },

    },
    uuidsceneSelect: 0,
    uuidbat: 0,
    eventScene: [],
    description_event: "",
    typeBatimeent: "",
    checkedtype: [],
    tabbatlist: [],

  }},
  methods: {

    async findtypebatiment(id){
      console.log("id", id)
      console.log("typeBatiment", this.typeBatiment)
      for (let i = 0; i < this.typeBatiment.length; i++) {
        console.log("typeBatiment[i].id_type", this.typeBatiment[i].id_type)
        if (this.typeBatiment[i].id_type == id) {
          return this.typeBatiment[i]
        }
      }
    },

    async checkboxChanged(type){
      console.log("type", type)
      console.log("typeBatimentcheckstart", this.typeBatimentcheck)
      //ajouter ou enlever la ligne typeBatiment dans typeBatimentcheck
        //enlever la ligne

              //mettre en vert tout les batiments dans le groupe restauration
                for (let j = 0; j < this.selectionables.children.length; j++) {
                  if (this.selectionables.children[j].name.slice(4,5) == type) {
                    let model = await this.findObjectByName(this.loaded, this.selectionables.children[j].name)
                    console.log("modelif", model)
                    if (model.material.color.getHex() == this.selectionables.children[j].material.color.getHex()) {
                    //mettre en vert
                      this.selectionables.children[j].material.color.setHex(0x00ff00);
                    }
                    else{
                      //remeetre la couleur de base
                      this.selectionables.children[j].material.color.setHex(model.material.color.getHex());
                    }
                  }
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


    loadfinal() {
      return new Promise((resolve, reject) => {



        const loader = new GLTFLoader();
        loader.load('map/mapData/map_belfo.glb', async (gltf) => {

          console.log("children", this.children)

          const loadedGltf = gltf.scene;
          this.loaded = loadedGltf


          this.children = [];
          this.findchild(loadedGltf, this.children);



          var idbat = -1;

          for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].name.slice(0,3) == "bat") {
              idbat++;
              var info = {
                id: idbat,
                name: this.children[i].name,
              }
              var texturebat;
              if(this.children[i].name == "bat_3_confer"){
                texturebat = new THREE.TextureLoader().load('map/mapData/tex/tex_conf.png');
                info = {
                  id: idbat,
                  name: this.children[i].name,
                  nom: "Salle de conférence",
                  type: "Salle de conférence",
                  selected: true
                }
              }
              if(this.children[i].name == "bat_1_rest"){
                texturebat = new THREE.TextureLoader().load('map/mapData/tex/bat_rest.png');
                info = {
                  id: idbat,
                  name: this.children[i].name,
                  nom: "Restaurants 1",
                  type: "Restaurants",
                  selected: true
                }
              }
              if(this.children[i].name == "bat_1_resto2"){
                texturebat = new THREE.TextureLoader().load('map/mapData/tex/bato_resto2.png');
                info = {
                  id: idbat,
                  name: this.children[i].name,
                  nom: "Restaurants 2",
                  type: "Restaurants",
                  selected: true
                }
              }
              if(this.children[i].name == "bat_1_foodtruck"){
                texturebat = new THREE.TextureLoader().load('map/mapData/tex/tex_foodtruck.png');
                info = {
                  id: idbat,
                  name: this.children[i].name,
                  nom: "Foodtruck",
                  type: "Restaurants",
                  selected: true
                }
              }
              if(this.children[i].name == "bat_2_roue"){
                texturebat = new THREE.TextureLoader().load('map/mapData/tex/tex_roue.png');
                info = {
                  id: idbat,
                  name: this.children[i].name,
                  nom: "Grande roue",
                  type: "Attractions",
                  selected: true
                }
              }
              if(this.children[i].name == "bat_5_arcade"){
                texturebat = new THREE.TextureLoader().load('map/mapData/tex/tex_arcade.png');
                info = {
                  id: idbat,
                  name: this.children[i].name,
                  nom: "Arcade",
                  type: "Attractions",
                  selected: true
                }
              }
              if(this.children[i].name == "bat_2_attrfutur"){
                texturebat = new THREE.TextureLoader().load('map/mapData/tex/tex_attrfutur.png');
                info = {
                  id: idbat,
                  name: this.children[i].name,
                  nom: "Attraction futuriste",
                  type: "Attractions",
                  selected: true
                }
              }
              if(this.children[i].name == "bat_2_roller"){
                info = {
                  id: idbat,
                  name: this.children[i].name,
                  nom: "Roller coaster",
                  type: "Attractions",
                  selected: true
                }
              }
              //stand
              if(this.children[i].name == "bat_5_stand"){
                info = {
                  id: idbat,
                  name: this.children[i].name,
                  nom: "Stand",
                  type: "stand",
                  selected: true
                }
              }
              //boutique
              if(this.children[i].name == "bat_4_boutique"){
                texturebat = new THREE.TextureLoader().load('map/mapData/tex/tex_boutique.png');
                info = {
                  id: idbat,
                  name: this.children[i].name,
                  nom: "Boutique",
                  type: "boutique",
                  selected: true
                }
              }
              if(this.children[i].name.includes("wc")){
                texturebat = new THREE.TextureLoader().load('map/mapData/tex/tex_wc.png');
                info = {
                  id: idbat,
                  name: this.children[i].name,
                  nom: "Toilettes",
                  type: "toilettes",
                  selected: true
                }
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
                    const texturesol = new THREE.TextureLoader().load('map/mapData/tex/tex_sol.png');
                    texturesol.flipY = false;
                    const mat_sol = new THREE.MeshPhongMaterial({map: texturesol});
                    this.children[i].material = mat_sol;
                    this.children[i].material.metalness = 0;
                    this.children[i].receiveShadow = true;
                    console.log("sol",this.children[i])
                    this.groupe_sol.add(this.children[i]);
                  }
                  else{
                    const texturesol = new THREE.TextureLoader().load('map/mapData/tex/tex_arrsol.png');
                    texturesol.flipY = false;
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
                    if(this.children[i].name.includes("sapins")){
                      console.log("sapin")
                      const texturetree = new THREE.TextureLoader().load('map/mapData/tex/tex_tree.png');
                      texturetree.flipY = false;
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
      this.batiment_bdd = await getAllBat();
      console.log("batiments", this.batiment_bdd)
      console.log("batiments", this.batiment)
      for (let i = 0; i< this.batiment_bdd.length; i++) {
        if (this.batiment_bdd[i].status == "accepted"){
          for (let j = 0; j < this.batiment.length; j++) {

            if (this.batiment_bdd[i].name == this.batiment[j].name) {
              console.log("batiment", this.batiment_bdd[i])
              console.log(this.batiment[j].type)
              console.log(this.batiment[j].type === "Salle de conférence")

              var batiment_found = await this.findObjectByName(this.loaded, this.batiment[j].name)
              console.log(batiment_found)
              var batiment_clone = batiment_found.clone();
              let mat = batiment_clone.material.clone();
              let point3D = this.point2Dto3D(this.batiment_bdd[i].posx,this.batiment_bdd[i].posz)
              console.log("point", point3D)

              batiment_clone.position.set(this.batiment_bdd[i].posx, this.batiment_bdd[i].posy, this.batiment_bdd[i].posz);
              batiment_clone.material.metalness = 0;
              batiment_clone.material = mat;
              batiment_clone.castShadow = true;
              batiment_clone.receiveShadow = true;
              batiment_clone.rotation.z = this.batiment_bdd[i].rota;
              batiment_clone.userData = {uuid: this.batiment_bdd[i].id_batiment, emp_uuid: this.batiment_bdd[i].id_emplacement ,description: this.batiment_bdd[i].description};



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

    async closepreview(){
      document.getElementById('selectmenu').classList.toggle('closed');
      document.getElementById('info').classList.toggle('active');
      document.getElementById('scene1').classList.toggle('active');
      this.selectedObject = 0
    },

    async start(){
      this.showLoadingScreen();
      await this.loadfinal();
      await this.setup();
      await this.batimentType();
      this.scene.add(this.selectionables);
      this.scene.add(this.nonselectionables);
      this.scene.add(this.groupe_sol);
      this.scene.add(this.light);
      this.scene.add(this.ambientLight);
      this.renderer.render(this.scene, this.camera);
      this.animate();
      this.hideLoadingScreen();

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

    async point2Dto3D(x, z ) {
      let botrghtpretty = [8.909232717044802, -20.492076873779297]
      let botrght3D = [275.13375854492188, 1.8496733903884888,275]

      let point3D2 = {
        x: (botrght3D[0] * x) / botrghtpretty[0],
        z: (botrght3D[2] * z) / botrghtpretty[1]-20
      }
      return point3D2;
    },


    async matriceTo3DEmp(matricepoints, name, posx, posz, emp_uuid) {
      let center = await this.point2Dto3D(posz, posx);
      console.log("center", center);

      // Inversion (flip) des coordonnées y dans la matrice
      const flippedMatrice = matricepoints.map(([x, y]) => [y, -x]);
      //console.log("flippedMatrice", flippedMatrice);

      const points = flippedMatrice.map(([x, y]) => new THREE.Vector3(x, y));
      //console.log("points", points);

      // Mise à l'échell
      for (let i = 0; i < points.length; i++) {
        let pointemp = await this.point2Dto3D(points[i].x, points[i].y);

        points[i].x = pointemp.x - center.x;
        points[i].y = pointemp.z - center.z;
      }

      // Le reste de votre code...



      // Épaisseur de l'objet
      const depth = 2;
      const shape = new THREE.Shape(points);

      const geome = new THREE.ExtrudeGeometry(shape, { depth: depth, bevelEnabled: false });
      geome.rotateX(-Math.PI/2)

      const texture_emp = new THREE.TextureLoader().load('map/mapData/tex/tex_emp.png');
      const material_emp = new THREE.MeshPhongMaterial({ map: texture_emp });
      const mesh = new THREE.Mesh(geome, material_emp);
      mesh.position.set(center.x, 0, center.z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.name = name;
      mesh.userData = {uuid: emp_uuid};
      return mesh;
    },



    filteredTypes() {
      // Utilisez cette propriété calculée pour filtrer le tableau uniqueTypes selon vos besoins
      // Par exemple, si vous ne voulez afficher que les types qui sont sélectionnés, vous pouvez faire :
      for(let i = 0; i < this.batiment.length; i++){
        if(this.batiment[i].selected){
          this.tabbatlist.push(this.batiment[i]);
        }
        let foundinchecklist = false;
        for(let j = 0; j < this.checkedtype.length; j++){
          if(this.batiment[i].type == this.checkedtype[j].type){
            foundinchecklist = true;
          }
        }
        if(!foundinchecklist){
          this.checkedtype.push(this.batiment[i].type)
        }
      }

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
        if (this.selectedObject.name.slice(0, 3) == "bat") {
          console.log("batiment", this.selectedObject.name)
          console.log("batiment", this.selectedObject.name.slice(4, 5))


          let found;
          let batiment;
          found = await getOneBatUUID(this.selectedObject.userData.uuid);
          console.log("found batiment click", found)
          if (found != []) {
            batiment = found
            found = true;
          } else {
            found = false;
          }

          if (this.selectab.length == 0 && found) {
            this.eventScene = await getEvent(this.selectedObject.userData.uuid);
            // Toggle the 'active' class on the selectmenu div
            console.log("events", this.eventScene.length)


            this.selectedObject.material.color.setHex(0xff0000);
            var info
              document.getElementById('selectmenu').classList.toggle('closed');
              document.getElementById('selectmenu').classList.toggle('supr');
              document.getElementById('scene1').classList.toggle('active');


              let uuidScene = batiment[0].id_batiment
              console.log(uuidScene)
              this.uuidsceneSelect = uuidScene
              this.refreshcalendare(uuidScene)
              info = {obj: this.selectedObject, mat: originmat, col: origineColor, type: "conf"}
              this.selectab.push(info);
              this.nomBatiment = batiment[0].nom
              this.descriptionBatiment = batiment[0].description
              this.typeBatiment = batiment[0].type
          } else {
            if (this.selectedObject.uuid == this.selectab[0]["obj"].uuid) {
              // Toggle the 'active' class on the selectmenu div
              document.getElementById('selectmenu').classList.toggle('closed');

              document.getElementById('scene1').classList.toggle('active');
              //wait 300ms
              setTimeout(() => {
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

        }
      }
    },
    async eventParser(event){
      console.log("event", event)

      if(event.status != "accepted"){
        return null;
      }
      else{
        event.color = "green";
      }

      if(this.selectedEvent != 0) {
        if (event.id == this.selectedEvent.id_reservation) {
          event.color = "blue";
        }
      }





      let data = {
        id : event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        color: event.color,
        description: event.description,
      }
      return data;
    },

    async monthDaySwap(date) {
      let date2 = new Date(date);
      let day = date2.getDate();
      let month = date2.getMonth() + 1;
      let year = date2.getFullYear();
      let hour = date2.getHours();
      let minute = date2.getMinutes();
      let second = date2.getSeconds();

      // Ajoute un zéro devant le mois, le jour, l'heure, les minutes et les secondes si nécessaire
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      hour = hour < 10 ? "0" + hour : hour;
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;

      let date3 = year + "-" + day + "-" + month + "T" + hour + ":" + minute + ":" + second + ".000Z";
      return date3;
    },

    async refreshcalendare( uuid) {

      let resa = await dispon.getAllDispoById(uuid);

      console.log("resa", resa)


      this.currentEvents = [];

      for (let i = 0; i < resa.length; i++) {
        let start2 = new Date(resa[i].ouverture);
        let duree = resa[i].duree;

        // Créer une copie de la date de début pour éviter de modifier la date d'origine
        let end2 = new Date(start2);
        end2.setMinutes(end2.getMinutes() + duree);

        end2 = await this.monthDaySwap(end2);
        start2 = await this.monthDaySwap(start2);

        console.log("start2", start2)
        console.log("end2", end2)

        let status = resa[i].status;

        let datadispo = {
          id : resa[i].id_reservation,
          title: resa[i].nom,
          start: start2,
          end: end2,
          color: resa[i].color,
          description: resa[i].description,
          id_prestataire: resa[i].id_prestataire,
          status: status,
        }
        let data = await this.eventParser(datadispo);
        if(data != null){
          await this.currentEvents.push(data);
        }
      }
      console.log("currentEvents", this.currentEvents)
      this.$refs.fullCalendarRef.getApi().setOption('events', this.currentEvents);

      console.log("refreshcalendare");
      console.log("uuid", uuid);
      console.log("this.currentEvents", this.currentEvents);
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
      //document.getElementById('selectmenu').style.display = 'none';
      document.getElementById('selectmenu').style.visibility = 'hidden';


    },
    hideLoadingScreen() {
      document.getElementById('loadingScreen').style.display = 'none';
      document.getElementById('scene1').style.display = 'flex';
      //document.getElementById('selectmenu').style.display = 'block';

      document.getElementById('selectmenu').style.visibility = 'visible';
      document.getElementById('selectmenu').classList.toggle('closed');
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    },


    async batimentType(){
      let battype = []
      battype = await getBatType()
      console.log("battype", battype)
      for (let i = 0; i < battype.length; i++) {
        this.typeBatiment.push(battype[i])

      }
      return battype
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

.calendare{
  width: 70%;
  visibility: hidden;
  position: absolute;
}

.calendare.here{
  visibility: visible;
  position: relative;
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


#btn1{
  all: unset;
  height: 30px;
  width: 30px;
}

.croix{
  height: 30px;
  width: 30px;
}

.menutop{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.filtre{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
  margin-left: 10%;
}

.toggle-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.toggle {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #2196F3;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4CAF50;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.fc-time-grid.fc-content-skeleton {
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  height: 100%; }
</style>