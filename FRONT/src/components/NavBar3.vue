<template>
  <div>
    <div class="navbar" :style="{ backgroundColor: isTransparent && isHomePage ? 'transparent' : 'white'}"
         :class="{ 'transparent': isTransparent }">
      <div class="menu-top">
        <div class="title" @click="menuClicked(0)">
          <img :src="isWhiteLogo(0)" class="logo" alt="">
          <h1 :style="{ color: isTransparent && isHomePage ? 'white' : '#2c3e50' }">BELFORAINE</h1>
        </div>
        <div class="icons">
          <img :src="isWhiteLogo(1)" @click="menuClicked(6)" class="i" alt="">
          <img :src="isWhiteLogo(2)" @click="menuClicked(7)" class="i" alt="">
          <img :src="isWhiteLogo(3)" @click="menuClicked(8)" class="i" alt="">
        </div>
      </div>
      <div class="menu-text">
        <a v-for="(text, index) in navBarTitles" :key="index" @click="menuClicked(index)"
           :style="{ color: isTransparent && isHomePage ? 'white' : '#2c3e50' }">{{ text }}</a>
      </div>
    </div>
    <div v-if="!isHomePage" style="width: 50px;height: 155px;"></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data: () => ({
    currentIndex: 0,
    isTransparent: false,
    isHomePage: false,
    navBarTitles: [
      'ACCUEIL', 'ATTRACTIONS', 'RESTAURATION', 'BOUTIQUE', 'BILLETTERIE', 'ORGANISATEURS', 'TESTMAP'
    ]
  }),
  methods: {
    isWhiteLogo(index) {
      switch (index) {
        case 0:
          return (this.isTransparent && this.isHomePage) ? require('@/assets/logoWF2W.png') : require('@/assets/logoWF2.png');
        case 1:
          return (this.isTransparent && this.isHomePage) ? require('@/assets/icons/searchW.png') : require('@/assets/icons/search.png');
        case 2:
          return (this.isTransparent && this.isHomePage) ? require('@/assets/icons/cartW.png') : require('@/assets/icons/cart.png');
        case 3:
          return (this.isTransparent && this.isHomePage) ? require('@/assets/icons/prestataire-removebg-previewW.png') : require('@/assets/icons/prestataire-removebg-preview.png');
        default:
          return null;
      }
    },
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
      }
    },
    handleScroll() {
      this.isTransparent = window.scrollY <= 200  ;
    },
  },
  watch: {
    '$route'() {
      this.isHomePage = this.$route.path === '/attraction';
      this.isTransparent = this.isHomePage;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);

    // Vérifiez également le chemin de la route lors du montage initial
    this.isHomePage = this.$route.path === '/attraction';
    this.isTransparent = this.isHomePage;
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');

@font-face {
  font-family: "Tw Cen MT Condensed Extra Bold";
  src: url("../assets/fonts/TCCEB.TTF") format("TTF");
}

* {
  margin: 0;
  padding: 0;
}

.navbar {
  display: flex;
  flex-flow: column;
  gap: 60%;
  padding: 15px 0;
  position: fixed !important;
  width: 100%;
  z-index: 1001;
}


.menu-top {
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-family: 'Tw Cen MT Condensed Regular', 'Syne';

}


a {
  text-decoration: none;
  font-size: 120%;
  color: #2c3e50;
  cursor: pointer;
}


.title {
  grid-column: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.logo {
  max-width: 120px;
}

.icons {
  grid-column: 3;
  display: flex;
  align-items: center;
  justify-content: center;
}


.i {
  height: 60px;
  cursor: pointer;
}

.menu-text {
  display: flex;
  justify-content: center;
  margin-top: 1%;
  gap: 3%;
}


</style>