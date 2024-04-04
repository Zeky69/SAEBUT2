<template>
<div>
  <div class="navbar-height"></div>
  <div class="hearder-container">
  <div class="header"> <div class="image-container"><img :src="urlImage" alt=""></div></div>
    <h1 class="header-titlte">{{nom}}</h1>
  </div>
  <div class="container-contenu">
    <div class="prestate-container">
      <prestate-component :prestate="prestataire" :mode="mode" p ref="prestate"  @change-mode="changeMode"  @valide="valide"/>
    </div>
  </div>

  <div v-if="showConfirm" class="modal">
    <div class="modal-content">
      <span class="close" @click="showConfirm= false">&times;</span>
      <p>Êtes-vous sûr de vouloir supprimer définitivement ?</p>
      <div class="group_btn">
        <button class="btn redF" @click="deleteServ">Oui</button>
        <button class="btn redP" @click="showConfirm = false">Non</button>
      </div>
    </div>
  </div>


  <div class="services" v-if="services.length > 0 && mode==='1'">


    <div class="rect" v-if="servicetoAdd.length>0">
      <page-titre :title="`Ajouter des services`"></page-titre>

      <div v-for="servT in servicetoAdd" :key="servT.id_type_service">
        <div class="rectangle">
          <p>{{servT.nom}}</p>
          <button class="accept-btn" @click="addService(servT.id_type_service)">Ajouter</button>
        </div>

      </div>
    </div>

    <page-titre :title="`Gestions des services`"></page-titre>


    <table>
      <thead>
      <tr>
        <th>Nom du service</th>
        <th>Etat</th>
        <th>Operation</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="serv in services" :key="serv.id_service">
        <td :class="{'red': !serv.etat}">{{serv.nom}}</td>

        <td>
          <template v-if="serv.etat === false">
            <button class="accept-btn" @click="updateServiceState(serv.id_service)">Activer</button>
          </template>

          <template v-else>
            <button class="reject-btn" @click="updateServiceState(serv.id_service)">Desactiver</button>
          </template>

        </td>

        <td>
          <button class="btn redF" @click="delSer(serv.id_service)">Supprimer</button>

        </td>

      </tr>
      </tbody>
    </table>
  </div>

  <div v-for="(batiment,index) in batimentPrestataire" :key="index">

    <reservationComponent
        v-if="idPrestataire !==-1"
        :id_bat="batiment.id_emplacement"
        :id_prestataire="idPrestataire.toString()"
        :mode="mode"
        :nom="batiment.nom"
        :uuidTicket="idPrestataire.toString()"
        :display="batiment.use_resa"
        @updateDisplay="updateDisplay($event)"></reservationComponent>
  </div>

  <span v-if="mode === '2'">
    <div v-if="showBoutique">
      <button class="btn tkt">Redirection vers la boutique du prestataire</button>

    </div>

    <div v-if="showCom">
      <commentaire-component v-if="idPrestataire !==-1" :disabled="this.$store.state.group_id ===3" :id_prestataire="idPrestataire"></commentaire-component>

    </div>

  </span>






  </div>
</template>

<script>
import PrestateComponent from "@/components/Prestatire/Prestate.vue";
import prestataireService, {getPrestataire, updatePage} from "@/services/prestataire.service";
import {getImage} from "@/services/image.service";
import CommentaireComponent from "@/components/Commentaire.vue";
import batService from "@/services/batiment.service";
import ReservationComponent from "@/components/reservation.vue";
import batimentService from "@/services/batiment.service";
import pageTitre from "@/components/Admin/PageTitre.vue";

