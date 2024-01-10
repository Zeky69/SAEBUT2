<template>
  <div class="OrganisateursPage">
    <div class="page-banner">
      <div class="image-container">
        <div class="blurred-image"></div>
        <div class="sharp-image"></div>
      </div>
      <div class="gradient-overlay"></div>
      <div class="text">
        <p class="title">Organisateurs</p>
        <p class="subtitle">Découvrez les têtes pensantes du projet Belforaine !</p>
      </div>
    </div>

    <div class="storytime">
      <p class="p-1">Au cœur du Territoire de Belfort, au sein de la magnifique région Bourgogne-Franche-Comté, 
        émerge un phénomène exceptionnel : Belforaine. L'idée audacieuse de ce parc d'attraction éphémère germa dans l'esprit visionnaire 
        d'un groupe de cinq entrepreneurs locaux, passionnés par l'innovation et le divertissement. 
        Inspirés par la richesse culturelle et historique de la région, 
        ils rêvaient de créer une expérience immersive qui allie le passé et le futur, 
        mettant en valeur le patrimoine tout en embrassant les avancées technologiques les plus récentes.</p>

      <p class="p-2">Mais Belforaine ne se limite pas à l'amusement. Il sert également de plateforme pour les esprits brillants du domaine de l'informatique. 
        Le parc accueille des conférences de pointe, des LAN parties frénétiques et des discussions animées avec les plus grands esprits du monde des affaires. 
        Des entrepreneurs renommés, des businessmen et businesswomen éminents partagent leurs visions du futur numérique, créant un espace où l'innovation se 
        mêle au divertissement de manière harmonieuse.</p>

      <p class="p-3">Ainsi, Belforaine est né de l'union entre la tradition et la modernité, créant un espace éphémère où les visiteurs peuvent s'immerger dans un monde où 
        l'histoire rencontre l'avenir, où la technologie repousse les limites et où l'amusement va de pair avec l'apprentissage. Bien plus qu'un simple parc 
        d'attraction, Belforaine est devenu une expérience culturelle incontournable, laissant une empreinte indélébile dans le paysage du divertissement contemporain.</p>
    </div>

    <hr>

    <p class="bigText" id="teamForaine" ><strong>La</strong> TeamForaine</p>

    <div class="background">


    <div class="organisateurs-container">
  <CardOrganisateur class="row-1"
      :profileImage="'stephane.jpg'"
      :name="'M\'hammed Mechroubi'"
      :message="'Back-end et front-end developer du projet, j\'ai travaillé sur le design et les fonctionnalités, l\'API et la sécurisation du site'"
      :email="'m_hammed.mechroubi@edu.univ-fcomte.fr'"
    />

  <CardOrganisateur class="row-1"
      :profileImage="'stephane.jpg'"
      :name="'Calixte Reymond'"
      :message="'Back-end et front-end developer du projet, j\'ai travaillé sur l\'implémentation de la MAP 3D en ThreeJS'"
      :email="'calixte.reymond@edu.univ-fcomte.fr'"
    />
  <CardOrganisateur class="row-2"
      :profileImage="'stephane.jpg'"
      :name="'Zekeriya Akburak'"
      :message="'Back-end et front-end developer du projet, j\'ai travaillé sur l\'implémentation des fonctionnalités, la sécurité et le design'"
      :email="'zekeriya.akburak@edu.univ-fcomte.fr'"
    />

    <CardOrganisateur class="row-3"
      :profileImage="'stephane.jpg'"
      :name="'Enzo Bellicaud'"
      :message="'Back-end developer du projet, j\'ai travaillé sur la base de données et l\'API'"
      :email="'enzo.bellicaud@edu.univ-fcomte.fr'"
    />

    <CardOrganisateur class="row-3"
      :profileImage="'stephane.jpg'"
      :name="'Dalia Nezzar'"
      :message="'Majoritairement front-end developer et SCRUM master, j\'ai travaillé sur le design et les fonctionnalités du site ainsi que la gestion du projet'"
      :email="'dalia.nezzar@edu.univ-fcomte.fr'"
    />
  </div>

  </div>

  <FooTer/>

  </div>


</template>



<script>
import CardOrganisateur from '@/components/CardOrganisateur.vue';

import FooTer from '@/components/FooTer.vue';

export default {
  name: "OrganisateursView",
  components: {
    CardOrganisateur,
    FooTer
  },
};
</script>

<style scoped>

.OrganisateursPage {
  font-family: 'DM Sans Regular';
}

img{
  pointer-events: none;
}


