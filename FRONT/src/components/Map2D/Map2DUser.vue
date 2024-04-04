

<template>
  <div class="all-container">
    <div class="dotted"></div>
    <div class="title-container"><h1 class="title">{{ $t('map2D.title') }}</h1></div>
  <div class="map">
    <div class="filtre-container">
      <div class="info-panel-user info-panel-close">
      <info-panel-user v-if="featureSelected" :feature="featureSelected" @close-panel="closePanel"></info-panel-user>
      </div>
      <div class="filtre-head">
      <div class="search-bar">
        <input class="search-input" :placeholder="$t('map2D.placeholderSearch')"  type="text" v-model="filtre.nom" id="nom" name="nom">
        <img class="loupe" :src="require('@/assets/icons/loupe.svg')" alt="loupe de recherche">
      </div>
        <div class="selector-container">
        <bar-select
          :options="types"
          :default="{value: '', libelle: $t('map2D.allCategories')}"
          class="select"
          @input="updatetype"
      />
        </div>
    </div>
<!--    <div class="selector-container">-->
<!--      <button class="btn-selector"  @click="filtreOpen=!filtreOpen">{{filtre.type===''?"Toutes les catégories":filtre.type}}</button>-->
<!--      <div class="option" v-show="filtreOpen">-->
<!--        <button class="btn-option" @click="filtre.type = ''" >Toutes les catégorie</button>-->

<!--        <button class="btn-option" v-for="(type, index) in types" :key="index" @click="filtre.type = type" >{{ type }}</button>-->
<!--      </div>-->
<!--    </div>-->


<!--      <select class="type-selector" v-model="filtre.type" name="type" id="type">-->
<!--        <option class="option" value="" selected>Toutes les catégories</option>-->
<!--        <option class="option" v-for="(type, index) in types" :key="index" :value="type">{{ type }}</option>-->
<!--      </select>-->



      <div class="resultat">
        <ul class="ul-resultat">
          <li v-for="(feature, index) in filteredFeature" :key="index" @click="openPanel(feature)"> <div :class=" getColor(feature)" ></div>{{feature.properties.name}}</li>
        </ul>
      </div>
    </div>

    <div class="map-container">
      <l-map style="width:1000px ; height: 800px" :min-zoom="19" :max-zoom="21" :zoom="zoom" :max-bounds="cartebounds" :center="center" ref="map">
        <l-tile-layer :url="url" ></l-tile-layer>
        <l-image-overlay :url="'map2D.png'" :bounds="cartebounds"></l-image-overlay>
        <v-marker-cluster>
        <l-marker v-for="(feature,index) in filteredFeature" :key="index"  :lat-lng="getLatLngMarker(feature.geometry)" @click="openPanel(feature)" @close-panel="closePanel">
          <l-icon
              :icon-size="[40, 40]"
              :icon-anchor="[20, 20]"
              :icon-url="getIconUrl(feature)"
          />
        </l-marker>
        </v-marker-cluster>


      </l-map>
    </div>

  </div>
    <div class="dotted"></div>
  </div>

</template>

<script>
import {LImageOverlay, LMap,LIcon, LMarker, LTileLayer} from "vue2-leaflet";
import Vue2LeafletMarkercluster from "vue2-leaflet-markercluster"

import 'leaflet/dist/leaflet.css';

import {
  Icon
} from 'leaflet';
import InfoPanelUser from "@/components/Map2D/infoPanelUser.vue";
import barSelect from "@/components/barSelect.vue";
import {getAllEmpWithPrestataire, getMap2DType} from "@/services/map2D.service";


delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name: 'Map2DUser',
  components: {
    InfoPanelUser,
    barSelect,
    LImageOverlay,
    LMap ,
    'v-marker-cluster': Vue2LeafletMarkercluster,
    LIcon,
    LTileLayer,
    LMarker,
  },created() {

    getMap2DType().then((response) => {
      response.forEach((type) => {
        this.types.push(type)
      })
    }).catch((error) => {
      console.log(error);
    });


    getAllEmpWithPrestataire().then((response) => {

      console.log(response)

      response.forEach((bat) => {
        const data = {
          "geometry": bat.matricepoints.matricepoints,
          "properties": {
            "name": bat.nom,
            "description": bat.description,
            "marker": bat.marker,
            "type" : bat.id_type,
            "id_prestataire": bat.prestataire_id,
          }
        }
        console.log(data)
        this.features.push(data)
      })






    }).catch((error) => {
      console.log(error);
    });

    },


  mounted() {
    this.filteredFeature = this.features;

  },
  watch: {
    'filtre.type': function () {

      this.filteredFeature = this.features.filter((feature) => {
         const isTypeTerrain =  this.filtre.type=== '' || this.filtre.type.includes(feature.properties.type);
          const isNom = this.filtre.nom === '' || feature.properties.name.toLowerCase().includes(this.filtre.nom.toLowerCase());
          return isTypeTerrain && isNom;
      });

    },
    'filtre.nom': function () {

      this.filteredFeature = this.features.filter((feature) => {
        const isTypeTerrain = this.filtre.type || this.filtre.type.includes(feature.properties.type);
        const isNom = this.filtre.nom === '' || feature.properties.name.toLowerCase().includes(this.filtre.nom.toLowerCase());
        return isTypeTerrain && isNom;
      });

    },
  }

  ,
  data: () => ({
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    center: [47.74915674062442-((47.74915674062442-47.74737489408103)/2.0) ,6.800086498260499-((6.800086498260499-6.804184913635255)/2.0)],
    deufaultCenter: [47.74915674062442-((47.74915674062442-47.74737489408103)/2.0) ,6.800086498260499-((6.800086498260499-6.804184913635255)/2.0)],
    cartebounds: [[47.74915674062442, 6.800086498260499],[47.74737489408103 , 6.804184913635255]],
    // features : [{"geometry":[[47.74848224313654,6.801223754882813],[47.74848224313654,6.801192909479142],[47.74848043965561,6.80117279291153],[47.74847863617462,6.801148653030396],[47.748470520509336,6.801132559776307],[47.748457896138625,6.80111512541771],[47.74844527176485,6.801105737686158],[47.74843084390536,6.801089644432069],[47.74841551430027,6.801077574491501],[47.748397479464984,6.801064163446427],[47.748383051592235,6.801053434610367],[47.74835780280533,6.801036000251771],[47.7483370627212,6.801027953624726],[47.74832083134525,6.801025271415711],[47.7483226348317,6.80106818675995],[47.74832083134525,6.8011097609996805],[47.74832534006129,6.801144629716874],[47.748319027858706,6.801174134016038],[47.74831451914213,6.801198273897172],[47.748306403451274,6.801222413778306],[47.748294680784454,6.8012452125549325],[47.74827935113926,6.801263988018037],[47.748266726722186,6.8012934923172],[47.74825770927953,6.80130422115326],[47.748291975553286,6.801316291093826],[47.74832624180447,6.801325678825379],[47.74834968712123,6.801331043243409],[47.74839567598112,6.801329702138902],[47.74841912126657,6.801327019929887],[47.74844978047014,6.801313608884812],[47.748467815287306,6.8012934923172],[47.74848134139609,6.801263988018037],[47.74848224313654,6.801223754882813]],"properties":{"id":null,"name":"Mange 1","description":"WAOW c'est fou ","typeTerrain":"forrain","apartient":"Zekeriya"}},{"geometry":[[47.74813507190444,6.800993084907533],[47.74811433173155,6.801141947507858],[47.74806383388476,6.801179498434068],[47.74801333598895,6.801176816225053],[47.74796283804417,6.8011459708213815],[47.74788709103513,6.801124513149262],[47.747847413986385,6.80105745792389],[47.74782937895426,6.800987720489502],[47.74785282449482,6.8008965253829965],[47.74795382054889,6.800858974456787],[47.748071047865885,6.800869703292848],[47.74811433173155,6.800909936428071],[47.74813507190444,6.800993084907533]],"properties":{"id":null,"name":"Manege 2","description":"Le meilleur manège du monde","typeTerrain":"forrain","apartient":"Raclette"}},{"geometry":[[47.748168436513055,6.801667660474778],[47.74823336217657,6.801898330450059],[47.7481269561856,6.80210217833519],[47.74804850417158,6.80180847644806],[47.748168436513055,6.801667660474778]],"properties":{"id":null,"name":"Scene 1","description":"Les meilleurs rappeurs passe ici","typeTerrain":"scene","apartient":"Merguez"}},{"geometry":[[47.7478798770285,6.801379323005676],[47.74778068433624,6.801263988018037],[47.74770493706208,6.801202297210694],[47.747650831798765,6.801191568374635],[47.7475786913602,6.8012452125549325],[47.74754081758995,6.80130958557129],[47.74752819299372,6.8013954162597665],[47.7475786913602,6.8014946579933175],[47.747630993188146,6.801575124263764],[47.747676080928656,6.801628768444062],[47.74769411601391,6.801510751247406],[47.7478798770285,6.801379323005676]],"properties":{"id":null,"name":"Manege 3","description":"ici les gens sont heureux","typeTerrain":"forrain","apartient":"Zekeriya"}},{"geometry":[[47.74756787028582,6.803223341703416],[47.74769141075152,6.8032072484493264],[47.747710347585326,6.803154945373536],[47.747718463369125,6.803010106086732],[47.74770944583148,6.8028223514556885],[47.74768149145488,6.802728474140168],[47.74757508433565,6.802708357572556],[47.74757147731085,6.802983283996583],[47.74756787028582,6.803223341703416]],"properties":{"id":null,"name":"le stade","description":"ici il y a des spectacles de cheval","typeTerrain":"scene","apartient":"Merguez"}},{"geometry":[[47.748068342623064,6.80249646306038],[47.74805842339828,6.802373081445695],[47.74800522025113,6.802326142787934],[47.74796464154304,6.802319437265396],[47.7479231610532,6.802397221326829],[47.74789881379373,6.802523285150529],[47.747940294303014,6.802586317062379],[47.748029567460826,6.802580952644348],[47.748068342623064,6.80249646306038]],"properties":{"id":null,"name":"manege 5","description":"c'est un manege des enfants","typeTerrain":"forrain","apartient":"Enzo"}},{"geometry":[[47.74886638315168,6.80243343114853],[47.748810475626264,6.802528649568559],[47.748753666305,6.80249109864235],[47.74877170101688,6.80240660905838],[47.74879514613298,6.802352964878083],[47.74885195540895,6.80237039923668],[47.74886638315168,6.80243343114853]],"properties":{"id":null,"name":"manege  6","description":"manege pour enfant ","typeTerrain":"forrain","apartient":"Raclette"}},{"geometry":[[47.748777111429234,6.802741885185243],[47.74876088019053,6.802673488855363],[47.74873833679502,6.802666783332825],[47.74870136560526,6.802660077810288],[47.74869144650107,6.80271103978157],[47.748695955185035,6.802752614021302],[47.7487022673419,6.802782118320466],[47.74873743505896,6.8027928471565255],[47.74876629060399,6.8027807772159585],[47.748777111429234,6.802741885185243]],"properties":{"id":null,"name":"manege","description":"ici personne s'amuse","typeTerrain":"forrain","apartient":null}},{"geometry":[[47.7483271435476,6.802790164947511],[47.7482838598589,6.802626550197602],[47.74823696915552,6.8025702238082895],[47.748184667936506,6.80254876613617],[47.74814859809968,6.802556812763215],[47.74811072474413,6.802588999271394],[47.74808547582509,6.802650690078736],[47.74812154570566,6.802752614021302],[47.748168436513055,6.802798211574554],[47.74825320055763,6.802827715873719],[47.74830910868168,6.802819669246674],[47.7483271435476,6.802790164947511]],"properties":{"id":null,"name":"Scene sur lherbe","description":"ici c'est les gens qui n'ont pas les moyens","typeTerrain":"scene","apartient":"Mhammed"}},{"geometry":[[47.748639145738785,6.801891624927522],[47.74858774666256,6.801663637161255],[47.74847773443408,6.801988184452058],[47.748639145738785,6.801891624927522]],"properties":{"id":null,"name":"manege","description":"ici c'est tropico","typeTerrain":"forrain","apartient":null}},{"geometry":[[47.74887540048889,6.802130341529847],[47.748758174983564,6.801931858062745],[47.748779816635185,6.802127659320832],[47.74879604786801,6.802261769771577],[47.74886638315168,6.802328824996949],[47.74889704209179,6.802216172218324],[47.74887540048889,6.802130341529847]],"properties":{"id":null,"name":"scene de presentation","description":"wesh ma gueule","typeTerrain":"forrain","apartient":null}},{"geometry":[[47.747881680530256,6.801526844501496],[47.74772657915165,6.80156171321869],[47.74771936512279,6.801749467849732],[47.7478798770285,6.801749467849732],[47.747881680530256,6.801526844501496]],"properties":{"id":null,"name":"manege","description":"trop style ici ","typeTerrain":"forrain","apartient":null}},{"geometry":[[47.74831812611543,6.802251040935517],[47.748161222545434,6.802167892456055],[47.748125152692346,6.802285909652711],[47.74811613522519,6.802428066730499],[47.748132366664954,6.802495121955872],[47.74824779009082,6.8024441599845895],[47.748348785378454,6.802352964878083],[47.74831812611543,6.802251040935517]],"properties":{"id":null,"name":"manege de zinzin","description":"en vrai c'est nul","typeTerrain":"forrain","apartient":null}},{"geometry":[[47.7484912605403,6.8030449748039254],[47.748368623715514,6.802851855754853],[47.74819909586427,6.802884042263032],[47.74827484241924,6.803122758865357],[47.7484912605403,6.8030449748039254]],"properties":{"id":null,"name":"manege ","description":"c'est les enfants ici","typeTerrain":"forrain","apartient":"Calixte"}},{"geometry":[[47.74765443881807,6.802143752574921],[47.747504747306905,6.80218130350113],[47.747515568394434,6.802499145269395],[47.74769952653828,6.80248573422432],[47.74774731947906,6.8022336065769196],[47.74765443881807,6.802143752574921]],"properties":{"id":null,"name":"manege a eau","description":"ici on ca mouille","typeTerrain":"forrain","apartient":"Raclette"}},{"geometry":[[47.748520116221776,6.8016837537288675],[47.74842813868127,6.801379323005676],[47.74829558252814,6.801424920558929],[47.74841641604187,6.8020351231098175],[47.748520116221776,6.8016837537288675]],"properties":{"id":null,"name":"scene","description":"je sais pas","typeTerrain":"scene","apartient":"Mhammed"}},{"geometry":[[47.748740140267,6.802449524402618],[47.74873292637864,6.802031099796296],[47.7485796310143,6.80203378200531],[47.74862291445703,6.802457571029664],[47.748740140267,6.802449524402618]],"properties":{"id":null,"name":"manege trop stylé","description":"bah viens","typeTerrain":"forrain","apartient":"Calixte"}}],
    filteredFeature: [],
    features: [],
    couleur: [],
    featureSelected: null,
    types: [],
    filtreOpen: true,
      zoom: 19,
    filtre: {
      type: undefined,
      nom:'',
      apartient: [],
    },

  }),
  methods: {
    updatetype(val){
      this.filtre.type = val.value;
    },
    getIconUrl(f) {
    return require(`@/assets/map2D/icons/${f.properties.marker}`);
    }
  ,
  getColor(f){
      switch (f.properties.type){
        case '1':
          return 'cerlce orange';
        case '2':
          return 'cerlce rouge';
        case '3':
          return 'cerlce rose';
        case '4':
          return 'cerlce jaune';
          case '5':
          return 'cerlce vert';
          case '6':
          return 'cerlce bleu';
          case '7':
          return 'cerlce violet';
        default:
          return 'cerlce gris';

      }
  }
  ,
    getLatLngMarker(coordinates) {
      if (coordinates && coordinates.length > 0) {
        const sumLat = coordinates.reduce((sum, coord) => sum + coord[0], 0);
        const sumLng = coordinates.reduce((sum, coord) => sum + coord[1], 0);
        const avgLat = sumLat / coordinates.length;
        const avgLng = sumLng / coordinates.length;
        return [avgLat, avgLng];
      }
      return null;
    },
    closePanel() {
      document.querySelector('.info-panel-user').classList.add('info-panel-close');
      this.featureSelected = null;
      this.zoom = 19;
      this.$refs.map.mapObject.setView(this.center, 19);

    },
    openPanel(feature) {
      document.querySelector('.info-panel-user').classList.remove('info-panel-close');
      this.featureSelected = feature;
      this.center = this.getLatLngMarker(feature.geometry);
      this.$refs.map.mapObject.setView(this.getLatLngMarker(feature.geometry), 21);

    }

  }
}

