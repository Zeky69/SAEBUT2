<template>
  <div class="OrganisateursPage">
    <div class="page-banner">
      <div class="image-container">
        <div class="blurred-image"></div>
        <div class="sharp-image"></div>
      </div>
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

    
  </div>


</template>

<script>

export default {
  name: "OrganisateursView",
  data: () => ({
  }),
  methods: {
  },
  mounted() {
  }
}


</script>

<style scoped>

.OrganisateursPage {
  font-family: 'DM Sans Regular';
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
}

.subtitle {
  font-size: 2em;
  left: 50%;
  transform: translateX(40%);
}


.storytime {
  margin: 5em 10em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2em;
}

.p-1 {
  grid-column: 1 / 2;
  font-size: 1.2em;
  text-align: justify;
  margin-right: 10%;
}

.p-1::first-letter {
  font-size: 2em;
  font-weight: bold;
  font-style: italic;
  float: left;
  margin-right: 3%;
  line-height: 1;
}

.p-2 {
  grid-column: 2 / 2;
  font-size: 1.2em;
  text-align: justify;
}

.p-2::first-letter {
  font-size: 2em;
  font-weight: bold;
  font-style: italic;
  float: left;
  margin-right: 3%;
  line-height: 1;
}

.p-3 {
  margin: 0 0 0 15em;
  margin-right: 15em;
  grid-column: 1 / 3;
  font-size: 1.2em;
  text-align: justify;
}

.p-3::first-letter {
  font-size: 2em;
  font-weight: bold;
  font-style: italic;
  float: left;
  margin-right: 3%;
  line-height: 1;
}


@media screen and (max-width: 1200px) {
  .title {
    font-size: 2.5em;
  }

  .subtitle {
    font-size: 1.5em;
  }
}

@media screen and (max-width: 992px) {
  .title {
    font-size: 2em;
  }

  .subtitle {
    font-size: 1.2em;
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
}

@media screen and (max-width: 480px) {
  .title {
    font-size: 1.5em;
  }

  .subtitle {
    font-size: 1.2em;
  }
}
</style>