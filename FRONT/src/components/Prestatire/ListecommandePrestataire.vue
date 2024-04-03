<template>
  <div class="admin-commande">
    <PageTitre title="Gestion des Commandes" />
    <template>
      <div>
        <h1>Commandes</h1>
        <table>
          <thead>
          <tr>
            <th>Numéro de commande</th>
            <th>Utilisateur</th>
            <th>Date de commande</th>
            <th>Prix total</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="commande in formatedComandesaft" :key="commande.id_commande" @click="afficherLignes(commande)">
              <td v-if="commande.lignes.length > 0">{{ commande.id_commande }}</td>
              <td v-if="commande.lignes.length > 0">{{ commande.id_user }}</td>
              <td v-if="commande.lignes.length > 0">{{ commande.date_commande }}</td>
              <td v-if="commande.lignes.length > 0">{{ commande.total_prix }}</td>
              <td v-if="commande.lignes.length > 0"><i class="fas fa-angle-down"></i></td>
          </tr>
          <tr v-if="lignesVisibles">
            <h3>Détails de la commande</h3>
            <td colspan="5">
              <table>
                <thead>
                <tr>
                  <th>Produit</th>
                  <th>Quantité</th>
                  <th>Prix unitaire</th>
                  <th>Prix total</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="ligne in lignes" :key="ligne.id_produit">
                  <td>{{ ligne.nom }}</td>
                  <td>{{ ligne.quantite }}</td>
                  <td>{{ ligne.prix }} €</td>
                  <td>{{ ligne.prix * ligne.quantite }} €</td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script>
import PageTitre from "@/components/Admin/PageTitre.vue";
import shopService from "@/services/shop.service";
import prestataireService from "@/services/prestataire.service";
//import les getters de vuex
import { mapGetters } from 'vuex';





export default {
  name: "AdminCommande",
  components: {
    PageTitre,
  },
  data() {
    return {
      rubriques: {
        numero_commande: "Numéro de commande",
        nom_client: "Nom du client",
        prix_total: "Prix total",
      },
      loadcommandes: [],
      formatedComandesaft: {},
      lignesVisibles: false,
      lignes: [],
      id_presta: null,
    };
  },
  computed: {
    ...mapGetters(['getUserId','getPrestataireObject']),
  },
  methods: {
    async loadCommandes() {
      this.loadcommandes = await shopService.getCommandes();
      console.log("Commandes récupérées :", this.loadcommandes);

      this.formatedComandesaft = await this.formatCommandes(this.loadcommandes);

      console.log("Commandes formatées :", this.formatedComandesaft);


      },
    afficherLignes(commande) {
      this.lignesVisibles = !this.lignesVisibles;
      if (this.lignesVisibles) {
        this.lignes = commande.lignes;
      }
    },

    async formatCommandes(commandes) {
      const formatedCommandes = {};
      const id = this.getUserId;
      console.log("id prestataire", id)
      var prestataire = await prestataireService.getPrestataireObject(this.getUserId);
      console.log("prestataire obj lsdkqslkdlmqsl", prestataire)
      prestataire = prestataire[0];
      this.id_presta = prestataire.id_prestataire;

      commandes.forEach(commande => {
        const { id_commande, id_user, date_commande, id_produit, quantite, prix, nom, valide, prestataire_id } = commande;

        // Créer un nouvel objet ligne

        const ligne = {
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
            total_prix: prix * quantite
          };
        } else {
          formatedCommandes[id_commande].lignes.push(ligne);
          formatedCommandes[id_commande].total_prix += prix * quantite;
        }
      });

      //pour chaque commande suprimer les ligne qui ne sont pas du prestataire
      for (const key in formatedCommandes) {
        formatedCommandes[key].lignes = formatedCommandes[key].lignes.filter(ligne => ligne.prestataire_id === this.id_presta);
        console.log("id prestataire", this.id_presta)
      }

      // Convertir l'objet en tableau
      return Object.values(formatedCommandes);
    },
    viewCommandDetails(commande) {
      // Affichez les détails de la commande, par exemple en mettant à jour la route ou en ouvrant un modal.
      console.log("Commande sélectionnée :", commande);
    },
  },
  mounted() {
    this.loadCommandes();
  }
};

</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  }

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

tr:hover {
  background-color: #f5f5f5;
}

tr:hover td i {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}

td i {
  transform: rotate(0deg);
  transition: transform 0.3s ease;
  cursor: pointer;
}

table table {
  margin: 20px 0;
}

table table th,
table table td {
  border-bottom: none;
}

table table td {
  padding: 6px 12px;
}

</style>