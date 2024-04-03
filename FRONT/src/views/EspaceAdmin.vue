<template>

  <div class="app">
  <div class="menu-vertical">
    <menu-vertical :list-menu="ListMenu" role="Organisateur" color1="#553C65" color2="#2B4256" :path="path"/>
  </div>
  <div class="body-container">
    <router-view></router-view>
  </div>
  </div>

</template>

<script>
import {mapActions, mapState} from "vuex";
import MenuVertical from "@/components/Admin/menuVertical.vue";

export default {
  name: 'EspaceAdmin',
  components: {MenuVertical},
data: () => ({
  path:"",
  ListMenu: [
    {
      title: "Tableau de bord",
      path: "/admin",
    },
    {
      title: "Commandes",
      path: "/admin/commandes",
    },
    {
      title: "Produits",
      path: "/admin/produits",
    },
    {
      title: "Prestataires",
      path: "/admin/prestataires",
    },
    {
      title: "map",
      path: "/admin/map",
    },
    {
      title: "Profil",
      path: "/admin/profil",
    }

  ]
  }),
  computed: {
    ...mapState(['token','fname','lname','group_id','user_id','email','prestataireObject'])
  },
  methods:{
    ...mapActions(['logout','getPrestataireObject']),
    deconnexion(){
      this.logout();
    },
    async getInformation() {
      await this.getPrestataireObject(this.user_id);
      const presta = this.prestataireObject;

      console.log(presta)

      this.path = presta.photo_profil;

    },
  },
  mounted() {
    this.getInformation();
    console.log(this.group_id)
  }
}
</script>

<style scoped>
.app {
  height: 98vh;
  margin : 1vh;
  border-radius: 30px;
  background: linear-gradient(180deg, #172331 0%, #32233C 100%);
}
.body-container{
  position: absolute;
  top: 1vh;
  left: calc(300px + 1vh);
  width: calc(100% - 300px - 2vh - 5px);
  height: calc(100% - 2vh - 10px);
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 30px;
  margin: 5px 5px 5px 0;
  background: linear-gradient(0deg, #F4E4FF 0.93%, #D6D5E4 34.57%);

  z-index: 1000;
}

.menu-vertical{
  position: relative;
  top: 0;
  left: 0;
  width: 300px;
  height: 100%;
  border-radius: 30px 0 0 30px;
  z-index: 1000;
}


/* Largeur de la barre de défilement */
.body-container::-webkit-scrollbar {
  width: 4px;
}

/* Couleur de fond de la barre de défilement */
.body-container::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 20px;
}

/* Couleur de la poignée de défilement (la partie mobile) */
.body-container::-webkit-scrollbar-thumb {
  background-color: rgba(48, 35, 58,0.5);
  border-radius: 20px;
}

/* Changement de couleur au survol de la poignée de défilement */
.body-container::-webkit-scrollbar-thumb:hover {
  background-color: rgba(47, 35, 58, 0.7);

}


</style>
