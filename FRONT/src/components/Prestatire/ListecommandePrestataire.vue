<template>
  <div class="admin-commande">
    <PageTitre title="Gestion des Commandes" />
    <div>
      <table>
        <thead>
        <tr>
          <th v-for="(value, key) in rubriques" :key="key">{{ value }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in commandes" :key="index" @click="viewCommandDetails(item)">
          <td>{{ item.id_commande }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PageTitre from "@/components/Admin/PageTitre.vue";
import shopService from "@/services/shop.service";


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
      commandes: [],
    };
  },
  methods: {
    async loadCommandes() {
      this.commandes = await shopService.getCommandes();
      console.log("Commandes récupérées :", this.commandes);
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