</script>


<style scoped>

@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
/* Largeur de la barre de défilement */
::-webkit-scrollbar {
  width: 9px;
}

/* Couleur de fond de la barre de défilement */
::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
}

/* Couleur de la poignée de défilement (la partie mobile) */
::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.30);
  border-radius: 20px;
}

/* Changement de couleur au survol de la poignée de défilement */
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.47);

}


option {
  font-family: "DM Sans Regular" ,Syne, Helvetica , sans-serif ;
  color: #000000;

}


.selector-container{
  margin: 10px;
   display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  width: 100%;

}

.btn-selector{

  width: 80%;
  height: 40px;
  border: none;
  color: white;
  margin: 10px 10% 20px 10%;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  text-align-last: center

}

.option{

  position: absolute;
  z-index: 405;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(60, 52, 72, 0.37);
  backdrop-filter: blur(10px);
  width: auto;
  object-fit: cover;

}

.btn-option{
  background-color: transparent;
  border: none;
  color: white;
}



.dotted {
  width: 100%;
  height: 20px;
  background-image: url("../../assets/icons/dotted.svg");
  background-repeat: repeat;
  z-index: 0;
  margin: 50px 0;
}










.ul-resultat li{
  color: white;
  padding: 10px 0;
  border-bottom: rgba(255, 255, 255, 0.34) solid 1px;
  width: 95%;
  text-align: left;
  display: flex;
  flex-direction: row;
}

