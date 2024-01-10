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
     getPrestataire(this.$route.params.id).then((res) => {
      if(res && res.length !== 0)
        this.prestataire = res[0];
      console.log(this.prestataire);
    });
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