<template>
  <div class="container navbar">
    <div class="menu-top">
      <div class="title"  @click="menuClicked(0)">
        <img src="../assets/logoWF.png" class="logo">
        <h1>BELFORAINE</h1>
      </div>
      <div class="icons">

        <img src="../assets/icons/search.png" @click="menuClicked(6)" class="i">
        <img src="../assets/icons/cart.png" @click="menuClicked(7)" class="i">
         <img src="../assets/icons/prestataire-removebg-preview.png" @click="menuClicked(8)" class="i">
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
    menuClicked(index) {
      this.$emit('router-signal', index);
    },

    navbar() {

  }

  }

}

window.addEventListener('scroll', function() {
  var navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
    console.log("heeyyy")
  } else {
    navbar.classList.remove('scrolled');
  }

});
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
  display: flex;
  flex-flow: column;
  gap: 60%;
  }

.navbar{
  padding: 10px 0;
  position: fixed !important;
  z-index: 100;
  width: 100%;
  background-color: rgba(255, 255, 255, 1); /* Couleur blanche semi-transparente */
  backdrop-filter: blur(20px);
  box-shadow: black 0 0 10px;
}

.navbar.scrolled {
  background-color: rgba(255, 255, 255, 0.5); /* Couleur blanche opaque lors du défilement */
}


.menu-top{
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-family: 'Tw Cen MT Condensed Extra Bold', sans-serif;

}



a{
  text-decoration: none;
  font-size: 120%;
  color : #2c3e50;
  cursor: pointer;
}


.title{
  grid-column: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.logo{
  max-width: 120px;
}

.icons {
  grid-column: 3;
  display: flex;
  align-items: center;
justify-content: center;
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