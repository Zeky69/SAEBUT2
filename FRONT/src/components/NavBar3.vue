<template>
  <div>
    <div id="navbar" class="navbar">
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
          <div class="scrolled-icons">
            <img :src="require('@/assets/icons/panier.svg')" @click="menuClicked('/panier')"   class="i" alt="">
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
    prevScrollpos : 0,
    scrolled: false,
    navBarTitles: {
      'Accueil': '/',
      'Attractions': '/attraction',
      'Restauration': '/restauration',
      'Boutique': '/boutique',
      'Billetterie': '/billetterie',
      'Organisateurs': '/organisateurs',
      'TestMap': '/testMap',
      'MapPresta': '/MapPresta',
      'Map2DAdmin': '/Map2DAdmin',
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
      if ((!this.scrolled && window.innerWidth > 902) || (this.scrolled && window.innerWidth > 1100 )) {
        this.navOpen = true;
      } else {
        this.navOpen = false;
      }
      this.scrolled = window.scrollY >= 100;
      document.getElementsByClassName('navbar-content')[0].classList.toggle('scrolled', this.scrolled);
      let currentScrollPos = window.pageYOffset;

      if (this.prevScrollpos > currentScrollPos || currentScrollPos < 100) {
        document.getElementById("navbar").style.top = "0";
      } else {
        document.getElementById("navbar").style.top = "-200px";
        this.navOpen = false;
      }

      this.prevScrollpos = currentScrollPos;


    }
  },
  watch: {
    '$route'() {
      this.isHomePage = this.$route.path === '/attraction';
      this.isTransparent = this.isHomePage;
    }
  },
  mounted() {
    if ((!this.scrolled && window.innerWidth > 902) || (this.scrolled && window.innerWidth > 1100 )) {
      this.navOpen = true;
    } else {
      this.navOpen = false;
    }

    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', () => {
      if ((!this.scrolled && window.innerWidth > 902) || (this.scrolled && window.innerWidth > 1100 )) {
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

<style scoped>

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
.scrolled-icons{
  display: none;
}

.navbar {
  user-select: none;
  margin: 10px 0;
  font-family: "DM Sans Medium", Syne, Helvetica, sans-serif;
  z-index: 1001;
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: rgba(255, 255, 255, 0);
  position: fixed;
  color: white;
  transition: all 0.3s;

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




@media screen and (min-width: 1101px){
  .scrolled .menu-text a {
    text-align: center;
  }



  .scrolled {
    transition: all 0.3s;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .scrolled .scrolled-icons{
    display: flex;
    align-items: center;
    justify-content: center;
  }


  .scrolled .menu-top{
    display: flex;
    width: fit-content;
  }

  .scrolled a {
    height: fit-content;
  }
  .scrolled .menu-text{
    display: flex;
    width: fit-content;
  }

  .scrolled .menu-text--wrapper{
    display: flex;
    width: 85%;
    justify-content: space-between;
  }

  .scrolled .title h1{
    display: none;
  }
  .scrolled .icons{
    display: none;
  }


}


@media screen and (min-width: 902px) {

  .menu-burger{
    display: none;
  }
  .menu-text a {
    text-align: center;
  }
}

@media screen and (min-width: 902px) and (max-width: 1100px) {

  .scrolled .menu-burger{
    display: flex;
  }
  .scrolled .menu-text{
    animation: 5s forwards;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .scrolled .navbar-content{
    width: 100%;
  }
  .scrolled .title h1{
    display: none
  }

}


@media screen and (max-width: 902px) and (min-width: 600px) {
  .menu-text{
    display: flex;
    flex-direction: column;
    justify-content: center;

  }
  .menu-text a {
    text-align: center;
  }

  .logo{
    max-width: 100px;
  }




  .scrolled .menu-burger{
    display: flex;
  }
  .scrolled .menu-text{
    animation: 5s forwards;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

  }

  .scrolled .navbar-content{
    width: 100%;
  }
  .scrolled .title h1{
    display: none
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

  .menu-text a {
    text-align: center;
  }

  .logo{
    max-width: 80px;
  }

  .navbar-content{
    width: 100%;
  }
  .title h1{
display: none
  }
}






</style>