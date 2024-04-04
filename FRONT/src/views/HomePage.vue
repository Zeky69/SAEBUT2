<template>
  <div class="HomePage">
    <div class="fullscreen-video">
      <video  autoplay muted playsinline loop class="base-image video" style="filter: brightness(50%)">
        <source src="../assets/Observation_Wheel.mp4" type="video/mp4">
      </video>
      <div class="contenuHautDePage">
        <h1 v-html="$t('exploreExtraordinary')"></h1>
        <p v-html="$t('enjoyMoments')"></p>
        <a style="position: relative;" class="boutton" @click="goto('/billetterie')">{{ $t('ticketButton') }}</a>
      </div>
    </div>
    <img src="../assets/overlay.svg" class="overlay-image">

    <div class="introduction">
      <div class="container-intro">
      <div class="imageGauche">
        <img src="../assets/pageAccueil/feteForaine1.png">
        <img id="imgLongue" src="../assets/pageAccueil/feteForaine2.png">
        <img src="../assets/pageAccueil/feteForaine3.png">
      </div>
      <div class="droite">
        <div class="textePresentatif">
          <h2 v-html="$t('welcomeBelforaine')"></h2>
          <div class="textePresentatifp" v-html="donnee">
          </div>
          <a @click="goto('/organisateurs')" class="boutton" >{{ $t('learnMoreButton') }}</a>
        </div>
      </div>
      </div>
    </div>

    <pass-billet></pass-billet>
    <div class="presentationCards">
      <br>
      <h2 v-html="$t('ridesExperience')"></h2>
      <MultipleCards/>
    </div>
    <Map2DUser/>
    <AllCardPrestate/>

  </div>
</template>

<script>
import Map2DUser from "@/components/Map2D/Map2DUser.vue";
import AllCardPrestate from "@/components/AllCardPrestate.vue";
import MultipleCards from "@/views/MultipleCards.vue";
import PassBillet from "@/components/Billeterie/passBillet.vue";
import {getHomePage} from "@/services/admin.service";

export default {
  name: 'HomePage',
  components: {PassBillet, AllCardPrestate, Map2DUser,MultipleCards},
  data() {
    return {
      donnee: null,
    }
  },
  methods: {
    goto(path){
      this.$router.push(path);
    }
  },
  async created() {
    this.donnee = await getHomePage()
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: transparent;
}

.video{
  z-index: -1;
}

.fullscreen-video {
  width: 100%;
  position: relative;
  z-index: 0;
  object-fit: cover;
  background-color: transparent;
}

.overlay-image {
  width: 100%;
  margin-top: -10%;
  z-index: 0;
  position: relative;
}

.contenuHautDePage {
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
  position: absolute;
  z-index: 1000;
  text-align: center;
  top: 45%;
  color: #ffffff;
}

.contenuHautDePage h1 {
  font-size: 55px;
  font-family: 'Syne';
  font-weight: normal;
}
.contenuHautDePage p {
  font-size: 20px;
  font-family: "DM Sans Regular";
}

.boutton {
  position: relative;
  font-size: 20px;
  background-color: #2B4256;
  width: 180px;
  padding: 15px 10px;
  border-radius: 10px;
  cursor: pointer;
  text-align:center;
}

.boutton:hover{
  background-color: #34495e;
}

.boutton:active{
  background-color: #293a4b;
}

.introduction {
  display: flex;
  justify-content: center;
  gap: 3%;
}

.container-intro{
  display: flex;
  flex-direction: row;
  gap: 3%;
  width: 95%;
  padding: 50px 0 ;
}

.imageGauche {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
}

.imageGauche img {
  width: 600px;
  height: 189px;
}

#imgLongue {
  width: 800px;
}

.droite {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15%;
}

.textePresentatif {
  padding-top: 15%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  text-align: -webkit-left;
  align-items: center;
  font-family: Syne;
  color: #1b1b1b;
  font-family: "DM Sans Regular";
  font-size: 25px ;
}

.textePresentatif h2 {
  font-size: 50px !important;

}



.droite .boutton {
  color: white;
  background-color: #553C65;
  padding: 15px 10px;
  font-size: 20px;
}


.presentationCards{
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.presentationCards h2{
  text-align: center;
  font-family: 'Syne';
  font-size: 45px;

}



@media all and (max-width: 1160px) {
  .base-image {
    height: 600px;
    object-fit: cover;
  }

  .contenuHautDePage h1 {
    font-size: 45px;
  }

  .contenuHautDePage p {
    font-size: 15px;
  }

  .boutton {
    font-size: 15px;
    width: 160px;
  }

  .imageGauche img {
    width: 400px;
    height: 119px;
  }

  #imgLongue {
    width: 500px;
  }

  .textePresentatif h2 {
    font-size: 30px;
  }

  .textePresentatif p {
    font-size: 20px;
  }

  .droite .boutton {
    font-size: 18px;
  }

  .passBillet{
    width: 100%;
    height: 100%;
  }

  .presentationCards h2{
    font-size: 37px;
  }

}

@media screen and (max-width: 1030px) {


  .card hr{
    display: none;
  }


  .presentationCards h2{
    font-size: 34px;
  }


}

@media screen and (max-width: 900px){

  .imageMilieu{
    display: none;
  }


}

@media all and (max-width: 730px) {

  .base-image {
    height: 750px;
    object-fit: cover;
  }

  .contenuHautDePage h1 {
    font-size: 25px;
  }

  .contenuHautDePage p {
    font-size: 10px;
  }

  .boutton {
    font-size: 12px;
    width: 140px;
    padding: 8px 0px;
    cursor: pointer;
  }

  .droite {
    margin-top: -15%;
  }

  .imageGauche {
    display: none;
  }

  .textePresentatif {
    justify-content: center;
    text-align: center;
  }

  .textePresentatif h2 {
    font-size: 30px;
  }

  .textePresentatif p {
    font-size: 15px;
  }

  .droite .boutton {
    margin-top: 10px;
    font-size: 15px;
  }
}

@media screen and (max-width: 430px){

  .presentationCards h2{
    font-size: 20px;
  }

  .grosseCard img{
    width: 150px;
  }



}

</style>