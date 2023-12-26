

<template>
<div class="map-container">
  <l-map style="width:1000px ; height: 800px;" :min-zoom="19" :max-zoom="21" :max-bounds="cartebounds" :center="center" @click="addCoordinates">
    <l-tile-layer :url="url" ></l-tile-layer>
    <l-marker :lat-lng="markerLatLng"></l-marker>
    <l-image-overlay :url="'map2D.png'" :bounds="cartebounds"></l-image-overlay>
      <l-polygon
          v-for="(feature , index) in features"
          :key="index"
          ref="zone"
          :lat-lngs="feature.geometry"
          :color="couleur[index]"
          :fill-color="couleur[index]"
          @click="openPanel(feature)"
      >




      </l-polygon>

      <l-polygon
          v-if="newPolygon.length>0"
          ref="zone"
          :lat-lngs="newPolygon"
          :color="couleurOption[0]"
          :fill-color="couleurOption[0]"
      >
      </l-polygon>
        <div class="info-panel info-panel-close">
        <InfoPanelEdition v-if="featureSelected!=null" @del-feature="delFeature" @edit-feature="editFeature" @close-panel="closePanel" :types="types" :providers="providers" :feature="featureSelected"> </InfoPanelEdition>

        </div>
  </l-map>
      <div class="menu">
        <button v-if="!modeEditor" @click="switchEditor">Ajouter une zone </button>

        <div v-if="modeEditor" class="menu-editor">

          <table>
              <tbody>
                <tr>
                  <th>Nom</th>
                  <td><input type="text" v-model="newfeature.properties.name"></td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td><input type="text" v-model="newfeature.properties.description"></td>
                </tr>
<!--                <tr>-->
<!--                  <th>Type</th>-->
<!--                  <td>-->
<!--                    <select v-model="newfeature.properties.typeTerrain">-->
<!--                      <option value=null selected>Choisir un type</option>-->
<!--                      <option v-for="(type , index) in types" :key="index" :value=type >{{type}}</option>-->
<!--                    </select>-->
<!--                  </td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                  <th>Appartient à</th>-->
<!--                  <td>-->
<!--                    <select v-model="newfeature.properties.apartient">-->
<!--                      <option value=null selected>Libre</option>-->
<!--                      <option v-for="(provider , index) in filteredProvider" :key="index" :value=provider >{{provider}}</option>-->
<!--                    </select>-->
<!--                  </td>-->
<!--                </tr>-->

              </tbody>

            </table>
          <button @click="switchEditor">Annuler</button>
          <button @click="addPolygon"> Valider</button>
        </div>
      </div>
</div>
</template>

<script>
import {LImageOverlay, LMap, LMarker, LPolygon, LTileLayer} from "vue2-leaflet";
import 'leaflet/dist/leaflet.css';
import InfoPanelEdition from "@/components/infoPanelEdition.vue";
import {createEmp, deleteEmp, getAllEmp, updateEmpInfo} from '../services/mapPrestataire.service.js';

