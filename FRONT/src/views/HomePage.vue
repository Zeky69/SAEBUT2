<template>
  <div class="HomePage">
    <div class="fullscreen-video">
      <video autoplay muted playsinline loop class="base-image" style="filter: brightness(50%)">
        <source src="../assets/Observation_Wheel.mp4" type="video/mp4">
      </video>
      <div class="contenuHautDePage">
        <h1>Explorez l'extraordinaire : là où les<br> rêves prennent vie !</h1>
        <p>Saisissez l'excitation dès maintenant ! Réservez vos billets pour la fête foraine et<br>
          plongez dans une journée de joie, de rires et de sensations inoubliables !</p>
        <a style="position: relative; z-index: 0" class="boutton">Billetterie</a>
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
          <h2>Bienvenue à Belforaine <span style="color:#553C65"><br>le paradis du futur !</span></h2>
          <p>Découvrez un monde où LANs survoltés, aventures en réalité virtuelle époustouflantes, conférences
            inspirantes et divertissement sans fin fusionnent. Plongez dans l'inconnu avec une pointe de futurisme, le
            tout dans une seule destination. Belforaine, où le futur devient réalité, et le plaisir est infini !</p>
          <a class="boutton">Plus d'information</a>
        </div>
      </div>
      </div>
    </div>

    <div class="passBillet">
      <img class="fondFeteForraine" src="../assets/pageAccueil/fond-roue.png" alt="fond roue">
      <div class="card-wrap">
        <div class="card">
          <div class="card-head" >
            <div class="title-card">
              <h1 class="title">Billet Basic</h1>
              <h2 class="subtitle">1 jour</h2>
            </div>
            <p class="price">24,99€</p>
          </div>
          <hr>
          <div class="card-body">
            <div class="list-container">
              <ul class="list-info">
                <li>Accès au parc</li>
              </ul>
            </div>
            <a class="btn-card">Ajouter au panier</a>
          </div>
        </div>
        <div class="card">
          <div class="card-head" >
            <div class="title-card">
              <h1 class="title">Billet Fast</h1>
              <h2 class="subtitle">1 jour</h2>
            </div>
            <p class="price">34,99€</p>
          </div>
          <hr>
          <div class="card-body">
            <div class="list-container">
              <ul class="list-info">
                <li>Accès au parc</li>
                <li>Accès sans attente aux attractions</li>
              </ul>
            </div>
            <a class="btn-card">Ajouter au panier</a>
          </div>
        </div>
        <div class="card">
          <div class="card-head" >
            <div class="title-card">
              <h1 class="title">Billet Premium</h1>
              <h2 class="subtitle">1 jour</h2>
            </div>
            <p class="price">59,99€</p>
          </div>
          <hr>
          <div class="card-body">
            <div class="list-container">
              <ul class="list-info">
                <li>Accès au parc</li>
                <li>Accès sans attente aux attractions</li>
                <li>Des goodies offerts</li>
              </ul>
            </div>
            <a class="btn-card">Ajouter au panier</a>
          </div>
        </div>

      </div>
    </div>

    <div class="presentationCards">
      <br>
      <h2>Plus que des manèges, une expérience<br>
        <span style="color: #553C65">qui tourne la magie à l'infini !</span></h2>
      <div class="cards-multiple">

        <div class="grosseCard">
          <img src="../assets/pageAccueil/multiple-cards/image1-1.png">
          <img class="imageMilieu" src="../assets/pageAccueil/multiple-cards/image1-2.png">
          <div class="mini-card">
            <div class="mini-card-header">
              <h3>Rejoignez la Belforaine LAN Fest !</h3>
            </div>
            <div class="mini-card-content">
              <p> Des tournois de jeu inoubliables vous attendent à LAN Fest,<br>
                le paradis des gamers à Belforaine. Défiez vos amis, mesurez<br>
                vos compétences et plongez dans l'action multijoueur ultime !</p>
            </div>
            <p class="btns">Je fonce !</p>
          </div>
        </div>

        <div class="grosseCard solo">
          <img src="../assets/pageAccueil/multiple-cards/image2-2.png">
          <img class="imageMilieu" src="../assets/pageAccueil/multiple-cards/image2-1.png">
          <div class="mini-card solo">
            <div class="mini-card-header">
              <h3>Découvrez nos aventures !</h3>
            </div>
            <div class="mini-card-content">
              <p>Nos attractions sont en constante évolution. Des montagnes russes<br>
                trépidantes aux spectacles surprenants, plongez dans un univers en <br>
                perpétuelle transformation.</p>
            </div>
            <p class="btns"> Je veux essayer !</p>
          </div>
        </div>

        <div class="grosseCard">
          <img src="../assets/pageAccueil/multiple-cards/image3-1.png">
          <img class="imageMilieu" src="../assets/pageAccueil/multiple-cards/image3-2.png">
          <div class="mini-card">
            <div class="mini-card-header">
              <h3>Goûtez aux Saveurs du Futur</h3>
            </div>
            <div class="mini-card-content">
              <p>Nos restaurants vous transportent dans le futur culinaire<br>
                avec des plats innovants, des saveurs exotiques et des <br>
                expériences de restauration uniques.</p>
            </div>
            <p class="btns">Réserver une table</p>
          </div>
        </div>


      </div>
    </div>
    <Map2DUser/>

  </div>
