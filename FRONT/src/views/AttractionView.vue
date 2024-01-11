<template>
  <div class="articles-pages">

    <div class="page-banner">
      <div class="image-container">
        <div class="blurred-image"></div>
        <div class="sharp-image"></div>
      </div>
      <div class="text">
        <p class="title">Nom de la catégorie</p>
        <p class="subtitle">Petite description en fonction de la catégorie</p>
      </div>
    </div>

    <div class="page">

      <div class="filter">

        <div class="recherche">
          <label for="site-search">Nom :</label>
          <input type="search" id="site-search" placeholder="Rechercher article" />
        </div>

        <div class="prix">

        </div>




      </div>
      <div class="articles">


      <div  v-for="(prestate,index) in jeuxDeDonnees" :key="index">
          <CardShop :logo="prestate.logo" :title="prestate.title" :description="prestate.description" :stock="prestate.stock" :price="prestate.price" />




      </div>
      </div>


    </div>


  </div>
</template>

<script>
export default {
  data : () =>({
    jeuxDeDonnees : [
      {
        "logo": "@/assets/logoWF.png",
        "title": "Jeu 1",
        "description": "Description du jeu 1.",
        "stock": 10,
        "price": "$19.99"
      },
      {
        "logo": "@/assets/logoWF.png",
        "title": "Jeu 2",
        "description": "Description du jeu 2.",
        "stock": 5,
        "price": "$29.99"
      },
      {
        "logo": "@/assets/logoWF.png",
        "title": "Jeu 3",
        "description": "Description du jeu 3.",
        "stock": 8,
        "price": "$24.99"
      },
      {
        "logo": "@/assets/logoWF.png",
        "title": "Jeu 4",
        "description": "Description du jeu 4.",
        "stock": 15,
        "price": "$39.99"
      },
      {
        "logo": "@/assets/logoWF.png",
        "title": "Jeu 5",
        "description": "Description du jeu 5.",
        "stock": 20,
        "price": "$49.99"
      },
      {
        "logo": "@/assets/logoWF.png",
        "title": "Jeu 6",
        "description": "Description du jeu 6.",
        "stock": 3,
        "price": "$14.99"
      },
      {
        "logo": "@/assets/logoWF.png",
        "title": "Jeu 7",
        "description": "Description du jeu 7.",
        "stock": 12,
        "price": "$34.99"
      },
      {
        "logo": "@/assets/logoWF.png",
        "title": "Jeu 8",
        "description": "Description du jeu 8.",
        "stock": 7,
        "price": "$22.99"
      },
      {
        "logo": "@/assets/logoWF.png",
        "title": "Jeu 9",
        "description": "Description du jeu 9.",
        "stock": 18,
        "price": "$44.99"
      },
      {
        "logo": "@/assets/logoWF.png",
        "title": "Jeu 10",
        "description": "Description du jeu 10.",
        "stock": 2,
        "price": "$9.99"
      },
      {
        "logo": "@/assets/logoWF.png",
        "title": "Jeu 11",
        "description": "Description du jeu 11.",
        "stock": 14,
        "price": "$32.99"
      },
      {
        "logo": "@/assets/logoWF.png",
        "title": "Jeu 12",
        "description": "Description du jeu 12.",
        "stock": 6,
        "price": "$26.99"
      },
      {
        "logo": "@/assets/logoWF.png",
        "title": "Jeu 13",
        "description": "Description du jeu 13.",
        "stock": 9,
        "price": "$21.99"
      },
      {
        "logo": "@/assets/logoWF.png",
        "title": "Jeu 14",
        "description": "Description du jeu 14.",
        "stock": 16,
        "price": "$37.99"
      },
      {
        "logo": "@/assets/logoWF.png",
        "title": "Jeu 15",
        "description": "Description du jeu 15.",
        "stock": 4,
        "price": "$17.99"
      },
      {
        "logo": "@/assets/logoWF.png",
        "title": "Jeu 16",
        "description": "Description du jeu 16.",
        "stock": 11,
        "price": "$28.99"
      },
      {
        "logo": "@/assets/logoWF.png",
        "title": "Jeu 17",
        "description": "Description du jeu 17.",
        "stock": 13,
        "price": "$31.99"
      },
      {
        "logo": "@/assets/logoWF.png",
        "title": "Jeu 18",
        "description": "Description du jeu 18.",
        "stock": 19,
        "price": "$47.99"
      },
      {
        "logo": "@/assets/logoWF.png",
        "title": "Jeu 19",
        "description": "Description du jeu 19.",
        "stock": 1,
        "price": "$14.99"
      },
      {
        "logo": "@/assets/logoWF.png",
        "title": "Jeu 20",
        "description": "Description du jeu 20.",
        "stock": 17,
        "price": "$42.99"
      }
    ]
  })
}
</script>

<style scoped>
.articles-pages{
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
  top: 60%;
  left:5%;
  text-align: left;
  text-align: left;
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


.page{
  display: flex;
  flex-direction: row;
  margin: 1%;

}

.filter{
  width: auto;
  height: 100px;
  flex: 1;}

.articles {
  display: flex;
  flex-wrap: wrap;
  gap: 42px;
  flex: 2.5;
}


.recherche{
  display: flex;
  flex-direction: column;
  gap : 5px;
  width:85%;
  font-size: 15px;
}

#site-search{
  border-radius: 5px;
  border: none;
  background-color: #c6c6c6;
  color: #000000;
  padding: 3%;


}

</style>
<script setup>
import CardShop from "@/components/CardShop.vue";
</script>