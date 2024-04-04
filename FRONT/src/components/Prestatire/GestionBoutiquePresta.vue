<template>
  <div>
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




</template>
<script>

import router from '@/router';

export default {
  name:'BoutiqueVue',
  data: () => ({
    path:"",
    crudPath: "/prestataire/produits/crud",
    boutiquePath: "/prestataire/produits/commandes",
    selected: 'crudboutique'

  }),
  methods: {
    onPickerChange() {
      if (this.selected === 'crudboutique') {
        router.push(this.crudPath);
      } else if (this.selected === 'listcommande') {
        router.push(this.boutiquePath);
      }
    }
  }
}
</script>


<style scoped>

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