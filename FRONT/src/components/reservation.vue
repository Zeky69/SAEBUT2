<template>
  <div class="main">
    <div class="reservation">
    <h1>Reservations</h1>
    <ul>
      <li v-for="(reservation, indexResa) in reservations" :key="indexResa">
        {{reservation.id_reservation}} - {{reservation.id_emplacement}} - {{reservation.ouverture}} - {{reservation.duree}} min <button @click="deleteResaClicked(reservation.id_reservation)">Annuler</button>
      </li>
    </ul>
    </div>
    <div class="diponibilite">
      <h1>Disponibilités</h1>
      <ul>
        <li v-for="dispo in disponibilites" :key="dispo.id_reservation">
          {{dispo.id_reservation}} - {{dispo.id_emplacement}} - {{dispo.ouverture}} - {{dispo.duree}} min <button @click="reserverDate(dispo.id_reservation)">Reserver</button> <button @click="deleteDispoClicked(dispo.id_reservation)">Supprimer</button>
        </li>
      <li> Créer une disponibilité:
        <form @submit="checkForm">
          <div>
            <label for="newDispo">Choisir le début: </label>
            <input
                id="newDispo"
                type="datetime-local"
                name="newDispo"
                v-model="newDispoDate"
                min="2024-06-01T08:30"
                max="2024-06-4T23:30"
                required />
            <span class="validity"></span>
            <label for="appt">Choisir la durée: </label>
            <input
                type="time"
                name="appt"
                v-model="newDispoDuree"
                min="00:00"
                required />
            <span class="validity"></span>
          </div>
          <div>
            <input type="submit" value="Ajouter" @click="checkForm" />
          </div>
        </form>

      </li>
    </ul>
    </div>
  </div>

</template>

<script>
import {defineComponent} from "vue";
import RestauService from "@/services/reservation";

export default defineComponent({
  name: "reservationComponent",
  props: {
    id_emp: String,
    user_id: String,
  },
  data : () => ({
      newDispoDate: "2024-06-01T08:30",
      newDispoDuree: "00:15",
      disponibilites: [],
      reservations: [],
  }),
  computed: {
    isRestaurateur() { //TODO implement this
      try{
        let response = RestauService.getAuth(this.id_emp,this.user_id)
        if(!response.error){
          return response.data;
        }else{
          console.log("Erreur lors de la vérification de l'authentification");
        }
      }catch (e){
        console.error("An error occurred:", e);
      }
      return false;
    },
  },

  methods: {
    async deleteDispoClicked(id) {
      try {
        let response = await RestauService.deleteDispo({"id_dispo":id})
        if (response.error) {
          console.log("Erreur lors de la suppression d'une disponibilité");
        } else {
          this.getDisponibilite()
        }
      } catch (e) {
        console.error("An error occurred:", e);
      }
    },
    async deleteResaClicked(id) {
      try {
        let response = await RestauService.deleteResa({"id_resa":id})
        if (response.error) {
          console.log("Erreur lors de l'annulation' d'une reservation");
        } else {
          this.getReservation()
          this.getDisponibilite()
        }
      } catch (e) {
        console.error("An error occurred:", e);
      }
    },
    async getDisponibilite(){
      try{
        let response = await RestauService.getAllDispoById(this.id_emp)
        if(!response.error){
          console.log(response)
          this.disponibilites = response;
        }else{
          console.log("Erreur lors de la récupération des disponibilités");
        }
      }catch (e){
        console.error("An error occurred:", e);
      }
    },
    async getReservation() {
      try {
        let response = await RestauService.getAllResaById(this.user_id,this.id_emp)
        if (!response.error) {
          this.reservations = response;
        } else {
          console.log("Erreur lors de la récupération des réservations");
        }
      } catch (e) {
        console.error("An error occurred:", e);
      }
    },
    async checkForm() {
      try {
        //TO DO: check input and check authentication
        console.log(this.newDispoDate)
        console.log(this.newDispoDuree)
        let response = await RestauService.postDispo({"date":this.newDispoDate, "id_emp":this.id_emp, "duree":this.newDispoDuree})
        if (response.error) {
          console.log("Erreur lors de la création des disponibilités");
        } else {
          this.getDisponibilite()
        }
      } catch (e) {
        console.error("An error occurred:", e);
      }
    },

    async reserverDate(id_dispo){
        try {
          let response = await RestauService.postResa({"id_dispo":id_dispo,"id_client":this.user_id})
          if (response.error) {
            console.log("Erreur lors de la réservation d'une disponibilité");
          } else {
            this.getReservation()
            this.getDisponibilite()
          }
        } catch (e) {
          console.error("An error occurred:", e);
        }
    },

  },
  mounted() {
    this.getDisponibilite()
    this.getReservation()
  }
})
</script>

<style>

.main {
  margin: 150px;
  padding: 20px;
  border-radius: 34px;
  background: #cbbdbf;
  color: #553c65;
  box-shadow:  5px 5px 10px #cccccc,
  -5px -5px 10px #f4f4f4;
}

.reservation {
  padding: 20px 50px;
  border-radius: 34px 34px 0px 0px;
}

.diponibilite {
  padding: 20px 50px;
}

button {
  background-color: #2c3e50;
  padding: 10px 20px;
  width: fit-content;
  height: fit-content;
  border-radius: 10px;
  color: white;
}

label {
  display: inline-block;
  width: 300px;
}

input:invalid + span:after {
  content: "✖";
  padding-left: 5px;
}

input:valid + span:after {
  content: "✓";
  padding-left: 5px;
}

ul {
  list-style-type: none;
}

ul li {
  background-color: #897a8e;
  color : #2c3e50;
  padding: 5px;
  border : #1b1b1b solid 1px;
  border-radius: 10px;
}

</style>