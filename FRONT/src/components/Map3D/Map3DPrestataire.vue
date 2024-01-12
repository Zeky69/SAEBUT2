<template>
  <div id="container" style="background-color: #D9D9D9; width: 80vw; height: 90vh; max-width: 90vw; margin: 2vw; overflow: hidden; display: flex; user-select: none;" >

    <div class="scene1" id="scene1" ref="scene1Container">      </div>

    <div class="selectmenu" id="selectmenu" >
      <div class="add" id="add">
        <div class="topmenu">

          <h2>previsualisation du batiment</h2>
          <div class="closepreview">
            <button id="btn1" @click="closepreview(1)" ><img class="croix" src="../../../public/croix.svg"> </button>
          </div>
        </div>

        <div class="previsual">

          <div class="scene2" ref="scene2Container" style="height: 30vh; width: 100%; background-color: beige; margin-bottom: 15px;"></div>
          <label for="batidInput">Sélectionnez un bâtiment :</label>
          <select id="batidInput" v-model="idbatafficher">
            <option value=-1 disabled selected>Sélectionnez un bâtiment</option>
            <option v-for="batimentsolo in tabbatlist" :key="batimentsolo.id" :value="batimentsolo.id">{{ batimentsolo.nom }}</option>


          </select>
        </div>

        <div class="filtre" style="margin-left: 20px">
          <div>
            <div v-for="type in uniqueTypes" :key="type" class="toggle-container">
              <label class="toggle">
                <input type="checkbox" v-model="checkedtype" :value="type" @change="checkboxChanged(type)" >
                <span class="slider"></span>
              </label>
              <p>{{ type }}</p>
            </div>
          </div>
        </div>

        <div class="optionBatiment">
          <h2> Options </h2>
          <div class="rotation">
            <label for="rotationInput">Rotation du bâtiment :</label>
            <br>
            <input type="range" id="rotationInput" v-model="rotation" min="0" max="360" step="1"/>
            <span>{{ this.rotation }}°</span>
          </div>
          <div class="description">
            <h2>Description</h2>
            <label class="descri">
              <input classe="nomarb" type="text" placeholder="Veulliez donné un nom" v-model="nom_batiment" >
              <textarea id="batdescri" v-model="description_batiment" placeholder="Veuillez décrire votre batiment"></textarea>
            </label>

          </div>

        </div>
        <div class="placeButton" style="height: 10%; width: 95%; margin-right: 5%;">
          <button id="btn2" @click="refreshcalmyfuncpls(1)" class="custom-btn" :disabled="idbatafficher == -1" :class="{ 'disabled-btn': idbatafficher == -1 }"> Placer le Batiment</button>
        </div>

      </div>
      <div class="scene active" id="scene">
        <FullCalendar :options="calendarOptions"  ref="fullCalendarRef"/>
        <div class="eventOptions">
          <div class="eventAction" id="eventAction">
            <button class="addEventBut custom-btn" id="addEventBut" @click="showAddEvent()">Ajouter un Evenement</button>
            <button class="removeEventBut custom-btn" id="removeEventBut" @click="showDelEvent()">Remove un Evenement</button>
          </div>
          <div class="addEventFrom" id="addEventFrom">
            <h2>Ajouter un événement</h2>
            <label for="fname">Nom de l'événement:</label><br>
            <input type="text" id="fname" name="fname" style="width: 86%;"><br>
            <label for="lname">Description de l'événement:</label><br>
            <textarea id="eventdescri" v-model="description_event" placeholder="Veuillez décrire votre event" name="lname" style="width: 86%;"></textarea>
            <br>
            <label for="nbPlace">Nombre de place:</label><br>
            <input type="number" id="nbPlace" name="nbPlace" style="width: 86%;"><br>
            <label for="lname">Date de début:</label><br>
            <input type="datetime-local" id="start" name="event-start"
                   value="2024-06-01T12:00"
                   min="2024-06-01T00:00" max="2024-06-14T00:00" style="width: 86%;"><br>
            <label for="lname">Date de fin:</label><br>
            <input type="datetime-local" id="end" name="event-start"
                   value="2024-06-01T12:00"
                   min="2024-06-01T00:00" max="2024-06-14T00:00" style="width: 86%;"><br><br>
            <button id="btn3" class="custom-btn" @click="askAddEvent"> Demander un crenaux</button>


          </div>
          <div class="removeEvent" id="removeEvent">
            <h2>Event selectionné</h2>
            <div class="eventSelected" v-show="selectedEvent">
              <h3>Nom</h3>
              <p>{{ selectedEvent.nom }}</p>
              <h3>Description</h3>
              <p>{{ selectedEvent.description }}</p>

              <h3>Status de l'envenement</h3>
              <p>
                {{ selectedEvent.status === 'waiting'
                  ? "La demande pour cet événement est en train d'être analysée par les administrateurs"
                  : "L'événement a été accepté" }}
              </p>

              <!-- Ajoutez d'autres détails de l'événement ici -->
              <button id="btn4" class="custom-btn" @click="deleteEventfunc"> Supprimer l'événement</button>
            </div>
            <div v-show="!selectedEvent">
              <p>Aucun événement sélectionné</p>
            </div>
          </div>
        </div>

      </div>
      <div class="remove" id="remove">
        <div class="topmenu">

          <h2>Enlever le batiment</h2>
          <div class="closepreview">
            <button id="btn1" @click="closepreview(2)" class="custom-btn"><img class="croix" src="../../../public/croix.svg"> </button>
          </div>
        </div>


        <div class="placeButton" style="height: 10%; width: 90%; margin-left: 5%; margin-right: 5%;">
          <button id="btn2" @click="refreshcalmyfuncpls(2)" class="custom-btn">remove Batiment</button>
        </div>
      </div>
    </div>
    <div id="loadingScreen" class="loading-screen">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import FullCalendar from "@fullcalendar/vue";


