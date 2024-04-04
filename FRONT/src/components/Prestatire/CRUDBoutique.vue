<template>
  <div class="crud-boutique">
    <PageTitre title="Gestion des Articles" />
    <div>
      <h2>Liste des Articles</h2>
      <button @click="afficherFormulaireAjout">Ajouter un Article</button>
      <table>
        <thead>
        <tr>
          <th>Nom</th>
          <th>Categorie</th>
          <th>Stock</th>
          <th>Prix</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="article in articles" :key="article.id_produit">
          <td>{{ article.nom }}</td>
          <td>{{ getNomCategorie(article.categorie_id) }}</td>
          <td>{{ article.stock }}</td>
          <td>{{ article.prix }}</td>

          <td>
            <button @click="afficherFormulaireModification(article)">Modifier</button>
            <button @click="supprimerArticle(article.id_produit)">Supprimer</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-if="formulaireVisible">
      <h2 v-if="modification">Modifier un Article</h2>
      <h2 v-else>Ajouter un Article</h2>
      <form @submit.prevent="modification ? modifierArticle() : ajouterArticle()">
        <input v-if="modification" type="number" id="id_produit" v-model="id_produit" hidden>
        <label for="nom">Nom :</label>
        <input type="text" id="nom" v-model="article.nom" required>
        <select v-model="article.categorie_id" required>
          <option v-for="categorie in categories" :key="categorie.id_categorie" :value="categorie.id_categorie">{{ categorie.libelle_categorie }}</option>
        </select>
        <label for="prix">Prix :</label>
        <input type="number" id="prix" v-model.number="article.prix" required>
        <label for="stock">Stock :</label>
        <input type="number" id="stock" v-model.number="article.stock" required>
        <input type="number" id="id_presta" v-model="id_prestataire" hidden>
        <button type="submit">{{ modification ? "Modifier" : "Ajouter" }}</button>
        <button type="button" @click="annulerFormulaire">Annuler</button>
      </form>
    </div>
  </div>
</template>


<script>

import shopService from "@/services/shop.service";
import PageTitre from "@/components/Admin/PageTitre.vue";
import prestataireService from "@/services/prestataire.service";

import { mapGetters } from 'vuex';



export default {
  name: "CRUDBoutique",
  components: {
    PageTitre,
  },
  data() {
    return {
      articles: [],
      categories: [],
      formulaireVisible: false,
      modification: false,
      id_prestataire: null,
      id_produit: null,
      prix: null,
      stock: 0,
      article: {
        id_produit: this.id_produit,
        nom: "",
        categorie_id: 1,
        prix: this.prix,
        stock: this.stock,
        id_prestataire : this.id_prestataire
      },
    };
  },
  computed:{
    ...mapGetters(['getUserId','getPrestataireObject']),
    nomcat(id_cat){
      return this.categories.find(cat => cat.id_categorie === id_cat).libelle_categorie;
    }
  },
  methods: {
    async chargerArticles() {
      this.articles = await shopService.getArticles();
    },
    async chargerCategories() {
      this.categories = await shopService.getAllCategorie();
    },
    getNomCategorie(categorieId) {
      const categorie = this.categories.find((categorie) => categorie.id_categorie === categorieId);
      return categorie ? categorie.libelle_categorie : '';
    },
    afficherFormulaireAjout() {
      this.formulaireVisible = true;
      this.modification = false;
      this.article = {
        id_produit: null,
        nom: "",
        categorie_id: 1,
        prix: null,
        stock: 0,
        id_prestataire: this.id_prestataire
      };
    },
    afficherFormulaireModification(article) {
      this.formulaireVisible = true;
      this.modification = true;
      console.log("article",article)
      this.article = { ...article };
    },
    async ajouterArticle() {

      this.articles.id_prestataire = await this.getidpresta();
      console.log("article front",this.article)
      await shopService.addArticle(this.article);
      this.chargerArticles();
      this.annulerFormulaire();
    },
    async modifierArticle() {

      console.log("articl modifiiiie front",this.article)
      this.articles.id_prestataire = await this.getidpresta();
      await shopService.modifyArticle(this.article.id_produit, this.article);
      this.chargerArticles();
      this
          .annulerFormulaire();
    },
    async supprimerArticle(id) {
      await shopService.deleteArticle(id);
      this.chargerArticles();
    },
    annulerFormulaire() {
      this.formulaireVisible = false;
      this.modification = false;
      this.article = {
        id: null,
        nom: "",
        categorie_id: 1,
        prix: null,
        stock: 0,
        id_prestataire: this.id_prestataire
      };
    },
    async getidpresta(){
      let id = await prestataireService.getPrestataireObject(this.getUserId);
      let prestataire = id[0];
      console.log("prestsc,mlckqsmlcklqs;cmlqscmllataire",prestataire.id_prestataire)
      this.id_prestataire = prestataire.id_prestataire;

    }
  },
  mounted() {
    this.chargerArticles();
    this.chargerCategories();
    this.getidpresta();
  },
};


</script>