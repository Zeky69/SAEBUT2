

<template>
<div class="map-container">
  <l-map style="width:1000px ; height: 800px;" :min-zoom="19" :max-zoom="21" :max-bounds="cartebounds" :center="center" @click="addCoordinates">
    <l-tile-layer :url="url" ></l-tile-layer>
    <l-marker :lat-lng="markerLatLng"></l-marker>
    <l-image-overlay :url="'../map2D.png'" :bounds="cartebounds"></l-image-overlay>
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
                <tr>
                  <th>Type</th>
                  <td>
                    <select v-model="newfeature.properties.typeTerrain">
                      <option value=null >Choisir un type</option>
                      <option v-for="(type , index) in types" :key="index" :value=type.value >{{type.libelle}}</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>Appartient à</th>
                  <td>
                    <select v-model="newfeature.properties.apartient">
                      <option value=null selected>Libre</option>
                      <option v-for="(provider , index) in providers" :key="index" :value=provider.id_prestataire >{{provider.nom}}</option>
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
</template>

<script>
import {LImageOverlay, LMap, LMarker, LPolygon, LTileLayer} from "vue2-leaflet";
import 'leaflet/dist/leaflet.css';
import InfoPanelEdition from "@/components/Map2D/infoPanelEdition.vue";
import {getPrestataires,} from "@/services/prestataire.service";
import {getMap2DType, getAllEmp, createEmp, deleteEmp, updateEmp} from "@/services/map2D.service";

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
    couleurOption:["yellow","orange","blue","purple","cyan","brown","pink"],
    types: [],
    providers:[],
    features:[],
    featureSelected : null,
    couleur: [],


  }),
  created() {

    getPrestataires().then((response) => {
      response.forEach((prestataire) => {

        this.providers.push(prestataire)
      })
    })

    getMap2DType().then((response) => {
      console.log(response)
      response.forEach((type) => {
        console.log(type)
        this.types.push(type)
      })
    })


    getAllEmp().then((response) => {
      console.log(response)
      response.forEach((emp) => {
        const data = {
          "geometry": emp.matricepoints.matricepoints,
          "properties": {
            "id": emp.id_emplacement,
            "name": emp.nom,
            "description": emp.description,
            "typeTerrain": emp.id_type,
            "apartient": emp.prestataire_id,
            "accept": emp.accepted
            ,
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
    newfeature: {
      handler: function () {
        console.log(this.newfeature)
      },
      deep: true
    }
  },
  methods: {





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
          "accept": false
        }
      }
      this.modeEditor = !this.modeEditor
      if (this.modeEditor) {
        document.querySelector('.vue2leaflet-map').classList.add('newzone');
      } else {
        document.querySelector('.vue2leaflet-map').classList.remove('newzone');
      }
    }
    ,
    async addPolygon() {
      if (this.newPolygon.length > 2) {
        this.newPolygon.push(this.newPolygon[0])
        this.newfeature.geometry = this.newPolygon
        this.features.push(this.newfeature)

        const dataemp= {
              name : this.newfeature.properties.name,
              description : this.newfeature.properties.description,
              prestaire_id : this.newfeature.properties.apartient,
              type_id : this.newfeature.properties.typeTerrain,
              matricepoints : this.newfeature.geometry,
              accept : this.newfeature.properties.accept
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
    // updateFeatures(feature) {
    //   if (feature.properties.apartient == null) {
    //     feature.properties.apartient = this.provider.id
    //   } else {
    //     feature.properties.apartient = null;
    //   }
    //   this.couleur = []
    //   this.features.forEach((feature) => {
    //     this.couleur.push(this.polygonOption(feature))
    //   })
    //
    //   this.closePanel()
    //
    //
    // },
    addCoordinates(event) {
      if (this.modeEditor)
        this.newPolygon.push([event.latlng.lat, event.latlng.lng])
    },
    polygonOption(feature) {
      for (let i = 0; i < this.types.length; i++) {
        if (this.types[i].value === feature.properties.typeTerrain) {
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
      updateEmp(feature.properties.id,{
        nom: newfeature.properties.name,
        description: newfeature.properties.description,
        type_id: newfeature.properties.typeTerrain,
        prestataire_id: newfeature.properties.apartient,
        matricepoints: newfeature.geometry,
        accept: newfeature.properties.accept
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