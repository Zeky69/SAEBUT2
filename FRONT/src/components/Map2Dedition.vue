

<template>
<!--  <div id="map" style="width: 50%; height: 500px; display: block">-->
<!--  </div>-->
<div class="map-container">
  <l-map style="width:100% ; height: 500px ; grid-column: 2" :min-zoom="18" :max-zoom="21" :max-bounds="cartebounds" :center="center" @click="addCoordinates">
    <l-tile-layer :url="url" ></l-tile-layer>
    <l-marker :lat-lng="markerLatLng"></l-marker>
    <l-image-overlay :url="'carte.jpeg'" :bounds="cartebounds"></l-image-overlay>
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
        <InfoPanelEdition v-if="featureSelected!=null" @update-feature="updateFeatures" @close-panel="closePanel" :types="types" :providers="providers" :feature="featureSelected"> </InfoPanelEdition>

        </div>
  </l-map>
    <div class="column-3">
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
                <tr>
                  <th>Type</th>
                  <td>
                    <select v-model="newfeature.properties.typeTerrain">
                      <option value=null selected>Choisir un type</option>
                      <option v-for="(type , index) in types" :key="index" :value=type >{{type}}</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>Appartient à</th>
                  <td>
                    <select v-model="newfeature.properties.apartient">
                      <option value=null selected>Libre</option>
                      <option v-for="(provider , index) in filteredProvider" :key="index" :value=provider >{{provider}}</option>
                    </select>
                  </td>
                </tr>

              </tbody>

            </table>
          <button @click="switchEditor">Annuler</button>
          <button @click="addPolygon"> Valider</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {LImageOverlay, LMap, LMarker, LPolygon, LTileLayer} from "vue2-leaflet";
import 'leaflet/dist/leaflet.css';
import InfoPanelEdition from "@/components/infoPanelEdition.vue";

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
    zoom: 20,
    center: [47.74915674062442-((47.74915674062442-47.74737489408103)/2.0) ,6.800086498260499-((6.800086498260499-6.804184913635255)/2.0)],
    cartebounds: [[47.74915674062442, 6.800086498260499],[47.74737489408103 , 6.804184913635255]],
    markerLatLng: [51.504, -0.159],
    newPolygon:[],
    newfeature: {
        "geometry": [],
        "properties": {
          "id": null,
          "name": null,
          "description": null,
          "typeTerrain": null,
          "apartient": null,
        }
      },
    modeEditor:false,
    couleurOption:["yellow","orange","blue","yellow"],
    types: ["forrain" , "scene"],
    filteredProvider: [],
    providers:[["Calixte","Raclette","Zekeriya"],["Mhammed","Enzo","Dalia","Merguez"]],
    provider : {id:"Zekeriya", type:"forrain"},
    features : [
            {
            "geometry": [
              [47.7480115324918,6.802358329296113  ],
              [ 47.74787807352673,6.802715063095094 ],
              [47.74801694298314,6.803020834922791 ],
              [47.74814499111465,6.802701652050019 ],
              [47.7480115324918,6.802358329296113 ]
            ]
          ,
          "properties": {
              "id": "1",
            "name": "Personne aussi",
            "description": "Ceci est un exemple de Polygon dans GeoJSON",
            "typeTerrain": "forrain",
            "apartient": null,
          }
        },
        {
            "geometry": [
              [47.74782937895426,6.8027204275131234],
              [ 47.7477337931795,6.802951097488403],
              [ 47.747564263260486 , 6.802578270435334],
              [47.747659849346554,6.802342236042023],
              [ 47.74782937895426,6.8027204275131234]
            ]
          ,
          "properties": {
            "id": "2",
            "name": "C'est a personne",
            "description": "Ceci est un exemple de Polygon dans GeoJSON",
            "typeTerrain": "scene",
            "apartient": null,
          }
        },
        {
            "geometry": [
              [47.74798177477921,6.80230736732483],
              [47.74785102099207, 6.802654713392259],
              [47.747676080928656,6.802288591861726],
              [47.74779962113755, 6.802004277706147],
              [47.7478275754507,6.802057921886444],
              [47.74788438578277,6.802069991827012],
              [47.74798177477921,6.80230736732483]
            ]
          ,
          "properties": {
            "id": "3",
            "name": "Celui de Enzo",
            "description": "Ceci est un exemple de Polygon dans GeoJSON",
            "typeTerrain": "scene",
            "apartient": "Enzo",
          }
        },
        {
            "geometry": [
              [47.74785462799751 , 6.802774071693421],
              [47.74799169401861 , 6.803074479103089],
              [ 47.747904224296825, 6.803307831287385],
              [47.747767158045356 , 6.802999377250672],
              [47.74785462799751,6.802774071693421 ]
            ],
          "properties": {
            "id": "4",
            "name": "Celui de Calixte",
            "description": "Ceci est un exemple de Polygon dans GeoJSON",
            "typeTerrain": "forrain",
            "apartient": "Calixte",
          }
        }
      ],
    featureSelected : null,
    couleur: [],


  }),
  created() {
    this.features.forEach((feature)=>{
      this.couleur.push(this.polygonOption(feature))
      console.log(this.couleur)
    })
  }
  ,
  watch: {
    'newfeature.properties.typeTerrain': function () {
      // Watch for changes in newfeature.properties.typeTerrain
      // and update filteredProvider accordingly
      this.filterProvider();
    }
    }
,
  methods: {
    closePanel() {
      document.querySelector('.info-panel').classList.add('info-panel-close');
      this.featureSelected = null;

    },
    switchEditor(){
      this.newPolygon =[]
      this.newfeature ={
        "geometry": [],
        "properties": {
          "id": null,
          "name": null,
          "description": null,
          "typeTerrain": null,
          "apartient": null,
        }
      }
      this.modeEditor= !this.modeEditor
      if (this.modeEditor){
        document.querySelector('.vue2leaflet-map').classList.add('newzone');
      }
      else{
        document.querySelector('.vue2leaflet-map').classList.remove('newzone');
      }
    },
    filterProvider(){
      for (let i = 0; i < this.types.length; i++) {
        if(this.types[i] === this.newfeature.properties.typeTerrain){
          this.filteredProvider = this.providers[i];

        }
      }
    },
    addPolygon(){
      this.newPolygon.push(this.newPolygon[0])
      this.newfeature.geometry = this.newPolygon
      this.features.push(this.newfeature)
      this.switchEditor()
      this.couleur = []
      this.features.forEach((feature) => {
        this.couleur.push(this.polygonOption(feature))
      })

      console.log(this.features)
    },
    openPanel(feature) {
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
      if(this.modeEditor)
      this.newPolygon.push([event.latlng.lat,event.latlng.lng])
    },
    polygonOption(feature) {
      for (let i = 0; i < this.types.length; i++) {
        if (this.types[i] === feature.properties.typeTerrain) {
          return this.couleurOption[i];
        }
      }

      // Retourne une valeur par défaut si aucun type ne correspond
      return 'black'; // Remplacez 'couleur par défaut' par la valeur souhaitée
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

.column-3{
  grid-column: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.map-container{
  margin: 20px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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
  width: 80%;
  height: 80%;
  overflow: hidden;
  border-radius: 45px;

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