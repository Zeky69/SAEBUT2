<template>
  <div class="all-container-recup">
    <div class="information-all">
      <div class="information">
        <h2>Information de Facturation:</h2>

        <div class="ligne"> <span>{{order.acheteur.prenom}}&nbsp;</span> <span>{{order.acheteur.nom}}</span></div>
        <div class="ligne"><span>{{order.acheteur.email}}</span></div>
        <div class="ligne"><span>{{order.acheteur.adresse}}</span></div>
        <div class="ligne"><span>{{order.acheteur.codePostal}}&nbsp;{{order.acheteur.ville}}</span></div>
        <div class="ligne"><span>{{order.acheteur.pays}}</span></div>


      </div>


      <div class="list-info-container">
        <div class="ul-container2"  v-for="(item , index) in order.panier" :key="index+'je'">
          <div class="list-info-container" v-if="item.header.type !== 'billet'">

            <ul class="information-ul">
            <li>{{item.header.title}}</li>
              <li>x{{item.quantity}}</li>
              <li>({{item.price}}€)</li>
              <li>{{item.price * item.quantity}}€</li>
            </ul>
          </div>
        </div>

        <div class="ul-container" v-for="(item , index) in order.billet" :key="index">

            <ul class="information-ul">
              <li>{{item.item.header.title}}</li>
              <li>{{item.item.header.subtitle}}</li>
              <li>{{item.item.price}}€  </li>
              <li>Nom:&nbsp;{{item.nom}} </li>
              <li>Prenom: {{item.prenom}}</li>
            </ul>
        </div>
      </div>
      <p class="total">Total: {{total}}€</p>
      <div class="list-info-container">
      <button  class="btn-next" @click="continuer" >Passer au paimemant</button>
      <button class="btn-next"  @click="annuler">Annuler</button>
      </div>
    </div>


  </div>

</template>

<script >
import Cookies from "js-cookie";

export default {
  name: 'RecupelatifView',
  data: () => ({
    order: {
      panier: [],
      acheteur: {
        nom: '',
        prenom: '',
        email: '',
        adresse: '',
        codePostal: '',
        ville: '',
        pays: '',
      },
      billet: []
    },
    total: 0,


  }),
  methods: {
    continuer(){
      this.$store.dispatch("setStepPanier", 4)
    },
    annuler(){
      this.$store.dispatch("setStepPanier",1)
    }
  }
  ,created() {
    let orders = Cookies.get('order');
    let acheteur = Cookies.get('acheteur');
    if(orders){
      this.order = JSON.parse(orders);
    }
    if(acheteur){
      this.order.acheteur = JSON.parse(acheteur);
    }

    this.total = this.order.panier.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    console.log(orders)



  }
}
</script>


<style scoped>
p{
  color: white;
}

.grid1{
  grid-column: 1;

}
.grid2{
  grid-column: 2;
}
.grid3{
  grid-column: 3;
}

.grid4{
  grid-column: 4;
}

.grid5{
  grid-column: 5;
}

.grid6{
  grid-column: 6;
}

.list-info-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.all-container-recup{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 20px;
}

.information-all{
  width: 80%;
  background-color: rgba(255, 255, 255, 0.56);
  border-radius: 20px;

}

.information{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.56);
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.ligne{
  margin-left: 10px;
  margin-top: 1px;
}

.information-ul{
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%;
}
.ul-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.56);
  width: 100%;
  box-sizing: border-box;
}

.ul-container2{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.56);
  width: 100%;
  box-sizing: border-box;
}
.total{
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.56);
  width: 100%;
  padding: 20px;
  color: rgba(77, 82, 166, 0.81);
  font-size: 20px;
  font-weight: 800;
  box-sizing: border-box;
  text-align: center;
}
.btn-next{

  background-color: rgba(77, 82, 166, 0.81);
  width: 250px;
  padding: 5px 10px;
  color: white;
  font-size: 18px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 50px;
  cursor: pointer;
  border: none;
  margin-bottom: 10px;
}

.btn-next:hover{
  background-color: rgba(77, 82, 166, 0.68);
}
.btn-next:active{
  background-color: rgb(77, 82, 166);
}

.information-ul{
  padding: 20px;
}


</style>