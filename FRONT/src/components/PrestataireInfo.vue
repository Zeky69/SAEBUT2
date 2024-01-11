<template>
  <div class="EspaceAdmin">
    <h1 class="EffetViolet">Tableau de bord</h1>
    <div class="container-header">
      <div class="Bienvenue">
        <h2 class="EffetViolet">Bienvenue, <br> {{ lname }} {{ fname }}</h2>
      </div>
      <div class="Perfomance">
      </div>
    </div>
  </div>

</template>
<script>
import {mapActions, mapState} from "vuex";

export default {
  name: 'AdminInfoTemporaire',
  computed: {
    ...mapState(['token', 'fname', 'lname', 'group_id', 'user_id', 'email'])
  },
  methods: {
    ...mapActions(['logout']),
    deconnexion() {
      this.$router.replace('/login');
      this.logout();
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Goldman&display=swap');

.EffetViolet {
  text-align: left;
  background: linear-gradient(179deg, #543C64 -58.62%, #868CD1 99.12%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.EspaceAdmin {
  display: flex;
  flex-direction: column;
  padding: 3% 6%;

}

.EspaceAdmin h1 {
  text-align: left;
  font-family: "DM Sans";
  font-size: 50px;
  font-style: normal;
}


.container-header {
  margin-top: 2%;
  display: flex;
  gap: 10%;
  height: 200px;
}

.Bienvenue {
  display: flex;
  flex-direction: column-reverse;
  padding: 2%;
  flex: 1;
  border-radius: 20px;
  background: radial-gradient(97.12% 97.12% at 50% 40.46%, #BAA8FC 0%, rgba(198, 188, 235, 0.00) 100%);
}

.Perfomance {
  padding: 2%;
  display: flex;
  text-align: left;
  gap: 7%;
  flex: 2;
  border-radius: 20px;
  background: radial-gradient(97.12% 97.12% at 50% 40.46%, #BAA8FC 0%, rgba(198, 188, 235, 0.00) 100%);
}

.Perfomance-text h2 {
  background: radial-gradient(1218.45% 275.85% at 38.96% 50%, #968462 0%, #C65151 52.71%);
  font-size: 40px;
  font-family: "DM Sans";
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  mix-blend-mode: color-burn;
}

.Perfomance-text h3 {
  background: linear-gradient(180deg, #FFF -168.18%, #E8CEFC 175.45%);
  font-size: 55px;
  font-family: "Goldman";
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.Perfomance-text h4 {
  text-align: left;
  color: rgba(255, 255, 255, 0.52);
  font-family: Goldman;
  font-size: 35px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.Bienvenue h2 {
  text-align: start;
  font-family: DM Sans;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

.container-middle {
  display: flex;
  margin-top: 2%;
  gap: 10%;
  height: 350px;
}

.container-middle h2 {
  color: #56565C;
  font-size: 30px;


}


.Calendrier {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}


.rubriqueChiffre-content h2 {
  color: #252336;
  font-family: DM Sans;
  font-size: 35px;
  text-align: left;


}

.rubriqueChiffre-content h3 {
  color: #BFB7CC;
  font-family: DM Sans;
  font-size: 20px;
  text-align: left;

}

.container-bottom {
  margin-top: 4%;

}

.container-bottom h2 {
  text-align: left;
  color: #56565C;
  font-size: 30px;
}


</style>