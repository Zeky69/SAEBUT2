<template>
  <div class="all-container">
    <div class="card-container">
      <div>
        <div class="body">
          <div class="button-container">
            <button class="button" @click="scrollToPreviousCard">
              <svg class="svg-icon"
                   style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                   viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M688 224 656 192 336 512 336 512 320 528 656 864 688 832 384 528Z"/>
              </svg>
            </button>
          </div>
          <div class="carousel-container">

            <div class="card-prestate" v-for="(prestate,index) in table" :key="index">
              <CardShop :logo="prestate.photo" :title="prestate.nom" :stock="prestate.stock" :price="prestate.prix"
                        :id=prestate.id_produit :nomCat="prestate.libelle_categorie" :description="prestate.description"/>
            </div>

          </div>
          <div class="button-container">
            <button class="button" @click="scrollToNextCard">
              <svg class="svg-icon"
                   style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                   viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M672 512 672 512 352 192 320 224 624 528 320 832 352 864 688 528Z"/>
              </svg>
            </button>
          </div>
        </div>


      </div>

    </div>
  </div>


</template>

<script>
import CardShop from "@/components/CardShop.vue";
import shopService from "@/services/shop.service";

export default {
  name: 'BestSell',
  components: {CardShop},
  props:{
    table:Array,
    title:String,
    id:Number,
    description:String,
    titre:String,

  },
  methods: {
  getCategorie(){
    this.categorie = shopService.getCategorie(this.id)
  },
    scrollToNextCard() {
      const scroll = document.querySelector('.carousel-container');
      const cardWidth = scroll.querySelector('.card-prestate').offsetWidth + 20; // 20 is the gap between cards
      scroll.scrollLeft += cardWidth;
      if (scroll.scrollLeft >= scroll.scrollWidth - scroll.offsetWidth) {
        scroll.scrollLeft = 0;
      }
    },
    scrollToPreviousCard() {
      const scroll = document.querySelector('.carousel-container');
      const cardWidth = scroll.querySelector('.card-prestate').offsetWidth + 20; // 20 is the gap between cards
      scroll.scrollLeft -= cardWidth;
      if (scroll.scrollLeft <= 0) {
        scroll.scrollLeft = scroll.scrollWidth - scroll.offsetWidth;
      }
    },
    mounted() {
      document.addEventListener('dragstart', function (event) {
        event.preventDefault();
      }, false)


      let scroll = document.querySelector('.carousel-container');
      let isDown = false;
      let startX;
      let scrollLeft;

      scroll.addEventListener('mousedown', (e) => {
        isDown = true;
        scroll.classList.add('active');
        startX = e.pageX - scroll.offsetLeft;
        scrollLeft = scroll.scrollLeft;
      });

      scroll.addEventListener('mouseleave', () => {
        isDown = false;
      });

      scroll.addEventListener('mouseup', () => {
        isDown = false;
      });

      scroll.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scroll.offsetLeft;
        const walk = (x - startX);
        scroll.scrollLeft = scrollLeft - walk;
      });
    }
  }
}

</script>
<style scoped>

.all-container {
  width: 100%;
  position: relative;
}

.card-container {
  top: 10%;
  height: 80%;
  width: 90%;

}

.carousel-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 80%;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  gap: 30px;
}


.carousel-container::-webkit-scrollbar {
  display: none;
}


.card-header img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;

}


::placeholder {
  color: rgba(255, 255, 255, 0.69);
  opacity: 1;
  font-size: 15px;
}

::-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.69);
}


.header h1 {
  color: white;
  font-family: Syne, sans-serif;
  font-size: 45px;
  font-weight: 500;
  text-align: left;
  margin: 0;
  padding: 20px 20px 20px 40px;
}

.card-text h3 {
  color: white;
  font-family: Syne, sans-serif;
  font-size: 25px;
  font-weight: 500;
  text-align: left;
  margin: 0;
  padding-top: 10px;
  padding-left: 5px;

}


.body {
  padding-top: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}


.card-type p {
  height: 16px;
  width: fit-content;
  color: white;
}

.button {
  border: none;
  background-color: #ffffff;
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.button svg path {
  fill: black;
}

.button svg {
  transform: scale(4);
}


</style>