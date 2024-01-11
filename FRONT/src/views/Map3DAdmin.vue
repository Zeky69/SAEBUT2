<template>
  <div class="maclasse" style="display: flex; flex-direction: column; justify-content: center; text-align: center; justify-items: center; ">
    <div class="toggle-container">
      <span>3D</span>
      <label class="toggle-label">
        <input type="checkbox" v-model="isMapView2D" class="toggle-input" />
        <span class="toggle-slider"></span>
      </label>
      <span>2D</span>
    </div>

    <div>
      <Map2DAdmin v-if="isMapView2D" />
      <Map3DAdmin v-else />
    </div>
  </div>
</template>

<script>
import Map2DAdmin from '../components/Map2D/Map2Dedition.vue';
import Map3DAdmin from '../components/Map3D/Map3DAdmin.vue';

export default {
  components: {
    Map2DAdmin,
    Map3DAdmin
  },
  data() {
    return {
      isMapView2D: true
    };
  }
};
</script>

<style scoped>
.toggle-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.toggle-label {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-left: 2vw;
  margin-right: 2vw;
}

.toggle-input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.toggle-input:checked + .toggle-slider {
  background-color: #2196f3;
}

.toggle-slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

.toggle-input:checked + .toggle-slider:before {
  transform: translateX(26px);
}

</style>
