<template>
  <div class="EspacePrestaire" v-if="token">
    <h1>Espace Prestataire</h1>
  </div>
  <div v-else>
    <router-link to="/login" ref="loginLink"></router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'EspacePrestaire',
  computed: {
    ...mapState(['token'])
  },
  mounted() {
    if (!this.token) {
      this.$refs.loginLink.$router.push('/login');
    }
  }
}
</script>