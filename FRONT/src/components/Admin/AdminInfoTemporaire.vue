
<template>
  <div class="EspaceAdmin">
    <PageTitre title="Tableau de bord" />
    <div class="container-header">
      <div  class="Bienvenue">
        <h2 class="EffetViolet">Bienvenue, <br> {{lname}} {{fname}}</h2>
      </div>
      <div class="Perfomance">
        <div class="graphique">
          <Doughnut :data="categoryChartData" :options="options" />
        </div>

      </div>
    </div>

    <div class="container-middle">
      <div class="chiffreDuJour">
        <h2>Chiffres du jour</h2>
        <div class="rubriqueChiffre">
          <div class="rubriqueChiffre-content">
            <h2>€ {{ totalVentes.vente_total }}</h2>
            <h3>Ventes</h3>
          </div>
          <img src="@/assets/pagePrestataire/Sell.svg" style="max-height: 60px">
        </div>
        <div class="rubriqueChiffre">
          <div class="rubriqueChiffre-content">
            <h2>{{visiteurs}}</h2>
            <h3>Visiteurs</h3>
          </div>
          <img src="@/assets/pagePrestataire/personne.svg" style="max-height: 60px">
        </div>
        <div class="rubriqueChiffre">
          <div class="rubriqueChiffre-content">
            <h2>{{nbCommande}}</h2>
            <h3>Commandes</h3>
          </div>
          <img src="@/assets/pagePrestataire/commande.svg" style="max-height: 60px">

        </div>
      </div>
      <div class="Calendrier">
        <h2>Nombre de vente par billet</h2>
        <div class="calendrier-bloc">
          <Bar :data="ticketChartData2" :option="chartOptions"></Bar>
        </div>
      </div>

    </div>

    <div class="container-bottom">
      <h2>
        <h2>Performances dans le temps</h2>
        <div class="perform-block">
          <MyLineChart :data="ticketChartData" ></MyLineChart>
        </div>

      </h2>
    </div>
    <div>

      <div class="container-bottom">
        <h2>Nombre de vente par article</h2>
        <div class="perform-block">

        <Bar :data="articleChartData" ></Bar>
        </div>


      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import {Line, Bar, Doughnut} from 'vue-chartjs'
import PageTitre from "./PageTitre.vue";

import statistiquesService, {getConnextionToday, getCountCommande} from "@/services/statistiques.service";

ChartJS.register(ArcElement, Tooltip, Legend)


export default {
  name: 'AdminInfoTemporaire',
  computed: {
    ...mapState(['token', 'fname', 'lname', 'group_id', 'user_id', 'email']),
    ticketChartData() {
      return {
        labels: this.ticketData.map(data => data.date),
        datasets: [{
          label: 'Nombre de billets vendus',
          borderColor: 'rgb(75, 192, 192)',
          data: this.ticketData.map(data => data.nbr_billet_vendus)
        }]
      };
    },
    articleChartData() {
      return {
        labels: this.topArticles.map(article => article.nom),
        datasets: [{
          label: 'Quantité totale vendue',
          backgroundColor: 'rgb(255, 99, 132)',
          data: this.topArticles.map(article => article.quantitetotalearticle)
        }]
      };
    },
    ticketChartData2() {
      return {
        labels: this.topTickets.map(ticket => ticket.title),
        datasets: [{
          label: 'Quantité totale vendue',
          backgroundColor: 'rgb(54, 162, 235)',
          data: this.topTickets.map(ticket => ticket.quantitetotalebillet)
        }]
      };
    },
    categoryChartData() {
      return {
        labels: this.topCategories.map(category => category.libelle_categorie),
        datasets: [{
          label: 'Total vente par catégorie',
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(75, 102, 192)'],
          data: this.topCategories.map(category => category.totalventecategorie)
        }]
      };
    },
  },
  data: () => ({
    visiteurs: null,
    nbCommande: null,
    data: {
      datasets: [{
        data: [0.5909,0.4091],
        backgroundColor: ['purple', 'transparent'],
      }],
    },
    options :{
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'right',
          align: 'end', // Alignement de la légende par rapport au texte (start pour aligner le texte à gauche)
          labels: {
            boxWidth: 10, // Largeur de la boîte de légende
            padding: 10, // Espacement entre les légendes
            usePointStyle: true // Utiliser les formes des points dans la légende
          }
        },
        title: {
          display: true,
          text: 'Parts de vente',
          font: {
            size: 20
          }
        }
      }
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
    },
    ticketData: [],
    topArticles: [],
    topTickets: [],
    topCategories: [],
    totalVentes: null
  }),
  components: {
    PageTitre,
    Doughnut,
    MyLineChart: Line,
    Bar
  },
  methods: {
    ...mapActions(['logout']),
    deconnexion() {
      this.$router.replace('/login');
      this.logout();
    },
    async getTicketData() {
      try {
        let response = await statistiquesService.getVenteBilletParDate();
        if (!response.error) {
          this.ticketData = response;
        } else {
          console.log("Erreur lors de la récupération des réservations");
        }
      } catch (e) {
        console.error(e);
      }
    },
    async getTopArticles() {
      try {
        let response = await statistiquesService.getVenteArticle();
        if (!response.error) {
          this.topArticles = response;
        } else {
          console.log("Erreur lors de la récupération des réservations");
        }
      } catch (e) {
        console.error(e);
      }
    },
    async getTopTickets() {
      try {
        let response = await statistiquesService.getVenteBilletParType();
        if (!response.error) {
          this.topTickets = response;
        } else {
          console.log("Erreur lors de la récupération des réservations");
        }
      } catch (e) {
        console.error(e);
      }
    },
    async getTopCategories() {
      try {
        let response = await statistiquesService.getVenteParCategorie();
        if (!response.error) {
          this.topCategories = response;
          this.topCategories.map(category => console.log("cat "+category.libelle_categorie))
        } else {
          console.log("Erreur lors de la récupération des réservations");
        }
      } catch (e) {
        console.error(e);
      }
    },
    async getTotalVentes(){
      try {
        let response = await statistiquesService.getTotalVentes();
        if (!response.error) {
          this.totalVentes = response;
        } else {
          console.log("Erreur lors de la récupération des réservations");
        }
      } catch (e) {
        console.error(e);
      }
    }
  },
  mounted() {
    this.getTicketData();
    this.getTopArticles();
    this.getTopTickets();
    this.getTopCategories();
    this.getTotalVentes();
    getConnextionToday().then((response) => {
      this.visiteurs = response.visiteur
    });

    getCountCommande().then((response)=>{
      this.nbCommande = response.nombre
    })
  },
}
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
  padding-left: 20px;
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

.graphique {
  height: 155px; /* Ajuster la hauteur du graphique selon vos besoins */
  width: fit-content; /* Ajuster la largeur du graphique selon vos besoins */
}
</style>