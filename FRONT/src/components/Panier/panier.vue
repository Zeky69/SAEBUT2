<template>
  <div class="all-container">
    <div class="body-conatainer">
    <div class="list-item">
      <ul>
        <li v-for="(item , index) in items" :key="index">
          <img class="li-logo" :src=getsvg(item.header.type) alt="ticket">
          <div class="li-body"><div><span class="li-title">{{item.header.title}}</span> <span>({{item.header.subtitle}})</span></div> <span class="quantity">x{{item.quantity}}</span>
          </div>
        </li>
      </ul>
    </div>
      <div class="line"></div>
      <div class="total">
        <span class="total-text">Montant Total</span>
        <span class="total-price">{{total.toFixed(2)}}€</span>
      </div>
    </div>
    <div class="information-container">
    <span class="information">Vous pourrez choisir votre méthode de paiement plus tard</span>
    </div>
    <div class="footer-container">
      <button class="btn-validate" @click="setStep(2)" :disabled="items.length === 0">Valider mon panier</button>
      <button class="btn-continue" @click="gotoShop">Continuer mes achats</button>
    </div>


  </div>

</template>


<script >

export default {
  name: 'mini-panier',
  components: {
  },props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data: () =>  ({
    total: 0,
  }),
  watch: {
    items: function () {
      this.total = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
  },
  computed: {
  },
  methods: {
    setStep(i){
      if(this.items.length === 0){
        return
      }
      this.$store.dispatch("setStepPanier", i)

    },
    getsvg(type){
      switch (type){
        case "billet":
          return require('@/assets/icons/billet.svg');
        default:
          return require('@/assets/icons/billet.svg');
      }
    },
    gotoShop(){
      this.$router.push('/billetterie').catch(() => {
      });
    },

  },
  mounted() {
    this.total = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },
};
</script>
<style scoped>

.all-container{
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 2px 4px 10px 0 rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
  padding: 30px;
  border-radius: 20px;
  max-width: 400px;
  width: 100%;
}

li{
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.li-body{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.li-title{
  color: #000;
  font-family: "DM Sans", Syne, Helvetica, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.quantity{
  color: #000;
  text-align: right;
  font-family: "DM Sans", Syne, Helvetica, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.li-logo{
  width: 30px;
  height: 30px;
  margin-right: 10px;
}


.line {
  margin-top: 10px;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, #A361BF 53.12%, rgba(255, 255, 255, 0.00) 100%);
}

.total{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
}

.total-text{
  color: #000;
  font-family: "DM Sans", Syne, Helvetica, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.total-price{
  color: #000;
  text-align: right;
  font-family: "DM Sans", Syne, Helvetica, sans-serif;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}


.information-container{
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
}


.information{
  color: rgba(0, 0, 0, 0.62);
  text-align: right;

  font-family: "DM Sans", Syne, Helvetica, sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 80%;
}

.footer-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}

.btn-validate{
  border: none;
  background: #A361BF;
  border-radius: 30px;
  color: #FFF;
  font-family: "DM Sans", Syne, Helvetica, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 15px 70px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
  margin-bottom: 20px;
}

.btn-continue{
  border: none;
  background: #FFF;
  border-radius: 30px;
  color: #A361BF;
  font-family: "DM Sans", Syne, Helvetica, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 15px 55px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.all-container::after{
  content: "";
  position: absolute;
  width: 70px;
  height: 70px;
  top : -35px;
  right : -35px;
  background: #A361BF url('@/assets/icons/cart.svg') center/contain no-repeat;
  background-size: 60%;
  border-radius: 50px;
}
.btn-validate:disabled{
  background: rgba(163, 97, 191, 0.5);
  cursor: not-allowed;
}

</style>