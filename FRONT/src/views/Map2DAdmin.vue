<template>

  <div class="container-map-all">
    <PageTitre title="Carte interactive"></PageTitre>
    <TestMap/>
  </div>


</template>

<script>
import TestMap from '../components/Map2D/Map2Dedition.vue';
import PageTitre from "@/components/Admin/PageTitre.vue";

export default {
  components: {
    PageTitre,
    TestMap
  },
}


</script>

<style>
.container-map-all{
  padding: 10px;
  box-sizing: border-box;
}
</style>