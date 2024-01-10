<template>
    <button @click="changeLanguage">{{ $t('changeLanguageButton') }}</button>
</template>

<script>
export default {
    name: 'TranslateTool',
    methods: {
        changeLanguage() {
            this.$i18n.locale = this.$i18n.locale === 'fr' ? 'en' : 'fr';
        }
    }
}
</script>

<style lang="scss" scoped>
button {
    background-color: #1d061a;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}