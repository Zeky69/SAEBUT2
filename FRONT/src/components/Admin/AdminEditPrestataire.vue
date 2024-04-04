<template>
  <div class="editPresta">

    <page-titre :title="`Modification des information de  ${nomPresta}`"></page-titre>
    <div class="group_btn">
      <a class="btn redz" @click="showConfirmation=true">Supprimer définitivement {{nomPresta}} </a>
    </div>

    <div v-if="showConfirmation" class="modal">
      <div class="modal-content">
        <span class="close" @click="showConfirmation = false">&times;</span>
        <p>Êtes-vous sûr de vouloir supprimer définitivement {{nomPresta}} ?</p>
        <div class="group_btn">
          <button class="btn redF" @click="deletePresta">Oui</button>
          <button class="btn redP" @click="showConfirmation = false">Non</button>
        </div>
      </div>
    </div>

    <div v-if="showConfirm2" class="modal">
      <div class="modal-content">
        <span class="close" @click="showConfirmation = false">&times;</span>
        <p>Êtes-vous sûr de vouloir supprimer définitivement {{nomPresta}} ?</p>
        <div class="group_btn">
          <button class="btn redF" @click="deleteServ">Oui</button>
          <button class="btn redP" @click="showConfirmation = false">Non</button>
        </div>
      </div>
    </div>


    <div class="comp">

      <edit-components :user_id="idUser"></edit-components>


      <div class="services" v-if="emplacements.length > 0">
        <page-titre :title="`Gestions du service reservation pour ${nomPresta}`"></page-titre>
        <table>
          <thead>
          <tr>
            <th>Nom du service</th>
            <th>Description</th>
            <th>Etat</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="emplacement in emplacements" :key="emplacement.id_emplacement">
            <td :class="{'red': !emplacement.use_resa}">{{emplacement.nom}}</td>
            <td :class="{'red': !emplacement.use_resa}">{{emplacement.description}}</td>

            <td>
              <template v-if="emplacement.use_resa === false">
                <button class="accept-btn" @click="updateServ(emplacement.id_emplacement)">Activer</button>
              </template>

              <template v-else>
                <button class="reject-btn" @click="updateServ(emplacement.id_emplacement)">Desactiver</button>
              </template>

            </td>

          </tr>
          </tbody>
        </table>
      </div>

      <div class="services" v-if="services.length > 0">
        <page-titre :title="`Gestions des services pour ${nomPresta}`"></page-titre>
        <table>
          <thead>
          <tr>
            <th>Nom du service</th>
            <th>Etat</th>
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


      <page-titre :title="`Modification de la page de ${nomPresta}`"></page-titre>
      <prestate :prestate="prestataire" :mode="mode" p ref="prestate"  @change-mode="changeMode"  @valide="valide"></prestate>
    </div>
  </div>
</template>

<script>
import pageTitre from "@/components/Admin/PageTitre.vue";
import editComponents from "@/components/Prestatire/EditComponents.vue";
import prestate from "@/components/Prestatire/Prestate.vue";
import {mapActions, mapState} from "vuex";
import {updatePage} from "@/services/prestataire.service";
import batimentService from "@/services/batiment.service";
import adminService from "@/services/admin.service";
import prestataireService from "@/services/prestataire.service";
export default {
  name: "AdminEditPresta",
  components:{
    pageTitre,
    editComponents,
    prestate
  },
  data() {
    return {
      idUser: null,
      idPrestataire:null,
      prestataire: null,
      nomPresta: null,
      mode: '1',
      showConfirmation: false,
      emplacements: [],
      services: [],
      idServ:null,
      showConfirm2:false
    };
  },
  created() {
    this.idUser = this.$route.params.idprestataire;
    this.getInformation()

  },computed   :{
    ...mapState(['prestataireObject']),
  }
,methods:{
    ...mapActions(['getPrestataireObject']),
    async deletePresta() {
      try {
        const response = await adminService.deletePresta(this.idUser, this.idPrestataire);
        console.log('Suppression réussie:', response);
        this.$router.push('/admin/prestataires');
      } catch (error) {
        console.error("Erreur lors de la suppression du prestataire:", error);
      }
      this.showConfirmation = false;
    },   async deleteServ() {
      try {
        console.log(this.idServ)
        const response = await prestataireService.deleteServ(this.idServ, this.idPrestataire);
        this.showConfirm2 =false;
        this.services = await prestataireService.getPrestatairesServices(this.idPrestataire)

        console.log('Suppression réussie:', response);
      } catch (error) {
        console.error("Erreur lors de la suppression du prestataire:", error);
      }
      this.showConfirmation = false;
    },
    changeMode(mode){
      this.mode = mode;
    },
    valide(Page){
      this.prestataire.page_info = Page;
      updatePage( this.prestataire).then((res) => {
        console.log(res);
      });
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

    },delSer(id){
      this.idServ= id;
      this.showConfirm2=true;

    },

    async getInformation() {
      await this.getPrestataireObject(this.idUser);
      this.prestataire = this.prestataireObject;
      this.nomPresta =this.prestataire.nom;
      this.idPrestataire = this.prestataire.id_prestataire;

      this.emplacements = await batimentService.getBatByIdPrestataire(this.idPrestataire)
      this.services = await prestataireService.getPrestatairesServices(this.idPrestataire)

      console.log(this.emplacements)
    }, async updateServ(id){
      try {
        let response = await batimentService.updateDisplay({"id_bat":id})
        if (response.error) {
          console.log("Erreur lors de la mise à jour de l'affichage");
        } else {
          this.emplacements = await batimentService.getBatByIdPrestataire(this.idPrestataire)
          console.log("Mise à jour de l'affichage");
        }
      } catch (e) {
        console.error("An error occurred:", e);
      }

    },

  }
}
</script>

<style lang="scss" scoped >
$purple: #745f8f;
$dark-gray: black;


.editPresta{
  display: flex;
  flex-direction: column;
  padding: 3% 6%;
}

.group_btn{
  margin: 1%;
  display: flex;
  justify-content: space-between;
}

.btn{
  color: #FFFFFF;
  font-size: 16px;
  cursor: pointer;
  margin-top: 5%;
  margin-bottom: auto;
  border-radius: 10px;
  padding: 0.5rem 4rem;
  font-size: 16px;

}

.btn.redz{
  background-color: rgb(228, 0, 0);

}

.btn.redF{
  background-color: rgb(255, 0, 0);
  border: 1px solid rgb(255, 0, 0);

}

.btn.redP{
  background-color: #FFFFFF;
  color: rgb(255, 0, 0);;
  border: 1px solid rgb(255, 0, 0);;
}

.btn.redz:hover{
  background-color: $purple;


}

.del{
  background-color: #bc0505;
  color: #FFFFFF;
  cursor: pointer;
}

.del:hover{
  background-color: #FFFFFF;
  color: #bc0505;
  border : 1px solid #bc0505;
}

.services{
  margin-bottom: 4%;
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

.accept-btn {
  background-color: $purple;
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
