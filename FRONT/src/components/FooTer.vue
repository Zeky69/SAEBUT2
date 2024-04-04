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
        <path fill="#1e061b" fill-opacity="1" d="M0,128L48,149.3C96,171,192,213,288,213.3C384,213,480,171,576,144C672,117,768,107,864,122.7C960,139,1056,181,1152,176C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
      </path>
    </svg>
    </div>
    <div class="newsletter">
      <p v-html="$t('footer.newsletter')"></p>
      <div class="formulaire">
        <input type="text" :placeholder="$t('footer.newsletterPlaceholder')" id="input">
        <button id="btnS" v-t="'footer.newsletterButton'"></button>
      </div>
    </div>
    <div class="logo">
      <img src="../assets/logo/insta.png" href="google.fr" alt="Instagram Logo">
      <img src="../assets/logo/facebook.png" alt="Facebook Logo">
      <img src="../assets/logo/twitter.png" alt="Twitter Logo">
      <img src="../assets/logo/youtube.png" alt="YouTube Logo">
    </div>
    <div class="rubrique">
      <div class="contenuRubriques">
        <h3 v-t="'footer.legalInfos'"></h3>
        <router-link to="/mentions-legales" class="link" v-t="'footer.legalNotice'"></router-link>
        <router-link to="/copyright" class="link">Copyright</router-link>
        <router-link to="/cookies" class="link" v-t="'footer.cookiesUsage'"></router-link>
        <router-link to="/utilisation-cookies" class="link" v-t="'footer.modifyCookiesUsage'"></router-link>
      </div>
      <div class="contenuRubriques">
        <h3 v-t="'footer.sections'"></h3>
        <router-link to="/" class="link" v-t="'footer.accueil'"></router-link>
        <router-link to="/attraction" class="link" v-t="'footer.attractionDiscoveries'"></router-link>
        <router-link to="/restauration" class="link" v-t="'footer.restaurantHungry'"></router-link>
        <router-link to="/boutique" class="link" v-t="'footer.ourShop'"></router-link>
        <router-link to="/billetterie" class="link" v-t="'footer.buyTickets'"></router-link>
      </div>
      <div class="contenuRubriques">
        <h3 v-t="'footer.evenMore'"></h3>
        <router-link to="/organisateurs" class="link" v-t="'footer.whoAreWe'"></router-link>
        <router-link to="/contact" class="link" v-t="'footer.contactUs'"></router-link>
        <router-link to="/login" class="link" v-t="'footer.connectYou'"></router-link>
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
  margin-top: 15rem;
  padding: 3rem 0;
  overflow: hidden;
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
    margin-top: 1rem;
    border-radius: 1rem;
    background-image: radial-gradient(at top left, transparent 1%, rgba(255, 255, 255, 0.1) 99%),
      linear-gradient(to right, #2e1d4b, #3f2563, #553c65, #553c65, #3f2563);
    color: rgb(255, 255, 255, 0.7);
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
  overflow:hidden;
  svg {
    width: 200rem;
    height: auto;
    overflow: hidden;
  }
}

.bg-wave-2 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 180%;
  transform: translateX(-40%);
  overflow:hidden;
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
  gap: 3rem;
  padding: 1rem 0;
  margin-bottom: -3rem;
  z-index: 0;

  img {
    width: 3rem;
    height: auto;
    object-fit: contain;
    z-index: 1;
    pointer-events: none;
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