import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
//import listPlugin from "@fullcalendar/list";

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';





//importer service/mapPrestataires.js
import {getAllEmp,getOneBatUUID,getBatbyEmpUUID,getOneEmpUUID,getOneEmp,deleteBat, updateEmpFree, createBat, getAllBat} from '../../services/mapPrestataire.service.js';
import dispon from '../../services/reservation.js';

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
  components: {
    FullCalendar,
  },
  name: 'TestMap',
  data() {

    return {
      nom_Event: "",
      selectedEvent: 0,
      currentEvents: [],
      uuidsceneSelect: 0,
      uuidbat: 0,
      eventScene: [],
      description_event: "",
      description_batiment: "",
      nom_batiment: "",
      loaded: null,
      sky: null,
      sun: null,
      sky2: null,
      sun2: null,
      currentIndex: 0,
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
      batScene: [],
      toilettes_bdd: [],
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
      prestataire: 1,
      testshape: [],
      checkedtype: [],
      tabbatlist: [],
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
            let id = this.selectedEvent.id_batiment;
            this.selectedEvent = 0;
            await this.refreshcalendare(id);

            this.uuidsceneSelect = 0;
          } else {
            const event = await dispon.getDispoByID(info.event._def.publicId);
            this.selectedEvent = event[0];
            this.uuidsceneSelect = event[0].id_batiment;
            if (this.selectedEvent.id_prestataire == this.prestataire) {
              let idscenestring = this.selectedEvent.id_batiment
              await this.refreshcalendare(idscenestring)
            }else{
              this.selectedEvent = 0;
              this.uuidsceneSelect = 0;
            }

          }
        },
        views: {
          timeGridFourDay: {
            type: 'timeGrid',
            duration: {days: 4},
            buttonText: '4 day',
            dayHeaderFormat: {weekday: "long", month: "numeric", day: "numeric", omitCommas: true},
            slotDuration: '00:30',
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


      //style save batiment_bdd[0] = {name: "batiment1", type: "batiment", position: {x: 0, y: 0, z: 0}, rotation: {x: 0, y: 0, z: 0}, name_of_emp: "emp1", prestataire_id: "prestataire1", status: "en cours"}

      //style save emplacement_bdd[0] = {name: "emp1", type: "emplacement", position: {x: 0, y: 0, z: 0}, orientation: "none", free: true}


    }
  },
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
    async deleteEventfunc(){
      let data = {
        id_dispo: this.selectedEvent.id_reservation,
      }
      let uuid = this.uuidsceneSelect;
      await dispon.deleteDispo(data);




      this.refreshcalendare(uuid);
      this.showDelEvent()
      this.uuidsceneSelect = 0;
      this.selectedEvent = 0;
    },




    async askAddEvent() {
      let start = document.getElementById("start").value;
      let end = document.getElementById("end").value;
      //mettre au bon format : 2024-06-01T10:30:00.000Z
      //"2024-06-01T16:00:00.000Z"


      //start = start + ":00.000Z";
      //end = end + ":00.000Z";

      let name = document.getElementById("fname").value;
      let description = document.getElementById("eventdescri").value;
      let nbplace = document.getElementById("nbPlace").value;

      let batuuid = this.selectab[0]["obj"].userData.uuid


      let startDate = new Date(start);
      let endDate = new Date(end);

      let diffInMilliseconds = endDate - startDate;

// Convertir la différence en heures et minutes
      let hours = Math.floor(diffInMilliseconds / (60 * 60 * 1000));
      let minutes = Math.floor((diffInMilliseconds % (60 * 60 * 1000)) / (60 * 1000));

// Formatage de la durée
      let formattedDuration = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

      let dataReservation ={
        id_bat: batuuid,
        date: start,
        duree: formattedDuration,
        description: description,
        nom: name,
        color: "red",
        status: "waiting",
        id_prestataire: this.prestataire,
      }


      for (let i = 0; i < nbplace; i++) {
        await dispon.postDispo(dataReservation);

      }

      this.refreshcalendare(batuuid);
      this.showAddEvent()
    },




    handleResize() {
      // Logique de gestion du redimensionnement
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      const scene1Container = this.$refs.scene1Container;
      this.renderer.setSize(window.innerWidth, scene1Container.offsetHeight);
      this.renderer.outputEncoding = THREE.LinearToneMapping;
    },

    async findobjectByuserUUID(uuid){
      var found = null;
      this.scene.traverse((child) => {
        if (child.isMesh) {
          if(child.userData.uuid != null || child.userData.uuid != undefined){
            if(child.userData.uuid == uuid){
              found = child;
            }
          }
        }
      });
      return found;
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
      if (this.idbatafficher !== -1) {
        // Retirez tous les enfants de la vitrine
        while (this.previewgroupe.children.length > 0) {
          this.previewgroupe.remove(this.previewgroupe.children[0]);
        }

        var objet_model = await this.findObjectByName(this.loaded, this.batiment[this.idbatafficher].name)
        var objet = objet_model.clone();
        objet.position.set(0, objet.position.y, 0);
        objet.name = this.batiment[this.idbatafficher].name;
        this.previewbatiewbatiment = objet;
        //mettre en gris
        //this.previewbatiewbatiment.material.color.setHex(0x7e7e7e);
        this.previewgroupe.add(objet);
        this.rotation;
        let posx = this.selectab[0]["obj"].position.x;
        let posz = this.selectab[0]["obj"].position.z;

        this.previewbatiewbatiment.position.x = posx;
        this.previewbatiewbatiment.position.z = posz
        this.previewbatiewbatiment.position.y = objet_model.position.y;
      }
    },


    async batvitrine() {
      if (this.idbatafficher != -1) {
        // Retirez tous les enfants de la vitrine
        while (this.vitrine.children.length > 0) {
          this.vitrine.remove(this.vitrine.children[0]);
        }

        // Ajoutez le nouvel objet à la vitrine
        var objet_model = await this.findObjectByName(this.loaded, this.batiment[this.idbatafficher].name)
        var objet = objet_model.clone();
        objet.position.set(0, objet.position.y, 0);
        objet.name = this.batiment[this.idbatafficher].name;
        this.vitrine.add(objet);

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

    async eventParser(event){
      if(event.id_prestataire == this.prestataire){
        if(event.status == "accepted"){
          event.color = "green";
        }
        else{
          event.color = "orange";
        }
      }
      else {
        event.color = "red";
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


      this.currentEvents = [];

      for (let i = 0; i < resa.length; i++) {
        let start2 = new Date(resa[i].ouverture);
        let duree = resa[i].duree;

        // Créer une copie de la date de début pour éviter de modifier la date d'origine
        let end2 = new Date(start2);
        end2.setMinutes(end2.getMinutes() + duree);

        end2 = await this.monthDaySwap(end2);
        start2 = await this.monthDaySwap(start2);

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
        await this.currentEvents.push(data);
      }
      this.$refs.fullCalendarRef.getApi().setOption('events', this.currentEvents);
    },

    showAddEvent(){
      document.getElementById('addEventFrom').classList.toggle('active');
      //si remove event est active
      if(document.getElementById('removeEvent').classList.contains('active')){
        document.getElementById('removeEvent').classList.toggle('active');
      }

    },

    showDelEvent(){
      document.getElementById('removeEvent').classList.toggle('active');
      //si add event est active
      if(document.getElementById('addEventFrom').classList.contains('active')){
        document.getElementById('addEventFrom').classList.toggle('active');
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
          let batimentuuid;
          let batiment
          found = await getOneBatUUID(this.selectedObject.userData.uuid);
          if (found != []){
            batiment = found
            batimentuuid = this.selectedObject.userData.uuid;
            found = true;
          }
          else {
            found = false;
          }

          if (this.selectab.length == 0 && found) {
            // Toggle the 'active' class on the selectmenu div


            this.selectedObject.material.color.setHex(0xff0000);
            var info

            if(batiment[0].type_id == 3){
              document.getElementById('selectmenu').classList.toggle('closed');
              document.getElementById('selectmenu').classList.toggle('supr');
              document.getElementById('scene').classList.toggle('active');
              document.getElementById('scene1').classList.toggle('active');




              this.refreshcalendare(batimentuuid)
              info = {obj: this.selectedObject, mat: originmat, col: origineColor, type: "conf"}
            }
            if(batiment[0].type_id != 6 && batiment[0].type_id != 3){
              info = {obj: this.selectedObject, mat: originmat, col: origineColor, type: "bat"}
              document.getElementById('selectmenu').classList.toggle('closed');
              document.getElementById('selectmenu').classList.toggle('supr');
              document.getElementById('remove').classList.toggle('active');
              document.getElementById('scene1').classList.toggle('active');
            }
            this.selectab.push(info);
          } else {
            if (this.selectedObject.uuid == this.selectab[0]["obj"].uuid) {
              // Toggle the 'active' class on the selectmenu div
              document.getElementById('selectmenu').classList.toggle('closed');
              document.getElementById('scene1').classList.toggle('active');
              //wait 300ms

              if(this.selectab[0]["type"] !== "conf"){
                setTimeout(() => {
                  document.getElementById('remove').classList.toggle('active');
                  document.getElementById('selectmenu').classList.toggle('supr');
                }, 300);
              }
              else {
                setTimeout(() => {
                  document.getElementById('scene').classList.toggle('active');
                  document.getElementById('selectmenu').classList.toggle('supr');
                }, 300);
              }



              this.selectedObject.material = this.selectab[0]["mat"].clone()
              this.selectedObject.material.color.setHex(this.selectab[0]["col"])
              this.selectab.pop(0)
              this.selectedObject = 0
            } else {
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
                this.selectedObject = 0
              }

            }


          }
        }
      }
    },

    async clearpreviewbat() {
      if (this.idbatafficher !== -1) {
        // Retirez tous les enfants de la vitrine
        while (this.previewgroupe.children.length > 0) {
          this.previewgroupe.remove(this.previewgroupe.children[0]);
        }
      }
    },
    async closepreview(mode){
      if (mode == 1) {
        this.deletscene2()
        document.getElementById('selectmenu').classList.toggle('closed');

        document.getElementById('scene1').classList.toggle('active');
        //wait 300ms
        setTimeout(() => {
          document.getElementById('add').classList.toggle('active');
          document.getElementById('selectmenu').classList.toggle('supr');
        }, 300);

        this.clearpreviewbat();


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
      if(this.selectab.length == 1){
        this.selectab[0]["obj"].material = this.selectab[0]["mat"]
        this.selectab[0]["obj"].material.color.setHex(this.selectab[0]["col"])
        this.selectab.pop(0)
        this.selectedObject = 0
      }
    },

    async refreshcalmyfuncpls(mode) {
      if (this.selectab.length == 1) {

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
          let uuid = this.selectab[0]["obj"].userData.uuid;
          found = await getOneEmpUUID(uuid);
          if (found != []){
            found = true;

          }
          else {
            found = false;
          }
          if(!found){
            return
          }
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
          var posx= this.selectab[0]["obj"].position.x;
          var posz= this.selectab[0]["obj"].position.z;
          var y = batimentadd.position.y;

          let descriptionsave = this.description_batiment
          let nombat = this.nom_batiment
          let id_type = batimentadd.name.slice(4,5)

          var databat = {
            name: batimentadd.name,
            nom: nombat,
            emp_uuid: uuid,
            posx: posx,
            posy: y,
            posz: posz,
            rota: (this.rotation * Math.PI / 180),
            prestataire: 1,
            description: this.description_batiment,
            type: id_type,
            status: "waiting",
          }
          this.description_batiment = "";
          this.nom_batiment = "";

          this.clearpreviewbat();

          batimentadd.position.set(posx, y, posz);
          batimentadd.rotation.z = this.rotation * Math.PI / 180
          //to do rota
          batimentadd.castShadow = true;
          batimentadd.receiveShadow = true;
          batimentadd.material.color.setHex(0xffa500);
          batimentadd.userData = {uuid: 0, emp_uuid: uuid, description: descriptionsave};
          this.selectionables.add(batimentadd);

          await createBat(databat);

          const batfrombdd = await getBatbyEmpUUID(uuid);



          batimentadd.userData.uuid = batfrombdd[0].id_batiment;


          let data = {
            uuid: uuid,
            batid: batfrombdd[0].id_batiment,
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

            found = await getOneBatUUID(this.selectab[0]["obj"].userData.uuid);
            if (found != []){
              found = true;
            }
            else {
              found = false;
            }

            if (found) {
              let bat_to_rmove = await getOneBatUUID(this.selectab[0]["obj"].userData.uuid);
              let emp_uuid = bat_to_rmove[0].id_emplacement;
              let data = {
                uuid: emp_uuid,
                batid: 0,
              }
              await updateEmpFree(data);
              await deleteBat(bat_to_rmove[0].id_batiment);
              let empinScene = await this.findobjectByuserUUID(emp_uuid);
              const texture_emp = new THREE.TextureLoader().load('../map/mapData/tex/tex_emp.png');
              const material_emp = new THREE.MeshPhongMaterial({map: texture_emp});
              let hex = material_emp.color.getHex();
              empinScene.material.color.setHex(hex);
              this.selectionables.add(empinScene)
              this.selectionables.remove(this.selectab[0]["obj"]);

            }
          }



        }
        while (this.selectab.length > 0) {
          this.selectab.pop(0);
        }
        this.selectedObject = 0
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

    async setup() {
      const texture_emp = new THREE.TextureLoader().load('../map/mapData/tex/tex_emp.png');
      const material_emp = new THREE.MeshPhongMaterial({map: texture_emp});


      this.emplacement_bdd = await getAllEmp();
      for (let i = 0; i < this.emplacement_bdd.length; i++) {
        if(this.emplacement_bdd[i].id_emplacement == 0){
          break;
        }
        var matricepoints = this.emplacement_bdd[i].matricepoints.matricepoints
        const emp = await this.matriceTo3DEmp(matricepoints, this.emplacement_bdd[i].nom, this.emplacement_bdd[i].posx, this.emplacement_bdd[i].posz, this.emplacement_bdd[i].id_emplacement);
        emp.material = material_emp.clone();
        if(this.emplacement_bdd[i].batiment_id != null){
          emp.material.color.setHex(0x7e7e7e);
          this.nonselectionables.add(emp);
        } else {
          this.selectionables.add(emp);
        }
      }

      this.batiment_bdd = await getAllBat();
      for (let i = 0; i< this.batiment_bdd.length; i++) {
        for (let j = 0; j < this.batiment.length; j++) {

          if (this.batiment_bdd[i].name == this.batiment[j].name) {
            var batiment_found = await this.findObjectByName(this.loaded, this.batiment[j].name)
            var batiment_clone = batiment_found.clone();
            let mat = batiment_clone.material.clone();
            batiment_clone.position.set(this.batiment_bdd[i].posx, this.batiment_bdd[i].posy, this.batiment_bdd[i].posz);
            batiment_clone.material.metalness = 0;
            batiment_clone.material = mat;
            batiment_clone.castShadow = true;
            batiment_clone.receiveShadow = true;
            batiment_clone.rotation.z = this.batiment_bdd[i].rota;
            batiment_clone.userData = {uuid: this.batiment_bdd[i].id_batiment, emp_uuid: this.batiment_bdd[i].id_emplacement ,description: this.batiment_bdd[i].description};

            if(this.batiment[j].type == "toilette"){
              this.nonselectionables.add(batiment_clone);
            }
            else if(this.batiment[j].type === "Salle de conférence"){
              this.selectionables.add(batiment_clone);
            }
            else {
              if (this.batiment_bdd[i].prestataire_id != this.prestataire) {
                this.nonselectionables.add(batiment_clone);
              } else {
                if (this.batiment_bdd[i].status == "accepted") {
                  //mettre en vert
                  batiment_clone.material.color.setHex(0x00ff00);
                  this.selectionables.add(batiment_clone);
                } else {
                  if (this.batiment_bdd[i].status == "waiting") {

                    batiment_clone.material.color.setHex(0xffa500);
                    this.selectionables.add(batiment_clone);
                  }
                }

              }
            }
          }
        }
      }

      this.camera.rotation.x = -0.7;
      this.camera.position.set(120, 100, 160);

    },


    loadfinal() {
      return new Promise((resolve, reject) => {



        const loader = new GLTFLoader();
        loader.load('../map/mapData/map_belfo.glb', async (gltf) => {

          const loadedGltf = gltf.scene;
          this.loaded = loadedGltf


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
                texturebat = new THREE.TextureLoader().load('../map/mapData/tex/tex_conf.png');
                info = {
                  id: idbat,
                  name: this.children[i].name,
                  nom: "Salle de conférence",
                  type: "Salle de conférence",
                  selected: false
                }
              }
              if(this.children[i].name == "bat_1_rest"){
                texturebat = new THREE.TextureLoader().load('../map/mapData/tex/bat_rest.png');
                info = {
                  id: idbat,
                  name: this.children[i].name,
                  nom: "Restaurants 1",
                  type: "Restaurants",
                  selected: true
                }
              }
              if(this.children[i].name == "bat_1_resto2"){
                texturebat = new THREE.TextureLoader().load('../map/mapData/tex/bato_resto2.png');
                info = {
                  id: idbat,
                  name: this.children[i].name,
                  nom: "Restaurants 2",
                  type: "Restaurants",
                  selected: true
                }
              }
              if(this.children[i].name == "bat_1_foodtruck"){
                texturebat = new THREE.TextureLoader().load('../map/mapData/tex/tex_foodtruck.png');
                info = {
                  id: idbat,
                  name: this.children[i].name,
                  nom: "Foodtruck",
                  type: "Restaurants",
                  selected: true
                }
              }
              if(this.children[i].name == "bat_2_roue"){
                texturebat = new THREE.TextureLoader().load('../map/mapData/tex/tex_roue.png');
                info = {
                  id: idbat,
                  name: this.children[i].name,
                  nom: "Grande roue",
                  type: "Attractions",
                  selected: true
                }
              }
              if(this.children[i].name == "bat_5_arcade"){
                texturebat = new THREE.TextureLoader().load('../map/mapData/tex/tex_arcade.png');
                info = {
                  id: idbat,
                  name: this.children[i].name,
                  nom: "Arcade",
                  type: "Attractions",
                  selected: true
                }
              }
              if(this.children[i].name == "bat_2_attrfutur"){
                texturebat = new THREE.TextureLoader().load('../map/mapData/tex/tex_attrfutur.png');
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
                texturebat = new THREE.TextureLoader().load('../map/mapData/tex/tex_boutique.png');
                info = {
                  id: idbat,
                  name: this.children[i].name,
                  nom: "Boutique",
                  type: "boutique",
                  selected: true
                }
              }
              if(this.children[i].name.includes("wc")){
                texturebat = new THREE.TextureLoader().load('../map/mapData/tex/tex_wc.png');
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
                    const texturesol = new THREE.TextureLoader().load('../map/mapData/tex/tex_sol.png');
                    texturesol.flipY = false;
                    const mat_sol = new THREE.MeshPhongMaterial({map: texturesol});
                    this.children[i].material = mat_sol;
                    this.children[i].material.metalness = 0;
                    this.children[i].receiveShadow = true;
                    this.groupe_sol.add(this.children[i]);
                  }
                  else{
                    const texturesol = new THREE.TextureLoader().load('../map/mapData/tex/tex_arrsol.png');
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
                      const texturetree = new THREE.TextureLoader().load('../map/mapData/tex/tex_tree.png');
                      texturetree.flipY = false;
                      const mattree = new THREE.MeshPhongMaterial({map: texturetree});
                      this.children[i].material = mattree;
                      this.children[i].material.metalness = 0;
                      this.children[i].receiveShadow = true;
                    }
                    if(this.children[i].name.includes("bush")){
                      const texturetree = new THREE.TextureLoader().load('../map/mapData/tex/tex_tree.png');
                      const mattree = new THREE.MeshPhongMaterial({map: texturetree});
                      this.children[i].material = mattree;
                      this.children[i].material.metalness = 0;
                      this.children[i].receiveShadow = true;
                    }
                    if(this.children[i].name == "deco_entree"){
                      const texturetree = new THREE.TextureLoader().load('../map/mapData/tex/tex_entree.png');
                      const mattree = new THREE.MeshPhongMaterial({map: texturetree});
                      this.children[i].material = mattree;
                      this.children[i].material.metalness = 0;
                      this.children[i].receiveShadow = true;

                    }
                    if(this.children[i].name.includes("R2-D2")){
                      const texturetree = new THREE.TextureLoader().load('../map/mapData/tex/tex_r2d2.png');
                      const mattree = new THREE.MeshPhongMaterial({map: texturetree});
                      this.children[i].material = mattree;
                      this.children[i].material.metalness = 0;
                      this.children[i].receiveShadow = true;

                    }
                    if(this.children[i].name.includes("Lamp")){
                      const texturetree = new THREE.TextureLoader().load('../map/mapData/tex/tex_arcade.png');
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

    async point2Dto3D(x, z ) {
      let botrghtpretty = [8.909232717044802, -20.492076873779297]
      let botrght3D = [441,1.8496733903884888,-811.1476745605469]
      let point3D2

      if(x > 0 && z > 0){
        point3D2 = {
          x: (botrght3D[0] * x) / botrghtpretty[0],
          z: (botrght3D[2] * -z) / botrghtpretty[1]
        }
        return point3D2;
      }
      if(x < 0 && z > 0){
        point3D2 = {
          x: (botrght3D[0] * x) / botrghtpretty[0],
          z: (botrght3D[2] * z) / botrghtpretty[1]
        }
        return point3D2;
      }
      if(x < 0 && z < 0){
        point3D2 = {
          x: (botrght3D[0] * x) / botrghtpretty[0],
          z: (botrght3D[2] * -z) / botrghtpretty[1]
        }
        return point3D2;
      }
      if(x > 0 && z < 0){
        point3D2 = {
          x: (botrght3D[0] * x) / botrghtpretty[0],
          z: (botrght3D[2] * -z) / botrghtpretty[1]
        }
        return point3D2;
      }
    },

    async matriceTo3DEmp(matricepoints, name, posx, posz, emp_uuid) {
      let center = await this.point2Dto3D(posz, -posx);

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
      const depth = 2
      const shape = new THREE.Shape(points)

      const geome = new THREE.ExtrudeGeometry(shape, { depth: depth, bevelEnabled: false })
      geome.rotateX(-Math.PI/2)

      const texture_emp = new THREE.TextureLoader().load('../map/mapData/tex/tex_emp.png');
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



    async start(){
      this.showLoadingScreen();
      await this.loadfinal();
      this.filteredTypes();
      await this.setup();
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
      //document.getElementById('selectmenu').style.display = 'none';
      //mettre en hidden
      document.getElementById('selectmenu').style.visibility = 'hidden';
    },

    hideLoadingScreen() {
      document.getElementById('loadingScreen').style.display = 'none';
      document.getElementById('scene1').style.display = 'flex';
      //document.getElementById('selectmenu').style.display = 'block';
      //mettre en visible
      document.getElementById('selectmenu').style.visibility = 'visible';
      document.getElementById('selectmenu').classList.toggle('closed');
      document.getElementById('scene').classList.toggle('active');
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
      this.updateCameraPosition();
      this.renderer.render(this.scene, this.camera);
    },

    async checkboxChanged(type){
      for (let i = 0; i < this.batiment.length; i++) {
        if (this.batiment[i].type == type) {
          if (this.batiment[i].selected) {
            this.batiment[i].selected = false;
            // Enlever de la liste
            for (let j = 0; j < this.tabbatlist.length; j++) {
              if (this.tabbatlist[j].name == this.batiment[i].name) {
                this.tabbatlist.splice(j, 1);
              }
            }
            // Réinitialiser la valeur sélectionnée du menu déroulant à "0"
            this.idbatafficher = -1;
          } else {
            this.batiment[i].selected = true;
            this.tabbatlist.push(this.batiment[i]);
            // Vous pouvez choisir de ne pas réinitialiser la valeur ici
          }
        }
      }
    },

    updateCameraPosition() {
      if (this.controls.target.y < 0) {
        this.controls.target.y = 0;
      }
      if(this.controls.target.x >150){
        this.controls.target.x = 150;
      }
      if(this.controls.target.x < -150){
        this.controls.target.x = -150;
      }
      if(this.controls.target.z >150){
        this.controls.target.z = 150;
      }
      if(this.controls.target.z < -150){
        this.controls.target.z = -150;
      }
    }

  },
  computed:{
    uniqueTypes() {
      const types = new Set();
      this.batiment.forEach((bat) => {
        if (bat.type !== "Salle de conférence" && bat.type !== "toilette") {
          types.add(bat.type);
        }
      });



      //retirer les types qui ne sont pas dans la liste
      types.delete(undefined);



      return Array.from(types);
    },




  },

  mounted() {

    this.prestataire = this.$store.state.user_id



    this.scene = new THREE.Scene();
    //90% de la largueur de l'ecran
    const scene1Container = this.$refs.scene1Container;
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.shadowMap.enabled = true;

    this.renderer.setSize(window.innerWidth, scene1Container.offsetHeight);
    scene1Container.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.controls.target.set(0, 10, 0);

    this.controls.maxPolarAngle = Math.PI / 2.1;

    this.controls.minPolarAngle = -Math.PI / 1.9

    this.controls.mixZoom = 50;

    this.controls.maxDistance = 250;



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

#btn2{
  width: 100%;
  margin-right: 5%;
}


.topmenu{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.croix{
  with: 30px;
  height: 30px;
}

.previsual{
  text-align: center;
  justify-items: center;
  justify-content: center;
}

.optionBatiment{
  display: flex;
  flex-direction: column;
  height: 100%;
}

#batdescri {
  width: 70%;
  height: 100%;
  padding-bottom: 20px;
  max-width: 23vw;
}

.descri{
  margin-top: 15px;
  width: 80%;
  min-height: 30px;
  height: auto;
  padding-bottom: 15px;
  margin-left: 10%;
  margin-right: 10%;
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

.eventAction{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 10px;
}



.addEventFrom{
  display: none;
}

.addEventFrom.active{
  display: block;
  width: 100%;
}

.removeEvent{
  display: none;
  margin-bottom: 20px;
}

.removeEvent.active{
  display: block;
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

.eventOptions{
  display: flex;
  flex-direction: column;
  justify-items: center;
  width: 100%;
  height: 40%;
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


.scene{
  display: none;

}

.scene.active{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  justify-items: center;
  height: 80%;
}




.add{
  display: none;
}

.add.active{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
}

.remove{
  display: none;
}

.remove.active{
  display: block;
}

#btn1{
  all: unset;
}

.fc-time-grid.fc-content-skeleton {
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  height: 100%; }

</style>