export default {
  name: "MaPage",
  components: {pageTitre, ReservationComponent, CommentaireComponent, PrestateComponent},
  props: [],
  data: () => ({
    mode: '1',
    prestataire: null,
    urlImage: null,
    nom: '',
    idPrestataire: -1,
    batimentPrestataire: [],
    uuidTicket: "",
    showConfirmation: false,
    services: [],
    servicetoAdd:[],
    idServ: null,
    showConfirm: false,
    showShop: false,

  }),
  computed: {
    showCom() {
      return this.services.some(e => e.id_type_service === 1 && e.etat === true);
    },

    showBoutique() {
      return this.services.some(e => e.id_type_service === 2 && e.etat === true);
    }

  },
  created() {

  },
  mounted() {
    if (this.$store.state.group_id !== 2 && this.$route.params.id) {
      getPrestataire(this.$route.params.id).then((res) => {
        if (res && res.length !== 0) {
          this.prestataire = res[0];
          this.urlImage = getImage(this.prestataire.photo_profil);
          this.nom = this.prestataire.nom
          this.idPrestataire = parseInt(this.prestataire.id_prestataire);
          this.getInformation();

          this.recupererBatimentPrestataire();
        } else if (res && res.length === 0) {
          this.$router.push('/').catch(() => {
          });
        }
      });
    }

    if (this.$store.state.group_id === 2) {
      if (this.$store.state.prestataireObject === null) {
        this.$store.dispatch('getPrestataireObject', this.$store.state.user_id).then(
            () => {
              this.prestataire = this.$store.state.prestataireObject;
              this.nom = this.prestataire.nom;
              this.idPrestataire = parseInt(this.prestataire.id_prestataire);
              this.getInformation();

              this.urlImage = getImage(this.prestataire.photo_profil)
              this.recupererBatimentPrestataire();
            }
        )
      } else {
        this.prestataire = this.$store.state.prestataireObject;
        this.nom = this.prestataire.nom;
        this.idPrestataire = parseInt(this.prestataire.id_prestataire);
        this.getInformation();

        this.urlImage = getImage(this.prestataire.photo_profil)
        this.recupererBatimentPrestataire();
      }
      this.mode = '1';
    } else {
      this.mode = '2';
    }


  },

  methods: {
    getImage,
    changeMode(mode) {
      this.mode = mode;
    },
    valide(Page) {
      this.prestataire.page_info = Page;
      updatePage(this.prestataire).then((res) => {
        console.log(res);
      });
    },
    async recupererBatimentPrestataire() {
      try {
        let response = await batService.getBatByIdPrestataire(this.idPrestataire)
        if (response.error) {
          console.log("Erreur lors de la récupération des batiments");
        } else {
          this.batimentPrestataire = response;
        }
      } catch (e) {
        console.error("An error occurred:", e);
      }
    },
    async addService(id_type){
      try {
        let response = await prestataireService.addService(this.idPrestataire,id_type)
        if (response.error) {
          console.log("Erreur lors de l'ajout service");
        } else {
          console.log("Ajout service");
          this.getInformation();
        }
      } catch (e) {
        console.error("An error occurred:", e);
      }

    },
    async deleteServ() {
      try {
        const response = await prestataireService.deleteServ(this.idServ, this.idPrestataire);
        this.showConfirm =false;
        this.services = await prestataireService.getPrestatairesServices(this.idPrestataire)
        this.servicetoAdd = await prestataireService.getPrestatairesNoServices(this.idPrestataire)
        console.log('Suppression réussie:', response);
      } catch (error) {
        console.error("Erreur lors de la suppression du prestataire:", error);
      }
      this.showConfirmation = false;
    },
    async updateServiceState(id){
      try {
        let response = await prestataireService.updateServiceState(id)
        if (response.error) {
          console.log("Erreur lors de la mise à jour des services");
        } else {
          this.services = await prestataireService.getPrestatairesServices(this.idPrestataire)
          console.log("Mise à jour de l'affichage");
        }
      } catch (e) {
        console.error("An error occurred:", e);
      }

    },
    async updateDisplay(id_bat) {
      try {
        let response = await batService.updateDisplay({"id_bat": id_bat})
        if (response.error) {
          console.log("Erreur lors de la mise à jour de l'affichage");
        } else {
          console.log("Mise à jour de l'affichage");
        }
      } catch (e) {
        console.error("An error occurred:", e);
      }
    },
    async getInformation() {
      this.services = await prestataireService.getPrestatairesServices(this.idPrestataire)
      this.servicetoAdd = await prestataireService.getPrestatairesNoServices(this.idPrestataire)
    },
    delSer(id) {
      this.idServ = id;
      this.showConfirm = true;

    }, async updateServ(id) {
      try {
        let response = await batimentService.updateDisplay({"id_bat": id})
        if (response.error) {
          console.log("Erreur lors de la mise à jour de l'affichage");
        } else {
          this.emplacements = await batimentService.getBatByIdPrestataire(this.idPrestataire)
          console.log("Mise à jour de l'affichage");
        }
      } catch (e) {
        console.error("An error occurred:", e);
      }
    }
  }
}

