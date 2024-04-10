<template>
  <div class="crud-boutique">
    <PageTitre title="Gestion des Articles" />
    <div>
      <h2>Liste des Articles</h2>
      <button class="edit-btn" @click="afficherFormulaireAjout">Ajouter un article</button>
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
            <button  class="edit-btn" @click="afficherFormulaireModification(article)">Modifier</button>
            <button class="del"  @click="supprimerArticle(article.id_produit)">Supprimer</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <dialog ref="modal" v-if="formulaireVisible"  class="modal" v-click-outside="annulerFormulaire">
      <h2 v-if="modification">Modifier un article</h2>
      <h2 v-else>Ajouter un article</h2>
      <form @submit.prevent="modification ? modifierArticle() : ajouterArticle()">
        <input class="input-form" v-if="modification" type="number" id="id_produit" v-model="id_produit" hidden>
        <label for="nom">Nom :</label>
        <input class="input-form" type="text" id="nom" v-model="article.nom" required>
          <label for="images" class="drop-container" id="dropcontainer">
          <input type="file" @change="onFileSelected" id="images" accept="image/*" ref="imageInput" enctype="multipart/form-data"/>

        </label>
        <label for="categorie">Categorie :</label>
        <select v-model="article.categorie_id" required>
          <option v-for="categorie in categories" :key="categorie.id_categorie" :value="categorie.id_categorie">{{ categorie.libelle_categorie }}</option>
        </select>
      <br>
        <label for="prix">Prix :</label>
        <input class="input-form" type="decimal" id="prix" v-model.number="article.prix" required>
        <br>
        <label for="stock">Stock :</label>
        <input class="input-form" type="number" id="stock" v-model.number="article.stock" required>
        <input type="number" id="id_presta" v-model="id_prestataire" hidden>
        <br>
        <button class="del" type="button" @click="annulerFormulaire">Annuler</button>
        <button class="valid-btn" type="submit">{{ modification ? "Modifier" : "Ajouter" }}</button>
      </form>
    </dialog>
  </div>
</template>


<script>

import shopService from "@/services/shop.service";
import PageTitre from "@/components/Admin/PageTitre.vue";
import prestataireService from "@/services/prestataire.service";
import { uploadImage } from "@/services/image.service"

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
      file: null,
      prix: null,
      stock: 0,
      photo: "",
      photoname: "",
      photoDeProfilChoisi: "",
      article: {
        id_produit: this.id_produit,
        nom: "",
        photo: this.photo,
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
      this.articles = this.articles.filter(article => article.prestataire_id === this.id_prestataire);
    },
    async chargerCategories() {
      this.categories = await shopService.getAllCategorie();
    },
    getNomCategorie(categorieId) {
      const categorie = this.categories.find((categorie) => categorie.id_categorie === categorieId);
      return categorie ? categorie.libelle_categorie : '';
    },
    afficherFormulaireAjout() {
      this.ouvrirModal();
      this.modification = false;
      this.article = {
        id_produit: null,
        nom: "",
        photo: "",
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

      try {
        if(this.file){
          console.log("file",this.file)
          await uploadImage(this.file);
        }
        this.accept();
      } catch (error) {
        console.error("Une erreur est survenue lors du changement d'image:", error.message);
      }

      this.article.photo = this.photoname;

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
    onFileSelected(eve) {
      console.log("eve",eve)
      this.file = eve.target.files[0];
      this.photoname = this.file.name;
      this.photoDeProfilChoisi = URL.createObjectURL(this.file);
    },
    annulerFormulaire() {
      this.formulaireVisible = false;
      this.modification = false;
      this.article = {
        id: null,
        nom: "",
        photo: "",
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

    },
    ouvrirModal() {
      this.formulaireVisible = true;
      this.$nextTick(() => {
        this.$refs.modal.showModal();
      });
    }
  },
  created() {
    this.getidpresta();
    this.chargerArticles();
    this.chargerCategories();
  }
};


</script>


<style lang="scss" scoped >


$purple: #745f8f;
$dark-gray: black;

.crud-boutique {
  font-family: "DM Sans Regular";
  display: flex;
  flex-direction: column;
  padding: 0;
  height: 100vh;
  color: $dark-gray;

  & h1 {
    text-align: left;
    font-family: "DM Sans";
    font-size: 50px;
    font-weight: bold;
    line-height: 60px;
  }

  label {
    font-size: 20px;
    font-weight: bold;
    margin-right: 1em;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    background: rgba(255, 255, 255, 0.21);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7px);
    -webkit-backdrop-filter: blur(7px);
    border: 1px solid rgba(255, 255, 255, 0.31);
    cursor: pointer;
    padding: 0.5rem;
    font-size: inherit;
    border-radius: 4px;
    text-align: center;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: rgba(255, 255, 255, 0.31);
    }
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 20px;
    background: rgba(255, 255, 255, 0.479);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8.5px);
    -webkit-backdrop-filter: blur(8.5px);
    border: 1px solid rgba(130, 23, 119, 0.43);
    overflow: hidden;

    tr {
      transition: all 0.2s ease-in-out;

      &:hover {
        background-color: rgba($color: #000000, $alpha: 0.05);

        td button {
          opacity: 1;
        }
      }
    }

    th,
    td {
      padding: 1rem;
      text-align: left;
    }

    th {
      position: sticky;
      top: 0;
      padding: 1.5rem;
      box-shadow: 0 2px 2px rgba(#000000, 0.1);
      z-index: 1;
      font-weight: normal;
      color: $purple;
      font-weight: bold;

    }



    table:first-of-type {
      margin: 15px 2px;
    }

    table:last-of-type {
      margin: 15px 2px;
    }
  }

  .green {
    color: green;
  }

  .red {
    color: red;
  }

  .yellow {
    color: rgb(147, 107, 56);
  }

  .del{
  background-color: #bc0505;
  color: #FFFFFF;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 4rem;
  font-size: 16px;
  transition: background-color 0.2s ease-in-out;
  opacity: 0.6;
  margin-top: auto;
  margin-bottom: auto;
  }

  .del:hover{
    background-color: #FFFFFF;
    color: #bc0505;
    border : 1px solid #bc0505;
  }

  

  .edit-btn {
    background-color: $purple;
    padding: 0.5rem 5rem;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    opacity: 0.6;
    margin-top: auto;
    margin-bottom: auto;
    background: rgba(255, 255, 255, 0.23);
    border-radius: 10px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8.5px);
    -webkit-backdrop-filter: blur(8.5px);
    border: 1px solid rgba(116, 116, 116, 0.43);

    &:hover {
      background-color: white;
    }
  }

  div {
    text-align: center;
    margin-top: 3%;
    font-size: 20px;
    color: $dark-gray;
  }


  .valid-btn {
    background-color: rgb(57, 200, 150);
    color: white;
    padding: 0.5rem 5rem;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    opacity: 0.6;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 10px;
    border-radius: 10px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8.5px);
    -webkit-backdrop-filter: blur(8.5px);
    border: 1px solid rgba(116, 116, 116, 0.43);

    &:hover {
      background-color: white;
    }
  }

  .input-form {
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid $purple;
    width: 90%;
    font-size: 20px;
  }
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

</style>
