<template>
  <div class="FormulairePassword">
    <div class="background"></div>
    <div class="container">
      <div class="gauche">
        <div class="formulaire">
          <span v-if="isRegister">
            <div class="validate">
              <img src="@/assets/logo/check.svg" id="check">
              <p>{{ $t('login-signup-forgottenpass.passwordReset.success') }}</p>
              <span>{{ $t('login-signup-forgottenpass.passwordReset.redirection') }}</span>
            </div>
          </span>

          <span v-else>
            <div class="formulaire-top">
              <h2>{{ $t('login-signup-forgottenpass.passwordReset.title') }}</h2>
            </div>

            <div class="formulaire-contenu">
              <div class="register">
                <p style="text-align: center; font-size: 20px">{{ $t('login-signup-forgottenpass.passwordReset.newPassword') }}</p>

                <div class="register-champ">
                  <p>{{ $t('login-signup-forgottenpass.login.password') }}</p>
                  <input type="password" class="inputFormulaire" :placeholder="$t('login-signup-forgottenpass.signup.placeholders.password')" v-model="password" required>
                  <span v-if="!password && showErrors" class="error-message">{{ $t('login-signup-forgottenpass.passwordReset.errorPassword') }}</span>
                </div>
                <span class="error-message" id="back-error"></span>

                <div class="boutton" @click="ChangePassword">
                  <p id="Inscription" :disabled="!areFieldsFilled">{{ $t('login-signup-forgottenpass.passwordReset.button') }}</p>
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
import util from "@/services/utilisateur";

export default {
  name: "ResetPassword",
  computed: {
    areFieldsFilled() {
      return this.password;
    }
  },
  data: () => ({
    password: "",
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
    async ChangePassword() {
      if (this.areFieldsFilled) {
        try {
          const token = this.$route.params.token;
          console.log(token)

          const response = await util.ChangePassword(token,this.password);
          if (response.error) {
            console.log(response.error)
            throw response.data.error;
          }

          this.isRegister = true;
          setTimeout(() => {
            this.$router.push("/login")
          },3000)
        } catch (error) {
          document.getElementById("back-error").innerHTML = error;
          console.error("Erreur lors de l'envoi du mail", error.message);
        }
      } else{
        this.showErrors = true;
      }
    },
    handleEnterKey(event) {
      if (event.key === "Enter") {
        this.ChangePassword();
      }
    },
  },
};
</script>

<style scoped>
.FormulairePassword {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.FormulairePassword::after {
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

.validate span{
  color: #FFFFFF;
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
  height: fit-content;
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
  font-size: 30px;
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
  gap: 25px;
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
  justify-content: space-between;
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
