
<template>
  <div class="all-container-information">
    <div class="contenu-all">
      <div class="container-acheteur">
        <h1>1. Information de Facturation</h1>
        <div>
        <input placeholder="Nom" type="text" class="nom input-info" v-model="informationAchateur.nom" >
        <input placeholder="Prenom" type="text" class="prenom input-info" v-model="informationAchateur.prenom" >
        </div>
        <div>
        <input placeholder="Email" type="text" class="email input-info" v-model="informationAchateur.email" >
        </div>
        <div class="tets">
        <input placeholder="Adresse" type="text" class="adresse input-info" v-model="informationAchateur.adresse" >
        <input placeholder="Code postal" type="text" class="codePostal input-info" v-model="informationAchateur.codePostal" >
        <input placeholder="Ville" type="text" class="ville input-info" v-model="informationAchateur.ville" >
        <input placeholder="Pays" type="text" class="pays input-info" v-model="informationAchateur.pays" >
        </div>
      </div>

      <div class="container-billet">
        <h1>2. Saisissez les informations des billets</h1>
        <div class="container-billet2">
          <div class="billet" v-for="(item, index) in billetInformation" :key="index">
            <div class="titre-billet">
              <h2>{{item.item.header.title}}</h2>
              <p>{{item.item.header.subtitle}}</p>
            </div>
            <div class="sous-info">
            <h3>{{item.item.header.day}} Jour {{ item.item.header.day === 1 ? '' :'s'}} </h3>
            <p>({{getDate(item.item)}})</p>
            </div>
            <input placeholder="Nom" type="text" class="nom input-info" v-model="item.nom" >
            <input placeholder="Prenom" type="text" class="prenom input-info" v-model="item.prenom" >
          </div>
        </div>
      </div>
      <button @click="continuer">
        Continuer
      </button>
      <button @click="retour">
        Retour
      </button>

    </div>


  </div>
</template>

<script>

import Cookies from "js-cookie";

export default {
  name: 'InformationPanier',
  props: {
    msg: String
  },
  data () {
    return {
      panier : [],
      informationAchateur: {
        nom: '',
        prenom: '',
        email: '',
        adresse: '',
        codePostal: '',
        ville: '',
        pays: '',
      },
      billetInformation:[
      ]



      }



  },methods:{
    retour(){
      this.$store.dispatch("setStepPanier", 1)
    },
    continuer(){
      if(this.informationAchateur.nom === '' || this.informationAchateur.prenom === '' || this.informationAchateur.email === '' || this.informationAchateur.adresse === '' || this.informationAchateur.codePostal === '' || this.informationAchateur.ville === '' || this.informationAchateur.pays === ''){
        alert('Veuillez remplir tous les champs')
        return
      }
      for (let i = 0; i < this.billetInformation.length; i++) {
        if(this.billetInformation[i].nom.length < 3 || this.billetInformation[i].prenom.length < 3){
          alert('Veuillez remplir tous les champs des billets')
          return
        }
      }
      if(this.informationAchateur.email.indexOf('@') === -1){
        alert('Veuillez entrer une adresse email valide')
        return
      }

      if(this.informationAchateur.codePostal.length !== 5){
        alert('Veuillez entrer un code postal valide')
        return
      }
      if(this.informationAchateur.pays.length < 2){
        alert('Veuillez entrer un code pays valide')
        return
      }

      if(this.informationAchateur.ville.length < 3){
        alert('Veuillez entrer une ville valide')
        return
      }
      if(this.informationAchateur.adresse.length < 3){
        alert('Veuillez entrer une adresse valide')
        return
      }

      if(this.informationAchateur.nom.length < 3){
        alert('Veuillez entrer un nom valide')
        return
      }

      if(this.informationAchateur.prenom.length < 3){
        alert('Veuillez entrer un prenom valide')
        return
      }



      let order = {
        panier : this.panier,
        billet: this.billetInformation,
      }
      let acheteur = this.informationAchateur
      Cookies.set('order', JSON.stringify(order))
      Cookies.set('acheteur', JSON.stringify(acheteur))
      this.$store.dispatch("setStepPanier", 3)
    },
    getDate(item){
      let text = ''
      for (let i = 0; i < item.date.length; i++) {
        if(i === item.date.length -1)
          text += new Date(item.date[i]).toLocaleDateString()

        else if(i === item.date.length -2)
          text += new Date(item.date[i]).toLocaleDateString() + ' et '
        else
          text += new Date(item.date[i]).toLocaleDateString() + ','

      }
      return text
    }
  },
  created() {
    let storedPanier = Cookies.get('panier');
    if (storedPanier) {
      this.panier = JSON.parse(storedPanier);
      this.panier.forEach((item)=>{
        if(item.header.type ==='billet'){
          for (let i = 0; i < item.quantity; i++) {
            this.billetInformation.push({
              item : item,
              nom:'',
              prenom:'',
            })

          }


        }

      })

    }
  }
}
</script>


<style scoped>

.all-container-information{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.contenu-all{
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 30px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  background-color: rgba(210, 210, 210, 0.77);
  box-sizing: border-box;
  margin-bottom: 300px;

}
.container-acheteur{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  background-color: rgba(77, 82, 166, 0.27);
  border-radius: 20px;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: rgba(26, 26, 26, 0.52) 0px 0px 4px 0px;
}

.container-billet{
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  background-color: rgba(77, 82, 166, 0.27);
  border-radius: 20px;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: rgba(26, 26, 26, 0.52) 0px 0px 4px 0px;

}

.container-billet2{
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  background-color: rgba(210, 210, 210, 0.77);
  border-radius: 20px;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: rgba(26, 26, 26, 0.14) 0px 0px 4px 0px;

}

.titre-billet{
  display: flex;
flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
}

.titre-billet p {
  font-size: 15px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.62);
}
.billet h3 {
  font-size: 20px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.62);
}
.billet p {
  font-size: 15px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.62);
}

.sous-info{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
}

.contenu-all input {
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  border: none;
  background-color: rgba(255, 255, 255, 0.77);
  box-shadow: rgba(26, 26, 26, 0.52) 0px 0px 4px 0px;
}

.email{
  width: 300px;
}

.contenu-all button {
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  border: none;
  background-color: rgba(77, 82, 166, 0.77);
  box-shadow: rgba(26, 26, 26, 0.52) 0px 0px 4px 0px;
  color: white;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  width: 200px;
}

.contenu-all button:hover {
  background-color: rgba(77, 82, 166, 0.97);
}

.contenu-all button:active {
  background-color: rgba(77, 82, 166, 0.87);
}



</style>