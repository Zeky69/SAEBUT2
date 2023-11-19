<template>
  <div>
  <Map2D/>
  <Map2DUser/>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import Map2D from "@/components/Map2D.vue";
import Map2DUser from "@/components/Map2DUser.vue";

export default defineComponent({
  components: {Map2D ,Map2DUser}
})
</script>

<style></style>