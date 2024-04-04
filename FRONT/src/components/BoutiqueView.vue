<template>
  <div class="BoutiqueView">

    <div class="page-banner">
      <div class="image-container">
        <div class="blurred-image"></div>
        <div class="sharp-image"></div>
      </div>
      <div class="text">
        <p class="title">{{ $t('shopView.title') }}</p>
        <p class="subtitle" v-html="$t('shopView.subtitle')"></p>
        <a class="sub-button">{{ $t('shopView.subButton') }}</a>
      </div>
    </div>

    <h1 class="welcome" v-html="$t('shopView.welcome')"></h1>


    <div class="best-vente">
      <h2>{{ $t('shopView.bestSales') }}</h2>
      <BestSell :table="listArticles"/>
    </div>

    <h2 class="accroche">{{ $t('shopView.accroche') }}</h2>

    <div class="prestataire">
        <div v-for="(prest, index) in prestataire" :key="index" class="categorie-content" :style="{ backgroundImage: 'url(' + setImage(prest.photo_profil) + ')', before: { backgroundImage: 'url(' + setImage(prest.photo_profil) + ')' } }" @click="navigateToPrestataire(prest.id_prestataire)">
          <p>{{ prest.nom }}</p>
        </div>
    </div>

  </div>
</template>

<script>

import BestSell from "@/components/BestSell.vue";
import shopService from "@/services/shop.service";
import prestataireService from "@/services/prestataire.service";

import {getImage} from "@/services/image.service"
export default {
  name : 'BoutiqueView',
  data : ()=> ({
  category:[],
  listArticles:[],
  prestataire: [],
  }),
  components:{
    BestSell
  },methods:{
    navigateToCategory(categoryId) {
      this.$router.push({ name: 'articleShop',params:{id:categoryId}});
    },
    navigateToPrestataire(prestataireId) {
      this.$router.push({ name: 'articleShop',params:{id:prestataireId}});
    },
    setImage(url){
      return getImage(url);
    },async getArticles() {
      try{
        this.category = await shopService.getAllCategorie();
        this.prestataire = await prestataireService.getPrestataires();
        console.log("prestataire",this.prestataire)
        this.listArticles = await shopService.getRandomArticles()
        console.log("boutique random",this.listArticles)

      }catch (err){
        console.error("Error fetching articles:", err);
      }
    }
  },created() {
    this.getArticles()
  },
  mounted() {
    window.scrollTo(0, 0);
  }
}
</script>

<style>
.BoutiqueView{
  font-family: "DM Sans";
  color: #000000;
}

.page-banner {
  position: relative;
  height: 30em;
  margin-bottom: 4em;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.sharp-image {
  background: url(../assets/fondFeteForaine.png) no-repeat center center fixed;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  filter: brightness(40%) blur(9px);
  padding-bottom: 1.5em;
}


.blurred-image {
  background: url(../assets/fondFeteForaine.png) no-repeat center center fixed;
  background-size: cover;
  width: 100%;
  height: 100%;
  z-index: 2;
  padding-bottom: 1.5em;
}


.text {
  position: absolute;
  top: 50%;
  left:20%;
  text-align: center;

  color: white;
  z-index: 3;
}

.title {
  font-size: 3.5em;
  margin-bottom: 0.5em;
  font-weight: bold;
}

.subtitle {
  font-size: 2em;
  font-family: Syne;
  margin-bottom: 1em;
}

.sub-button{
  background-color: white;
  color : black;
  font-size: 1em;
  font-weight : bolder;
  padding: 1% 4%;
  border-radius: 10px;
}

.welcome{
  font-family: Syne;
  text-align: center;
  color: #000000;
  font-weight: normal;
  font-size: 3.7em;
}

.welcome span{
  color: #553C65;
  font-weight: bold;
}

.best-vente{
  margin-top: 3%;
  margin-left: 5%;
  margin-bottom: 3%;

}

.best-vente h2 {
  margin-left: 3%;
  font-size: 2.8em;
  font-weight: normal;
}

.accroche{
  text-align: center;
  font-weight: normal;
  font-size: 2.8em;
  margin-bottom: 3%;
}

.categorie {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px; /* Adjust the gap as needed */
}

.categorie-content {
  position: relative;
  flex: 0 0 calc(400px - 30px);
  height: 400px;
  border-radius: 20px;
  margin-bottom: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-size: cover;


}

.categorie-content p{
  position: relative;
  z-index: 100;
  filter: none;
}

.categorie-content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.53);

}

.categorie-content p {
  margin: 0;
  z-index: 10;
  font-size: 3em;
  color: white;
  text-align: center;
}

.prestataire {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px; /* Adjust the gap as needed */
}





</style>