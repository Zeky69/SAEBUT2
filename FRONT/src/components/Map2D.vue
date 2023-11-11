

<template>
<!--  <div id="map" style="width: 50%; height: 500px; display: block">-->

<!--  </div>-->

  <l-map style="width:800px ; height: 500px" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" ></l-tile-layer>
    <l-marker :lat-lng="markerLatLng"></l-marker>
    <transition name="info-panel-transition" leave-active-class="info-panel-transition-leave-active"  >
    <div v-if="isVisiblePanel" class="info-panel">
      <div class="close" @click="closePanel">
        <div></div>
      </div>
      <div class="info-panel-content">

      </div>
    </div>
      </transition>
  </l-map>

</template>

<script>
import {LMap , LTileLayer ,LMarker} from "vue2-leaflet";
import 'leaflet/dist/leaflet.css';
export default {
  name: 'Map2D',
  components: {
    LMap ,
    LTileLayer,
    LMarker
  },
  data: () => ({
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    zoom: 15,
    center: [51.505, -0.159],
    markerLatLng: [51.504, -0.159],
    isVisiblePanel: true,
  }),
  methods: {
    closePanel() {
      this.isVisiblePanel = false

    },




  }
}

</script>


<style>
.map {
  display: block;
  width: 100%;
  height: 100%;
  overflow :hidden
}

.info-panel-transition-leave-active {
  transition: right 1s;
  right: -33%;
}
.info-panel-transition-enter {
  right: 0;
}
.info-panel-transition-leave-to {
  transition: right;
}
.info-panel-transition-enter-active {
  transition: left 10s;
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
  transition: all 1s;
}




.info-panel-leave-to {
  right: -33%;
  transition: right 1s ease;

}
.close {
  display: flex;
  font-weight: bold;
  font-size: 1.5rem;
  cursor: pointer;
  border: 1px solid #041676;
  width: 6vh;
  height: 6vh;
  justify-content: center;
  align-items: center;
  background-color: #041676;
  margin: 5px;
  border-radius: 5px;
}
.close div {
  width: 15px;
  height: 5px;
  background-color: #d7d7d7;

}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66%;
  height: 10vh;
  background-color: #041676;
  color: #d7d7d7;
  font-weight: bold;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all .3s;
}
</style>