</script>
<style scoped>
.navbar-height{
  height: 180px;
  width: 100%;
  background-color: #212121;

}

.image-container img {
  position: relative;
  width: 100%;
  object-fit: cover;
  border-radius: 100%;
  aspect-ratio: 1/1;
  border: rgba(77, 82, 166, 0.81) solid 10px;
  z-index: 2;
}
.image-container {
  width: 15%;
  min-width: 200px;
  border-radius: 50% ;
  aspect-ratio: 1/1;
}

.btn.tkt{
  background-color: #0d45a5;
  margin: 2%;
}

.rectangle{
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.479);
  border: 2px solid rgba(77, 82, 166, 0.87);;
  font-size: 20px;
  margin-top: 1%;
  padding: 3%;
  border-radius: 20px;
}

.header{
  width: 100%;
  height: fit-content;
  background: linear-gradient(to bottom, #212121 50%, rgba(0, 0, 0, 0) 50%);  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;
}

.header::after{
  content: "";

  display: inline-block;
  position: absolute;
  background-color: rgba(77, 82, 166, 0.87);
  z-index: 1;
  left: 0;
  width: 100vw;
  height: 20px;
}

.header-titlte{
  color: #606060;
  font-family: "DM Sans", Syne, Helvetica, sans-serif;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 0;
  text-align: center;
  margin-bottom: 50px;
}

.rect{
margin: 5% 0;
}

.prestate-container{
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 50px;
}
.container-contenu{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}


.services{
  margin: 4%;
}

.btn.redP{
  background-color: #FFFFFF;
  color: rgb(255, 0, 0);;
  border: 1px solid rgb(255, 0, 0);;
}


.red{
  color : rgb(142, 58, 58);
}

.modal {
  z-index: 1000;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.close {
  float: right;
  cursor: pointer;
}

.btn{
  color: #FFFFFF;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: auto;
  border-radius: 10px;
  padding: 0.5rem 4rem;
  font-size: 16px;

}

.btn.redF{
  background-color: rgb(255, 0, 0);
  border: 1px solid rgb(255, 0, 0);

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
      background-color: rgba(255,255,255);

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
    box-shadow: 0 2px 2px rgba(0,0,0);
    z-index: 1;
    font-weight: normal;
    color: #745f8f;
    font-weight: bold;

  }



  table:first-of-type {
    margin: 15px 2px;
  }

  table:last-of-type {
    margin: 15px 2px;
  }
}

.accept-btn {
  background-color: #745f8f;
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

  border-color: rgb(65, 147, 65);
  color: rgb(65, 147, 65);

  padding: 0.5rem 4rem;
  font-size: 16px;

  &:hover {
    background-color: rgb(67, 152, 70);
    color: white;
  }
}

.reject-btn {
  background-color: $purple;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  opacity: 0.6;
  margin-top: 5%;
  margin-bottom: auto;
  background: rgba(255, 255, 255, 0.23);
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border: 1px solid rgba(116, 116, 116, 0.43);

  border-color: rgb(142, 58, 58);
  color: rgb(142, 58, 58);

  padding: 0.5rem 4rem;
  font-size: 16px;

  &:hover {
    background-color: rgb(173, 84, 84);
    color: white;
    transition: color 0.2s ease-in-out;
  }
}




</style>