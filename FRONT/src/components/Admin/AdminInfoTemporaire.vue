
<template>
  <div class="EspaceAdmin">
    <PageTitre title="Tableau de bord" />
    <div class="container-header">
      <div  class="Bienvenue">
        <h2 class="EffetViolet">Bienvenue, <br> {{lname}} {{fname}}</h2>
      </div>
      <div class="Perfomance">
        <div class="graphique">
          <canvas id="donutChart" style="max-height: 180px"></canvas>
        </div>
        <div class="Perfomance-text">
          <h2>Performances</h2>
          <h3>59.09 %</h3>
          <h4>40.91 %</h4>

        </div>

      </div>
    </div>

    <div class="container-middle">
      <div class="chiffreDuJour">
        <h2>Chiffres du jour</h2>
        <div class="rubriqueChiffre">
          <div class="rubriqueChiffre-content">
            <h2>€  11,983.98</h2>
            <h3>Ventes</h3>
          </div>
          <img src="@/assets/pagePrestataire/Sell.svg" style="max-height: 60px">
        </div>
        <div class="rubriqueChiffre">
          <div class="rubriqueChiffre-content">
            <h2>2761</h2>
            <h3>Visiteurs</h3>
          </div>
          <img src="@/assets/pagePrestataire/personne.svg" style="max-height: 60px">
        </div>
        <div class="rubriqueChiffre">
          <div class="rubriqueChiffre-content">
            <h2>320</h2>
            <h3>Commandes</h3>
          </div>
          <img src="@/assets/pagePrestataire/commande.svg" style="max-height: 60px">

        </div>
      </div>
      <div class="Calendrier">
        <h2>Calendrier</h2>
        <div class="calendrier-bloc"></div>
      </div>

    </div>

    <div class="container-bottom">
      <h2>
        <h2>Performances dans le temps</h2>
        <div class="perform-block"></div>

      </h2>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import {Chart} from 'vue-chartjs';
import PageTitre from "./PageTitre.vue";

export default {
  name: 'AdminInfoTemporaire',
  computed: {
    ...mapState(['token', 'fname', 'lname', 'group_id', 'user_id', 'email'])
  },
  components: {
    PageTitre
  },
  methods: {
    ...mapActions(['logout']),
    deconnexion() {
      this.$router.replace('/login');
      this.logout();
    },
    renderDonutChart() {
      const ctx = document.getElementById('donutChart').getContext('2d');

      const gradient = ctx.createLinearGradient(0, 0, 0, 100);
      gradient.addColorStop(0, 'rgb(178, 94, 231)'); // #B25EE7
      gradient.addColorStop(1, 'rgb(217, 69, 69)'); // #D94545


      new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [0.5909,0.4091],
            backgroundColor: [gradient, 'transparent'],
          }],
        },options :{
          rotation: -100,
        }
      });
    },
  },
  mounted() {
    this.renderDonutChart();
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Goldman&display=swap');
.EspaceAdmin{
  display: flex;
  flex-direction: column;
  padding: 3% 6%;

}

.EspaceAdmin h1{
  text-align: left;
  font-family: "DM Sans";
  font-size: 50px;
  font-style: normal;
}


.container-header{
  margin-top: 2%;
  display: flex;
  gap: 10%;
  height: 200px;
}

.Bienvenue{
  display: flex;
  flex-direction: column-reverse;
  padding: 2%;
  flex:1;
  border-radius: 20px;
  background: radial-gradient(97.12% 97.12% at 50% 40.46%, #BAA8FC 0%, rgba(198, 188, 235, 0.00) 100%);}

.Perfomance{
  padding: 2%;
  display: flex;
  text-align: left;
  gap: 7%;
  flex: 2;
  border-radius: 20px;
  background: radial-gradient(97.12% 97.12% at 50% 40.46%, #BAA8FC 0%, rgba(198, 188, 235, 0.00) 100%);
}

.Perfomance-text h2 {
  background: radial-gradient(1218.45% 275.85% at 38.96% 50%, #968462 0%, #C65151 52.71%);
  font-size: 40px;
  font-family: "DM Sans";
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  mix-blend-mode: color-burn;
}

.Perfomance-text h3{
  background: linear-gradient(180deg, #FFF -168.18%, #E8CEFC 175.45%);
  font-size: 55px;
  font-family: "Goldman";
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.Perfomance-text h4{
  text-align: left;
  color: rgba(255, 255, 255, 0.52);
  font-family: Goldman;
  font-size: 35px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.Bienvenue h2{
  text-align: start;
  font-family: DM Sans;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.container-middle{
  display: flex;
  margin-top: 2%;
  gap: 10%;
  height: 350px;
}

.container-middle h2{
  color: #56565C;
  font-size: 30px;


}


.Calendrier{
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}


.chiffreDuJour{
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 7%;
  align-items: flex-start;
}

.rubriqueChiffre{
  display: flex;
  flex: 1;
  width: 100%;
  padding: 2% 4%;
  justify-content: space-between;
  border-radius: 10px;
  background: radial-gradient(182.37% 182.37% at 50% 50%, rgba(236, 231, 241, 0.60) 0%, rgba(236, 231, 241, 0.00) 100%);
  box-shadow: 0px 0px 155.2px -76px rgba(0, 0, 0, 0.25);
}


.rubriqueChiffre-content h2{
  color: #252336;
  font-family: DM Sans;
  font-size: 35px;
  text-align: left;


}

.rubriqueChiffre-content h3{
  color: #BFB7CC;
  font-family: DM Sans;
  font-size: 20px;
  text-align: left;

}

.calendrier-bloc{
  margin-top: 2%;

  width: 100%;
  height: 100%;
  border-radius: 40px;
  background: radial-gradient(97.12% 97.12% at 50% 40.46%, #BAA8FC 0%, rgba(198, 188, 235, 0.00) 100%);
}

.container-bottom{
  margin-top: 4%;

}

.container-bottom h2{
  text-align: left;
  color: #56565C;
  font-size: 30px;
}

.perform-block{
  margin-top: 2%;
  height: 400px;
  border-radius: 40px;
  background: radial-gradient(182.37% 182.37% at 50% 50%, rgba(236, 231, 241, 0.60) 0%, rgba(236, 231, 241, 0.00) 100%);
  box-shadow: 0px 0px 155.2px -76px rgba(0, 0, 0, 0.25);
}

</style>