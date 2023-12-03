

<template>
  <div class="EspacePrestaire" v-if="group_id===1">
    <h1>Espace Prestataire</h1>
    <h1>Espace Prestataire</h1>
    <br><br><br><br><br><br><br><br><br>
    <h1>Espace Admin</h1>
    <h1>fname : {{fname}}</h1>
    <h1>lname : {{lname}}</h1>
    <h1>user_id : {{user_id}}</h1>
    <h1>email : {{email}}</h1>
    <h1>group_id : {{group_id}}</h1>


    <button @click="deconnexion">Deconnexion </button>

  </div>
</template>
<script>
import {mapActions, mapState} from "vuex";

export default {
  name: 'AdminInfoTemporaire',
  computed: {
    ...mapState(['token','fname','lname','group_id','user_id','email'])
  },
  methods:{
    ...mapActions(['logout']),
    deconnexion(){
      this.$router.replace('/login');
      this.logout();
    }
  }
}

</script>

<style scoped>

</style>