<template>
  <div class="presentationCards">
    <PresentationCard
        :image1="require('../assets/pageAccueil/multiple-cards/image1-1.png')"
        :image2="require('../assets/pageAccueil/multiple-cards/image1-2.png')"
        title="Rejoignez la Belforaine LAN Fest !"
        content="Des tournois de jeu inoubliables vous attendent à LAN Fest, le paradis des gamers à Belforaine. Défiez vos amis, mesurez vos compétences et plongez dans l'action multijoueur ultime !"
        buttonText="Je fonce !"
    />
    <PresentationCard
        :image1="require('../assets/pageAccueil/multiple-cards/image2-2.png')"
        :image2="require('../assets/pageAccueil/multiple-cards/image2-1.png')"
        title="Découvrez nos aventures !"
        content="Nos attractions sont en constante évolution. Des montagnes russes trépidantes aux spectacles surprenants, plongez dans un univers en perpétuelle transformation."
        buttonText="Je veux essayer !"
        :isSolo="true"
    />
    <PresentationCard
        :image1="require('../assets/pageAccueil/multiple-cards/image3-1.png')"
        :image2="require('../assets/pageAccueil/multiple-cards/image3-2.png')"
        title="Goûtez aux Saveurs du Futur"
        content="Nos restaurants vous transportent dans le futur culinaire avec des plats innovants, des saveurs exotiques et des expériences de restauration uniques."
        buttonText="Réserver une table"
    />
  </div>
</template>

<script>
import PresentationCard from "@/components/PresentationCard.vue";

export default {
  components: {
    PresentationCard,
  },
};
</script>

<style scoped>

.presentationCards{
  display: flex;
  flex-direction: column;
  gap: 40px;
}

</style>