
<template>
  <div>
    <div class="contenu-all">
      <div class="container-acheteur">
        <div>
        <input placeholder="Nom" type="text" class="nom input-info" v-model="informationAchateur.nom" >
        <input placeholder="Prenom" type="text" class="prenom input-info" v-model="informationAchateur.prenom" >
        </div>
        <div>
        <input placeholder="Email" type="text" class="email input-info" v-model="informationAchateur.email" >
        </div>
        <div class="tets">
        <input placeholder="Adresse" type="text" class="adresse input-info" v-model="informationAchateur.adresse" >
        <input placeholder="Code postal" type="text" class="codePostal input-info" v-model="informationAchateur.codePostal" >
        <input placeholder="Ville" type="text" class="ville input-info" v-model="informationAchateur.ville" >
        <input placeholder="Pays" type="text" class="pays input-info" v-model="informationAchateur.pays" >
        </div>
      </div>

      <div>
        <div class="container-billet">
          <div class="billet" v-for="(item, index) in billetInformation" :key="index">
            <h2>{{item.item.header.title}}</h2>
            <h2>{{item.item.header.subtitle}}</h2>
            <h2>{{item.item.header.day}}</h2>

            <input placeholder="Nom" type="text" class="nom input-info" v-model="item.nom" >
            <input placeholder="Prenom" type="text" class="prenom input-info" v-model="item.prenom" >
          </div>
        </div>
      </div>

    </div>

    <button>
    </button>

  </div>
</template>

<script>

import Cookies from "js-cookie";

export default {
  name: 'InformationPanier',
  props: {
    msg: String
  },
  data () {
    return {
      panier : [],
      informationAchateur: {
        nom: '',
        prenom: '',
        email: '',
        adresse: '',
        codePostal: '',
        ville: '',
        pays: '',
      },
      billetInformation:[
      ]



      }



  },methods:{
  },
  created() {
    let storedPanier = Cookies.get('panier');
    if (storedPanier) {
      this.panier = JSON.parse(storedPanier);
      console.log(this.panier);
      this.panier.forEach((item)=>{
        if(item.header.type ==='billet'){
          for (let i = 0; i < item.quantity; i++) {
            this.billetInformation.push({
              item : item,
              nom:'',
              prenom:'',
            })

          }


        }

      })

    }
  }
}
</script>


<style scoped>





</style>