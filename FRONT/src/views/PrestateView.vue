<template>
<div>
  <div class="navbar-height"></div>
  <div class="prestate-container">
    <prestate-component :prestate="prestataire" :mode="mode" p ref="prestate"  @change-mode="changeMode"  @valide="valide"/>
    </div>
  </div>
</template>

<script>
import PrestateComponent from "@/components/Prestatire/Prestate.vue";
import {getPrestataire, updatePage} from "@/services/prestataire.service";

export default {
  name: "PrestateView",
  components: {PrestateComponent},
  props: [],
  data: () => ({
    mode: '1',
    prestataire: null

  }),
  computed: { },
  created() {


  },
  mounted() {

    if( this.$store.state.group_id !== 2 && this.$route.params.id ) {
      getPrestataire(this.$route.params.id).then((res) => {
        if (res && res.length !== 0)
          this.prestataire = res[0];
        console.log(this.prestataire);
      });
    }

     if(this.$store.state.group_id === 2){
       if (this.$store.state.prestataireObject === null){
          this.$store.dispatch('getPrestataireObject',this.$store.state.user_id).then(
            () => {
              this.prestataire = this.$store.state.prestataireObject;
            }
          )
       }
        else{
          this.prestataire = this.$store.state.prestataireObject;
        }

        this.mode = '1';
     }
     else
       this.mode = '2';





  },
  methods: {
    changeMode(mode){
      this.mode = mode;
    },
    valide(Page){
      console.log(Page)
      this.prestataire.page_info = Page;
      updatePage( this.prestataire).then((res) => {
        console.log(res);
      });

    },
  },
};

</script>
<style scoped>
.navbar-height{
  height: 180px;
  width: 100%;
}


</style>