.ul-resultat li:hover{
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}

.cerlce{
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-right: 10px;
  margin-left: 20px;
}

.rouge{
  background-color: #ff2b2b;
}

.orange{
  background-color: #feb42d;
}

.bleu{
  background-color: #0a5df6;
}

.jaune{
  background-color: #fff300;
}

.gris{
  background-color: #7e7e7e;
}

.violet{
  background-color: #a800ff;
}

.rose{
  background-color: #ff70f6;
}

.vert{
  background-color: #00ff00;
}

.title-container{
  width: 100%;
  max-width: 400px;
  background-color: #553C65;
  padding: 5px 5px;
  border-radius: 0 10px 10px 0;
  margin: 20px 0;
}
.title {
  font-family: "DM Sans";
  font-size: 45px;
  color : white;
  display: flex;
  flex-direction: row;
}

.title span {
  color: rgba(255, 255, 255, 0.3);
}

.btn {
  background-color: #553C65;
  color: white;
  padding: 10px 25px;
  border-radius: 10px;
  border: none;
  margin: 10px 0;
  cursor: pointer;
}

.search-bar{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  width: 90%;
  border-radius: 5px;
  margin: 40px 0 0 0;

}


.type-selector{
  width: 80%;
  height: 40px;
  border: none;
  color: white;
  margin: 10px 10% 20px 10%;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  text-align-last: center
}

