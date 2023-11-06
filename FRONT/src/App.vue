  <template>
    <div id="app">
      <NavBar @router-signal="handleMenuItemClicked"/>
      <router-view></router-view>
    </div>
  </template>

  <script>
  import NavBar from '../src/components/NavBar.vue';

  export default {
    components: {
      NavBar
    },
    data : () => ({
      currentIndex:0
    }),
    methods: {
      handleMenuItemClicked(index) {
        console.log(index)
        if(index !== this.currentIndex){
          if(index===0) this.$router.push('/');
          else if(index===1) this.$router.push('/attraction');
          else if(index===2) this.$router.push('/restauration');
          else if(index===3) this.$router.push('/boutique');
          else if(index===4) this.$router.push('/billeterie');
          else if(index===5) this.$router.push('/organisateurs');
          else if(index===6) this.$router.push('/search');
          else if(index===7) this.$router.push('/panier');
          else if(index===8) this.$router.push('/login');

          this.currentIndex=index;
        }
      }
    }
  };
  </script>

  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  nav {
    padding: 30px;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }
  </style>