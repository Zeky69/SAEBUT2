

<template>
<!--  <div id="map" style="width: 50%; height: 500px; display: block">-->
<!--  </div>-->
<div class="map-container">
  <l-map style="width:800px ; height: 500px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" ></l-tile-layer>
    <l-marker :lat-lng="markerLatLng"></l-marker>
    <l-image-overlay :url="'carte.jpeg'" :bounds="cartebounds"></l-image-overlay>
      <l-polygon
          v-for="(feature , index) in features"
          :key="`polygon-${index}`"
          ref="zone"
          :lat-lngs="feature.geometry"
          :color="couleur[index]"
          :fill-color="couleur[index]"
          @click="openPanel(feature)"
      >




      </l-polygon>
        <div class="info-panel info-panel-close">
        <info-panel v-if="featureSelected!=null" @update-feature="updateFeatures" @close-panel="closePanel" :prestataire="provider" :feature="featureSelected"> </info-panel>

        </div>
  </l-map>
  </div>
</template>

<script>
import {LImageOverlay, LMap, LMarker, LPolygon, LTileLayer} from "vue2-leaflet";
import 'leaflet/dist/leaflet.css';
import InfoPanel from "@/components/infoPanel.vue";

export default {
  name: 'Map2D',
  components: {
    InfoPanel,
    LImageOverlay,
    LMap ,
    LTileLayer,
    LMarker,
    LPolygon
  },
  data: () => ({
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    zoom: 15,
    center: [47.748200899354956,6.802237629890443],
    cartebounds: [[47.74915674062442, 6.800086498260499],[47.74737489408103 , 6.804184913635255]],
    markerLatLng: [51.504, -0.159],
    isVisible: true,
    provider : {
      id:"Zekeriya",
      type:"forrain"},

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
    couleur: []

  }),
  created() {
    this.features.forEach((feature)=>{
      this.couleur.push(this.polygonOption(feature))
    })
  }
  ,
  methods: {
    closePanel() {
      document.querySelector('.info-panel').classList.add('info-panel-close');
      this.featureSelected = null;

    },
    openPanel(feature) {
      document.querySelector('.info-panel').classList.remove('info-panel-close');
      this.featureSelected = feature;

    },
    updateFeatures(feature){
      if(feature.properties.apartient==null){
        feature.properties.apartient = this.provider.id
      }else
      {
        feature.properties.apartient = null;
      }
      this.couleur = []
      this.features.forEach((feature)=>{
        this.couleur.push(this.polygonOption(feature))
      })

      this.closePanel()



    }
    ,

    polygonOption(feature){
      const isPrestataire = feature.properties.apartient === this.provider.id;
      const isTypeTerrain = feature.properties.typeTerrain === this.provider.type;
      const isNullApartient = feature.properties.apartient === null;

      return isPrestataire ? '#77ff1c' :
          (isNullApartient && isTypeTerrain) ? '#0a5df6' :
              (isNullApartient && !isTypeTerrain) ? '#7e7e7e' :
                  '#ff2b2b';


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

.map-container{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.info-panel-close{
  right: -33% !important;
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