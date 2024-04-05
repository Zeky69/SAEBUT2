<template>
  <div class="EspaceAdmin">
    <h1 class="EffetViolet">Tableau de bord</h1>
    <div class="container-header">
      <div class="Bienvenue">
        <h2 class="EffetViolet">Bienvenue, <br> {{ lname }} {{ fname }}</h2>
      </div>

      <div  v-if="show" class="Perfomance">
        <Bar :data="articleChartData" ></Bar>
      </div>

      <div class="rubriqueChiffre">
        <div class="rubriqueChiffre-content">
          <h2>{{note}}</h2>
          <h3>Note</h3>
        </div>
        <i class="fas fa-star" style="font-size: 60px; color: #FFD700"></i>

      </div>
    </div>

    <div v-if="show" class="container-middle">
      <div class="chiffreDuJour">
        <h2>Chiffres du jour</h2>
        <div class="rubriqueChiffre">
          <div class="rubriqueChiffre-content">
            <h2>{{ ventes }} €</h2>
            <h3>Ventes</h3>
          </div>
          <img src="@/assets/pagePrestataire/Sell.svg" style="max-height: 60px">
        </div>
        <div class="rubriqueChiffre">
          <div class="rubriqueChiffre-content">
            <h2>{{articlesVendu}}</h2>
            <h3>Article vendu</h3>
          </div>
          <img src="@/assets/icons/cart.png" style="max-height: 80px;">
        </div>
        <div class="rubriqueChiffre">
          <div class="rubriqueChiffre-content">
            <h2>{{formatedComandesaft.length}}</h2>
            <h3>Commandes</h3>
          </div>
          <img src="@/assets/pagePrestataire/commande.svg" style="max-height: 60px">

        </div>
      </div>


    </div>
  </div>

</template>
<script>
import {mapActions, mapState} from "vuex";
import statistiquesService, {getAverageNote} from "@/services/statistiques.service";
import {Bar} from "vue-chartjs";
import {Chart, registerables} from "chart.js";
import prestataireService from "@/services/prestataire.service";
import shopService from "@/services/shop.service";

