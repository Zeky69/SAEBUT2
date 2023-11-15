<template>
  <div class="footer">
    <div class="newsletter">
      <p>Inscrivez-vous à la Newsletter de <strong>Belforaine</strong></p>
      <div class="formulaire">
        <input type="text" placeholder="Entrez votre addresse mail" id="input">
        <a id="btnS">S'inscrire</a>
      </div>
    </div>
    <div class="bleu">
      <div class="logo">
        <img src="../assets/logo/insta.png">
        <img src="../assets/logo/facebook.png">
        <img src="../assets/logo/twitter.png" >
        <img src="../assets/logo/youtube.png">
      </div>
      <div class="rubrique">

        <div class="contenuRubriques">
          <h3>Informations légales</h3>
          <a>Mention légales</a>
          <a>Copyright</a>
          <a>Utilisation des cookies</a>
          <a>Modifier vos préférences de cookies</a>
        </div>

        <div class="contenuRubriques">
          <h3>A propos</h3>
          <a>Organisateurs</a>
          <a>Prestataires</a>
          <a>Partenairess</a>
        </div>

        <div class="contenuRubriques">
          <h3>Informations légales</h3>
          <a>Mention légales</a>
          <a>Copyright</a>
          <a>Utilisation des cookies</a>
          <a>Modifier vos préférences de cookies</a>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooTer'
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

.footer {
  padding-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.newsletter {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  z-index: 1;
  margin-top: -90px;
  width: 85%;
  height: auto;
  border-radius: 20px;
  color: white;
  padding: 2%;
  font-size: 45px;
  font-family: 'Tw Cen MT Condensed Extra Bold', sans-serif;;
  background-color: #FEB42D;
}

.bleu {
  width: 100%;
  position: absolute;
  padding-top: 10% ;
  gap: 5%;
  height: 500px;
  z-index: 0;
  background-color: #2c3e50;
}

.formulaire{
  display: flex;
  justify-content: space-evenly;
  margin-top: 2%;
  gap: 10%;
  font-size: 20px;
}

#input{
  border-radius: 30px;
  font-size: 20px;
  background-color: #ffd173;
  border: none;
  padding: 5% 10%;
  padding-right: 100% ;
}

#btnS {
  background-color: white;
  padding: 5% 15%;
  border-radius: 40px;
}

.bleu {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.logo{
  display: flex;
  justify-content: space-evenly;
  gap:40px;
}

.logo img{
  width: 100px;
  height: auto;
}

.rubrique{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap:250px;
  color: white;
}

.contenuRubriques a{
  color: white;
}

.contenuRubriques h3{
  font-size: 30px;
  font-weight: normal;
  padding-bottom: 5px;
}

.contenuRubriques{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  font-size: 15px;
}
</style>