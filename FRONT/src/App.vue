  <template>
    <div id="app">
     <span v-if="!token"><NavBar/></span>
      <router-view></router-view>
    </div>
  </template>

  <script>
  import {mapState,mapActions} from "vuex";
  import NavBar from '../src/components/NavBar3.vue';

  export default {
    components: {
      NavBar,
    },computed:{
      ...mapState(['token','group_id'])
    },methods: {
      ...mapActions(['getInformationFromToken']),
      async getInfo() {
        console.log("Appel à getInformationFromToken");
        await this.getInformationFromToken(this.token);
        console.log("getInformationFromToken terminé, appel de getInfo");
      }

    },
    mounted() {
      if (this.token) {
        this.getInfo();
      }
    }
  };
  </script>

  <style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100;0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900;0,9..40,1000;1,9..40,100;1,9..40,200;1,9..40,300;1,9..40,400;1,9..40,500;1,9..40,600;1,9..40,700;1,9..40,800;1,9..40,900;1,9..40,1000&family=Syne:wght@400;500;600;700;800&display=swap');
*{
  padding: 0;
  margin: 0;
}

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  </style>