export default {
  name: 'Map2D-edition',
  components: {
    InfoPanelEdition,
    LImageOverlay,
    LMap ,
    LTileLayer,
    LMarker,
    LPolygon
  },
  data: () => ({
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    center: [47.74915674062442-((47.74915674062442-47.74737489408103)/2.0) ,6.800086498260499-((6.800086498260499-6.804184913635255)/2.0)],
    cartebounds: [[47.74915674062442, 6.800086498260499],[47.74737489408103 , 6.804184913635255]],
    //size 0,001781847, 0,004098415
    //center 47.74826581735272, 6.802135705947877
    //corner top left 47.74915674062442, 6.800086498260499
    //corner bottom right 47.74737489408103 , 6.804184913635255

    markerLatLng: [51.504, -0.159],
    newPolygon:[],
    // newfeature: {
    //     "geometry": [],
    //     "properties": {
    //       "id": null,
    //       "name": null,
    //       "description": null,
    //       "typeTerrain": null,
    //       "apartient": null,
    //     }
    //   },
    newfeature: {
      "geometry": [],
      "properties": {
        "id": null,
        "name": null,
        "description": null,
      }
    },
    modeEditor:false,
    couleurOption:["yellow","orange","blue","yellow"],
    types: ["forrain" , "scene"],
    filteredProvider: [],
    providers:[["Calixte","Raclette","Zekeriya"],["Mhammed","Enzo","Dalia","Merguez"]],
    features:[],
    featureSelected : null,
    couleur: [],


  }),
  created() {


    getAllEmp().then((response) => {
      console.log(response)
      response.forEach((emp) => {
        const ugly = []
        emp.matricepoints.matricepoints.forEach((point) => {
          ugly.push(this.uglycoo(point))
        })
        const data = {
          "geometry": ugly,
          "properties": {
            "id": emp.id_emplacement,
            "name": emp.nom,
            "description": emp.description,
          }
        }
        this.features.push(data)
      })

      this.features.forEach((feature)=>{
        this.couleur.push(this.polygonOption(feature))
      })
    })

  }
  ,
  watch: {
    // 'newfeature.properties.typeTerrain': function () {
    //   this.filterProvider();
    // }
    }
,
  methods: {


    prettycoo(coo) {
      const centerx = 47.74826581735272
      const centery = 6.802135705947877

      let clone = coo.slice(0)
      coo = clone

      coo[0] = coo[0] - centerx
      coo[1] = coo[1] - centery

      coo[0] = coo[0] * 10000
      coo[1] = coo[1] * 10000
      return coo
    },

    uglycoo(coo) {
      const centerx = 47.74826581735272
      const centery = 6.802135705947877

      coo[0] = coo[0] / 10000
      coo[1] = coo[1] / 10000

      coo[0] = coo[0] + centerx
      coo[1] = coo[1] + centery
      return coo
    },


    closePanel() {
      document.querySelector('.info-panel').classList.add('info-panel-close');
      this.featureSelected = null;

    },
    switchEditor() {
      this.newPolygon = []
      this.newfeature = {
        "geometry": [],
        "properties": {
          "id": null,
          "name": null,
          "description": null,
          "typeTerrain": null,
          "apartient": null,
        }
      }
      this.modeEditor = !this.modeEditor
      if (this.modeEditor) {
        document.querySelector('.vue2leaflet-map').classList.add('newzone');
      } else {
        document.querySelector('.vue2leaflet-map').classList.remove('newzone');
      }
    },
    filterProvider() {
      for (let i = 0; i < this.types.length; i++) {
        if (this.types[i] === this.newfeature.properties.typeTerrain) {
          this.filteredProvider = this.providers[i];

        }
      }
    },
    getLatLngMarker(coordinates){
      // let area = 0;
      // let x = 0;
      // let y = 0;
      // let prev = coordinates[coordinates.length - 1];
      //
      // coordinates.forEach(coord => {
      //   const cur = coord;
      //   const f = (prev[0] * cur[1]) - (cur[0] * prev[1]);
      //   x += (prev[0] + cur[0]) * f;
      //   y += (prev[1] + cur[1]) * f;
      //   area += f;
      //   prev = cur;
      // });
      //
      // area /= 2;
      // x /= (area * 6);
      // y /= (area * 6);
      // return [x, y]; // Les coordonnées sont dans l'ordre [lat, lng]


      if (coordinates.length === 0) {
        return null;
      }

      // Initialise les sommes des coordonnées en x et en y
      let sumX = 0;
      let sumY = 0;

      // Parcours de toutes les coordonnées dans la liste
      for (let i = 0; i < coordinates.length; i++) {
        sumX += coordinates[i][0];
        sumY += coordinates[i][1];
      }

      // Calcule la moyenne des coordonnées en x et en y
      const centerX = sumX / coordinates.length;
      const centerY = sumY / coordinates.length;

      return [centerX, centerY];

    },
    async addPolygon() {
      if (this.newPolygon.length > 2) {
        this.newPolygon.push(this.newPolygon[0])
        this.newfeature.geometry = this.newPolygon
        this.features.push(this.newfeature)
        var center = this.getLatLngMarker(this.newPolygon)

        center = this.prettycoo(center)
        const n = this.newPolygon.length
        var pretty = []
        for (let i = 0; i < n; i++) {
          //ne pas faire le dernier point
          if (i === (n - 1))
            break
          pretty.push(this.prettycoo(this.newPolygon[i]))
        }

        const dataemp= {
              name : this.newfeature.properties.name,
              description : this.newfeature.properties.description,
              posx : center[0],
              posy : 10,
              posz : center[1],
              rota : 0,
              matricepoints : pretty,
        }
        console.log("before",dataemp)
        await createEmp(dataemp)
        console.log(JSON.stringify(this.features))
      }
      this.switchEditor()
      this.couleur = []
      this.features.forEach((feature) => {
        this.couleur.push(this.polygonOption(feature))
      })

    },
    openPanel(feature)
    {
      if(this.modeEditor)
        return
      document.querySelector('.info-panel').classList.remove('info-panel-close');
      this.featureSelected = feature;

    },
    updateFeatures(feature) {
      if (feature.properties.apartient == null) {
        feature.properties.apartient = this.provider.id
      } else {
        feature.properties.apartient = null;
      }
      this.couleur = []
      this.features.forEach((feature) => {
        this.couleur.push(this.polygonOption(feature))
      })

      this.closePanel()


    },
    addCoordinates(event) {
      if (this.modeEditor)
        this.newPolygon.push([event.latlng.lat, event.latlng.lng])
    },
    polygonOption(feature) {
      for (let i = 0; i < this.types.length; i++) {
        if (this.types[i] === feature.properties.typeTerrain) {
          return this.couleurOption[i];
        }
      }

      // Retourne une valeur par défaut si aucun type ne correspond
      return 'black'; // Remplacez 'couleur par défaut' par la valeur souhaitée
    },
    delFeature(feature) {
      deleteEmp(feature.properties.id)
      this.features.splice(this.features.indexOf(feature), 1)
      this.couleur = []
      this.features.forEach((feature) => {
        this.couleur.push(this.polygonOption(feature))
      })
      this.closePanel()
    },
    editFeature(feature, newfeature) {
      updateEmpInfo({
        uuid: feature.properties.id,
        nom: newfeature.properties.name,
        description: newfeature.properties.description,
      })
      this.features.splice(this.features.indexOf(feature), 1)
      this.features.push(newfeature)
      this.couleur = []
      this.features.forEach((feature) => {
        this.couleur.push(this.polygonOption(feature))
      })
      this.closePanel()
    }
  }
}

