<template>

  <div class="menu-container">
    <div class="menu">
      <div class="menu-logo">
        <img src="@/assets/logoWF2W.png" alt="logo" />
        <div class="title-container">
        <span class="title">Belforaine</span>
        <span class="subtitle">> {{ role }}</span>
        </div>
      </div>
      <div class="profil-container" :style="{ background: 'linear-gradient(90deg,' + color1 + ' 0%, '+ color2 +' 100%)' }">
        <img :src="getImage(path)" alt="">
        <div class="profil-info">
          <span class="profil-info-name">{{lname}} {{fname}}</span>
          <span class="profil-info-role">{{role}}</span>
        </div>
      </div>
      <ul class="ul-container">
        <li v-for="(item, index) in ListMenu" :key="index" :class="{ active: index === activeIndex } ">
          <div class="li-container">
            <div class="li-icon">
              <i style="font-size: 30px; margin-right: 20px" :class="item.img"></i>
            </div>
            <div class="li-a">
                <router-link :to="item.path" exact>{{ item.title }}</router-link>
            </div>
          </div>
        </li>
        <li class="follow" :style="{ top: calculateTopPosition }" >&nbsp;</li>
      </ul>
      <div class="logout-container">
        <button class="btn-logout" @click="deconnexion">
          <svg fill="#000000"  version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                           viewBox="0 0 490.3 490.3" xml:space="preserve">
<g>
	<g>
		<path d="M0,121.05v248.2c0,34.2,27.9,62.1,62.1,62.1h200.6c34.2,0,62.1-27.9,62.1-62.1v-40.2c0-6.8-5.5-12.3-12.3-12.3
			s-12.3,5.5-12.3,12.3v40.2c0,20.7-16.9,37.6-37.6,37.6H62.1c-20.7,0-37.6-16.9-37.6-37.6v-248.2c0-20.7,16.9-37.6,37.6-37.6h200.6
			c20.7,0,37.6,16.9,37.6,37.6v40.2c0,6.8,5.5,12.3,12.3,12.3s12.3-5.5,12.3-12.3v-40.2c0-34.2-27.9-62.1-62.1-62.1H62.1
			C27.9,58.95,0,86.75,0,121.05z"/>
    <path d="M385.4,337.65c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6l83.9-83.9c4.8-4.8,4.8-12.5,0-17.3l-83.9-83.9
			c-4.8-4.8-12.5-4.8-17.3,0s-4.8,12.5,0,17.3l63,63H218.6c-6.8,0-12.3,5.5-12.3,12.3c0,6.8,5.5,12.3,12.3,12.3h229.8l-63,63
			C380.6,325.15,380.6,332.95,385.4,337.65z"/>
	</g>
</g>
</svg>Déconnexion
        </button>
      </div>
    </div>
  </div>

</template>





<script>
import {mapActions, mapState} from "vuex";
import {getImage} from "@/services/image.service";

export default {
  name: 'MenuVertical',
  props: {
    ListMenu: {
      type: Array,
      required: true,
    },color1 : String,
    pathbase : String,
    color2:String,
    role : String,
    path :String
  },
  computed :{
    ...mapState(['lname','fname']),
      // Calculer la position verticale en fonction de l'index de l'élément actif
      calculateTopPosition() {
        const basePath = this.pathbase;
        const currentPath = this.$route.path.replace(basePath, "");
        const currentPathParts = currentPath.split("/");
        let activeindex = this.ListMenu.findIndex(item => {
          const itemPath = item.path.replace(basePath, "");
          const itemPathParts = itemPath.split("/");
          return currentPathParts[0] === itemPathParts[0];
        });

        return activeindex >= 0 ? `${ -(this.ListMenu.length - activeindex) * 3.7}rem` : '0';
      }
  },
  data : () =>({
    open: false,
    activeIndex: 0,
  }),
  methods: {
    getImage,
    ...mapActions(['logout']),
    deconnexion(){
      this.logout();
      this.$router.replace('/');

    }
  },
  created() {
    const basePath = this.pathbase;
    const currentPath = this.$route.path.replace(basePath, "");
    const currentPathParts = currentPath.split("/");

    this.activeIndex = this.ListMenu.findIndex(item => {
      const itemPath = item.path.replace(basePath, "");
      const itemPathParts = itemPath.split("/");
      return currentPathParts[0] === itemPathParts[0];
    });
  },
  watch: {
    $route() {
      const basePath = this.pathbase;
      const currentPath = this.$route.path.replace(basePath, "");
      const currentPathParts = currentPath.split("/");

      this.activeIndex = this.ListMenu.findIndex(item => {
        const itemPath = item.path.replace(basePath, "");
        const itemPathParts = itemPath.split("/");
        return currentPathParts[0] === itemPathParts[0];
      });
    },
  },





};

