
<template>
  <div class="passBillet">
    <img class="fondFeteForraine" src="@/assets/pageAccueil/fond-roue.png" alt="fond roue">
    <div class="card-wrap">
      <div  v-for="(item , index) in items" :key="index" class="card">
        <div class="card-head" >
          <div class="title-card">
            <h1 class="card-billet-title">{{item.title}}</h1>
            <h2 class="card-billet-subtitle">{{item.day}} jour{{item.day >1 ? 's':''}}</h2>
          </div>
          <p class="price">{{item.price}}€</p>
        </div>
        <hr>
        <div class="card-body">
          <div class="list-container">
            <ul class="list-info">
              <li v-for="(i , index) in item.listInfo" :key="index" >{{i}}</li>
            </ul>
          </div>
          <router-link :to="{ name: 'billetterieid', params: { idselect: item.id } }">
            <button class="btn-card">Ajouter au panier</button>
          </router-link>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
export default {
  name: 'passBillet',
  components: {
  },
  props: {
  },
  data: () =>  ({
    items:[
        {
      id: '1',
      title: 'Billet Basic',
      price: 24.99,
      day: 1,
      listInfo: ['Accès au parc'],

    },
    {
      id: '2',
      title: 'Billet Fast',
      price: 34.99,
      day: 1,
      listInfo: ['Accès au parc' , 'Accès sans attente aux attractions'],
    },
    {
      id: '3',
      title: 'Billet Premium',
      price: 59.99,
      day: 2,
      listInfo: ['Accès au parc' , 'Accès sans attente aux attractions' , 'Des goodies offerts'],
    },
    ]
  }),
  computed: {
  },
  methods: {

  },
};

</script>


<style scoped>

@font-face {
  font-family: 'DM Sans Medium';
  src: url('@/assets/fonts/DM_Sans/static/DMSans-Medium.ttf') format('truetype');
}
@font-face {
  font-family: 'DM Sans Regular';
  src: url('@/assets/fonts/DM_Sans/static/DMSans-Regular.ttf') format('truetype');
}

.passBillet {
  position: relative;
  display: inline-block; /* or display: block; depending on your layout */

}

.fondFeteForraine {
  width: 100%;
  min-width: 100%;
  height: 1000px;
  object-fit: cover;
  filter: blur(2px);
}


.card-wrap {
  display: grid;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  grid-template-columns: repeat(3, 1fr);
  border-radius: 60px;
  backdrop-filter: blur(10px);
  background-color: rgba(23, 35, 49, 0.4);
  border: solid 1px  rgba(255, 255, 255, 0.2)  ;

  width: 80%;
  min-width: 1000px;
  height: 100%;
  min-height: 400px;
  max-height: 600px;

}

.btn-card{
  background-color: #2c3e50;
  padding: 10px 20px;
  width: fit-content;
  height: fit-content;
  border-radius: 10px;
  border: none;
  color: white;
  font-family: "DM Sans Medium" , Syne , Helvetica , sans-serif;
  cursor: pointer;
}

.btn-card:hover{
  background-color: #34495e;
}

.btn-card:active{
  background-color: #293a4b;
}

.card:nth-child(1) {
  border-radius: 60px 0 0 60px ;
  border-right-color: rgba(255, 255, 255, 0.5) ;
}
.card:nth-child(3) {
  border-left-color: rgba(255, 255, 255, 0.5)  ;

  border-radius: 0 60px 60px 0  ;
}

.card:nth-child(2){
  border-color: transparent rgba(255, 255, 255, 0.5) transparent rgba(255, 255, 255, 0.5)  ;
}

.card {
  font-family: "DM Sans Regular" , Syne , Helvetica , sans-serif;
  border-color: rgba(255, 255, 255, 0.2)  ;
  border: solid 1px transparent;
  color: white;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1px 1fr;

}


.card hr {
  width: 80%;
  margin: 0 auto;
  border-top: solid 1px rgb(255, 255, 255);

}

.price {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  font-family: "DM Sans Medium" , Syne , Helvetica , sans-serif;
  text-align: center;
  height: 30%;
}

.title-card {
  margin: 50px ;
  display: flex;
  flex-direction: column;
  justify-content: left;
  font-family: "DM Sans Regular" , Syne , Helvetica , sans-serif;

}

.title-card h1{
  width: fit-content;
  font-size: 40px;
}

.card-billet-subtitle{
  width: fit-content;
  font-size: 20px;
}

.card-body{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.list-info li {
  font-size: 20px;
  font-family: "DM Sans Regular" , Syne , Helvetica , sans-serif;
  width: fit-content;
}
.list-info{
  width: fit-content;
  margin: 0 50px 0 100px;

}

.list-container{
  padding-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 60%;

}


@media screen and (max-width: 1030px) {


  .card hr{
    display: none;
  }


  .title-card {
    margin: 25px 0 20px 50px;
  }

  .list-info {
    margin: 0;
  }

  .card-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }

  .card {
    width: 90%;
    height: auto;
    display: flex;
    border: solid 1px rgba(255, 255, 255, 0.2) !important;
    border-radius: 30px !important;
    backdrop-filter: blur(10px);
    background-color: rgba(23, 35, 49, 0.4);
    margin-top: 10px;
    justify-content: space-evenly;
  }

  .card-wrap {
    max-width: none;
    min-width: 0;
    max-height: none;
    width: 100%;
    height: 100%;
    background-color: transparent;
    backdrop-filter: none;
    border-radius: 0;
    border: none;
  }

}

@media screen and (max-width: 900px) {
  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }

  .title-card {
    width: fit-content;
  }

  .fondFeteForraine {
    height: 1200px;
  }

  .list-container {
    margin: 0 0 0 100px;
    width: fit-content;

  }

  .btn-card {
    margin: 20px 0;
  }

}

@media screen and (max-width: 430px) {
  .card {
    width: 99%;
    border-radius: 0 !important;

  }

  .list-container {
    margin: 0;

  }

  .title-card {
    width: fit-content;
    margin-left: 5%;
  }
}

</style>