</template>

<script>
import Map2DUser from "@/components/Map2DUser.vue";

export default {
  name: 'HomePage',
  components: {Map2DUser},
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
  z-index: -10;
  object-fit: cover;
  background-color: transparent;
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
  z-index: 3;
  font-size: 20px;
  background-color: #2B4256;
  width: 180px;
  padding: 15px 10px;
  border-radius: 10px;
  cursor: pointer;
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

}

.textePresentatif h2 {
  font-size: 50px;
}

.textePresentatif p {
  font-family: "DM Sans Regular";
  font-size: 25px;
  text-align: justify;

}

.droite .boutton {
  color: white;
  background-color: #553C65;
  padding: 15px 10px;
  font-size: 20px;
}

@font-face {
  font-family: 'DM Sans Medium';
  src: url('../assets/fonts/DM_Sans/static/DMSans-Medium.ttf') format('truetype');
}
@font-face {
  font-family: 'DM Sans Regular';
  src: url('../assets/fonts/DM_Sans/static/DMSans-Regular.ttf') format('truetype');
}

.passBillet {
  position: relative;
  display: inline-block; /* or display: block; depending on your layout */

}

.fondFeteForraine {
  width: 100%;
  min-width: 100%;
  height: 1000px;
  object-fit: cover;
  filter: blur(2px);
}


.card-wrap {
  display: grid;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  grid-template-columns: repeat(3, 1fr);
  border-radius: 60px;
  backdrop-filter: blur(10px);
  background-color: rgba(23, 35, 49, 0.4);
  border: solid 1px  rgba(255, 255, 255, 0.2)  ;

  width: 80%;
  min-width: 1000px;
  height: 100%;
  min-height: 400px;
  max-height: 600px;

}

.btn-card{
  background-color: #2c3e50;
  padding: 10px 20px;
  width: fit-content;
  height: fit-content;
  border-radius: 10px;
}

.card:nth-child(1) {
  border-radius: 60px 0 0 60px ;
  border-right-color: rgba(255, 255, 255, 0.5) ;
}
.card:nth-child(3) {
  border-left-color: rgba(255, 255, 255, 0.5)  ;

  border-radius: 0 60px 60px 0  ;
}

.card:nth-child(2){
  border-color: transparent rgba(255, 255, 255, 0.5) transparent rgba(255, 255, 255, 0.5)  ;
}

.card {
  font-family: "DM Sans Regular" , Syne , Helvetica , sans-serif;
  //border-color: rgba(255, 255, 255, 0.2)  ;
  border: solid 1px transparent;
  color: white;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1px 1fr;

}


.card hr {
  width: 80%;
  margin: 0 auto;
  border-top: solid 1px rgb(255, 255, 255);

}

