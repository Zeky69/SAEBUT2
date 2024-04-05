
<template>
  <div class="EspaceAdmin">
    <PageTitre title="Commandes" />
    <table  v-if="commandes.length > 0" >
      <thead>
      <tr>
        <th>
          Type de Billet
        </th>
        <th>
          Nom
        </th>
        <th>
          Prénom
        </th>
        <th>
          Date
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(commande, index) in commandes" :key="index">
        <td>
          {{commande.title}}
        </td>
        <td>{{commande.nom}}</td>
        <td>{{commande.prenom}}</td>
        <td>{{formatDate(commande.date)}}</td>
      </tr>
      </tbody>
    </table>
    <span v-else>Pas de commandes de billet</span>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import PageTitre from "./PageTitre.vue";

import commandesService from "@/services/commandes.service";


export default {
  name: 'AdminInfoTemporaire',
  computed: {
    ...mapState(['token', 'fname', 'lname', 'group_id', 'user_id', 'email']),

  },
  data: () => ({
    commandes : []
  }),
  components: {
    PageTitre,
  },
  methods: {
    ...mapActions(['logout']),
    async getCommandes() {
      try {
        let response = await commandesService.getCommandes();
        if (!response.error) {
          this.commandes = response;
        } else {
          console.log("Erreur lors de la récupération des réservations");
        }
      } catch (e) {
        console.error(e);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
    }
  },
  mounted() {
    this.getCommandes();
    console.log("HEY LES COOMANDES "+this.commandes)
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

.EspaceAdmin {
  font-family: Arial, sans-serif;
  margin: 0 auto;
}

table {
  width: 100%;
  padding: 10px;
  margin-top: 50px;
  border-collapse: collapse;
}

th,
td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #e7e7e7;
  font-weight: bold;
}

tr {
  background-color: #f0f0f0;
}
tr:hover {
  background-color: #e7e7e7;
}

span {
  display: block;
  margin-top: 5px;
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

.graphique {
  height: 155px; /* Ajuster la hauteur du graphique selon vos besoins */
  width: 155px; /* Ajuster la largeur du graphique selon vos besoins */
}
</style>