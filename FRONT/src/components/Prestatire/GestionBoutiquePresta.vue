<template>
  <div class="conten" v-if="show===true">
    <div class="segmented-picker">
      <input type="radio" id="crudboutique" name="picker" value="crudboutique" v-model="selected" @change="onPickerChange">
      <label for="crudboutique">Crudboutique</label>
      <input type="radio" id="listcommande" name="picker" value="listcommande" v-model="selected" @change="onPickerChange">
      <label for="listcommande">Listcommande</label>
    </div>




    <div class="body-container">
      <router-view></router-view>
    </div>

  </div>
  <div class="conten" v-else>
    Vous ne disposez pas de ce service veuillez le rajouter dans vos paramètres
  </div>




</template>
<script>

import router from '@/router';
import prestataireService from "@/services/prestataire.service";
import {mapActions, mapState} from "vuex";

export default {
  name:'BoutiqueVue',
  data: () => ({
    path:"",
    crudPath: "/prestataire/produits/crud",
    boutiquePath: "/prestataire/produits/commandes",
    selected: 'crudboutique',
    show:false // la mettre a false quand t'as fini

  }),computed   :{
    ...mapState(['prestataireObject','user_id']),
  },created() {
    this.getInformation()
  },
  methods: {
    ...mapActions(['getPrestataireObject']),
    onPickerChange() {
      if (this.selected === 'crudboutique') {
        router.push(this.crudPath);
      } else if (this.selected === 'listcommande') {
        router.push(this.boutiquePath);
      }
    },
    async getInformation() {
      await this.getPrestataireObject(this.user_id);
      let idPrestataire = this.prestataireObject.id_prestataire;

      let services = await prestataireService.getPrestatairesServices(idPrestataire);
      if (Array.isArray(services) && services.length > 0) {
        this.show = services.some(e => {
          return e.id_type_service === 2
        });
      }
    }
  }
}
</script>


<style scoped>

.conten{
  margin: 2%;
}

.segmented-picker {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

.segmented-picker input[type="radio"] {
  display: none;
}

.segmented-picker label {
  padding: 10px 20px;
  display: block;
  cursor: pointer;
  text-align: center;
  background-color: #f9f9f9;
  transition: background-color 0.3s ease;
}

.segmented-picker input[type="radio"]:checked + label {
  background-color: #fff;
  border-bottom: 2px solid #007bff;
}
</style>