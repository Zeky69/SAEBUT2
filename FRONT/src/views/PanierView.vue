<template>

  <div class="root">
    <div class="navbar-height"></div>

    <step-panier v-if="stepPanier !==5" :items="['Panier','Informations','Récapitulatif','Paiement']" :step=stepPanier ></step-panier>

    <div v-if="stepPanier ===1" class="all-conatiner">

  <div class="panier-container">
    <h1 class="title">Mon Panier</h1>

    <div class="panier-body">

   <ligne-panier v-for="(item, index) in elements" :key="index"  :items="item.donnees" @delete-item="deleteItem" :have-date="item.date !== null"></ligne-panier>
      <div v-if="elements.length ===0" class="empty">
        <h2>Ce panier semble un peu vide, tu pourrais y ajouter quelque chose ?</h2>

      </div>

    </div>
  </div>

    <div class="mini-panier">

      <mini-panier :items="items" @delete-item="deleteItem"></mini-panier>
    </div>
    </div>


    <div v-if="stepPanier === 2 " class="all-conatiner">
      <information-panier>
      </information-panier>

    </div>

    <div v-if="stepPanier === 3" class="all-conatiner">
      <recupelatif-view></recupelatif-view>
    </div>

    <div v-if="stepPanier===4" class="all-conatiner">
      <paiement-view></paiement-view>
    </div>

    <div v-if="stepPanier===5" class="all-conatiner">
      <fin-view></fin-view>
    </div>
  </div>


</template>

<script>

  import lignePanier from "@/components/Panier/lignePanier.vue";
  import MiniPanier from "@/components/Panier/panier.vue";
  import StepPanier from "@/components/Panier/Step.vue";
  import Cookies from "js-cookie";
  import {mapState} from "vuex";
  import InformationPanier from "@/components/Panier/InformationPanier.vue";
  import RecupelatifView from "@/components/Panier/Recupelatif.vue";
  import PaiementView from "@/components/Panier/paiement.vue";
  import FinView from "@/components/Panier/FinView.vue";

  export default {
    components: {
      FinView,
      PaiementView,
      RecupelatifView,
      InformationPanier,
      StepPanier,
      MiniPanier,
      lignePanier,
    },

    data: () => ({
      elements: [],
      items:[],
    }),computed:{
      ...mapState(['stepPanier'])
    },

    methods: {
      deleteItem(elm) {
        this.items = this.items.filter((item) => item.id !== elm.id || JSON.stringify(item.date) !== JSON.stringify(elm.date));
        this.elements = this.items.reduce((acc, item) => {
          const index = acc.findIndex((element) => element.id === item.id);
          if (index === -1) {
            acc.push({
              id: item.id,
              donnees: [item],
            });
          } else {
            acc[index].donnees.push(item);
          }
          return acc;
        }, []);
        Cookies.set('panier', JSON.stringify(this.items));
      },
    },

    created() {
      //fair une liste de liste des element avec le meme id

      let storedPanier = Cookies.get('panier');
      if (storedPanier) {
        this.items = JSON.parse(storedPanier);
        console.log(this.items);




      this.elements = this.items.reduce((acc, item) => {
        const index = acc.findIndex((element) => element.id === item.id && JSON.stringify(element.date) === JSON.stringify(item.date));
        if (index === -1) {
          acc.push({
            id: item.id,
            date: item.date,
            donnees: [item],
          });
        } else {
          acc[index].donnees.push(item);
        }
        return acc;
      }, []);
      }

    }
  }


</script>

<style scoped>



.root{
  background-image: url("@/assets/Panier/background-blur.png"); ;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  width: 100%;
  height: 100%;
}

.navbar-height{
  height: 180px;
  width: 100%;
}



.all-conatiner{

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-top: 50px;
}


.title{
  color: #FFF;
  text-shadow: 0 4px 21px rgba(255, 255, 255, 0.65);
  font-family: "DM Sans Regular", Syne, Helvetica, sans-serif;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal; }


.panier-body{
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 20px;

}

.mini-panier{
  margin-top : 100px;
}
.empty{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 100%;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}
.empty h2{
  font-family: "DM Sans Regular", Syne, Helvetica, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
  width: 80%;
}




</style>