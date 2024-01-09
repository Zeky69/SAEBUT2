
<template>
  <div class="all-container">
    <img class="img-background" src="../assets/pageAccueil/fond-prestate.png" alt="">
    <div class="card-container" >
      <div class="header">
        <h1>Nos partenaires</h1>
        <div class="filtre-container">
          <div class="search-bar">
            <input class="search-input" placeholder="Rechercher"  type="text" v-model="filtre.nom" id="nom" name="nom">
            <img class="loupe" :src="require('@/assets/icons/loupe.svg')"  alt="loupe de recherche">
          </div>
          <bar-select2 :options="['Attraction', 'Restaurateur','Animateur' ,'Traiteur' ]" v-model="filtre.type" :default="'Categorie'" @input="setFiltreType" ></bar-select2>
        </div>
      </div>
      <div>
      <div class="body">
        <div class="button-container">
          <button class="button" @click="scrollToPreviousCard"><svg class="svg-icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M688 224 656 192 336 512 336 512 320 528 656 864 688 832 384 528Z"  /></svg>
          </button>
        </div>
      <div class="carousel-container">
        <div class="card-prestate"  v-for="(prestate,index) in filterList" :key="index">
          <div class="card-prestate-container">
            <div class="card-header">
              <img  :src="prestate.image" alt="stephan">
            </div>
            <div class="card-text">
              <h3>{{prestate.name}}</h3>
            </div>
            <div class="card-type" :class="getColorBackground(prestate.type)">
              <span class="cerlce" :class="getColorCercle(prestate.type)" ></span>
              <p>{{prestate.type}}</p>
            </div>
            <div class="card-bottom">
              <button class="btn-card" @click="goToPrestate(prestate.id)">Voir le profil</button>
            </div>
          </div>
          </div>
      </div>
        <div class="button-container">
          <button class="button" @click="scrollToNextCard"><svg class="svg-icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M672 512 672 512 352 192 320 224 624 528 320 832 352 864 688 528Z"  /></svg></button>
        </div>
      </div>




      </div>

      </div>
    </div>


</template>

<script>
import BarSelect2 from "@/components/barSelect2.vue";

export default {
  name: 'AllCardPrestate',
  components: {BarSelect2},
  data: () => ({
      filtre: {
      nom: '',
      type: '',
    },
    ListPresate: [
        {
      id: 1,
      name: "Zekeriya Maxime",
      type: "Animateur",
      image: "stephane.jpg"
    },
      {
        id: 2,
        name: "Mhammed Djilsi",
        type: "Attraction",
        image: "stephane.jpg"
      },
      {
        id: 3,
        name: "Stephane Stefan",
        type: "Restaurateur",
        image: "stephane.jpg"
      },
      {
        id: 4,
        name: "Joseph Sansèphe",
        type: "Traiteur",
        image: "stephane.jpg"
      },
      {
        id: 5,
        name: "Stephan",
        type: "Attraction",
        image: "stephane.jpg"
      },
      {
        id: 6,
        name: "Stephan",
        type: "Animateur",
        image: "stephane.jpg"
      },
      {
        id: 7,
        name: "Stephan",
        type: "Traiteur",
        image: "stephane.jpg"
      },
      {
        id: 8,
        name: "Stephan",
        type: "Traiteur",
        image: "stephane.jpg"
      },
      {
        id: 9,
        name: "Stephan",
        type: "Traiteur",
        image: "stephane.jpg"
      },
      {
        id: 10,
        name: "Stephan",
        type: "Traiteur",
        image: "stephane.jpg"
      }],
    filterList: [],
  }),
  methods: {
    goToPrestate(id){
      this.$router.push({path: '/prestate/', params: {id: id}})
    },
    setFiltreType(type){
      this.filtre.type = type;
    }
  ,
    getColorCercle(type) {
      const colorMap = {
        Attraction: 'attraction-color',
        Animateur: 'animateur-color',
        Restaurateur: 'restaurateur-color',
      };
      return colorMap[type] || 'default-color';
    },
    getColorBackground(type) {
      const colorMap = {
        Attraction: 'attraction-background',
        Animateur: 'animateur-background',
        Restaurateur: 'restaurateur-background',
      };
      return colorMap[type] || 'default-background';
    },
    scrollToNextCard() {
      const scroll = document.querySelector('.carousel-container');
      const cardWidth = scroll.querySelector('.card-prestate').offsetWidth + 20; // 20 is the gap between cards
      scroll.scrollLeft += cardWidth;
      if(scroll.scrollLeft >= scroll.scrollWidth - scroll.offsetWidth) {
        scroll.scrollLeft = 0;
      }
    },
    scrollToPreviousCard() {
      const scroll = document.querySelector('.carousel-container');
      const cardWidth = scroll.querySelector('.card-prestate').offsetWidth + 20; // 20 is the gap between cards
      scroll.scrollLeft -= cardWidth;
      if(scroll.scrollLeft <= 0) {
        scroll.scrollLeft = scroll.scrollWidth - scroll.offsetWidth;
      }
    },

  },
  watch: {
    filtre: {
      handler: function (val) {
        this.filterList = this.ListPresate.filter((prestate) => {
          return prestate.name.toLowerCase().includes(val.nom.toLowerCase()) && prestate.type.includes(val.type)
        })
        let scroll = document.querySelector('.carousel-container');
        scroll.scrollLeft = 0;
      },
      deep: true
    }
  }
,
  mounted() {
    document.addEventListener('dragstart', function (event) {
      event.preventDefault();
    }, false)
    this.filterList = this.ListPresate;


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
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - scroll.offsetLeft;
      const walk = (x - startX) ;
      scroll.scrollLeft = scrollLeft - walk;
    });

  }

}





