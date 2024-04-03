
<template>
<div class="all-container-paiement">
  <p> Faire un virement a zek.akburak@gmail.com sur PayPal</p>
  <div class="group-btn">
  <button @click="continuer">J'ai fais mon virement</button>
  <button @click="annuler">J'ai pas d'argent</button>
  </div>
</div>

</template>
<script >
export default {
  name: 'PaiementView',
  methods:{
    continuer(){
      this.$store.dispatch("setStepPanier", 5)
    },
    annuler(){
      this.$store.dispatch("setStepPanier",1)
    }

  }

}

</script>


<style scoped>

.group-btn{
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.group-btn button {
  background-color: rgba(77, 82, 166, 0.87);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  font-family: "DM Sans Medium", Syne, Helvetica, sans-serif;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-right: 5px;
}

.group-btn button:hover {
  background-color: rgba(77, 82, 166, 0.97);
}

.group-btn button:active {
  background-color: rgba(77, 82, 166, 0.77);
}

.all-container-paiement{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.56);
  width: 50%;
  padding: 100px;
  box-sizing: border-box;
  border-radius: 50px;
}

.all-container-paiement p {
  font-size: 20px;
  font-weight: 800;
  color: rgba(23, 26, 45, 0.87);
  text-align: center;
}

</style>