<template>
  <div class="FormulaireRegister">
    <div class="background"></div>
    <div class="container">
      <div class="gauche">
        <div class="formulaire">
          <span v-if="isRegister">
            <div class="validate">
              <img src="@/assets/logo/check.svg" id="check">
              <p>Votre inscription a été enregistré un admin va traiter votre demande</p>
            </div>
          </span>

          <span v-else>
            <div class="formulaire-top">
              <h2>Inscription</h2>
            </div>

            <div class="formulaire-contenu">
              <div class="register">
                <div class="register-champ">
                  <p>Nom</p>
                  <input type="text" class="inputFormulaire" :class="{ 'invalid': isInvalidCredentials }" placeholder="Entrez votre nom" v-model="nom" required>
                  <span v-if="!nom && showErrors" class="error-message">Le champ Nom est obligatoire</span>
                </div>

                <div class="register-champ">
                  <p>Prénom</p>
                  <input type="text" class="inputFormulaire" :class="{ 'invalid': isInvalidCredentials }" placeholder="Entrez votre prénom" v-model="prenom" required>
                  <span v-if="!prenom && showErrors" class="error-message">Le champ Prénom est obligatoire</span>
                </div>

                <div class="register-champ">
                  <p>E-mail</p>
                  <input type="text" class="inputFormulaire" :class="{ 'invalid': isInvalidCredentials }" placeholder="Entrez votre adresse e-mail" v-model="email" required>
                  <span v-if="!email && showErrors" class="error-message">Le champ E-mail est obligatoire</span>
                </div>

                <div class="register-champ">
                  <p>Description (facultatif)</p>
                  <input type="text" class="inputFormulaire" :class="{ 'invalid': isInvalidCredentials }" placeholder="Adresse e-mail" v-model="description">
                </div>

                <div class="register-champ">
                  <p>Numéro Siret</p>
                  <input type="text" class="inputFormulaire" :class="{ 'invalid': isInvalidCredentials }" placeholder="Adresse e-mail" v-model="siret" required>
                  <span v-if="!siret && showErrors" class="error-message">Le champ Numéro Siret est obligatoire</span>
                </div>

                <div class="boutton" @click="validateFields">
                  <p id="Inscription" :disabled="!areFieldsFilled">Inscription</p>
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "InscriptionView",
  computed: {
    ...mapState(['group_id']),
    areFieldsFilled() {
      return this.nom && this.prenom && this.email && this.siret;
    }
  },
  data: () => ({
    nom: "",
    prenom: "",
    email: "",
    description: "",
    siret: "",
    isRegister: false,
    showErrors: false
  }),
  mounted() {
    document.addEventListener("keydown", this.handleEnterKey);
  },

  beforeDestroy() {
    document.removeEventListener("keydown", this.handleEnterKey);
  },
  methods: {
    ...mapActions(['loginUser']),
    check() {
      this.isRegister = true;
      let formulaire = document.getElementsByClassName("formulaire")[0];
      formulaire.style.height = "400px";
      formulaire.style.width = "400px";
    },
    handleEnterKey(event) {
      if (event.key === "Enter") {
        this.connect();
      }
    },
    validateFields() {
      // Check if all fields are filled
      if (this.areFieldsFilled) {
        this.isRegister = true;
        let formulaire = document.getElementsByClassName("formulaire")[0];
        formulaire.style.height = "400px";
        formulaire.style.width = "400px";
      } else {
        // Display error messages
        this.showErrors = true;
      }
    }
  },
};
</script>

<style scoped>
.FormulaireRegister {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.FormulaireRegister::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 255, 0), rgba(0, 0, 255, 0.14));
  z-index: -1;
}
.background {
  background: url(../assets/fondFeteForaine.png) no-repeat center center fixed;
  background-size: cover;
  position: fixed;
  width: 100%;
  height: 100%;
  filter: blur(7px);
  z-index: -1;
  overflow: hidden;
}

.validate{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.validate p{
  color: white;
  text-align: center;
  font-size: 23px;
}

#check{
  fill : #008000;
  height: 200px;
  width: 200px;
}

.gauche{
  margin: 35% 0%;
}

.error-message{
  color: #ff0000;
}


.container {
  position: relative;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;
  top: 100px;
  margin: 0 7%;

}

.formulaire {
  padding: 8%;
  width: 500px;
  height: 700px;
  position: relative;
  z-index: 10;
  border-radius: 12px;
  background-color: rgba(34, 29, 29, 0.45);
  backdrop-filter: blur(8px) saturate(180%);
  filter: drop-shadow(0px 4px 29px #00000053);
}

.formulaire-top h2 {
  color: white;
  font-family: "DM Sans";
  font-size: 25px;
  text-align: center;
  margin-top: 5%;
}

.formulaire-contenu{
  display: flex;
  flex-direction: column;
  height: 60%;
  width: 80%;
  color: white;
  position: relative;
  padding: 10% 8% ;
  margin-top: 10px;
}

.register{
  display: flex;
  flex-direction: column;
  gap: 17%;
  height: 40%;

}

.register-champ{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  font-family: "DM Sans";
}


.register-champ p{
  font-size: 20px;
}

.register a{
  padding-left: 58%;
  font-style: italic;
}

.inputFormulaire{
  font-size: 15px;
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
.register a{
  text-decoration: underline;
  font-family: "DM Sans";
  font-size: 13px;
}
.boutton{
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 150px;
  justify-content: space-between;
  margin-top: 10px;
}

.boutton p{
  font-family: "DM Sans";
  font-size: 20px;
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
  width: 100%;
  margin: 0;
  margin-bottom: 10px;
  border: 0;
  height: 2px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(255, 255, 255, 0.75), rgba(0, 0, 0, 0));
}

#Inscription{
  background : linear-gradient(#5D34FF,#D1C6FF);
  border: none;
}

.reseaux img{
  width: 50px;
  filter: invert(100%) sepia(0%) saturate(7498%) hue-rotate(184deg) brightness(100%) contrast(100%);
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

  .register-champ p{
    font-size: 20px;
  }

  .inputFormulaire{
    font-size: 15px;
  }

  .register a {
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

  .register-champ p{
    font-size: 20px;
  }

  .inputFormulaire{
    font-size: 15px;
  }

  .register a {
    font-size: 13px;
  }

  .boutton p{
    font-size: 15px;
    width: 350px;
    height: 40px;
  }

}

</style>
