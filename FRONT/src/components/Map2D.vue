

<template>
<!--  <div id="map" style="width: 50%; height: 500px; display: block">-->
<!--  </div>-->
<div class="map-container">
  <l-map style="width:800px ; height: 500px" :min-zoom="18" :max-zoom="21" :max-bounds="cartebounds" :center="center">
    <l-tile-layer :url="url" ></l-tile-layer>
    <l-image-overlay :url="'map2D.bmp'" :bounds="cartebounds"></l-image-overlay>
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
import {LImageOverlay, LMap, LPolygon, LTileLayer} from "vue2-leaflet";
import 'leaflet/dist/leaflet.css';
import InfoPanel from "@/components/infoPanel.vue";

export default {
  name: 'Map2D',
  components: {
    InfoPanel,
    LImageOverlay,
    LMap ,
    LTileLayer,
    LPolygon
  },
  data: () => ({
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    center: [47.74915674062442-((47.74915674062442-47.74737489408103)/2.0) ,6.800086498260499-((6.800086498260499-6.804184913635255)/2.0)],
    cartebounds: [[47.74915674062442, 6.800086498260499],[47.74737489408103 , 6.804184913635255]],
    provider : {
      id:"Zekeriya",
      type:"forrain"},

    features : [{"geometry":[[47.7480115324918,6.802358329296113],[47.74787807352673,6.802715063095094],[47.74801694298314,6.803020834922791],[47.74814499111465,6.802701652050019],[47.7480115324918,6.802358329296113]],"properties":{"id":"1","name":"Personne aussi","description":"Ceci est un exemple de Polygon dans GeoJSON","typeTerrain":"forrain","apartient":null}},{"geometry":[[47.74782937895426,6.8027204275131234],[47.7477337931795,6.802951097488403],[47.747564263260486,6.802578270435334],[47.747659849346554,6.802342236042023],[47.74782937895426,6.8027204275131234]],"properties":{"id":"2","name":"C'est a personne","description":"Ceci est un exemple de Polygon dans GeoJSON","typeTerrain":"scene","apartient":null}},{"geometry":[[47.74798177477921,6.80230736732483],[47.74785102099207,6.802654713392259],[47.747676080928656,6.802288591861726],[47.74779962113755,6.802004277706147],[47.7478275754507,6.802057921886444],[47.74788438578277,6.802069991827012],[47.74798177477921,6.80230736732483]],"properties":{"id":"3","name":"Celui de Enzo","description":"Ceci est un exemple de Polygon dans GeoJSON","typeTerrain":"scene","apartient":"Enzo"}},{"geometry":[[47.74785462799751,6.802774071693421],[47.74799169401861,6.803074479103089],[47.747904224296825,6.803307831287385],[47.747767158045356,6.802999377250672],[47.74785462799751,6.802774071693421]],"properties":{"id":"4","name":"Celui de Calixte","description":"Ceci est un exemple de Polygon dans GeoJSON","typeTerrain":"forrain","apartient":"Calixte"}},{"geometry":[[47.74826762846636,6.8022818863391885],[47.74827484241924,6.80237576365471],[47.74816663302123,6.802649348974229],[47.7480259604675,6.802308708429337],[47.74814499111465,6.802009642124177],[47.74826762846636,6.8022818863391885]],"properties":{"id":null,"name":"Terrain","description":"Description du terrain","typeTerrain":"forrain","apartient":"Raclette"}},{"geometry":[[47.74811974221225,6.801962703466416],[47.74800972899453,6.802242994308473],[47.747904224296825,6.802005618810655],[47.747916848801836,6.801955997943879],[47.74790873304895,6.8019479513168335],[47.74788979628734,6.801972091197968],[47.747847413986385,6.801892966032029],[47.74786635076342,6.801819205284119],[47.747870859518855,6.8017441034317025],[47.74789701029259,6.8016958236694345],[47.74792496455345,6.8016448616981515],[47.74794931180065,6.801564395427705],[47.74796554329245,6.80162474513054],[47.74796283804417,6.801634132862092],[47.74811974221225,6.801962703466416]],"properties":{"id":null,"name":"Terrain 2","description":"Description de zinzin","typeTerrain":"forrain","apartient":"Zekeriya"}},{"geometry":[[47.74804399543154,6.801009178161621],[47.74816212429144,6.801258623600007],[47.748053914659096,6.801495999097825],[47.747977266033395,6.801331043243409],[47.74796644504187,6.801359206438065],[47.74794931180065,6.801301538944245],[47.74796193629473,6.801218390464784],[47.74799259576756,6.8011312186718],[47.74804399543154,6.801009178161621]],"properties":{"id":null,"name":"Terrain 3","description":"flop","typeTerrain":"scene","apartient":"Mhammed"}},{"geometry":[[47.74850208142272,6.800928711891175],[47.748397479464984,6.800681948661804],[47.7482838598589,6.800944805145264],[47.74839026552912,6.8011969327926645],[47.74850208142272,6.800928711891175]],"properties":{"id":null,"name":"terrain 5","description":"weshalors","typeTerrain":"forrain","apartient":null}},{"geometry":[[47.74852191970131,6.803584098815918],[47.74842272823265,6.803830862045289],[47.74831271565536,6.803589463233949],[47.74840288991622,6.803329288959504],[47.74852191970131,6.803584098815918]],"properties":{"id":null,"name":"prout","description":"poule","typeTerrain":"scene","apartient":"Zekeriya"}},{"geometry":[[47.748594058832545,6.802099496126175],[47.74859586230954,6.802130341529847],[47.74859496057104,6.802159845829011],[47.748592255355476,6.802186667919159],[47.74859045187836,6.8022094666957855],[47.74858413970793,6.802229583263398],[47.74857782753674,6.802252382040024],[47.748570613625866,6.802267134189607],[47.74856249797494,6.8022818863391885],[47.74855618580113,6.802287250757218],[47.74854626666929,6.802295297384263],[47.74853454405651,6.8022939562797555],[47.748522821441085,6.802288591861726],[47.74851200056298,6.802279204130174],[47.748503884902895,6.802265793085099],[47.74849757272199,6.802242994308473],[47.748493064020856,6.802225559949876],[47.748488555319305,6.8022094666957855],[47.748484046617406,6.802183985710145],[47.748484046617406,6.802166551351547],[47.74848314487698,6.802141070365907],[47.74848494835784,6.802120953798294],[47.74848945705966,6.802092790603639],[47.74849216228058,6.802074015140534],[47.748495769241586,6.802057921886444],[47.74850027794247,6.802048534154893],[47.74850568838302,6.80203378200531],[47.74851200056298,6.8020203709602365],[47.74851921448198,6.802009642124177],[47.748525526660266,6.802005618810655],[47.74853905275406,6.802004277706147],[47.74854807014796,6.802006959915162],[47.74856249797494,6.802015006542206],[47.748570613625866,6.802025735378266],[47.7485796310143,6.8020445108413705],[47.74858864840118,6.802061945199967],[47.748594058832545,6.802099496126175]],"properties":{"id":null,"name":"Scene","description":"alors on dance","typeTerrain":"scene","apartient":"Merguez"}}],
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