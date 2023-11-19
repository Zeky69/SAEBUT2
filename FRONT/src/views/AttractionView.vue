<template>
  <div class="HomePage">
    <div class="fullscreen-video">

      <video autoplay muted playsinline loop class="base-image" style="filter: brightness(50%)">
        <source src="../assets/Observation_Wheel.mp4" type="video/mp4">
      </video>
      <h1 class="tittle" id="tittle" style="z-index: 0">Là où les rêves deviennent virtuellement réels.</h1>
      <img src="../assets/overlayB.png" class="overlay-image">

    </div>
    <div class="blanc">
      <h2>Bienvenue à Belforaine, <span style="color: #FEB42D">le paradis du futur !</span> </h2>
      <p>Découvrez un monde où LANs survoltés, aventures en réalité virtuelle époustouflantes, conférences inspirantes et divertissement sans fin fusionnent. Plongez dans l'inconnu avec une pointe de futurisme, le tout dans une seule destination. Belforaine, où le futur devient réalité, et le plaisir est infini !</p>
      <input type="radio" name="slider" id="item-1" checked>
      <input type="radio" name="slider" id="item-2">
      <input type="radio" name="slider" id="item-3">
      <div class="multiple-card">
        <Card for="item-1" class="card1" title="Rejoignez la Belforaine LAN Fest !" description="Des tournois de jeu inoubliables vous attendent à LAN Fest, le paradis des gamers à Belforaine. Défiez vos amis, mesurez vos compétences et plongez dans l'action multijoueur ultime !"/>
        <Card for="item-2" class="card2" title="Rejoignez la Belforaine LAN Fest !" description="Des tournois de jeu inoubliables vous attendent à LAN Fest, le paradis des gamers à Belforaine. Défiez vos amis, mesurez vos compétences et plongez dans l'action multijoueur ultime !"/>
        <Card for="item-3" class="card3" title="Rejoignez la Belforaine LAN Fest !" description="Des tournois de jeu inoubliables vous attendent à LAN Fest, le paradis des gamers à Belforaine. Défiez vos amis, mesurez vos compétences et plongez dans l'action multijoueur ultime !"/>
      </div>
    </div>
    <img src="../assets/overlayBReverse.png" class="overlay-reverse">

    <div class="bottom">
      <div class="map">
        <h2 style="color: #FEB42D">CARTE INTERACTIVE</h2>
        <p>Que vous soyez à la recherche de nos attractions, restaurants ou spectacles : notre carte interactive du parc vous aidera à le trouver et vous donnera également un excellent aperçu de la zone du parc.
        </p>
      </div>
      <img class="image" src="../assets/map.png" style="width: 100%">

    </div>


  </div>
</template>

<script>

import Card from "@/components/CardComponent.vue";

export default {
  name: 'AttractionView',
  components:{
    Card
  }, mounted(){
    let title = document.getElementById("tittle");

    window.addEventListener('scroll', () =>{
      let value = window.scrollY;
      title.style.marginTop = Math.min(value * 0.8, 400) + 'px';
    })
  }
}
</script>

<style scoped>

.HomePage{
  width: 100%;
}

.fullscreen-video {
  position: relative;
  width: 100%;
  height: 100vh;
}

.base-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Pour couvrir la totalité de l'élément en préservant le ratio */
}

.tittle{
  text-align: -webkit-left;
  position: absolute;
  font-family: "Syne";
  top: 60%;
  left: 55%;
  font-size: 50px;
  -webkit-text-stroke: 1px #fff;
  color: transparent;
  background-image: linear-gradient(#fff,#fff);
  background-repeat: no-repeat;
  -webkit-background-clip: text;
  background-position: -1000px 0;
  animation: backolor 8s alternate-reverse infinite;
}

.blanc{
  z-index: 1;
  position: relative;
  background-color: #1b1b1b;
  display: flex;
  flex-direction: column;
  color: white;
  padding: 0% 15%;
  gap: 30px;
  height: 100%;
  font-size: 25px;
  font-family: "Syne";
}

.overlay-image {
  position: relative;
  width: 100%;
  z-index: 0;
  margin-top: -8%;

}

.overlay-reverse{
  width: 100%;
  z-index: 0;
}

.multiple-card{
  padding-bottom: 10%;
  width: 100%;
  display: flex;
  transition: all 0.3s ease-in-out;
}

input[type=radio] {
  display: none;
}

.card1{
  transform: translateX(30%) translateY(10%);
  z-index: 1;
}

.card2{
  z-index: 2;
}

.card3{
  transform: translateX(-30%) translateY(10%);
}


.bottom {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: -6%;
  padding: 0 15%;
  background-color: white;
  font-size: 25px;
}

.map{
  margin-top: 2%;
}

@keyframes backolor {
  100%{
    background-position: 0 0;
  }


}
</style>