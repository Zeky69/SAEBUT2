<template>
  <div class="PrestataireProfile">
    <PageTitre title="Modification profil"/>
    <EditComponents :user_id="user_id"></EditComponents>
  </div>
</template>

<script>
import PageTitre from "@/components/Admin/PageTitre.vue";
import EditComponents from "@/components/Prestatire/EditComponents.vue";
import {mapState,} from "vuex";


export default {
  name: 'PrestataireProfile',
  computed: {
    ...mapState(['user_id']),
  },
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