</script>


<style scoped>
.map {
  display: block;
  width: 100%;
  height: 100%;
  overflow :hidden
}

.vue2leaflet-map.newzone {
  cursor: crosshair;
}


.map-container{
  margin: 20px;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.info-panel-close{
  right: -33% !important;
}

.menu{
  grid-column: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #dcdcdc;
  overflow: hidden;
  border-radius: 45px;
  width: 100%;
  height: 100%;
  min-height: 300px;
  max-width: 300px;
  max-height: 300px;

}
.menu button{
  padding: 8px 8px;
  margin: 5px 5px;
  border-radius: 5px;
  border: none;
  background-color: #feb42d;
  font-weight: bold;
  color: white;
  cursor: pointer;
}

.menu button:hover{
  padding: 8px 8px;
  margin: 5px 5px;
  border-radius: 5px;
  border: none;
  background-color: white;
  font-weight: bold;
  color: #feb42d;
  cursor: pointer;
}


.menu input{
  width: 80%;
  height: 15px;
  padding: 5px 0;
  border: none;
  font-size: 15px;
  border-radius: 5px ;
  background-color: #f6f6f6;
}


.info-panel {
  opacity: 1;
  position: absolute;
  right: 0;
  top: 0;
  width: 33%;
  max-width: 700px;
  height: 100%;
  background-color: #e7e7e7;
  color: #041676;
  z-index: 401;
  transition: all 0.5s;
}


.close div {
  width: 15px;
  height: 5px;
  background-color: #d7d7d7;

}

</style>