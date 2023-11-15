<template>
  <div class="container">
    <div class="imgTop">
      <video autoplay muted playsinline loop id="VideoAccueil" class="base-image">
        <source src="../assets/Observation_Wheel.mp4" type="video/mp4">
      </video>
      <img src="../assets/overlay.png" class="overlay-image">
    </div>
    <div class="middle">
      <div class="card-center">
        <p style="color: grey;font-style: italic">Là où les rêves deviennent virtuellement réels.</p>
        <h1 style="color: #FEB42D">BELFORAINE</h1>
        <p style="color:#FEB42D;font-weight:bold ">Bienvenue à Belforaine, le paradis du futur !</p>
        <p>Découvrez un monde où LANs survoltés, aventures en réalité virtuelle époustouflantes, conférences inspirantes et divertissement sans fin fusionnent. Plongez dans l'inconnu avec une pointe de futurisme, le tout dans une seule destination. Belforaine, où le futur devient réalité, et le plaisir est infini !</p>
      </div>
      <div class="multiple-card">
        <Card title="Rejoignez la Belforaine LAN Fest !" description="Des tournois de jeu inoubliables vous attendent à LAN Fest, le paradis des gamers à Belforaine. Défiez vos amis, mesurez vos compétences et plongez dans l'action multijoueur ultime !"/>
        <Card title="Rejoignez la Belforaine LAN Fest !" description="Des tournois de jeu inoubliables vous attendent à LAN Fest, le paradis des gamers à Belforaine. Défiez vos amis, mesurez vos compétences et plongez dans l'action multijoueur ultime !" />
        <Card title="Rejoignez la Belforaine LAN Fest !" description="Des tournois de jeu inoubliables vous attendent à LAN Fest, le paradis des gamers à Belforaine. Défiez vos amis, mesurez vos compétences et plongez dans l'action multijoueur ultime !" />
      </div>

    </div>
    <div class="bottom">
      <img src="../assets/overlayReverse.png" class="overlay-reverse">
      <div class="map">
      <h1>CARTE INTERACTIVE</h1>
        <p>Que vous soyez à la recherche de nos attractions, restaurants ou spectacles : notre carte interactive du parc vous aidera à le trouver et vous donnera également un excellent aperçu de la zone du parc.
        </p>
      </div>
      <img class="image" src="../assets/map.png" >




    </div>
  </div>
</template>

<script>
import Card from '@/components/CardComponent.vue';
export default {
  name : 'HomePage',
  components :{
    Card

  }
}
</script>

<style>
* {
  margin: 0;
    padding: 0;
}

.container {
  position: relative;
}

.imgTop {
  position: relative;
}

.base-image {
  width: 100%;
  height: auto;
}

.overlay-image {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
}

.middle{
  background-color: #D9D9D9;
  padding-bottom: 10%;
}

.card-center{
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  border : solid 1px;
  margin-left: 12%;
  margin-right: 12%;
  border-radius: 40px;
  font-size: 24px;
  padding: 3% 8%;
}
.multiple-card{

  display: flex;
  gap:1%;
  margin-top: 5%;
  margin-left: 12%;
  margin-right: 12%;
}

.map h1{
  z-index: 10;
  margin-top: -8%;
  color : #FEB42D;

}

.overlay-reverse{
  width: 100%;
  height: auto;
  position: relative;
  z-index: 0;
}


.bottom{

  background-color: white;
  padding-bottom: 10%;
}

.map{
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap : 20px;
  margin-left: 15%;
  margin-right: 15%;
  font-size: 24px;
  padding-bottom: 2%;
}

.image{
  width: 100%;
  height: auto;
}


</style>
