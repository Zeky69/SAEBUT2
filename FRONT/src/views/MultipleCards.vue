<template>
  <div class="presentationCards">
    <PresentationCard
        :image1="require('../assets/pageAccueil/multiple-cards/image1-1.png')"
        :image2="require('../assets/pageAccueil/multiple-cards/image1-2.png')"
        :title="$t('presentationCards[0].title')"
        :content="$t('presentationCards[0].content')"
        :buttonText="$t('presentationCards[0].buttonText')"
    />
    <PresentationCard
        :image1="require('../assets/pageAccueil/multiple-cards/image2-2.png')"
        :image2="require('../assets/pageAccueil/multiple-cards/image2-1.png')"
        :title="$t('presentationCards[1].title')"
        :content="$t('presentationCards[1].content')"
        :buttonText="$t('presentationCards[1].buttonText')"
        :isSolo="true"
    />
    <PresentationCard
        :image1="require('../assets/pageAccueil/multiple-cards/image3-1.png')"
        :image2="require('../assets/pageAccueil/multiple-cards/image3-2.png')"
        :title="$t('presentationCards[2].title')"
        :content="$t('presentationCards[2].content')"
        :buttonText="$t('presentationCards[2].buttonText')"
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