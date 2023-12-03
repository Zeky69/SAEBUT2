

<template>
<!--  <div id="map" style="width: 50%; height: 500px; display: block">-->
<!--  </div>-->
<div class="map-container">
  <l-map style="width:100% ; height: 500px ; grid-column: 2" :min-zoom="18" :max-zoom="21" :max-bounds="cartebounds" :center="center" @click="addCoordinates">
    <l-tile-layer :url="url" ></l-tile-layer>
    <l-marker :lat-lng="markerLatLng"></l-marker>
    <l-image-overlay :url="'map2D.bmp'" :bounds="cartebounds"></l-image-overlay>
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
import { createEmp } from '../services/mapPrestataire.service.js';

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
    features : [{"geometry":[[47.74848224313654,6.801223754882813],[47.74848224313654,6.801192909479142],[47.74848043965561,6.80117279291153],[47.74847863617462,6.801148653030396],[47.748470520509336,6.801132559776307],[47.748457896138625,6.80111512541771],[47.74844527176485,6.801105737686158],[47.74843084390536,6.801089644432069],[47.74841551430027,6.801077574491501],[47.748397479464984,6.801064163446427],[47.748383051592235,6.801053434610367],[47.74835780280533,6.801036000251771],[47.7483370627212,6.801027953624726],[47.74832083134525,6.801025271415711],[47.7483226348317,6.80106818675995],[47.74832083134525,6.8011097609996805],[47.74832534006129,6.801144629716874],[47.748319027858706,6.801174134016038],[47.74831451914213,6.801198273897172],[47.748306403451274,6.801222413778306],[47.748294680784454,6.8012452125549325],[47.74827935113926,6.801263988018037],[47.748266726722186,6.8012934923172],[47.74825770927953,6.80130422115326],[47.748291975553286,6.801316291093826],[47.74832624180447,6.801325678825379],[47.74834968712123,6.801331043243409],[47.74839567598112,6.801329702138902],[47.74841912126657,6.801327019929887],[47.74844978047014,6.801313608884812],[47.748467815287306,6.8012934923172],[47.74848134139609,6.801263988018037],[47.74848224313654,6.801223754882813]],"properties":{"id":null,"name":"Mange 1","description":"WAOW c'est fou ","typeTerrain":"forrain","apartient":"Zekeriya"}},{"geometry":[[47.74813507190444,6.800993084907533],[47.74811433173155,6.801141947507858],[47.74806383388476,6.801179498434068],[47.74801333598895,6.801176816225053],[47.74796283804417,6.8011459708213815],[47.74788709103513,6.801124513149262],[47.747847413986385,6.80105745792389],[47.74782937895426,6.800987720489502],[47.74785282449482,6.8008965253829965],[47.74795382054889,6.800858974456787],[47.748071047865885,6.800869703292848],[47.74811433173155,6.800909936428071],[47.74813507190444,6.800993084907533]],"properties":{"id":null,"name":"Manege 2","description":"Le meilleur manège du monde","typeTerrain":"forrain","apartient":"Raclette"}},{"geometry":[[47.748168436513055,6.801667660474778],[47.74823336217657,6.801898330450059],[47.7481269561856,6.80210217833519],[47.74804850417158,6.80180847644806],[47.748168436513055,6.801667660474778]],"properties":{"id":null,"name":"Scene 1","description":"Les meilleurs rappeurs passe ici","typeTerrain":"scene","apartient":"Merguez"}},{"geometry":[[47.7478798770285,6.801379323005676],[47.74778068433624,6.801263988018037],[47.74770493706208,6.801202297210694],[47.747650831798765,6.801191568374635],[47.7475786913602,6.8012452125549325],[47.74754081758995,6.80130958557129],[47.74752819299372,6.8013954162597665],[47.7475786913602,6.8014946579933175],[47.747630993188146,6.801575124263764],[47.747676080928656,6.801628768444062],[47.74769411601391,6.801510751247406],[47.7478798770285,6.801379323005676]],"properties":{"id":null,"name":"Manege 3","description":"ici les gens sont heureux","typeTerrain":"forrain","apartient":"Zekeriya"}},{"geometry":[[47.74756787028582,6.803223341703416],[47.74769141075152,6.8032072484493264],[47.747710347585326,6.803154945373536],[47.747718463369125,6.803010106086732],[47.74770944583148,6.8028223514556885],[47.74768149145488,6.802728474140168],[47.74757508433565,6.802708357572556],[47.74757147731085,6.802983283996583],[47.74756787028582,6.803223341703416]],"properties":{"id":null,"name":"le stade","description":"ici il y a des spectacles de cheval","typeTerrain":"scene","apartient":"Merguez"}},{"geometry":[[47.748068342623064,6.80249646306038],[47.74805842339828,6.802373081445695],[47.74800522025113,6.802326142787934],[47.74796464154304,6.802319437265396],[47.7479231610532,6.802397221326829],[47.74789881379373,6.802523285150529],[47.747940294303014,6.802586317062379],[47.748029567460826,6.802580952644348],[47.748068342623064,6.80249646306038]],"properties":{"id":null,"name":"manege 5","description":"c'est un manege des enfants","typeTerrain":"forrain","apartient":"Enzo"}},{"geometry":[[47.74886638315168,6.80243343114853],[47.748810475626264,6.802528649568559],[47.748753666305,6.80249109864235],[47.74877170101688,6.80240660905838],[47.74879514613298,6.802352964878083],[47.74885195540895,6.80237039923668],[47.74886638315168,6.80243343114853]],"properties":{"id":null,"name":"manege  6","description":"manege pour enfant ","typeTerrain":"forrain","apartient":"Raclette"}},{"geometry":[[47.748777111429234,6.802741885185243],[47.74876088019053,6.802673488855363],[47.74873833679502,6.802666783332825],[47.74870136560526,6.802660077810288],[47.74869144650107,6.80271103978157],[47.748695955185035,6.802752614021302],[47.7487022673419,6.802782118320466],[47.74873743505896,6.8027928471565255],[47.74876629060399,6.8027807772159585],[47.748777111429234,6.802741885185243]],"properties":{"id":null,"name":"manege","description":"ici personne s'amuse","typeTerrain":"forrain","apartient":null}},{"geometry":[[47.7483271435476,6.802790164947511],[47.7482838598589,6.802626550197602],[47.74823696915552,6.8025702238082895],[47.748184667936506,6.80254876613617],[47.74814859809968,6.802556812763215],[47.74811072474413,6.802588999271394],[47.74808547582509,6.802650690078736],[47.74812154570566,6.802752614021302],[47.748168436513055,6.802798211574554],[47.74825320055763,6.802827715873719],[47.74830910868168,6.802819669246674],[47.7483271435476,6.802790164947511]],"properties":{"id":null,"name":"Scene sur lherbe","description":"ici c'est les gens qui n'ont pas les moyens","typeTerrain":"scene","apartient":"Mhammed"}},{"geometry":[[47.748639145738785,6.801891624927522],[47.74858774666256,6.801663637161255],[47.74847773443408,6.801988184452058],[47.748639145738785,6.801891624927522]],"properties":{"id":null,"name":"manege","description":"ici c'est tropico","typeTerrain":"forrain","apartient":null}},{"geometry":[[47.74887540048889,6.802130341529847],[47.748758174983564,6.801931858062745],[47.748779816635185,6.802127659320832],[47.74879604786801,6.802261769771577],[47.74886638315168,6.802328824996949],[47.74889704209179,6.802216172218324],[47.74887540048889,6.802130341529847]],"properties":{"id":null,"name":"scene de presentation","description":"wesh ma gueule","typeTerrain":"forrain","apartient":null}},{"geometry":[[47.747881680530256,6.801526844501496],[47.74772657915165,6.80156171321869],[47.74771936512279,6.801749467849732],[47.7478798770285,6.801749467849732],[47.747881680530256,6.801526844501496]],"properties":{"id":null,"name":"manege","description":"trop style ici ","typeTerrain":"forrain","apartient":null}},{"geometry":[[47.74831812611543,6.802251040935517],[47.748161222545434,6.802167892456055],[47.748125152692346,6.802285909652711],[47.74811613522519,6.802428066730499],[47.748132366664954,6.802495121955872],[47.74824779009082,6.8024441599845895],[47.748348785378454,6.802352964878083],[47.74831812611543,6.802251040935517]],"properties":{"id":null,"name":"manege de zinzin","description":"en vrai c'est nul","typeTerrain":"forrain","apartient":null}},{"geometry":[[47.7484912605403,6.8030449748039254],[47.748368623715514,6.802851855754853],[47.74819909586427,6.802884042263032],[47.74827484241924,6.803122758865357],[47.7484912605403,6.8030449748039254]],"properties":{"id":null,"name":"manege ","description":"c'est les enfants ici","typeTerrain":"forrain","apartient":"Calixte"}},{"geometry":[[47.74765443881807,6.802143752574921],[47.747504747306905,6.80218130350113],[47.747515568394434,6.802499145269395],[47.74769952653828,6.80248573422432],[47.74774731947906,6.8022336065769196],[47.74765443881807,6.802143752574921]],"properties":{"id":null,"name":"manege a eau","description":"ici on ca mouille","typeTerrain":"forrain","apartient":"Raclette"}},{"geometry":[[47.748520116221776,6.8016837537288675],[47.74842813868127,6.801379323005676],[47.74829558252814,6.801424920558929],[47.74841641604187,6.8020351231098175],[47.748520116221776,6.8016837537288675]],"properties":{"id":null,"name":"scene","description":"je sais pas","typeTerrain":"scene","apartient":"Mhammed"}},{"geometry":[[47.748740140267,6.802449524402618],[47.74873292637864,6.802031099796296],[47.7485796310143,6.80203378200531],[47.74862291445703,6.802457571029664],[47.748740140267,6.802449524402618]],"properties":{"id":null,"name":"manege trop stylé","description":"bah viens","typeTerrain":"forrain","apartient":"Calixte"}}],

    featureSelected : null,
    couleur: [],


  }),
  created() {
    this.features.forEach((feature)=>{
      this.couleur.push(this.polygonOption(feature))
    })
  }
  ,
  watch: {
    'newfeature.properties.typeTerrain': function () {
      this.filterProvider();
    }
    }
,
  methods: {
    prettycoo(coo) {
      const centerx = 47.74826581735272
      const centery = 6.802135705947877

      coo[0] = coo[0] - centerx
      coo[1] = coo[1] - centery

      coo[0] = coo[0] * 10000
      coo[1] = coo[1] * 10000
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
              name : "emp_" + this.newfeature.properties.name,
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
      this.features.splice(this.features.indexOf(feature), 1)
      this.couleur = []
      this.features.forEach((feature) => {
        this.couleur.push(this.polygonOption(feature))
      })
      this.closePanel()
    },
    editFeature(feature, newfeature) {
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