<template>
  <div class="billetterie-container">
    <div class="navbar-height"></div>
    <div class="body-container">
      <h1 class="title-body">Billetterie</h1>
      <choice-billet ref="choiceBillet" :items=items :idselect="idselect" @selected="setSelected"></choice-billet>
      <choice-date ref="dateComponent" v-if="selected!=null" :dates="dates" :day="selected.day" @selected="selectedDate"></choice-date>
      <choice-quantity ref="choiceQuantity" v-if="selected!=null && dateSelected.length === selected.day" :quantity="5" @selected="selectedQuantity"></choice-quantity>
      <div v-if="panier.length !==0 && selected!=null && dateSelected.length === selected.day"  class="details">
        <ligne-panier  :items="panier"  :trash="false"></ligne-panier>
        <button @click="addPanierCookie" class="btn-add">Ajouter au panier</button>
      </div>


    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import ChoiceBillet from "@/components/Billeterie/Billet.vue";
import ChoiceDate from "@/components/Billeterie/choiceDate.vue";
import ChoiceQuantity from "@/components/Billeterie/choiceQuantity.vue";
import LignePanier from "@/components/Panier/lignePanier.vue";
import Cookies from 'js-cookie';
export default defineComponent({
  name: 'BilleterieView',
  components: {LignePanier, ChoiceQuantity, ChoiceDate, ChoiceBillet},

  created() {
    this.idselect = this.$route.params.idselect;
    if (this.idselect !== undefined){
      this.selected = this.items.find((item) => item.id === this.idselect);
    }
  },
  data: () => ({
    idselect: null,
    items: [
      {
      id: '1',
      title: 'Billet Basic',
      price: 24.99,
      day: 1,
      description: 'Profitez de la magie de Belforaine toute une journée.',
      caracteristic: ['Accès au parc'],
      type: "billet",
      path: require('@/assets/Panier/image-pass.png'),
    },{
      id: '2',
      title: 'Billet Fast',
      price: 34.99,
      day: 1,
      description: 'Profitez de la magie de Belforaine toute une journée avec un accès prioritaire aux attractions.',
      caracteristic: ['Accès au parc' , 'Accès prioritaire aux attractions'],
      type: "billet",
      path: require('@/assets/Panier/image-pass.png'),
    },{
      id: '3',
      title: 'Billet Premium',
      price: 59.99,
      day: 2,
      description: 'Profitez de la magie de Belforaine pendant 2 jours avec un accès prioritaire aux attractions et des goodies offerts à l\'entrée. ',
      caracteristic: ['Accès au parc' , 'Accès prioritaire aux attractions' , 'Des goodies offerts à l\'entrée'],
      type: "billet",
      path: require('@/assets/Panier/image-pass.png'),
    }

    ],
    dates:["2024-01-15" , "2024-01-16" , "2024-01-17"],
    panier: [],
    dateSelected: [],
    quantitySelected: [0,0],
    selected: null,
    renderComponent: true,
  }),watch: {

  },
  methods: {
    scrollToComponent(componentRef) {
      if (componentRef && componentRef.$el) {
        this.$nextTick(() => {
          componentRef.$el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }}
    ,
    setSelected(item){
      this.selected = item;
      this.dateSelected.splice(0, this.dateSelected.length)
      this.quantitySelected.splice(0, this.quantitySelected.length, 0,0)
      this.panier.splice(0, this.panier.length)
      this.scrollToComponent(this.$refs.choiceBillet);



    },
    selectedDate(date){
      this.dateSelected = date;
      this.scrollToComponent(this.$refs.dateComponent);

    },
    selectedQuantity(quantity){
      this.quantitySelected = quantity;
      this.panier.splice(0, this.panier.length)
      this.addPanier();
      this.scrollToComponent(this.$refs.choiceQuantity);

    },
    loadPanierFromCookies() {
      const storedPanier = Cookies.get('panier');
      if (storedPanier) {
        return JSON.parse(storedPanier);
      }
      return [];
      }
  ,addPanierCookie(){
      let panierCookie = this.loadPanierFromCookies();
      //verifier si les billet dans la vairable panier est deja dans le panierCookie et si oui on ajoute la quantité

      this.panier.forEach((item) => {
        let index = panierCookie.findIndex((element) => element.id === item.id && JSON.stringify(element.date) === JSON.stringify(item.date) && element.subId === item.subId);
        if (index === -1) {
          panierCookie.push(item);
        } else {
          panierCookie[index].quantity += item.quantity;
        }
      });

      Cookies.set('panier', JSON.stringify(panierCookie), { expires: 1 });

      this.$router.push('/panier');

    },
    addPanier(){
      if (this.quantitySelected[0]!==0){
        let listDateStringFormat = this.dateSelected.map((date) => {
          return date.toISOString().split('T')[0];
        });

        this.panier.push({
          id: this.selected.id,
          subId: '1',
          quantity: this.quantitySelected[0],
          price: this.selected.price,
          date : listDateStringFormat,
          header: {
            title: this.selected.title,
            day: this.selected.day,
            description: this.selected.description,
            type: this.selected.type,
            path: this.selected.path,
            subtitle: 'Adulte',
          }
        })
      }
      if (this.quantitySelected[1]!==0){
        let listDateStringFormat = this.dateSelected.map((date) => {
          return date.toISOString().split('T')[0];
        });
        this.panier.push({
          id: this.selected.id,
          subId: '2',
          quantity: this.quantitySelected[1],
          price: this.selected.price,
          date : listDateStringFormat,
          header: {
            title: this.selected.title,
            day: this.selected.day,
            description: this.selected.description,
            type: this.selected.type,
            path: this.selected.path,
            subtitle: 'Enfant',
          }
        })
      }


    }


  }

})
</script>

<style scoped>

 .billetterie-container{
   background-image: url("../assets/Billeterie/background.jpg");
   width: 100%;
   min-height: 100vh;
   height: 100%;
   background-repeat: no-repeat;
   background-size: cover;
   background-position: center;
   color: #E5E4EF;
   display: flex;
    flex-direction: column;
    align-items: center;
 }

 .navbar-height{
   height: 180px;
   width: 100%;
 }

 .body-container{
   border-radius: 20px;
   border: 3px solid rgba(206, 206, 206, 0.20);
   background: rgba(43, 66, 86, 0.51);
   backdrop-filter: blur(10px);
   padding: 25px;
   width: 90%;
 }

 .title-body{
   color: #E5E4EF;
   font-family: Syne , Helvetica, sans-serif;
   font-size: 50px;
   font-style: normal;
   font-weight: 500;
   line-height: normal;
 }

 .details{
   margin-top: 50px;
   background: rgba(229, 228, 239, 0.85);
   backdrop-filter: blur(10px);
   border-radius: 20px;
   display: flex;
    flex-direction: column;
    align-items: center;
 }

 .btn-add{
   border: none;
   border-radius: 100px;
   background: rgba(77, 82, 166, 1);
   box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
   margin: 20px 0;
   padding: 10px 40px;

   color: #FFF;
   text-align: center;
   text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
   font-family: "DM Sans" , Syne , Helvetica , sans-serif;
   font-size: 20px;
   font-style: normal;
   font-weight: 500;
   line-height: normal;
 }

  .btn-add:hover{
    cursor: pointer;
    background: rgba(77, 82, 166, 0.9);
  }
  .btn-add:active{
    background: rgba(77, 82, 166,0.8);
  }






</style>
