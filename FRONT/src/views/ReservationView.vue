<template>
  <!--
  <form v-if="$route.params.idDelete !== null">
    <label style="padding-top: 170px" for="idTicket">Veuillez indiquer l'identifiant de votre ticket</label>
    <input type="text" id="idTicket" name="idTicket" v-model="uuidTicket">
    <input type="submit" @click="annulerReservation" value="Annuler la reservation">
  </form>
  -->
  <div class="container-global">

    <div class="container">
      <h1>Réservations</h1>
      <label for="idTicket">L'identifiant de votre ticket</label>
      <input type="text" id="idTicket" name="idTicket" v-model="uuidTicket">
      <button @click="uuidTicketRempli = uuidTicket.length >= 1">Valider</button>
    </div>

    <div class="container-reservation" v-if="uuidTicketRempli">
      <div v-for="(prestataire, indexPresta) in prestataires" :key="indexPresta" class="container-reserve">
        <div class="prestataire-reservation">
          <div v-for="(batiment, indexBat) in batimentsPrestataires" :key="indexBat" >
            <reservationComponent
                v-if="batiment.prestataire_id === prestataire.id_prestataire"
                :id_bat="batiment.id_emplacement"
                :id_prestataire="prestataire.id_prestataire"
                :mode="'2'"
                :nom="batiment.nom"
                :uuidTicket="uuidTicket"
                :display="batiment.use_resa"
                @updateDisplay="updateDisplay($event)">
            </reservationComponent>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import { mapState} from "vuex";
import reservationComponent from "@/components/reservation.vue";
import batService from "@/services/batiment.service";
import prestataireService from "@/services/prestataire.service";
import RestauService from "@/services/reservation";


export default defineComponent({
  name: "ReservationView",
  components: {reservationComponent},
  props: {
  },
  data : () => ({
    prestataires: [],
    batimentsPrestataires: [],
    uuidTicket : "",
    uuidTicketRempli : false,
  }),
  computed: {
    ...mapState(['token','group_id']), //Remettre ,'user_id' après le token
  },
  methods: {
    async annulerReservation(){
      try {
        let response = await RestauService.getAllResaById({'id_resa':this.$route.params.idDelete})
        if (response.error) {
          console.log("Erreur lors de la récupération de la reservation");
        } else {
          if (response[0].uuid === this.uuidTicket){
            response = await RestauService.deleteResa({'id_resa':this.$route.params.idDelete})
            if (response.error) {
              console.log("Erreur lors de l'annulation de la reservation");
            } else {
              this.$router.push('/').catch(() => {
              });
            }
          } else {
            console.log("L'identifiant de votre ticket ne correspond pas à celui de la reservation")
          }
        }
      } catch (e) {
        console.error("An error occurred:", e);
      }
    },
    async recupererPrestataires(){
      try {
        let response = await prestataireService.getPrestataires()
        if (response.error) {
          console.log("Erreur lors de la récupération des batiments");
        } else {
          this.prestataires = response;
        }
      } catch (e) {
        console.error("An error occurred:", e);
      }
    },
    async recupererBatimentsPrestataire(){
      try {
        let response = await batService.getAllBatiment()
        if (response.error) {
          console.log("Erreur lors de la récupération des batiments");
        } else {
          this.batimentsPrestataires = response;
        }
      } catch (e) {
        console.error("An error occurred:", e);
      }
    },
  },
  mounted() {
    this.recupererPrestataires()
    this.recupererBatimentsPrestataire()
  }
})
</script>

<style scoped>
/* Globally applicable styles */
* {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
}

/* Styles for form elements */
label {
  display: block;
  margin-bottom: 10px;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: rgba(77, 82, 166, 0.87);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: rgb(77, 82, 166);
}

/* Container styles */
.container-global {
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  width: 80%;
  max-width: 600px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

/* Reservation container */
.container-reservation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
}

.container-reservation h2 {
  text-align: center;
  margin-bottom: 10px;
}

.container-reserve{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.prestataire-reservation {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

/* Individual reservation item */
.reservation-item {
  width: 80%;
  max-width: 400px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container-global {
    padding-top: 20px;
  }

  .container {
    width: 90%;
  }
}

</style>