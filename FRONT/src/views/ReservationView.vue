<template >
  <div>
    <h1 >Reservations</h1>
    <label for="idTicket" style="padding-top: 150px">L'identifiant de votre ticket</label>
    <input type="text" id="idTicket" name="idTicket" v-model="uuidTicket">
    <ul>
      <li v-for="(prestataire, indexPresta) in prestataires" :key="indexPresta">
        <ul>
          <li v-for="(batiment, indexBat) in batimentsPrestataires" :key="indexBat">
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

          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import { mapState} from "vuex";
import reservationComponent from "@/components/reservation.vue";
import batService from "@/services/batiment.service";
import prestataireService from "@/services/prestataire.service";


export default defineComponent({
  name: "ReservationView",
  components: {reservationComponent},
  props: {
  },
  data : () => ({
    prestataires: [],
    batimentsPrestataires: [],
    uuidTicket : ""
  }),
  computed: {
    ...mapState(['token','group_id']), //Remettre ,'user_id' après le token
  },
  methods: {
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
.main {
  margin: 150px;
  font-family: Arial, Helvetica, sans-serif;
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
</style>