</script>
<style scoped>

.all-container{
  width: 100%;
  position: relative;
}

.card-container{
  position: absolute;
  top: 10%;
  left: 5%;
  height: 80%;
  width: 90%;
  background: rgba(43, 66, 86, 0.30);
  box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.50) inset;
  border-radius: 30px;
  z-index: 10;
  user-select: none;
  backdrop-filter: blur(10px);

}

.img-background{
  width: 100%;
  min-width: 100%;
  height: 800px;
  object-fit: cover;
}

.carousel-container{
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
  gap: 20px;
}


.carousel-container::-webkit-scrollbar {
  display: none;
}



.card-prestate {
  display: flex;
  flex-direction: column;
  background: rgba(23, 35, 49, 0.7);
  backdrop-filter: blur(15px);
  border-radius: 10px;
  min-width: 300px;
  height: 400px;
}

.card-bottom{
  text-align: center;
}

.card-prestate-container{
  box-sizing: content-box;
  padding: 20px;
}

.card-header{
  width: 100%;
  height: 260px;
  overflow: hidden;
  box-sizing: border-box;

}
.card-header img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px ;

}



.search-bar{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  width: 30%;
  min-width: 500px;
  border-radius: 20px 0 0 20px;
  border-right: 1px solid rgba(255, 255, 255, 0.4);

}
.search-input{
  width: 80%;
  height: 50px;
  border: none;
  background-color: transparent;
  color: white;
}
.search-input:focus{
  outline: none;
}

::placeholder {
  color: rgba(255, 255, 255, 0.69);
  opacity: 1;
  font-size: 15px;
}

::-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.69);
}


.loupe {
  width: 15px;
  height: 15px;
}

.filtre-container{
  display: flex;
  flex-direction: row;
 justify-content: center;

}

.header h1 {
  color: white;
  font-family: Syne , sans-serif;
  font-size: 45px;
  font-weight: 500;
  text-align: left;
  margin: 0;
  padding: 20px 20px 20px 40px;
}

.card-text h3 {
  color: white;
  font-family: Syne , sans-serif;
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

.attraction-color {
  background-color: #fd2323;
}
.attraction-background {
  background-color: rgba(210, 0, 0, 0.25);
  backdrop-filter: blur(10px);
}

.animateur-color {
  background-color: #FF9800;
}

.animateur-background {
  background-color: rgba(255, 152, 0, 0.25);
  backdrop-filter: blur(10px);
}

.restaurateur-color {
  background-color: #FF5722;
}

.restaurateur-background {
  background-color: rgba(255, 87, 34, 0.25);
  backdrop-filter: blur(10px);
}

.default-color {
  background-color: #fff;
}

.default-background {
  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
}

.cerlce {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}

.card-type{
  display: flex;
  flex-direction: row;
align-items: center;
  width: fit-content;
  padding: 5px;
  border-radius: 50px;
}

.card-type p {
  height: 16px;
  width: fit-content;
  color: white;
}

.button {
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  border: none;
  width: 50px;
  height: 50px;
  cursor: pointer;
  outline: none;
}

.button svg path {
  fill : white;
}

.button svg {
  transform: scale(2);
}

.btn-card{
  margin-top: 10px;
  padding: 5px 0 ;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  border: none;
  width: 70%;
  color: white;
  font-family: "DM Sans Regular" , sans-serif;
  font-size: 18px;
  cursor: pointer;
}

.btn-card:hover{
  background-color: rgba(255, 255, 255, 0.4);

}


@media screen and (max-width: 800px ){

  .search-bar{
    width: 50%;
    min-width: 200px;
  }


}

</style>