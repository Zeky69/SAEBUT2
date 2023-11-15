<template>
<div class="FormulaireLogin">
  <h1>Espaces Prestataires</h1>
  <div class="Login">
    <p>Identifiant :</p>
    <input type="text" placeholder="Entrez votre identifiant" id="inputLogin">
  </div>
  <div class="Login">
    <p>Mot de passe :</p>
    <input type="text" placeholder="Entrez votre identifiant" id="inputLogin">
  </div>
  <div class="valider">
    <a id="mdp">Mot de passe oublié ?</a>
    <a class="valideBoutton">Se connecter</a>
  </div>

</div>
</template>

<script>
export default {
  name:"LoginView"
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}

.FormulaireLogin h1{
  margin-top: -11%;
  padding: 0px 1px;
  background-color: white;
  font-size: 40px;

}

.FormulaireLogin{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin : 5% 25%;
  padding: 3% 2%;
  gap: 30px;
  border : solid 5px #FEB42D;
  border-radius: 30px;
}

#inputLogin{
  border-radius: 30px;
  border: solid 1px black;
  padding: 5% 4%;
  padding-right: 250%;
  font-size: 15px;
}

.Login{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 20px;
  gap : 5px;
  justify-content: space-evenly;
}

.valideBoutton{
  background-color: #FEB42D;
  padding: 10px 7px;
  color: white;
  border-radius: 15px;
  font-weight: bold;
}

.valider{
  display: flex;
  flex-direction:row;
  align-items: center;
  gap: 340px;
}

#mdp{
  color: #FEB42D;
  font-weight: bold;
}
</style>