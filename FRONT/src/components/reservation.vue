<template>
  <div class="main" v-if="mode==='1' || (mode==='2' && display)">
    <div class="reservation">
      <h1 class="highlighted-title">{{this.nom}}</h1>
      <div v-if="mode==='1'">
        <div class="custom-checkbox">
          <input id="display" type="checkbox" :checked="display" @click="$emit('updateDisplay', id_bat)">
          <label for="display">Utiliser les réservations ?</label>
        </div>

        <h2>Reservations</h2>
        <ul v-if="reservations.length !== 0">
          <li v-for="(reservation, indexResa) in reservations" :key="indexResa">
            {{reservation.ouverture}} - {{reservation.duree}} min | quantite : {{reservation.amount}}<button @click="deleteResaClicked(reservation.id_reservation)">Annuler</button>
          </li>
        </ul>
        <span v-else> Vous n'avez aucune réservation ici</span>
      </div>

    </div>

    <div class="diponibilite">
      <h2>Disponibilités</h2>
      <span id="resultatResa">
      </span>
      <ul v-if="disponibilites.length !== 0">
        <li v-for="(dispo,indexDispo) in disponibilites" :key="indexDispo">
          {{dispo.ouverture}} - {{dispo.duree}} min | quantite : {{dispo.amount}}<button v-if="mode==='2'" @click="reserverDate(dispo.id_reservation)">Reserver</button> <button v-if="mode==='1'" @click="deleteDispoClicked(dispo.id_reservation)">Supprimer</button>
        </li>
      </ul>
      <span v-else> Il n'y a pas de disponibilités !</span>
      <div v-if="mode==='1'"> Créer une disponibilité:
        <div>
          <div>
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
            </div>
            <div>
              <label for="appt">Choisir la durée: </label>
              <input
                  type="time"
                  name="appt"
                  v-model="newDispoDuree"
                  min="00:00"
                  required />
              <span class="validity"></span>
            </div>
          </div>
          <div>
            <input type="submit" value="Ajouter" @click="checkForm" />
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import {defineComponent} from "vue";
import RestauService from "@/services/reservation";
import {mapState} from "vuex";

export default defineComponent({
  name: "reservationComponent",
  props: {
    id_bat: String,
    id_prestataire: Number,
    mode: String,
    nom:String,
    uuidTicket: String,
    display: Boolean
  },
  data : () => ({
      ...mapState(["user_id"]),
      newDispoDate: "2024-06-01T08:30",
      newDispoDuree: "00:15",
      disponibilites: [],
      reservations: [],
  }),
  computed: {
  },

  methods: {
    async deleteDispoClicked(id) {
      try {
        let response = await RestauService.deleteDispo({"id_dispo":id})
        if (response.error) {
          console.log("Erreur lors de la suppression d'une disponibilité");
        } else {
          await this.getDisponibilite()
        }
      } catch (e) {
        console.error("An error occurred:", e);
      }
    },
    async deleteResaClicked(id) {
      try {
        let response = await RestauService.deleteResa({"id_resa":id})
        if (response.error) {
          console.log("Erreur lors de l'annulation d'une reservation");
        } else {
          await this.getReservation()
          await this.getDisponibilite()
        }
      } catch (e) {
        console.error("An error occurred:", e);
      }
    },
    async getDisponibilite(){
      try{
        let response = await RestauService.getAllDispoById(this.id_bat)
        if(!response.error){
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
        let response = await RestauService.getAllResaById(this.id_bat)
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
        let response = await RestauService.postDispo({"date":this.newDispoDate, "id_bat":this.id_bat, "duree":this.newDispoDuree, "id_prestataire":this.id_prestataire})
        if (response.error) {
          console.log("Erreur lors de la création des disponibilités");
        } else {
          await this.getDisponibilite()
        }
      } catch (e) {
        console.error("An error occurred:", e);
      }
    },

    async reserverDate(id_dispo){
      let message = document.getElementById("resultatResa")
      if (this.uuidTicket===""){
        message.innerHTML = "Veuillez indiquer l'identifiant de votre billet pour réserver"
        message.style.color = "red"
      } else {
        try {
          let response = await RestauService.postResa({"id_dispo": id_dispo, "id_client": this.uuidTicket})
          if (response.error) {
            message.innerHTML = "Erreur,  l'identifiant du billet fournit est invalide"
            message.style.color = "red"
            console.log("Erreur lors de la réservation d'une disponibilité");
          } else {
            await this.getReservation()
            await this.getDisponibilite()
            message.innerHTML = "Reservation effectuée, veuillez vérifiez votre adresse mail."
            message.style.color = "green"
          }
        } catch (e) {
          console.error("An error occurred:", e);
        }
      }
    },

  },
  mounted() {
    this.getDisponibilite()
    this.getReservation()
  }
})
</script>

<style scoped>

.main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 80%;
  margin: auto;
  padding: 20px 50px;
  border-radius: 34px;
  background: rgba(255, 255, 255, 0.6);
  color: #553c65;
  box-shadow:  5px 5px 10px rgba(255, 255, 255, 0.3),
  -5px -5px 10px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  margin-bottom: 5%;
}

.reservation {
  grid-column: 1 / span 2;
  padding: 20px 50px;
  border-radius: 34px 34px 0px 0px;
}

.diponibilite {
  grid-column: 1 / span 3;
  padding: 20px 50px;
}

button, input[type=button], input[type=submit], input[type=reset] {
  background-color: #2c3e50;
  padding: 10px 20px;
  width: fit-content;
  height: fit-content;
  border-radius: 10px;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover, input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover {
  background-color: #3a536c;
}

input[type=datetime-local], input[type=time] {
  border-radius: 10px;
  padding: 5px;
  border: #1b1b1b solid 1px;
  background-color: rgba(255, 255, 255, 0.25);
  color: #553c65;
  box-shadow:  5px 5px 10px rgba(255, 255, 255, 0.3),
  -5px -5px 10px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
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
  background-color: rgba(255, 255, 255, 0.25);
  color : #2c3e50;
  padding: 5px;
  border : #1b1b1b solid 1px;
  border-radius: 10px;
  box-shadow:  5px 5px 10px rgba(255, 255, 255, 0.3),
  -5px -5px 10px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.custom-checkbox {
  background-color: transparent;
  display: inline-block;
  position: relative;
  cursor: pointer;
}

.custom-checkbox input[type="checkbox"] {
  opacity: 0;
  position: absolute;
  z-index: -1;
  cursor: pointer;
  
}

.custom-checkbox label {
  display: inline-block;
  padding: 10px 20px;
  background: transparent;
  color: #845497;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  /** outline and only outline with the same color as the text */
  outline: 1px solid #845497;
}

.custom-checkbox input[type="checkbox"]:checked + label {
  background-color: #845497;
  color: white;
  cursor: pointer;
}

.highlighted-title {
  color: #2c3e50;
  font-weight: bold;
}


</style>