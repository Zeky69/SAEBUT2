<template>
  <div class="grosseCard" :class="{ solo: isSolo }">
    <img :src="image1">
    <img class="imageMilieu" :src="image2">
    <div class="mini-card" :class="{ solo: isSolo }">
      <div class="mini-card-header">
        <h3>{{ title }}</h3>
      </div>
      <div class="mini-card-content">
        <p>{{ content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image1: String,
    image2: String,
    title: String,
    content: String,
    buttonText: String,
    isSolo: Boolean,
  },
};
</script>

<style scoped>

.grosseCard{
  display: flex;
  padding-left: 4%;
  gap: 20px;
  box-sizing: border-box;
}

.grosseCard.solo{
  display: flex;
  flex-direction: row-reverse;
  padding-right:4%;

}

.mini-card{
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;
  height: 240px;
  border-radius: 0 40px 40px 0;
  background-color: #553C65;
  color: white;
  font-family: "DM Sans";
  padding: 2%;
}

.mini-card.solo{
  background-color: #2c3e50;
  border-radius: 40px 0 0 40px;



}

.mini-card-header{
  font-size: 25px;
}

.mini-card-content{
  text-align: justify;
  font-size: 20px;
}

.grosseCard img{
  width: 200px;
}

.btns {
  width: 30%;
  font-size: 22px;
  background-color: white;
  padding: 1% 2%;
  color: #553C65;
  border-radius: 10px;
  text-align:center;
}

@media screen and (max-width: 1030px) {

  .title-card {
    margin: 25px 0 20px 50px;
  }
  .list-info{
    margin: 0;
  }

  .card-wrap{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }

  .card{
    width: 90%;
    height: auto;
    display: flex;
    border: solid 1px rgba(255, 255, 255, 0.2) !important;
    border-radius: 30px !important;
    backdrop-filter: blur(10px);
    background-color: rgba(23, 35, 49, 0.4);
    margin-top: 10px;
  }

  .card-wrap{
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



  .card hr{
    display: none;
  }


  .presentationCards h2{
    font-size: 34px;
  }

  .mini-card{
    width: 550px;
    height: 180px;
  }


  .btns {
    width: 20%;
    font-size: 14px;
  }

  .mini-card-header{
    font-size: 16px;
  }

  .mini-card-content{
    text-align: justify;
    font-size: 13px;
  }



}

@media screen and (max-width: 900px){


  .imageMilieu{
    display: none;
  }


}

@media all and (max-width: 730px) {

  .contenuHautDePage h1 {
    font-size: 25px;
  }

  .contenuHautDePage p {
    font-size: 10px;
  }

  .textePresentatif h2 {
    font-size: 30px;
  }

  .textePresentatif p {
    font-size: 15px;
  }

}

@media screen and (max-width: 430px){

  .presentationCards h2{
    font-size: 20px;
  }

  .mini-card{
    width: 600px;
    height: 180px;
  }


  .btns {
    width: 40%;
    font-size: 10px;
  }

  .mini-card-header{
    font-size: 12px;
  }

  .mini-card-content{
    text-align: justify;
    font-size: 8px;
  }

  .grosseCard img{
    width: 150px;
  }



}

</style>