<template>
  <div class="main" v-if="mode==='1' || (mode==='2' && display)">
    <div class="reservation" >
    <h1>{{this.nom}}</h1>
      <div v-if="mode==='1'">
        <label for="display" >Utiliser les réservations ?</label>
        <input id="display" type="checkbox" :checked="display" @click="$emit('updateDisplay', id_bat)">
      </div>

    <h2>Reservations</h2>
    <ul>
      <li v-for="(reservation, indexResa) in reservations" :key="indexResa">
        {{reservation.ouverture}} - {{reservation.duree}} min | quantite : {{reservation.amount}}<button @click="deleteResaClicked(reservation.id_reservation)">Annuler</button>
      </li>
    </ul>
    </div>
    <div class="diponibilite">
      <h2>Disponibilités</h2>
      <ul>
        <li v-for="(dispo,indexDispo) in disponibilites" :key="indexDispo">
          {{dispo.ouverture}} - {{dispo.duree}} min | quantite : {{dispo.amount}}<button @click="reserverDate(dispo.id_reservation)">Reserver</button> <button v-if="mode==='1'" @click="deleteDispoClicked(dispo.id_reservation)">Supprimer</button>
        </li>
      <li v-if="mode==='1'"> Créer une disponibilité:
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

      </li>
    </ul>
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
    id_prestataire: String,
    mode: String,
    nom:String,
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
        try {
          let response = await RestauService.postResa({"id_dispo":id_dispo,"id_client":2})
          if (response.error) {
            console.log("Erreur lors de la réservation d'une disponibilité");
          } else {
            await this.getReservation()
            await this.getDisponibilite()
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

<style scoped>

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

button, input[type=button], input[type=submit], input[type=reset] {
  background-color: #2c3e50;
  padding: 10px 20px;
  width: fit-content;
  height: fit-content;
  border-radius: 10px;
  color: white;
}

button:hover, input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover {
  background-color: #3a536c;
}

input[type=datetime-local], input[type=time] {
  border-radius: 10px;
  padding: 5px;
  border: #1b1b1b solid 1px;
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