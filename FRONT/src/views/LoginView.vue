<template>
  <div class="FormulaireLogin">
    <img class="fond" src="../assets/fondFeteForaine.png">
    <div class="container">
      <div class="gauche">
        <div class="formulaire">
          <div class="formulaire-top">
            <h2>Connexion <span style="font-weight: normal; color: gray;">- Inscription</span></h2>
          </div>
          <div class="formulaire-contenu">
            <div class="connexion">
            <div class="Login">
            <p>E-mail</p>
            <input type="text" class="inputFormulaire" :class="{ 'invalid': isInvalidCredentials }" placeholder="Adresse e-mail" v-model="login">
              <span class="faux"></span>
            </div>

            <div class="Login">
              <p>Mot de passe</p>
              <input type="password" class="inputFormulaire" :class="{ 'invalid': isInvalidCredentials }"  placeholder="Mot de passe" v-model="password">
              <span class="faux"></span>
            </div>
              <a>Mot de passe oublié ?</a>
            </div>
            <div class="boutton">
            <p @click="connect()">Connexion</p>
              <hr />
              <p id="Inscription">Inscription</p>


            </div>

          </div>
        </div>
      </div>
      <div class="droite">
        <img src="../assets/logoWF2W.png" class="logo">
        <div class="reseaux">
            <img src="../assets/logo/TwitterX.svg">
          <img src="../assets/logo/Facebook.svg">
          <img src="../assets/logo/YouTube.svg">
          <img src="../assets/logo/Instagram.svg">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "LoginView",
  computed:{
    ...mapState(['group_id'])
  },
  data : () => ({
    login:"",
    password:"",
    isInvalidCredentials: false,
  }),mounted() {
    if(this.group_id===1){
      this.$router.replace('/admin');
    }else if(this.group_id===2){
      this.$router.replace('/prestataire');

    }
  },
  methods:{
    ...mapActions(['loginUser']),
    async connect(){
      console.log(this.login)
      var data =
          {"login" : this.login,
            "password" :this.password};
      await this.loginUser(data);
      if(this.group_id===2){
        this.$router.push('/prestataire');
      }else if(this.group_id===1){
        this.$router.push('/admin');
      }else{
        this.isInvalidCredentials = true;
        this.login = "";
        this.password = "";
        let elements = document.getElementsByClassName("faux");
        for (let i = 0; i < elements.length; i++) {
          elements[i].innerHTML = 'Mot de passe ou email incorrect';
        }

      }
      console.log(this.token);
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.fond {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  left: 0;
  filter: blur(7px);
}

.container {
  position: relative;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;
  top: 200px;
  margin: 0 7%;
}

.formulaire {
  padding: 5%;
  width: 600px;
  height: 650px;
  position: relative;
  z-index: 10;
  border-radius: 40px;
  background-color: rgba(34, 29, 29, 0.45);
}

.formulaire-top h2 {
  color: white;
  font-family: "DM Sans";
  font-size: 40px;
}

.formulaire-contenu{
  display: flex;
  flex-direction: column;

  height: 70%;
  width: 80%;
  color: white;
  position: relative;
  padding: 10% 8% ;
  margin-top: 10px;
}

.Login{
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  font-family: "DM Sans";
}

.connexion{
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: space-evenly;

}

.Login p{
  font-size: 25px;
}

.connexion a{
  padding-left: 63%;
}

.inputFormulaire{
  font-size: 20px;
  color: white;
  border: none;
  width: 100%;
  border-bottom: 1px solid #ffffff;
  outline: 0;
  padding: 7px 0;
 background-color: transparent;
  transition: border-color 0.2s;
}

.inputFormulaire.invalid {
  border-bottom: 1px solid red;
}

.faux{
  color: red;
}
.connexion a{
  text-decoration: underline;
  font-family: "DM Sans";
  font-size: 17px;
}
.boutton{
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 150px;
  justify-content: space-between;
}

.boutton p{
  font-family: "DM Sans";
  font-size: 25px;
  width: 350px;
  height: 50px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border : 1px solid #ffffff;
  cursor: pointer;

}

.boutton hr{
  border-top: 3px double #ffffff;
  text-align: center;
}

.boutton p:first-child {
  margin-bottom: 10px;
}

.boutton hr {
  border-top: 0.05px solid #ffffff;
  width: 100%;
  margin: 0 auto;
}

#Inscription{
  background : linear-gradient(#5D34FF,#D1C6FF);
  border: none;
}

.droite{
  margin-right: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo{
  width: 100%;
  height: auto;
  max-width: 322px;
}

.reseaux img{
  fill: red;
}

@media all and (max-width:1300px) {
  .container {
    flex-direction: column;
    align-items: center;
  }

  .gauche {
    margin-right: 0;
    text-align: center;
    justify-content: center;
  }
.droite{
  display: none;
}

}

@media all and (max-width: 900px) {
  .formulaire{
    padding: 7%;
    width: 450px;
    height: 500px;
  }

  .formulaire-top h2 {
    font-size: 30px;
  }

  .Login p{
    font-size: 20px;
  }

  .inputFormulaire{
    font-size: 15px;
  }

  .connexion a {
    font-size: 13px;
  }

  .boutton p{
    font-size: 15px;
    width: 350px;
    height: 40px;
  }

}

@media all and (max-width: 640px) {
  .formulaire{
    padding: 7%;
    width: 400px;
    height: 550px;
  }

  .formulaire-top h2 {
    font-size: 30px;
  }

  .Login p{
    font-size: 20px;
  }

  .inputFormulaire{
    font-size: 15px;
  }

  .connexion a {
    font-size: 13px;
  }

  .boutton p{
    font-size: 15px;
    width: 350px;
    height: 40px;
  }

}

</style>