.filtre-head{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


}
.search-input{
  width: 80%;
  height: 40px;
  border: none;
background-color: transparent;
  color: white;
}
.search-input:focus{
  outline: none;
}

::placeholder {
  color: rgba(255, 255, 255, 0.69);
  opacity: 1;
}

::-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.69);
}


.loupe {
  width: 15px;
  height: 15px;
}



.map {
  display: block;
  width: 100%;
  height: 100%;
  overflow :hidden
}

.filtre-container{
  background-color: rgba(85, 60, 101, 1);
  border-radius: 50px 0 0 50px;
  width: 350px;
  overflow: hidden;
  position: relative;


}

.map{
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.resultat{
  height: 600px;
  overflow: scroll;
  overflow-x:hidden;


}

.map-container{
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 100%;
}
.vue2leaflet-map{
  border-radius: 0  50px 50px 0 !important;
}

.info-panel-close{
  left: -100% !important;
}


.info-panel-user {
  position: absolute;
  z-index: 1000;
  transition: all 0.3s;
  cursor: default;
  width: 100%;
  height: 100%;
  left: 0;
  backdrop-filter: blur(15px);
  padding: 20px;
  box-sizing: border-box;
  color : white;
  background-color: rgba(85, 60, 101, 0.3);

}


.close div {
  width: 15px;
  height: 5px;
  background-color: #d7d7d7;

}

@media screen and (max-width: 350px){
  .title{
    flex-direction: column;
  }

}

@media screen and (max-width: 1180px){

  .title-container{
    width: 100%;
    max-width: 100%;
    border-radius: 0 !important;
    padding: 5px 0;
  }
  .title {
    font-size: 40px;

  }
  .map{
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: fit-content;
  }
  .filtre-container{
    border-radius: 10px 10px 0 0;
    width: 95%;
    height: 40vh;
  }

  .filtre-head{
    width: 100%;
    min-height: fit-content;


  }

  .resultat{
    height: 160px;
  }

  .map-container{
    width: 100%;
    height: 50vh;
  }
  .vue2leaflet-map{
    width: 95% !important;
    border-radius: 0 0 10px 10px !important;
    height: 100% !important;
  }

  .info-panel-user {
    width: 100%;
    right: -100%;
  }

  .info-panel-close{
    right: -100% !important;
  }

  .title-container{
    width: 100%;
    border-radius: 0 0 10px 10px;
  }

  .dotted {
    margin: 0;
  }

  .search-bar{
    width: 95%;
    margin-top: 5px;
  }



}

</style>