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
              <td v-if="commande.lignes.length > 0">{{ commande.total_prix }} €</td>
              <td v-if="commande.lignes.length > 0"><i class="fas fa-angle-down"></i></td>

          </tr>

          </tbody>
        </table>

        <br v-if="lignesVisibles" />
        <div v-if="lignesVisibles">
          <h3>Détails de la commande</h3>
          <div colspan="5">
            <table>
              <thead>
              <tr>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
                <th>Prix total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="ligne in lignes" :key="ligne.id_produit">
                <td>{{ ligne.nom }}</td>
                <td>{{ ligne.quantite }}</td>
                <td>{{ ligne.prix  }} €</td>
                <td> {{getprixtot(ligne.prix , ligne.quantite)}} €</td>
                <td>{{ ligne.valide }} </td>
                <td>
                  <button class="annuler" id="annuler" v-if="ligne.valide" @click="validerligne(ligne.id_commande ,  ligne.id_produit)">
                    Annuler
                  </button>
                  <button class="valider" id="valider" v-else @click="validerligne(ligne.id_commande ,  ligne.id_produit)">
                    Valider
                  </button>

                </td>

              </tr>
              </tbody>
            </table>
          </div>
        </div>

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
      id_commande_show: null,
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

      //changer chaque commande.total_prix pour prendre juste le prix des produits du prestataire

      console.log("Commandes formatées :", this.formatedComandesaft);


      },
    afficherLignes(commande) {
      this.lignesVisibles = !this.lignesVisibles;
      if (this.lignesVisibles) {
        this.lignes = commande.lignes;
        this.id_commande_show = commande.id_commande;
      }
      else {
        this.lignes = [];
        this.id_commande_show = null;
      }
    },
    async validerligne( id_commande,id_produit) {
      const res = await shopService.updateCommandeLigne(id_commande,id_produit);
      console.log("ligne validée", res);
      console.log("id produit", id_produit);
      console.log("id commande", id_commande);
      console.log("lignes", this.lignes);
      this.lignes = this.lignes.map(ligne => {
        if (ligne.id_produit === id_produit && res) {
          ligne.valide = !ligne.valide;
        }
        return ligne;
      });

    },
    getprixtot(prix, quantite) {
      return (prix * quantite).toFixed(2);
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
        //fomater la date jj/mm/aaaa
        formatedCommandes[key].date_commande = new Date(formatedCommandes[key].date_commande).toLocaleDateString();
        //mettre les 0 devant les jours et mois < 10
        formatedCommandes[key].date_commande = formatedCommandes[key].date_commande.split('/').map((el, i) => (i < 2 && el.length < 2 ? '0' + el : el)).join('/');

      }

      for (const key in formatedCommandes) {
        formatedCommandes[key].total_prix = formatedCommandes[key].lignes.reduce((acc, ligne) => acc + ligne.prix * ligne.quantite, 0);
        // prendre que 2 chiffres après la virgule
        formatedCommandes[key].total_prix = formatedCommandes[key].total_prix.toFixed(2);
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
<style lang="scss" scoped>
$purple: #745f8f;
$dark-gray:  black;

button {
  cursor:  pointer;
  border:  solid 1px #745f8f;
  //centre
  display:  flex;
  align-items:  center;
  justify-content:  center;
  //taille
  width:  10vw;
}
.admin-commande  {
  font-family:  "DM Sans Regular";
  display:  flex;
  flex-direction:  column;
  padding:  0;
  height:  100vh;
  color:  $dark-gray;
  & h1  {
    text-align:  left;
    font-family:  "DM Sans";
    font-size:  50px;
    font-weight:  bold;
    line-height:  60px;
    margin-bottom:  20px;
  }
  table  {
    border-collapse:  collapse;
    width:  100%;
    margin-top:  20px;
    background:  rgba(255,  255,  255,  0.479);
    border-radius:  16px;
    box-shadow:  0 4px 30px rgba(0,  0,  0,  0.1);
    backdrop-filter:  blur(8.5px);
    -webkit-backdrop-filter:  blur(8.5px);
    border:  1px solid rgba(130,  23,  119,  0.43);
    overflow:  hidden;
    tr {
      transition: all 0.2s ease-in-out;
      &:hover{
        background-color:  rgba($color: #000000,  $alpha: 0.05);
        td button  {
          opacity:  1;
        }
      }
    } th,  td  {
        padding:  1rem;
        text-align:  left;
      }
    th  {
      position:  sticky;
      top:  0;
      padding:  1.5rem;
      z-index:  1;
      font-weight:  normal;
      color:  $purple;
      font-weight:  bold;
      background-color:  rgba(255,  255,  255,  0.21);
      backdrop-filter:  blur(7px);
      -webkit-backdrop-filter:  blur(7px);
    }
    td  {
      &:last-child  {
        display:  flex;
        justify-content:  flex-end;
        button  {
          font-size:  20px;
          cursor:  pointer;
          transition:  all 0.2s ease-in-out;
          opacity:  0.6;
          margin-right:  10px;
          &:hover {
            opacity:  1;
          }
        }
      } } table  {
            margin:  15px 2px;
            tr  {
              td  {
                &:last-child  {
                  button  {
                    background-color:  transparent;
                    border:  none;
                    font-size:  20px;
                    cursor:  pointer;
                    transition:  all 0.2s ease-in-out;
                    opacity:  0.6;
                    margin-right:  10px;
                    &:hover  {
                      opacity:  1;
                    }
                  }
                } } } } } .green  {
                            color:  green;
                          }
  .red  {
    color:  red;
  }
  .yellow  {
    color:  rgb(147,  107,  56);
  }
  .del  {
    background-color:  #bc0505;
    color:  #FFFFFF;
    cursor:  pointer;
    border:  none;
    border-radius:  5px;
    padding:  0.5rem 4rem;
    font-size:  16px;
    transition:  background-color 0.2s ease-in-out;
    opacity:  0.6;
    margin-top:  auto;
    margin-bottom:  auto;
  }
  .del:hover  {
    background-color:  #FFFFFF;
    color:  #bc0505;
    border:  1px solid #bc0505;
  }
  div  {
    text-align:  center;
    margin-top:  3%;
    font-size:  20px;
    color:  $dark-gray;
  }
  .input-form  {
    margin:  10px;
    padding:  10px;
    border-radius:  10px;
    border:  1px solid $purple;
    width:  90%;
    font-size:  20px;
  }
}
.modal  {
  position:  fixed;
  top:  50%;
  left:  50%;
  transform:  translate(-50%,  -50%);
  background-color:  white;
  padding:  20px;
  border-radius:  5px;
  box-shadow:  0 2px 5px rgba(0,  0,  0,  0.3);
  display:  flex;
  flex-direction:  column;
  align-items:  center;
  justify-content:  center;
  z-index:  1000;
}

.annuler  {
  border: solid;
  border-width:  2px;
  background-color:  #bc0505;
  color:  #FFFFFF;
  cursor:  pointer;
  border-radius:  5px;
  padding:  0.5rem 4rem;
  font-size:  16px;
  transition:  background-color 0.2s ease-in-out;
  opacity:  0.6;
  margin-top:  auto;
  margin-bottom:  auto;
}

.annuler:hover  {
  background-color:  #FFFFFF;
  color:  #bc0505;
  border:  1px solid #bc0505;
}

.valider  {
  background-color:  #57c896;
  color:  #FFFFFF;
  cursor:  pointer;
  border:  none;
  border-radius:  5px;
  padding:  0.5rem 4rem;
  font-size:  16px;
  transition:  background-color 0.2s ease-in-out;
  opacity:  0.6;
  margin-top:  auto;
  margin-bottom:  auto;
}

.valider:hover  {
  background-color:  #FFFFFF;
  color:  #57c896;
  border:  1px solid #57c896;
}

</style>
