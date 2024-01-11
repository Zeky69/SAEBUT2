<template>
    <div class="bouton">
        <button @click="changeLanguage">
            <span class="flag-icon" :class="{ 'flag-fr': $i18n.locale === 'fr', 'flag-en': $i18n.locale === 'en' }"></span>
        </button>
    </div>
</template>
  
<script>
export default {
    name: 'TranslateTool',
    methods: {
        changeLanguage() {
            this.$i18n.locale = this.$i18n.locale === 'fr' ? 'en' : 'fr';
        },
    },
};
</script>
  
<style lang="scss" scoped>
.bouton {
    display: flex;
    align-items: center;
}

button {
    background-color: transparent;
    color: #fff;
    border: none;
    padding: 0px 15px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    transform: translateY(2px);

    .flag-icon {
        width: 1.8rem;
        height: 1.8rem; 
        display: inline-block;
        background-size: cover;
    }

    .flag-fr {
        background-image: url('@/assets/icons/fr.svg'); // Chemin vers le fichier SVG du drapeau français
    }

    .flag-en {
        background-image: url('@/assets/icons/us.svg'); // Chemin vers le fichier SVG du drapeau anglais
    }
}
</style>
