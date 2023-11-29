<template>
  <div>
    <div class="navbar">
      <div class="navbar-content">
        <div class="menu-top">
          <div class="menu-burger">
          <button >
            <img :src="require('@/assets/icons/menu-burger.svg')" @click="navOpen=!navOpen" class="i" alt="">
          </button>
          </div>
          <div class="title" @click="menuClicked(0)">
            <img :src="require('@/assets/logoWF2W.png')" class="logo" alt="">
            <h1>BELFORAINE</h1>
          </div>
          <div class="icons">
            <img :src="require('@/assets/icons/panier.svg')" @click="menuClicked('/panier')"   class="i" alt="">
          </div>
        </div>
        <div class="menu-text--wrapper" v-show="navOpen">
          <div class="menu-text">
            <a v-for="(text, index) in Object.entries(navBarTitles)" :key="index" @click="menuClicked(text[1])">{{ text[0] }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data: () => ({
    isTransparent: false,
    isHomePage: false,
    navOpen: true,
    navBarTitles: {
      'Accueil': '/',
      'Attractions': '/attraction',
      'Restauration': '/restauration',
      'Boutique': '/boutique',
      'Billetterie': '/billetterie',
      'Organisateurs': '/organisateurs'
    }
  }),
  methods: {
    menuClicked(path) {
      if (window.innerWidth < 902) {
        this.navOpen = !this.navOpen
      }
      this.$router.push(path).catch(() => {
      });
    },
    handleScroll() {
      this.isTransparent = window.scrollY <= 200;
    }
  },
  watch: {
    '$route'() {
      this.isHomePage = this.$route.path === '/attraction';
      this.isTransparent = this.isHomePage;
    }
  },
  mounted() {
    if (window.innerWidth > 902) {
      this.navOpen = true;
    } else {
      this.navOpen = false;
    }

    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', () => {
      if (window.innerWidth > 902) {
        this.navOpen = true;
      } else {
        this.navOpen = false;
      }
    });

    // Vérifiez également le chemin de la route lors du montage initial
    this.isHomePage = this.$route.path === '/attraction';
    this.isTransparent = this.isHomePage;
  }
}
</script>

<style>

@font-face {
  font-family: 'DM Sans Medium';
  src: url('../assets/fonts/DM_Sans/static/DMSans-Medium.ttf') format('truetype');
}
@font-face {
  font-family: 'DM Sans Regular';
  src: url('../assets/fonts/DM_Sans/static/DMSans-Regular.ttf') format('truetype');
}
@keyframes menuSlideDown {
  0% {
    height: 0;
  }
  100% {
    height: 200px;
  }
}

* {
  margin: 0;
  padding: 0;
}

.navbar {
  margin: 10px 0;
  font-family: "DM Sans Medium", Syne, Helvetica, sans-serif;
  z-index: 1001;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: rgba(255, 255, 255, 0);
  position: fixed;
  color: white;

}
.navbar-content {
  display: flex;
  flex-flow: column;
  border-radius: 20px;
  width: 80%;
  background-color: rgba(23, 35, 49, 0.8);
  backdrop-filter: blur(20px);
}

.menu-text--wrapper {
  overflow: hidden;
  overflow-x : hidden;
  animation: 300ms ease-in-out menuSlideDown;
}

.menu-text{
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.menu-text a {
  padding: 5px;
  margin : 0 5px;
  cursor: pointer;
  font-size: 20px;
  font-family: "DM Sans Regular" , Syne , Helvetica , sans-serif;
}


.menu-top {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

}

.menu-burger {
  grid-column: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-burger button {
  background-color: transparent;
  border: none;
}

.close {
  position: absolute;
  transform:translateY(-200px);
  display: flex;
  flex-direction: column;
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
  height: 30px;
  cursor: pointer;
}
@media screen and (min-width: 902px) {

  .menu-burger{
    display: none;
  }
}

@media screen and (max-width: 902px) and (min-width: 600px) {
  .menu-text{
    display: flex;
    flex-direction: column;
  }


}
@media screen and (max-width: 600px)  {
  .menu-burger{
    display: flex;
  }
  .menu-text{
    animation: 5s forwards;
    display: flex;
    flex-direction: column;
  }

  .navbar-content{
    width: 100%;
  }
  .title h1{
display: none
  }
}






</style>