<template>
  <div class="EspacePrestaire" v-if="group_id===2">
    <h1>Espace Prestataire</h1>
    <h1>Espace Prestataire</h1>
    <br><br><br><br><br><br><br><br><br>
    <h1>Espace Prestataire</h1>
    <h1>fname : {{fname}}</h1>
    <h1>lname : {{lname}}</h1>
    <h1>user_id : {{user_id}}</h1>
    <h1>email : {{email}}</h1>
    <h1>group_id : {{group_id}}</h1>


    <button @click="deconnexion">Déconnexion </button>

  </div>
  <div v-else>
  </div>
</template>

<script>
import { mapState,mapActions } from "vuex";

export default {
  name: 'EspacePrestaire',
  computed: {
    ...mapState(['token','fname','lname','group_id','user_id','email'])
  },
  methods:{
    ...mapActions(['logout']),
    deconnexion(){
      this.$router.replace('/login');
      this.logout();
    }
  },
  mounted() {
    console.log(this.group_id + " groupe")
    if (this.group_id !== 2) {
      this.$router.replace('/login');
    }
  }
}
</script>