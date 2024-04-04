

<template>

  <div class="all-container-fin">
    <h1 class="succes">{{ $t('cartPage.finalPage.orderPlaced') }}</h1>
    <svg class="svgm" width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="rgba(22, 162, 104, 0.87)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <router-link to="/">
      <button class="btn-add">{{ $t('cartPage.finalPage.returnToHome') }}</button>
    </router-link>
    <div v-if="billets && billets.length >0">
      <h1>{{ $t('cartPage.finalPage.ticketsPreview') }} : </h1>
      <div v-for="(uuid, index) in billets" :key="index" class="qrcode-container">
        <canvas :id="'canvas' + index" class="qrcode"></canvas>
        <div class="header-qr">
          <h1>{{uuid.nom}}&nbsp;{{uuid.prenom}}</h1>
          <p>{{getBilletInforamtion(uuid)}}</p>
          <h2>{{ $t('cartPage.finalPage.ticketNumber') }} : {{ uuid.uuid }} </h2>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Cookies from "js-cookie";
import QRCode from 'qrcode';

import {createCommandeWithoutAccount} from "@/services/shop.service";

export default {
  name: 'FinView',
  data: () => ({
    billets: [],
    order:{ panier: [],
    acheteur: {
      nom: '',
      prenom: '',
      email: '',
      adresse: '',
      codePostal: '',
      ville: '',
      pays: '',
    },
    billet: [
        ],} ,
    }),
  methods:{
    generateQRCodes() {
      this.billets.forEach((uuid, index) => {
        let canvas = document.getElementById('canvas'+index)
        QRCode.toCanvas(canvas, uuid.uuid,{ color: { dark: '#000000', light: '#ffffff' }}, function (error) {
          if (error) console.error(error);
        });
      });
    },
    getBilletInforamtion(billet){
      let text = '';
     for (const i in this.order.billet) {
       if (this.order.billet[i].item.id === billet.id  && this.order.billet[i].item.subId === billet.subId){
         text = this.order.billet[i].item.header.title + ' ' + this.order.billet[i].item.header.subtitle + ' ' + this.order.billet[i].item.header.day  + ' jour'
         if (this.order.billet[i].item.header.day > 1){
           text = text + 's'
         }
          return text
       }
     }

    }

  },
  mounted() {
    let orders = Cookies.get('order');
    let acheteur = Cookies.get('acheteur');
    if(orders && acheteur){
      this.order = JSON.parse(orders);
      this.order.acheteur = JSON.parse(acheteur);
      createCommandeWithoutAccount(this.order).then(
          (res) => {
            this.billets = res;
            this.$nextTick(() => {
              this.generateQRCodes();
            });

            Cookies.remove('panier');
            Cookies.remove('order');

          }
      )
    }else{
      this.$store.dispatch("setStepPanier", 1)
      this.$router.push('/')

      }

  },
  beforeDestroy() {
    this.$store.dispatch("setStepPanier", 1)
  }


}

</script>

<style scoped>

.all-container-fin {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  background-color: white;
  width: 100%;
  border-radius: 10px;

}
.qrcode-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: 20px;
  background-color: white;
  width: 100%;
}

.header-qr h1{
  margin-top: 15px;

  font-size: 25px;

  font-weight: bold;
  padding: 0;
  color: rgba(77, 82, 166, 0.87);
}

.header-qr h2{
  font-size: 20px;
  font-weight: bold;
  padding: 0;
}

.succes{
  font-size: 20px;
  font-weight: bold;
  width: 50%;
  text-align: center;
  padding: 0;
  margin-top: 100px;
  margin-bottom: 10px;
  color: rgba(22, 162, 104, 0.87);
}
.svgm{
  margin-bottom: 20px;
}

.btn-add{
  border: none;
  border-radius: 100px;
  background: rgba(77, 82, 166, 1);
  color: white;
  padding: 10px 20px;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-top: 20px;
}



</style>