.page-banner {
  position: relative;
  height: 30em;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.sharp-image {
  background: url(../assets/fondFeteForaine.png) no-repeat center center fixed;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  filter: blur(9px);
}


.blurred-image {
  background: url(../assets/fondFeteForaine.png) no-repeat center center fixed;
  background-size: cover;
  width: 100%;
  height: 100%;
  z-index: 2;
}


.text {
  position: absolute;
  top: 50%;
  left: -5%;
  color: white;
  z-index: 3;
}

.title {
  font-size: 3em;
  margin-bottom: 0.5em;
  font-weight: bold;
  margin-left: 5em;
}

.subtitle {
  font-size: 2em;
  left: 50%;
  transform: translateX(40%);
}

.gradient-overlay {
  position: relative;
  bottom: 0;
  top: 0%;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #553c656e, transparent);
  z-index: 4;
}
.storytime {
  margin: 5em 10em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2em;
  overflow: hidden;
}


.p-1 {
  grid-column: 1 / 2;
  font-size: 1.2em;
  text-align: justify;
  margin-right: 10%;
}


.p-2 {
  grid-column: 2 / 2;
  font-size: 1.2em;
  text-align: justify;
}

.p-3 {
  margin: 0 0 0 15em;
  margin-right: 15em;
  margin-left: 15em;
  grid-column: 1 / 3;
  font-size: 1.2em;
  text-align: justify;
}

.p-1::first-letter,
.p-2::first-letter,
.p-3::first-letter {
  font-size: 2em;
  font-weight: bold;
  font-style: italic;
  float: left;
  margin-right: 3%;
  line-height: 1;
}


hr {
  border: 0;
  height: 2px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), #553c65, rgba(0, 0, 0, 0));
  margin: 5em 10em;
}

@font-face {
    font-family: 'Syne Extra Bold', sans-serif;
    src: url(../assets/fonts/Syne/static/Syne-ExtraBold.ttf);
    font-weight: 800;
    font-style: normal;
  }

#teamForaine.bigText {
  font-family: 'Syne', sans-serif;
  font-size: 550%;
  font-weight: 800;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: #553C65;
}

.background {
  background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.38) 0, rgba(102, 62, 144, 0.38) 3px, transparent 0, transparent 100%);
  background-size: 71px 71px;
  background-color: rgba(255, 255, 255, 0);
}

.organisateurs-container {
  display: flex;
  flex-wrap: wrap; 
  justify-content: space-between;
  margin: 0 5em 0;
}


.row-1 {
  width: calc(48% - 10px);
}

.row-2 {
  width: 100%;
  margin-top: -20%;
}

.row-3 {
  width: calc(48% - 10px);
  margin-top: -10%;
}


@media screen and (max-width: 1200px) {
  .title {
    font-size: 2.5em;
  }

  .subtitle {
    font-size: 1.5em;
  }

  .storytime {
    margin: 5em 5em;
    display: grid;
    grid-template-columns: 1fr;
  }

  .p-1,
  .p-2,
  .p-3 {
    grid-column: 1 / 3;
    margin-right: 0;
    margin-left: 0;
    font-size: 120%;
    text-align: justify;
    align-items: center;
  }
}

@media screen and (max-width: 992px) {
  .title {
    font-size: 2em;
  }

  .subtitle {
    font-size: 1.2em;
  }

  .storytime {
    margin: 5em 5em;
    display: grid;
    grid-template-columns: 1fr;
  }

  .p-1,
  .p-2,
  .p-3 {
    grid-column: 1 / 3;
    margin-right: 0;
    font-size: 120%;
    text-align: justify;
    align-items: center;
  }
}

@media screen and (max-width: 768px) {
  .page-banner
  {
    height: 20em;
  }
  .text {
    margin-top: 10%;
    left: 50%;
    transform: translate(-80%, -50%);
  }

  .title {
    font-size: 1.8em;

  }

  .subtitle {
    font-size: 1.2em;
  }

  .storytime {
    margin: 5em 5em;
    display: grid;
    grid-template-columns: 1fr;
  }

  .p-1,
  .p-2,
  .p-3 {
    grid-column: 1 / 3;
    margin-right: 0;
    margin-left: 0;
    font-size: 120%;
    text-align: justify;
    align-items: center;
  }

  #teamForaine.bigText {
    font-size: 400%;
  }
}

@media screen and (max-width: 480px) {
  .title {
    font-size: 1.5em;
  }

  .subtitle {
    font-size: 1.2em;
  }

  .gradient-overlay {
    width: 110%;
  }

  .image-container {
  position: relative;
  width: 110%;
  height: 100%;
}


  .p-1,
  .p-2 {
    margin-left: 10%;
    margin-right: 0;
    font-size: 120%;
    text-align: justify;
  }

  .p-3 {
    margin-left: 10%;
    margin-right: 0;
    grid-column: 1 / 3;
    font-size: 1.2em;
    text-align: justify;
  }

  #teamForaine.bigText {
    font-size: 300%;
  }
}


</style>