</script>

<style scoped>



/* Largeur de la barre de défilement */
::-webkit-scrollbar {
  width: 0;

}

.menu-container {
  width: 100%;
  height: 100%;
  border-radius: 30px 0 0 30px;

  z-index: 1000;
  overflow-x:hidden;
  overflow-y:auto;

}
.menu {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.menu-logo {
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 10px 0 0 0;

}
.menu-logo img{
width: 120px;
height: 120px;
}
.title{
  font-size: 1.5em;
  font-family: Syne , Helvetica , sans-serif;
  font-weight: 700;
  color: white;
  text-decoration: none;
  text-align: center;
}
.subtitle{
  font-size: 1em;
  font-family: "DM Sans Regular" , Helvetica , sans-serif;
  font-style: italic;
  font-weight: 400;
  color: white;
  text-decoration: none;
  text-align: center;
  width: fit-content;
}
.title-container{
  display: flex;
  flex-direction: column;
  justify-content: left;
}


.profil-container{
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin:0 0 20px 10px ;
  border-radius: 15px 0 0 15px;
  background: linear-gradient(90deg, #553C65 0%, #2B4256 100%); ;

}


.profil-container img{
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 10px;
  aspect-ratio: 1/1;
  object-fit: cover;
}
.profil-info{
  display: flex;
  flex-direction: column;
  justify-content: left;
  color: white;
  text-decoration: none;
}
.profil-info span{
  width: fit-content;
  font-family: "DM Sans Regular" , Helvetica , sans-serif
}
.profil-info-name{
  font-size: 1.1em;
  font-weight: 700;
}
.profil-info-role{
  font-size: 1em;
  font-weight: 400;
}



li {
  font-family: "DM Sans Regular" , Helvetica , sans-serif;
  list-style-type: none;
  display: flex;
  justify-content: center;
  padding: 15px;
  font-size: 1.1em;
  color: white;
  text-decoration: none;
  text-align: center;
}
.li-container{
  display: grid;
  grid-template-columns: 1fr 5px 2fr;
  width: 100%;
}
.li-a a {
  width: fit-content;
  display: flex;
  justify-content: left;
}
.li-a {
  grid-column: 3;
  display: flex;
  width: 100%;
  justify-content: left;
  align-items: center;


}
.li-icon svg {
  fill : white;
  width: 30px;
}
.active .li-icon svg {
  fill : #4D52A6;
  filter: drop-shadow(0px 1px 0px rgba(0, 0, 0, 0.25));
  transition: all 0.2s ease-in;
}
.li-icon {
  grid-column: 1;
  display: flex;
  width: 100%;
  justify-content: right;

}
.follow{
  position: relative;
  border-radius: 50px 0 0 50px ;
  content: " ";
  width: 250px;
  height: 30px;
  left: 1.2em;
  background: linear-gradient(269deg, #D6D5E4 55.12%, #EDD1FF 99.7%, #F4E3FF 99.7%);
  z-index: -1;
}


li {
  &.follow{
    transition: top 0.2s ease-in;
  }

}
.follow:before,
.follow:after {
  content: " ";
  position: absolute;
  top: 49px;
  right: -1px;
  background-color: transparent;
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  transition: border-color 0.4s;
}
.follow::after{
  border-top: 11px solid #d3d2e1;
  border-top-right-radius: 100%;
}
.follow:before {
  top: -9px;
  border-bottom: 11px solid #d3d2e1;
  border-bottom-right-radius: 100%;
}
a {
  text-decoration: none;
  color: white;
}
.active .li-a a {
  color: #4D52A6;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
}


.logout-container{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  object-fit: cover;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


}
.btn-logout{
  font-family: "DM Sans Regular" , Helvetica , sans-serif;
  font-size: 1.1em;
display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 200px;
  padding: 10px 30px;
  border-radius: 50px;
  background: radial-gradient(156.25% 156.25% at 50% 50%, rgba(149, 130, 167, 0.33) 0%, rgba(46, 65, 87, 0.33) 100%);
  border: none;
  color: white;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
}
.btn-logout svg{
  width: 30px;
  height: 30px;
  margin: 0 10px 0 0;
  fill: white;
}
.btn-logout:hover{
  background: linear-gradient(269deg, #D6D5E4 55.12%, #EDD1FF 99.7%, #F4E3FF 99.7%);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease-in;
  color: #4D52A6;
  cursor: pointer;


  & svg{
    fill: #4D52A6;
    transition: all 0.2s ease-in;
  }

}



</style>