<template>
  <div class="container">

    <div class="menu-top">
      <div class="title"  @click="menuClicked(0)">
        <img src="../assets/logoWF.png" class="logo">
        <h1>BELFORAINE</h1>
      </div>
      <div class="icons">

        <img src="../assets/icons/search.png" @click="menuClicked(6)" class="i">
        <img src="../assets/icons/cart.png" @click="menuClicked(7)" class="i">
         <img src="../assets/icons/prestataire.png" @click="menuClicked(8)" class="i">
      </div>
    </div>

    <div class="menu-text">
      <a
      v-for="(text,index) in navBarTitles" :key="index"
      @click="menuClicked(index)">{{text}}</a>
    </div>

  </div>

</template>

<script>
export default {
  name:'NavBar',
  data : () => ({
    navBarTitles : [
        'ACCUEIL','ATTRACTIONS','RESTAURATION','BOUTIQUE','BILLETTERIE','ORGANISATEURS'
    ]
  }),
  methods: {
    menuClicked(index){
      this.$emit('router-signal',index);
    }
  }

}
</script>

<style>
@font-face {
  font-family: "Tw Cen MT Condensed Extra Bold";
  src: url("../assets/fonts/TCCEB.TTF") format("TTF");
}

*{
  margin: 0;
  padding: 0;
}

.container{
  padding-top: 1%;
  padding-bottom: 1%;
  display: flex;
  flex-flow: column;
  gap: 60%;
  }

.menu-top{
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-family: 'Tw Cen MT Condensed Extra Bold', sans-serif;

}

a{
  text-decoration: none;
  font-size: 120%;
  color : #2c3e50;
  cursor: pointer;
}


.title{
  display: flex;
  align-items: center;
  font-size: 150%;
}

.logo{
  max-width: 15%;
}

.icons {
  margin-right: 3%;
  display: flex;
  gap: 6%;
}


.i{
  height: 60px;
  cursor: pointer;
}

.menu-text{
  display: flex;
  justify-content: center;
  margin-top: 1%;
  gap:3%;
}

</style>