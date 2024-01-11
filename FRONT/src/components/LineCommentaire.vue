

<template>
<div class="all-container-line-commentaire">
  <div class="header">
    <span v-for="(item , index) in 5" :key="index" class="fa fa-star" :class="index < commentaire.note ? 'checked' : ''"></span>
  </div>
  <div>
    <div>
      <span class="name" >{{commentaire.nom}}</span>
      <span class="date">{{calculerTempsEcoule(commentaire.date_commentaire)}}</span>
    </div>
    <div>
      <p class="contenu-commentaire" >{{commentaire.commentaire}}</p>
    </div>
  </div>
</div>
</template>
<script >

export default {
  name: "LineCommentaire",
  props: {
    commentaire: {
      type: Object,
      required: true,
    },
  },
  methods: {
    calculerTempsEcoule(dateEnvoi) {
      if (!dateEnvoi) {
        return '';
      }
      dateEnvoi = new Date(dateEnvoi);


      const maintenant = new Date();
      const difference = maintenant - dateEnvoi;

      const secondes = Math.floor(difference / 1000);
      const minutes = Math.floor(secondes / 60);
      const heures = Math.floor(minutes / 60);
      const jours = Math.floor(heures / 24);

      if (jours > 0) {
        return `il y a ${jours} jour${jours > 1 ? 's' : ''}`;
      } else if (heures > 0) {
        return `il y a ${heures} heure${heures > 1 ? 's' : ''}`;
      } else if (minutes > 0) {
        return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
      } else if (secondes > 0) {
        return `il y a ${secondes} seconde${secondes > 1 ? 's' : ''}`;
      }else {
        return 'à l\'instant';
      }
  },

}
}

</script>

<style scoped>
.all-container-line-commentaire{
  width: 100%;
    height: fit-content;
  box-sizing: border-box;
  display: flex;
  margin: 20px 0;
}
.header{
  width: fit-content;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
}

.name{
  font-family: "DM Sans Medium", Syne, Helvetica, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding: 0;
  color: rgba(77, 82, 166, 0.81);
  text-align: left;
  margin: 10px 10px 10px 0;
}

.contenu-commentaire{
  text-align: justify;
}

.date{
  color: rgba(255, 255, 255, 0.39);
}


.checked {
  color: orange;
}





</style>