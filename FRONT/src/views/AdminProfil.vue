<template>
  <div class="AdminProfile">
    <PageTitre title="Modification profil"/>
    <EditComponents :user_id="user_id" :edit-presta-info="false"></EditComponents>
  </div>
</template>

<script>
import PageTitre from "@/components/Admin/PageTitre.vue";
import EditComponents from "@/components/Prestatire/EditComponents.vue";
import {mapState} from "vuex";


export default {
  name: 'AdminProfile',
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
.AdminProfile{
  display: flex;
  flex-direction: column;
  padding: 3% 4%;
}
</style>