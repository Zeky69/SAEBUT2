<template>
  <div class="container">
  <div class="navbar">
    <div class="menu-top">
      <div class="title"  @click="menuClicked(0)">
        <img src="../assets/logoWF.png" class="logo" alt="">
        <h1>BELFORAINE</h1>
      </div>
      <div class="icons">

        <img src="../assets/icons/search.png" @click="menuClicked(6)" class="i" alt="">
        <img src="../assets/icons/cart.png" @click="menuClicked(7)" class="i" alt="">
         <img src="../assets/icons/prestataire-removebg-preview.png" @click="menuClicked(8)" class="i" alt="">
      </div>
    </div>

    <div class="menu-text">
      <a
      v-for="(text,index) in navBarTitles" :key="index"
      @click="menuClicked(index)">{{text}}</a>
    </div>

  </div>
  <div style="width: 50px;height: 155px;"></div>
</div>
</template>

<script>
export default {
  name:'NavBar',
  data : () => ({
    navBarTitles : [
        'ACCUEIL','ATTRACTIONS','RESTAURATION','BOUTIQUE','BILLETTERIE','ORGANISATEURS', 'TESTMAP'
    ]
  }),
  methods: {
    menuClicked(index) {
      console.log(index)
      if (index !== this.currentIndex) {
        switch (index) {
          case 0:
            this.$router.push('/');
            break;
          case 1:
            this.$router.push('/attraction');
            break;
          case 2:
            this.$router.push('/restauration');
            break;
          case 3:
            this.$router.push('/boutique');
            break;
          case 4:
            this.$router.push('/billeterie');
            break;
          case 5:
            this.$router.push('/organisateurs');
            break;
          case 6:
            this.$router.push('/search');
            break;
          case 7:
            this.$router.push('/panier');
            break;
          case 8:
            this.$router.push('/login');
            break;
        }
        this.currentIndex = index;
      }    },

    navbar() {

  }

  }

}

window.addEventListener('scroll', function() {
  var navbar = document.querySelector('.navbar');
  if (window.scrollY > 0) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
@font-face {
  font-family: "Tw Cen MT Condensed Extra Bold";
  src: url("../assets/fonts/TCCEB.TTF") format("TTF");
}

*{
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-flow: column;
  gap: 60%;
  }

.navbar{
  padding: 15px 0;
  position: fixed !important;
  width: 100%;
  background-color: rgba(255, 255, 255, 1); /* Couleur blanche semi-transparente */
  backdrop-filter: blur(20px);
  box-shadow: black 0 0 10px;
  z-index: 1001;
}

.navbar.scrolled {
  transition: all 0.3s;
  background-color: rgba(255, 255, 255, 0.5); /* Couleur blanche opaque lors du défilement */
}


.menu-top{
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-family: 'Tw Cen MT Condensed Regular', 'Syne';

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