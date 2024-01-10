<template>
  <div class="footer">
    <div class="bg-wave-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#2C3E50" fill-opacity="0.8" d="M0,320L40,314.7C80,309,160,299,240,250.7C320,203,400,117,480,85.3C560,53,640,75,720,96C800,117,880,139,960,133.3C1040,128,1120,96,1200,90.7C1280,85,1360,107,1400,117.3L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z">
        </path>
      </svg>
    </div>
    <div class="bg-wave">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#1E061B" fill-opacity="1"
          d="M0,32L40,64C80,96,160,160,240,202.7C320,245,400,267,480,250.7C560,235,640,181,720,160C800,139,880,149,960,149.3C1040,149,1120,139,1200,128C1280,117,1360,107,1400,101.3L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z">
        </path>
      </svg>
    </div>
    <div class="newsletter">
      <p>Inscrivez-vous à la Newsletter de <strong>Belforaine</strong></p>
      <div class="formulaire">
        <input type="text" placeholder="Entrez votre adresse e-mail" id="input">
        <button id="btnS">S'inscrire</button>
      </div>
    </div>
    <div class="logo">
      <img src="../assets/logo/insta.png" alt="Instagram Logo">
      <img src="../assets/logo/facebook.png" alt="Facebook Logo">
      <img src="../assets/logo/twitter.png" alt="Twitter Logo">
      <img src="../assets/logo/youtube.png" alt="YouTube Logo">
    </div>
    <div class="rubrique">
      <div class="contenuRubriques">
        <h3>Informations légales</h3>
        <router-link to="/mentions-legales" class="link">Mentions légales</router-link>
        <router-link to="/copyright" class="link">Copyright</router-link>
        <router-link to="/utilisation-cookies" class="link">Utilisation des cookies</router-link>
        <router-link to="/modifier-preferences-cookies" class="link">Modifier vos préférences de cookies</router-link>
      </div>
      <div class="contenuRubriques">
        <h3>À propos</h3>
        <router-link to="/organisateurs" class="link">Organisateurs</router-link>
        <router-link to="/prestataires" class="link">Prestataires</router-link>
        <router-link to="/partenaires" class="link">Partenaires</router-link>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'FooTer',
};
</script>
  
<style scoped lang="scss">
* {
  box-sizing: border-box;
  font-family: 'Syne' !important;
}

.footer {
  position: relative;

}

.newsletter {
  width: 40%;
  height: 100%;
  position: relative;
  text-align: center;
  align-items: center;
  background-color:rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  left: 30%;
  padding: 2rem;
  /** filter blur pour du glassmorphism */
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.4);


}

.newsletter p {
  font-size: 1.5rem;
  line-height: 1.3;
  letter-spacing: 0.05em;
  color: #2c1a1a;
  opacity: 0.8;
  max-width: 40rem;
}

.formulaire {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  input[type='text'] {
    all: unset;
    appearance: none;
    outline: none;
    resize: none;
    width: 30rem;
    height: 4rem;
    padding: 0 1rem;
    border-radius: 1rem;
    background-image: radial-gradient(at top left, transparent 1%, rgba(255, 255, 255, 0.1) 99%),
      linear-gradient(to right, #2e1d4b, #3f2563, #553c65, #553c65, #3f2563);
    color: #250f0f;
    transition: 0.3s ease-out;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }
  }

  button {
    font-family: 'DM Sans' !important;
    cursor: pointer;
    user-select: none;
    all: unset;
    appearance: none;
    outline: none;
    width: 12rem;
    height: 2rem;
    border-radius: 1rem;
    color: #1d0521;
    font-size: 1.0rem;
    background-image: linear-gradient(to right, #ffffff, #d2c8ff);
    transition: 0.3s ease-out;

    &:hover {
      filter: brightness(1.1);
      cursor: pointer;
    }
  }
}

.bg-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  svg {
    width: 100%;
    height: auto;
  }
}

.bg-wave-2 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  transform: translateX(-50%);
  svg {
    width: 100%;
    height: auto;
  }
}

.bg-wave-3{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 150%;
  svg {
    width: 100%;
    height: auto;
  }

}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  margin-bottom: -3rem;
  z-index: 0;

  img {
    width: 3rem;
    height: auto;
    object-fit: contain;
    z-index: 1;
  }
}

.rubrique {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 3rem 0;

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
  }

  .contenuRubriques {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h3 {
      font-size: 1.5rem;
      font-weight: bold;
      color: #fff;
      opacity: 0.8;
      margin-bottom: 0.5rem;
    }

    a {
      color: #fff;
      opacity: 0.6;
      text-decoration: none;
      transition: 0.3s ease-out;

      &:hover {
        opacity: 1;
      }
    }
  }
}</style>