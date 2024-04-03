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
          <td>{{ item.numero_commande }}</td>
          <td>{{ item.nom_client }}</td>
          <td>{{ item.prix_total }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import adminService from "@/services/admin.service";
import PageTitre from "@/components/Admin/PageTitre.vue";

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
    fetchCommandes() {
      adminService.getCommandes().then((response) => {
        this.commandes = response.data;
      });
    },
    viewCommandDetails(commande) {
      // Affichez les détails de la commande, par exemple en mettant à jour la route ou en ouvrant un modal.
      console.log("Commande sélectionnée :", commande);
    },
  },
  mounted() {
    this.fetchCommandes();
  },
};
</script>