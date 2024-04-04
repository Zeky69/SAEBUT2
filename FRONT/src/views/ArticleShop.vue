<template>
  <div class="articles-pages">

    <div class="page-banner">
      <div class="image-container">
        <div class="blurred-image"></div>
        <div class="sharp-image"></div>
      </div>
      <div class="text">
        <p class="title">{{ titre }}</p>
        <p class="subtitle">{{ description }}</p>
      </div>
    </div>

    <div class="page">

      <div class="filter">

        <div class="recherche">
          <label for="site-search" >Nom :</label>
          <input type="search" id="site-search" v-model="nameFilter" placeholder="Rechercher article" />
        </div>


        <div class="prix">

          <div class="number">
            <label for="site-search">Min :</label>
            <input type="number" class="number-input" v-model="min" />
          </div>

          <div class="number">
            <label for="site-search">Max :</label>
            <input type="number" class="number-input" v-model="max"/>
          </div>
        </div>
        <button class="btn-filtre" @click="resetFiltre">Réinitialiser le filtre</button>




      </div>

      <div class="articles">

        <h2 id="pas-article" v-if="articles.length===0"> Malheureusement il n'y'a pas d'articles ici ...</h2>


        <div  v-for="(prestate,index) in filterTable" :key="index">
          <CardShop :logo="prestate.photo" :title="prestate.nom" :stock="prestate.stock" :price="prestate.prix" :id=parseInt(prestate.id_produit) :nomCat="titre" :description="description"/>
        </div>
      </div>

    </div>


  </div>
</template>

<script>
import CardShop from "@/components/CardShop.vue";
import ArticleShop from "@/services/shop.service"


export default {
  name:'ArticleShop',
  props:['id'],
  components:{
    CardShop
  },
  data : () =>({
    articles:[],
    titre:'',
    description:'',
    id_produit:'',
    nameFilter:'',
    max:0,
    min:0
  }),
  computed:{
    filterTable(){
      console.log("articles", this.articles);
      let filter = this.articles;
      filter = this.filterByName(filter);

      if(this.min>-1 && this.max>0)
        filter = this.filterByPrice(filter)
      return filter;
    }

  },
  methods:{
    async getArticles() {
      this.articles = await ArticleShop.getArticlesByPrestataire(this.id);
      console.log("articles", this.articles);
      console.log("articles", this.articles.length);
    },
    filterByName(filter){
        const lowerCaserName = this.nameFilter.toLowerCase();
        let temp = filter.filter(v => v.nom.toLowerCase().includes(lowerCaserName));
        return temp;


    },
    filterByPrice(filter) {
      return filter.filter(v => parseInt(v.prix) >= this.min && parseInt(v.prix) <= this.max);
    },
    resetFiltre(){
      this.nameFilter="";
      this.min=0;
      this.max=0;
    }
  },
  async mounted() {
    this.getArticles();
  },
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

.prix{
  padding-top: 5%;
  width: 85%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.number-input{
  width: 60px;
  height: 25px;
  border-radius: 5px;
  border: none;
  background-color: #c6c6c6;
  color: #000000;
  padding: 3%;

}

.btn-filtre{
  width: 85%;
  height: 40px;
  background-color: #553C65;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  font-weight: bold;
  margin-top: 5%;
  margin-bottom: 5%;
  cursor: pointer;
}

</style>
