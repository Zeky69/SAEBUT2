<template>
  <div class="editPresta">

    <page-titre :title="`Modification des information de  ${nomPresta}`"></page-titre>

    <div class="comp">
      <edit-components :user_id="idPrestataire"></edit-components>
      <div class="group_btn">
        <a class="btn des">Désactiver {{nomPresta}} </a>
        <a class="btn del">Supprimer définitivement {{nomPresta}}</a>
      </div>
      <page-titre :title="`Modification de la page de ${nomPresta}`"></page-titre>
      <prestate :prestate="prestataire" :mode="mode" p ref="prestate"  @change-mode="changeMode"  @valide="valide"></prestate>
    </div>
  </div>
</template>

<script>
import pageTitre from "@/components/Admin/PageTitre.vue";
import editComponents from "@/components/Prestatire/EditComponents.vue";
import prestate from "@/components/Prestatire/Prestate.vue";
import {mapActions, mapState} from "vuex";
import {updatePage} from "@/services/prestataire.service";
export default {
  name: "AdminEditPresta",
  components:{
    pageTitre,
    editComponents,
    prestate
  },
  data() {
    return {
      idPrestataire: null,
      prestataire: null,
      nomPresta: null,
      mode: '1',

    };
  },
  created() {
    this.idPrestataire = this.$route.params.idprestataire;
    this.getInformation()

  },computed   :{
    ...mapState(['prestataireObject']),
  }
,methods:{
    ...mapActions(['getPrestataireObject']),
    changeMode(mode){
      this.mode = mode;
    },
    valide(Page){
      console.log(Page)
      this.prestataire.page_info = Page;
      updatePage( this.prestataire).then((res) => {
        console.log(res);
      });
    },

    async getInformation() {
      await this.getPrestataireObject(this.idPrestataire);
      this.prestataire = this.prestataireObject;

      this.nomPresta =this.prestataire.nom;
    }

  }
}
</script>

<style scoped >
.editPresta{
  display: flex;
  flex-direction: column;
  padding: 3% 6%;
}

.group_btn{
  margin: 3%;
  display: flex;
  justify-content: space-between;
}

.btn{
  padding: 10px 15px;
  border-radius: 10px;
}

.del{
  background-color: #bc0505;
  color: #FFFFFF;
  cursor: pointer;
}

.del:hover{
  background-color: #FFFFFF;
  color: #bc0505;
  border : 1px solid #bc0505;

}

.des{
  background-color: white;
  color: #bc0505;
  border: 1px solid #bc0505;
  cursor: pointer;

}

.des:hover{
  background-color: #bc0505;
  color: #FFFFFF;

}



</style>
