<template>

  <div class="app">
  <div class="menu-vertical">
    <menu-vertical :list-menu="ListMenu"/>
  </div>
  <div class="body-container">
    <router-view ></router-view>
  </div>
  </div>

</template>

<script>
import {mapActions, mapState} from "vuex";
import MenuVertical from "@/components/menuVertical.vue";

export default {
  name: 'EspaceAdmin',
  components: {MenuVertical},
data: () => ({
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
      title: "Statistiques",
      path: "/admin/statistiques",
    },
    {
      title: "Profil",
      path: "/admin/profil",
    },
  ]
  }),
  computed: {
    ...mapState(['token','fname','lname','group_id','user_id','email'])
  },
  methods:{
    ...mapActions(['logout']),
    deconnexion(){
      this.$router.replace('/login');
      this.logout();
    }
  },
  mounted() {
    console.log(this.group_id)
    if (this.group_id !== 1) {
      this.$router.replace('/login');
    }
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
  overflow: scroll;
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


</style>
