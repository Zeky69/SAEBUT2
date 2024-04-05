<template>
  <div class="conten" v-if="show===true">
    <div class="pickfather">
      <div class="segmented-picker">
        <input type="radio" id="crudboutique" name="picker" value="crudboutique" v-model="selected" @change="onPickerChange">
        <label for="crudboutique">Crudboutique</label>
        <input type="radio" id="listcommande" name="picker" value="listcommande" v-model="selected" @change="onPickerChange">
        <label for="listcommande">Listcommande</label>
      </div>

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
    selected: 'listcommande',
    show:false // la mettre a false quand t'as fini

  }),computed   :{
    ...mapState(['prestataireObject','user_id']),
  },created() {


  },
  mounted() {
    this.checkPath()
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
    checkPath(){
      this.path = window.location.pathname;
      console.log(this.path)
      if(this.path === this.crudPath){
        this.selected = 'crudboutique';
      }else if(this.path === this.boutiquePath){
        this.selected = 'listcommande';
      }
      else {
        this.selected = 'crudboutique';
        router.push(this.crudPath);
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
.conten {
  margin: 2%;
  display: flex;
  flex-direction: column;
}

.pickfather {
  display: flex;
  justify-content: center;
}

.segmented-picker {
  display: flex;
  border: 1px solid rgba(130, 23, 119, 0.43);
  background-color: #f9f9f9;
  width: 40vw;
  border-radius: 10px;
  justify-self: center;
  overflow: hidden;
  position: relative;
}

.segmented-picker input[type="radio"] {
  display: none;
}

.segmented-picker label {
  width: 50%;
  padding: 10px 20px;
  display: block;
  cursor: pointer;
  text-align: center;
  background-color: #f9f9f9;
  transition: background-color 0.3s ease;
}

.segmented-picker input[type="radio"]:checked + label {
  background-color: rgba(130, 23, 119, 0.43);
  color: white;
}

.slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background-color: rgba(130, 23, 119, 0.43);
  transition: transform 0.3s ease;
}

.segmented-picker input[type="radio"]:nth-child(1):checked ~ .slider {
  transform: translateX(0%);
}

.segmented-picker input[type="radio"]:nth-child(2):checked ~ .slider {
  transform: translateX(100%);
}
</style>