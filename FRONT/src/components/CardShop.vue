<template>
  <div class="card">
    <div class="card-header">
      <img :src="image" class="header-logo" />
    </div>
    <div class="card-middle">
      <h3>{{ title }}</h3>
      <p>Stock: {{ stock }}</p>
      <input id="insertNumber" type="number" :max="stock" v-model="quantite">
    </div>
    <div class="card-bottom">
      <h3>{{ price }}€</h3>
      <button  @click="addPanierCookie" class="button-shop">Ajouter au panier</button>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import {getImage} from "@/services/image.service";

export default {
  name:'CardShop',
  data:()=>({
    quantite:1,
    panier:[],
    image:''

  }),
  props: {
    logo: String,
    title: String,
    stock: Number,
    price: String,
    id : String,
    nomCat:String,
    description:String,
  },mounted() {
    console.log(this.logo)
    this.image = getImage(this.logo);
  },
  methods: {

    loadPanierFromCookies() {
      const storedPanier = Cookies.get('panier');
      if (storedPanier) {
        return JSON.parse(storedPanier);
      }
      return [];
    },
    addPanierCookie(){
      let panierCookie = this.loadPanierFromCookies();

      this.panier.push({
        id: this.id,
        subId: this.id,
        quantity: this.quantite,
        price: this.price,
        date:null,
        header: {
          title: this.title,
          day: null,
          description: this.description,
          type: this.title,
          path: this.image,
          subtitle: this.title,

        }
      });

      this.panier.forEach((item) => {
        let index = panierCookie.findIndex((element) => element.id === item.id && JSON.stringify(element.date) === JSON.stringify(item.date) && element.subId === item.subId);
        if (index === -1) {
          panierCookie.push(item);
        } else {
          panierCookie[index].quantity = parseInt(panierCookie[index].quantity) + parseInt(item.quantity);
        }
      });

      Cookies.set('panier', JSON.stringify(panierCookie), { expires: 1 });

      this.$router.push('/panier');

    }
  }
};
</script>

<style scoped>
.card {
  width: 360px;
  height: 370px;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40,0.75);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
}

.card-header {
  padding: 1%;
  position: relative;
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-header::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.5px;
  background-color: #6a6a6a;
}

.header-logo {
  max-width: 160px;
  max-height: 160px;
  object-fit: contain;
}

.card-middle {
  position: relative;
  padding: 2% 5%;
  flex: 2;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.card-middle::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.5px;
  background-color: #6a6a6a;
}

.card-middle h3 {
  color: #ffffff;
  font-weight: 600;
  font-family: "DM Sans";
  font-size: 23px;
}

.card-middle p {
  font-size: 15px;
  color: #a5a5a5;
}

.card-bottom {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2% 5%;
  justify-content: space-between;
}

.card-bottom h3 {
  color: #ffffff;
  font-family: Syne;
  font-weight: 600;
}

.button-shop {
  background-color: rgb(18, 139, 22);
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  opacity: 0.6;
  margin-top: auto;
  margin-bottom: auto;
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border: 1px solid rgba(116, 116, 116, 0.43);
  border-color: rgb(65, 147, 65);
  color: #ffffff;
  padding: 0.5rem 3rem;
}

.button-shop:hover {
  background: rgba(255, 255, 255, 0.23);
  color: rgb(67, 152, 70);
}

#insertNumber{
  width: 70px;
  height: 25px;
  border-radius: 5px;
  font-size: 15px ;
  text-align: center;
}

</style>
