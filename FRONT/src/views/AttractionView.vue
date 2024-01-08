<template>
  <div class="articles-pages">

    <div class="page-banner">
      <div class="image-container">
        <div class="blurred-image"></div>
        <div class="sharp-image"></div>
      </div>
      <div class="text">
        <p class="title">Nom de la catégorie</p>
        <p class="subtitle">Petite description en fonction de la catégorie</p>
      </div>
    </div>

    <div class="page">

      <div class="filter">

        <div class="recherche">
          <label for="site-search">Nom :</label>
          <input type="search" id="site-search" placeholder="Rechercher article" />
        </div>

        <div class="prix">

        </div>




      </div>

      <div class="articles">

      </div>

    </div>


  </div>
</template>

<script>
</script>

<style scoped>
.articles-pages{
  font-family: "DM Sans";
  color: #000000;
}

.page-banner {
  position: relative;
  height: 30em;
  margin-bottom: 4em;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.sharp-image {
  background: url(../assets/fondFeteForaine.png) no-repeat center center fixed;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  filter: brightness(40%) blur(9px);
  padding-bottom: 1.5em;
}


.blurred-image {
  background: url(../assets/fondFeteForaine.png) no-repeat center center fixed;
  background-size: cover;
  width: 100%;
  height: 100%;
  z-index: 2;
  padding-bottom: 1.5em;
}


.text {
  position: absolute;
  top: 60%;
  left:5%;
  text-align: left;
  text-align: left;
  color: white;
  z-index: 3;
}

.title {
  font-size: 3.5em;
  margin-bottom: 0.5em;
  font-weight: bold;
}

.subtitle {
  font-size: 2em;
  font-family: Syne;
  margin-bottom: 1em;
}


.page{
  display: flex;
  flex-direction: row;
  margin: 1%;

}

.filter{
  width: auto;
  border: 2px solid cyan;
  height: 100px;
  flex: 1;}

.articles{
  width: auto;
  border: 2px solid red;
  height: 100px;
  flex: 2.5;

}

.recherche{
  display: flex;
  flex-direction: column;
  gap : 5px;
  width:85%;
  font-size: 15px;
}

#site-search{
  border-radius: 5px;
  border: none;
  background-color: #c6c6c6;
  color: #000000;
  padding: 3%;


}

</style>