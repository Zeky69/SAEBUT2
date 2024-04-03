<template>
<div class="all-container-commantaire">
  <div class="global-container-commentaire">
    <div class="header-container">
      <h1>Commentaire</h1>
    </div>
    <div class="commentaire-container">
      <div v-for="(item, index) in commentaires" :key="index" class="line-commentaire">
        <LineCommentaire :commentaire="item"></LineCommentaire>
      </div>
    </div>
    <div v-if="disabled" class="form-commentaire">
      <div>
        <h1>Donnez votre avis</h1>
      </div>
      <div class="form">
        <div class="nom-container">
      <label for="nom">Nom: </label>

      <input v-model="nom" id="nom" type="text" placeholder="Nom">
        </div>
        <div> <span v-for="(item , index) in 5"  @click="clickedRating(item+1)"  @mouseenter="hoverRating(item+1)" @mouseleave="hoverRating(0)"  :key='index' :class="rating[0] > item || rating[1] > item  ? 'checked':'' "  style="cursor: pointer"  class="fa fa-star etoile"></span> </div>
      </div>
        <textarea v-model="commentaire" id="commentaire" placeholder="Le commentaire"></textarea>
        <button @click="sendCommentaire" class="btn-send">Envoyer</button>
    </div>

  </div>
</div>
</template>

<script >
import {getCommentaireIdPrestataire, sendCommentaire} from "@/services/commentaire.service";
import LineCommentaire from "@/components/LineCommentaire.vue";

export default {
  name: "CommentaireComponent",
  components: {LineCommentaire},
  props: {
    id_prestataire: {
      type: Number,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  data: () =>  ({
    commentaires: [],
  rating: [0,0],
    nom: '',
    commentaire: '',

  }),
  methods: {
    clickedRating(i){
      this.rating.splice(0,1,i);
    },
    hoverRating(i){
      this.rating.splice(1,1,i);
    },
    sendCommentaire(){
      if (this.rating[0] !== 0 && this.nom !== '' && this.commentaire !== '' ){
        sendCommentaire({
          id_prestataire: this.id_prestataire,
          nom: this.nom,
          commentaire: this.commentaire,
          note: this.rating[0]-1,
          }).then((res) => {
            console.log(res);
            this.commentaires.push(res);
            })

        this.rating.splice(0,1,0);
        this.rating.splice(1,1,0);
        this.nom = '';
        this.commentaire = '';
    }},




  },created() {
    console.log(this.id_prestataire);
    getCommentaireIdPrestataire(this.id_prestataire).then((res) => {
      console.log(res);
      this.commentaires = res;
      console.log(this.commentaires);
    });
  },

}

</script>


<style scoped>
.all-container-commantaire{
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}
.global-container-commentaire{
  width: 80%;
  background-color: rgba(77, 82, 166, 0.62);
  height: fit-content;
  border-radius: 20px;
  padding: 50px;

}

#commentaire{
  width: 100%;
  height: 100px;
  border-radius: 10px;
  border: none;
  background-color: rgba(255, 255, 255, 0.39);
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 20px;

  font-family: "DM Sans Medium", Syne, Helvetica, sans-serif;
}

#nom{
  width: 200px;
  height: 30px;
  border-radius: 10px;
  border: none;
  background-color: rgba(255, 255, 255, 0.39);
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 20px;


  font-family: "DM Sans Medium", Syne, Helvetica, sans-serif;
}
.form-commentaire {
  display: flex;
  flex-direction: column;
  padding: 50px;

}

.form-commentaire h1{
  color: rgba(77, 82, 166, 0.81);
  font-family: "DM Sans Medium", Syne, Helvetica, sans-serif;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 0;
  text-align: left;
  margin: 10px 10px 10px 0;
}
.nom-container{
  padding-right: 20px;
}

.etoile{
  color: rgba(255, 255, 255, 0.39);
  font-size: 30px;
  margin: 0 5px;
}

.checked {
  color: orange;
}

.form{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;
  margin-bottom: 5px;

}

.btn-send{
  border: none;
  background: #A361BF;
  border-radius: 25px;
  color: #FFF;
  font-family: "DM Sans", Syne, Helvetica, sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 10px 50px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
  margin-bottom: 20px;
  width: 200px;
  margin-left: 10px;
}

.btn-send:hover{
  background: rgba(163, 97, 191, 0.82);
}

.btn-send:active{
  background: #8e54a6;
}

</style>