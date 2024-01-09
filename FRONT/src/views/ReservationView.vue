<template >
  <div>
    <h1 >Reservation Test</h1>
    <reservationComponent
        class="main"
        :id_emp=this.id_emp
        :user_id=this.user_id
    >

    </reservationComponent >
  </div>
</template>

<script>
import {defineComponent} from "vue";
import { mapState} from "vuex";
import reservationComponent from "@/components/reservation.vue";


export default defineComponent({
  name: "ReservationView",
  components: {reservationComponent},
  props: {
    //id_emp: String,
  },
  data : () => ({
    user_id: "1", //Remettre this.user_id (celui des computed)
    id_emp: "1", //Remettre this.id_emp (celui des props)
  }),
  computed: {
    ...mapState(['token','group_id']), //Remettre ,'user_id' après le token
  },
  methods: {
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