<template>
<div>
  <div class="navbar-height"></div>
  <div class="hearder-container">
  <div class="header"> <div class="image-container"><img :src="urlImage" alt=""></div></div>
    <h1 class="header-titlte">{{nom}}</h1>
  </div>
  <div class="container-contenu">
    <div class="prestate-container">
      <prestate-component :prestate="prestataire" :mode="mode" p ref="prestate"  @change-mode="changeMode"  @valide="valide"/>
    </div>
  </div>
  <div v-for="(batiment,index) in batimentPrestataire" :key="index">
    <reservationComponent
        v-if="idPrestataire !==-1"
        :id_bat="batiment.id_emplacement"
        :id_prestataire="idPrestataire.toString()"
        :mode="mode"
        :nom="batiment.nom"
        :uuidTicket="idPrestataire.toString()"
        :display="batiment.use_resa"
        @updateDisplay="updateDisplay($event)"></reservationComponent>
  </div>
  <commentaire-component v-if="idPrestataire !==-1" :disabled="this.$store.state.group_id ===3" :id_prestataire="idPrestataire"></commentaire-component>
  </div>
</template>

<script>
import PrestateComponent from "@/components/Prestatire/Prestate.vue";
import {getPrestataire, updatePage} from "@/services/prestataire.service";
import {getImage} from "@/services/image.service";
import CommentaireComponent from "@/components/Commentaire.vue";
import batService from "@/services/batiment.service";
import ReservationComponent from "@/components/reservation.vue";

export default {
  name: "MaPage",
  components: {ReservationComponent, CommentaireComponent, PrestateComponent},
  props: [],
  data: () => ({
    mode: '1',
    prestataire: null,
    urlImage: null,
    nom: '',
    idPrestataire: -1,
    batimentPrestataire: [],
    uuidTicket: ""

  }),
  computed: {
  },
  created() {


  },
  mounted() {
    if( this.$store.state.group_id !== 2 && this.$route.params.id ) {
      getPrestataire(this.$route.params.id).then((res) => {
        if (res && res.length !== 0){
          this.prestataire = res[0];
          this.urlImage = getImage(this.prestataire.photo_profil);
          this.nom = this.prestataire.nom
          this.idPrestataire = parseInt(this.prestataire.id_prestataire);
          this.recupererBatimentPrestataire();
        }else if (res && res.length === 0){
          this.$router.push('/').catch(() => {
          });
        }
      });
    }

     if(this.$store.state.group_id === 2){
       if (this.$store.state.prestataireObject === null){
          this.$store.dispatch('getPrestataireObject',this.$store.state.user_id).then(
            () => {
              this.prestataire = this.$store.state.prestataireObject;
              this.nom = this.prestataire.nom;
              this.idPrestataire = parseInt(this.prestataire.id_prestataire);
              this.urlImage = getImage(this.prestataire.photo_profil)
              this.recupererBatimentPrestataire();
            }
          )
       }
        else {
          this.prestataire = this.$store.state.prestataireObject;
          this.nom = this.prestataire.nom;
          this.idPrestataire = parseInt(this.prestataire.id_prestataire);
          this.urlImage =getImage(this.prestataire.photo_profil)
         this.recupererBatimentPrestataire();
        }
        this.mode = '1';
     }
     else {
       this.mode = '2';
     }

  },

  methods: {
    getImage,
    changeMode(mode){
      this.mode = mode;
    },
    valide(Page){
      this.prestataire.page_info = Page;
      updatePage( this.prestataire).then((res) => {
        console.log(res);
      });
    },
    async recupererBatimentPrestataire(){
      try {
        let response = await batService.getBatByIdPrestataire(this.idPrestataire)
        if (response.error) {
          console.log("Erreur lors de la récupération des batiments");
        } else {
          this.batimentPrestataire = response;
        }
      } catch (e) {
        console.error("An error occurred:", e);
      }
    },
    async updateDisplay(id_bat){
      try {
        let response = await batService.updateDisplay({"id_bat":id_bat})
        if (response.error) {
          console.log("Erreur lors de la mise à jour de l'affichage");
        } else {
          console.log("Mise à jour de l'affichage");
        }
      } catch (e) {
        console.error("An error occurred:", e);
      }
    },
  }
}

</script>
<style scoped>
.navbar-height{
  height: 180px;
  width: 100%;
  background-color: #212121;

}

.image-container img {
  position: relative;
  width: 100%;
  object-fit: cover;
  border-radius: 100%;
  aspect-ratio: 1/1;
  border: rgba(77, 82, 166, 0.81) solid 10px;
  z-index: 2;
}
.image-container {
  width: 15%;
  min-width: 200px;
  border-radius: 50% ;
  aspect-ratio: 1/1;
}
.header{
  width: 100%;
  height: fit-content;
  background: linear-gradient(to bottom, #212121 50%, rgba(0, 0, 0, 0) 50%);  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;
}

.header::after{
  content: "";

  display: inline-block;
  position: absolute;
  background-color: rgba(77, 82, 166, 0.87);
  z-index: 1;
  left: 0;
  width: 100vw;
  height: 20px;
}

.header-titlte{
  color: #606060;
  font-family: "DM Sans", Syne, Helvetica, sans-serif;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 0;
  text-align: center;
  margin-bottom: 50px;
}

.prestate-container{
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 50px;
}
.container-contenu{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}





</style>