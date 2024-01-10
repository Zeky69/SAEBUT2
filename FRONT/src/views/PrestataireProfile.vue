<template>
  <div class="PrestataireProfile">
    <PageTitre title="Modification profil" />

  </div>

</template>

<script>
import PageTitre from "@/components/Admin/PageTitre.vue";

export default {
  name: 'PrestataireProfile',
  components: {
  PageTitre
},
}

</script>

<style>
.PrestataireProfile{
  display: flex;
  flex-direction: column;
  padding: 3% 6%;

}



</style>