Chart.register(...registerables);
export default {
  name: 'AdminInfoTemporaire',
  components: {Bar},
  computed: {
    ...mapState(['token', 'fname', 'lname', 'group_id', 'user_id', 'email','prestataireObject']),
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
  },
  data: () => ({
    topArticles: [],
    services:[],
    show:false,
    ventes:0,
    articlesVendu:0,
    loadcommandes: 0,
    formatedComandesaft:[],
    id_presta:null,
    note:0.0

  }),
  methods: {
    ...mapActions(['logout','getPrestataireObject']),
    deconnexion() {
      this.$router.replace('/login');
      this.logout();
    },
    async getTopArticles() {
      try {
        let response = await statistiquesService.getVenteArticleParIdPrestataire(this.user_id);
        if (!response.error) {
          this.topArticles = response;
          this.articlesVendu = response.length;

          this.topArticles.forEach(e =>{
            this.ventes += parseFloat(e.prixtotalarticle)
          })

          this.loadcommandes = await shopService.getCommandes();
          this.formatedComandesaft = await this.formatCommandes(this.loadcommandes);


          let tabe = this.formatedComandesaft.filter(e => e.prestataire_id === this.id_presta)
          this.formatedComandesaft = tabe

          console.log(this.formatedComandesaft)

          console.log("article "+this.topArticles);
        } else {
          console.log("Erreur lors de la récupération des réservations");
        }
      } catch (e) {
        console.error(e);
      }
    },
    async getInformation() {
      await this.getPrestataireObject(this.user_id);
      this.id_presta = this.prestataireObject.id_prestataire;

      let services = await prestataireService.getPrestatairesServices(this.id_presta);
      if (Array.isArray(services) && services.length > 0) {
        this.show = services.some(e => {
          return e.id_type_service === 2
        });
      }
    },
    async formatCommandes(commandes) {
      const formatedCommandes = {};
      const id = this.user_id;
      console.log("id prestataire", id)
      var prestataire = await prestataireService.getPrestataireObject(this.user_id);
      console.log("prestataire obj lsdkqslkdlmqsl", prestataire)
      prestataire = prestataire[0];

      commandes.forEach(commande => {
        const { id_commande, id_user, date_commande, id_produit, quantite, prix, nom, valide, prestataire_id } = commande;

        // Créer un nouvel objet ligne
        let prixcomande = 0;
        const ligne = {
          id_commande,
          id_produit,
          prestataire_id,
          quantite,
          valide,
          prix,
          nom
        };



        // Ajouter la ligne à l'objet formatedCommandes
        if (!formatedCommandes[id_commande]) {
          formatedCommandes[id_commande] = {
            id_commande,
            id_user,
            prestataire_id,
            date_commande,
            lignes: [ligne],
            total_prix: prixcomande
          };
        } else {
          formatedCommandes[id_commande].lignes.push(ligne);
          formatedCommandes[id_commande].total_prix += prixcomande;
        }
      });

      //pour chaque commande suprimer les ligne qui ne sont pas du prestataire
      for (const key in formatedCommandes) {
        formatedCommandes[key].lignes = formatedCommandes[key].lignes.filter(ligne => ligne.prestataire_id === this.id_presta);
        console.log("id prestataire", this.id_presta)
      }

      for (const key in formatedCommandes) {
        formatedCommandes[key].total_prix = formatedCommandes[key].lignes.reduce((acc, ligne) => acc + ligne.prix * ligne.quantite, 0);
      }

      // Convertir l'objet en tableau
      return Object.values(formatedCommandes);
    }
  },
  async mounted() {
    await this.getInformation()
    await this.getTopArticles();
    let res = await getAverageNote(this.id_presta)
    console.log("note",res)
    this.note = res.note


  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Goldman&display=swap');

.EffetViolet {
  text-align: left;
  background: linear-gradient(179deg, #543C64 -58.62%, #868CD1 99.12%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.EspaceAdmin {
  display: flex;
  flex-direction: column;
  padding: 3% 6%;

}

.EspaceAdmin h1 {
  text-align: left;
  font-family: "DM Sans";
  font-size: 50px;
  font-style: normal;
}


.container-header {
  margin-top: 2%;
  display: flex;
  gap: 10%;
  height: 200px;
}

.Bienvenue {
  display: flex;
  flex-direction: column-reverse;
  padding: 2%;
  flex: 1;
  border-radius: 20px;
  background: radial-gradient(97.12% 97.12% at 50% 40.46%, #BAA8FC 0%, rgba(198, 188, 235, 0.00) 100%);
}

.Perfomance {
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

.Perfomance-text h3 {
  background: linear-gradient(180deg, #FFF -168.18%, #E8CEFC 175.45%);
  font-size: 55px;
  font-family: "Goldman";
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.Perfomance-text h4 {
  text-align: left;
  color: rgba(255, 255, 255, 0.52);
  font-family: Goldman;
  font-size: 35px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.Bienvenue h2 {
  text-align: start;
  font-family: DM Sans;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.container-middle {
  display: flex;
  margin-top: 2%;
  gap: 10%;
  height: 350px;
}

.container-middle h2 {
  color: #56565C;
  font-size: 30px;


}


.Calendrier {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}


.rubriqueChiffre-content h2 {
  color: #252336;
  font-family: DM Sans;
  font-size: 35px;
  text-align: left;


}

.rubriqueChiffre-content h3 {
  color: #BFB7CC;
  font-family: DM Sans;
  font-size: 20px;
  text-align: left;

}

.container-bottom {
  margin-top: 4%;

}

.container-bottom h2 {
  text-align: left;
  color: #56565C;
  font-size: 30px;
}


.container-middle{
  display: flex;
  margin-top: 2%;
  gap: 10%;
  height: 350px;
  margin-right: 8%;

}

.container-middle h2{
  color: #56565C;
  font-size: 30px;


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


</style>