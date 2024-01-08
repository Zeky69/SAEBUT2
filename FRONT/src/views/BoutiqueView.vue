<template>
  <div class="BoutiqueView">

    <div class="page-banner">
      <div class="image-container">
        <div class="blurred-image"></div>
        <div class="sharp-image"></div>
      </div>
      <div class="text">
        <p class="title">10 ANS !</p>
        <p class="subtitle">Célébrez les 10 ans de la Belforaine en vous
          offrant nos meilleurs goodies à <br> <strong>des prix imbattables !</strong></p>
        <a class="sub-button">J'en profite !</a>
      </div>
    </div>

    <h1 class="welcome">Bienvenue a la boutique <span>de Belforaine</span></h1>


    <div class="best-vente">
      <h2>Nos meilleurs ventes</h2>
      <BestSell/>
    </div>

    <h2 class="accroche">Votre bonheur a portée de main</h2>

    <div class="categorie">
      <div v-for="(cat, index) in category" :key="index" class="categorie-content">
        <p>{{ cat.name }}</p>
      </div>
    </div>

  </div>
</template>

<script>

import BestSell from "@/components/BestSell.vue";
export default {
  name : 'BoutiqueView',
  data : ()=> ({
  category:[
    {name:'Goodies'},
    {name:'Vêtements'},
    {name:'Accessoires'},
    {name:'Peluches'}
  ]
  }),
  components:{
    BestSell
  },
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
  position: relative;
}

.categorie-content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(../assets/fondFeteForaine.png) no-repeat center;
  background-size: cover;
  filter: brightness(30%);
}

.categorie-content p {
  margin: 0;
  z-index: 10;
  font-size: 3em;
  color: white;
  text-align: center;
}


</style>