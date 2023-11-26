<template>
  <div class="HomePage">
    <div class="fullscreen-video">
      <video autoplay muted playsinline loop class="base-image" style="filter: brightness(50%)">
        <source src="../assets/Observation_Wheel.mp4" type="video/mp4">
      </video>
      <div class="contenuHautDePage">
        <tittle>Explorez l'extraordinaire : là où les<br> rêves prennent vie !</tittle>
        <p>Saisissez l'excitation dès maintenant ! Réservez vos billets pour la fête foraine et<br>
          plongez dans une journée de joie, de rires et de sensations inoubliables !</p>
        <a class="boutton">Billeterie</a>
      </div>
    </div>
    <img src="../assets/overlay.svg" class="overlay-image">

    <div class="introduction">
      <div class="imageGauche">
        <img src="../assets/pageAccueil/feteForaine1.png">
        <img id="imgLongue" src="../assets/pageAccueil/feteForaine2.png">
        <img src="../assets/pageAccueil/feteForaine3.png">
      </div>
      <div class="droite">
        <div class="textePresentatif">
          <h2>Bienvenue à Belforaine <span style="color:#553C65"><br>le paradis du futur !</span></h2>
          <p>Découvrez un monde où LANs survoltés, aventures en réalité virtuelle époustouflantes, conférences
            inspirantes et divertissement sans fin fusionnent. Plongez dans l'inconnu avec une pointe de futurisme, le
            tout dans une seule destination. Belforaine, où le futur devient réalité, et le plaisir est infini !</p>
          <a class="boutton">Plus d'information</a>
        </div>
      </div>
    </div>

    <div class="passBillet">
<!--      <img class="fondFeteForaine" src="../assets/fondFeteForaine.png">-->
      <div class="card-wrap">
        <div class="card">
          <div class="card-header">

          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HomePage',
  components: {}
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

.fullscreen-video {
  width: 100%;
  position: relative;
  object-fit: cover;
  background-color: transparent;
  z-index: 0;
}

.overlay-image {
  width: 100%;
  margin-top: -10%;
  position: relative;
}

.contenuHautDePage {
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
  position: absolute;
  z-index: 2;
  text-align: center;
  top: 50%;
  color: #ffffff;
}

.contenuHautDePage tittle {
  font-size: 55px;
  font-family: 'Syne';
}

.contenuHautDePage p {
  font-size: 20px;
  font-family: "DM Sans Regular";
}

.boutton {
  position: relative;
  z-index: 3;
  font-size: 20px;
  background-color: #2B4256;
  width: 180px;
  padding: 15px 0px;
  border-radius: 10px;
  cursor: pointer;
}


.introduction {
  padding: 5%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: 3%;
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

}

.textePresentatif h2 {
  font-size: 50px;
}

.textePresentatif p {
  font-family: "DM Sans Regular";
  font-size: 25px;
}

.droite .boutton {
  color: white;
  background-color: #553C65;
  padding: 15px 10px;
  font-size: 20px;
}

.fondFeteForaine{
  filter: blur(2px);

}

@media all and (max-width: 1160px) {
  .base-image {
    height: 600px;
    object-fit: cover;
  }

  .contenuHautDePage tittle {
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

  .fondFeteForaine{
    position: relative;
    z-index: 0;
  }

  .card-wrap{
    z-index: 10;
    position: relative;
    margin:1000px;
    height: 100px;
    background-color: red;

  }

  .card{

  }

}

@media all and (max-width: 730px) {
  .base-image {
    height: 750px;
    object-fit: cover;
  }

  .contenuHautDePage tittle {
    font-size: 25px;
  }

  .contenuHautDePage p {
    font-size: 10px;
  }

  .boutton {
    font-size: 12px;
    width: 140px;
    padding: 8px 0px;
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


</style>
