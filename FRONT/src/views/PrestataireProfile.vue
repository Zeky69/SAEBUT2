<template>
  <div class="PrestataireProfile">
    <PageTitre title="Modification profil"/>
    <EditComponents></EditComponents>
  </div>
</template>

<script>
import PageTitre from "@/components/Admin/PageTitre.vue";
import EditComponents from "@/components/Prestatire/EditComponents.vue";

export default {
  name: 'PrestataireProfile',
  components:{
    PageTitre,
    EditComponents
  }

};
</script>

<style scoped>
.PrestataireProfile{
  display: flex;
  flex-direction: column;
  padding: 3% 4%;
}
</style>
