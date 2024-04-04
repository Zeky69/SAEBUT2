<template>
  <div class="OrganisateursPage">
    <div class="page-banner">
      <div class="image-container">
        <div class="blurred-image"></div>
        <div class="sharp-image"></div>
      </div>
      <div class="gradient-overlay"></div>
      <div class="text">
        <p class="title">{{ $t('organisateursPage.title') }}</p>
        <p class="subtitle">{{ $t('organisateursPage.subtitle') }}</p>
      </div>
    </div>

    <div class="storytime">
      <p class="p-1">{{ $t('organisateursPage.storytime.p1') }}</p>
      <p class="p-2">{{ $t('organisateursPage.storytime.p2') }}</p>
      <p class="p-3">{{ $t('organisateursPage.storytime.p3') }}</p>
    </div>

    <hr>

    <p class="bigText" id="teamForaine"><strong>{{ $t('organisateursPage.bigText') }}</strong></p>

    <div class="background">
      <div class="organisateurs-container">
        <CardOrganisateur
          class="row-1"
          :profileImage="'stephane.jpg'"
          :name="'M\'hammed Mechroubi'"
          :message="$t('organisateursPage.organisateurs[0].message')"
          :email="'m_hammed.mechroubi@edu.univ-fcomte.fr'"
        />

        <CardOrganisateur
          class="row-1"
          :profileImage="'stephane.jpg'"
          :name="'Calixte Reymond'"
          :message="$t('organisateursPage.organisateurs[1].message')"
          :email="'calixte.reymond@edu.univ-fcomte.fr'"
        />

        <CardOrganisateur
          class="row-2"
          :profileImage="'stephane.jpg'"
          :name="'Zekeriya Akburak'"
          :message="$t('organisateursPage.organisateurs[2].message')"
          :email="'zekeriya.akburak@edu.univ-fcomte.fr'"
        />

        <CardOrganisateur
          class="row-3"
          :profileImage="'stephane.jpg'"
          :name="'Enzo Bellicaud'"
          :message="$t('organisateursPage.organisateurs[3].message')"
          :email="'enzo.bellicaud@edu.univ-fcomte.fr'"
        />

        <CardOrganisateur
          class="row-3"
          :profileImage="'stephane.jpg'"
          :name="'Dalia Nezzar'"
          :message="$t('organisateursPage.organisateurs[4].message')"
          :email="'dalia.nezzar@edu.univ-fcomte.fr'"
        />
      </div>
    </div>
  </div>
</template>



<script>
import CardOrganisateur from '@/components/CardOrganisateur.vue';

export default {
  name: "OrganisateursView",
  components: {
    CardOrganisateur,
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