.price {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  font-family: "DM Sans Medium" , Syne , Helvetica , sans-serif;
  text-align: center;
  height: 30%;
}

.title-card {
  margin: 50px ;
  display: flex;
  flex-direction: column;
  justify-content: left;
  font-family: "DM Sans Regular" , Syne , Helvetica , sans-serif;

}

.title-card h1{
  width: fit-content;
  font-size: 40px;
}

.subtitle{
  width: fit-content;
  font-size: 20px;
}

.card-body{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.list-info li {
  font-size: 20px;
  font-family: "DM Sans Regular" , Syne , Helvetica , sans-serif;
  width: fit-content;
}
.list-info{
  width: fit-content;
  margin: 0 50px 0 100px;

}

.list-container{
  padding-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 60%;

}

.presentationCards{
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.presentationCards h2{
  font-family: 'Syne';
  font-size: 45px;

}

.cards-multiple{
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.grosseCard{
  display: flex;
  padding-left: 4%;
  gap: 20px;
  box-sizing: border-box;
}

.grosseCard.solo{
  display: flex;
  flex-direction: row-reverse;
  padding-right:4%;

}

.mini-card{
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;
  height: 240px;
  border-radius: 0 40px 40px 0;
  background-color: #553C65;
  color: white;
  font-family: "DM Sans";
  padding: 2%;
}

.mini-card.solo{
  background-color: #2c3e50;
  border-radius: 40px 0 0 40px;



}

.mini-card-header{
  font-size: 25px;
}

.mini-card-content{
  text-align: justify;
  font-size: 20px;
}

.grosseCard img{
  width: 200px;
}

.btns {
  width: 30%;
  font-size: 22px;
  background-color: white;
  padding: 1% 2%;
  color: #553C65;
  border-radius: 10px;
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

  .mini-card{
    width: 600px;
    height: 200px;
    padding: 2%;
  }


  .btns {
    width: 20%;
    font-size: 18px;
  }

  .mini-card-header{
    font-size: 20px;
  }

  .mini-card-content{
    text-align: justify;
    font-size: 17px;
  }


}

@media screen and (max-width: 1030px) {

  .title-card {
    margin: 25px 0 20px 50px;
  }
  .list-info{
    margin: 0;
  }

  .card-wrap{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }

  .card{
    width: 90%;
    height: auto;
    display: flex;
    border: solid 1px rgba(255, 255, 255, 0.2) !important;
    border-radius: 30px !important;
    backdrop-filter: blur(10px);
    background-color: rgba(23, 35, 49, 0.4);
    margin-top: 10px;
  }

  .card-wrap{
    max-width: none;
    min-width: 0;
    max-height: none;
    width: 100%;
    height: 100%;
    background-color: transparent;
    backdrop-filter: none;
    border-radius: 0;
    border: none;
  }



  .card hr{
    display: none;
  }


  .presentationCards h2{
    font-size: 34px;
  }

  .mini-card{
    width: 550px;
    height: 180px;
  }


  .btns {
    width: 20%;
    font-size: 14px;
  }

  .mini-card-header{
    font-size: 16px;
  }

  .mini-card-content{
    text-align: justify;
    font-size: 13px;
  }



}

@media screen and (max-width: 900px){
  .card{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }

  .title-card{
    width: fit-content;
  }

  .fondFeteForraine{
    height: 1200px;
  }

  .list-container{
    margin: 0 0 0 100px;
    width: fit-content;

  }
  .btn-card{
    margin: 20px 0;
  }

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
  .card{
    width: 99%;
    border-radius: 0 !important;

  }

  .list-container{
    margin: 0;

  }

  .title-card{
    width: fit-content;
    margin-left: 5%;
  }

  .presentationCards h2{
    font-size: 20px;
  }

  .mini-card{
    width: 600px;
    height: 180px;
  }


  .btns {
    width: 40%;
    font-size: 10px;
  }

  .mini-card-header{
    font-size: 12px;
  }

  .mini-card-content{
    text-align: justify;
    font-size: 8px;
  }

  .grosseCard img{
    width: 150px;
  }



}

</style>