<template>
    <div class="title">
        <h1 id="title">{{ title }}</h1>
    </div>
</template>

<script>
export default{
    name: "PageTitre",
    props: {
        title: String
    }
}

</script>

<style scoped>
#title{
    font-size: 3rem;
  text-align: left;
  background: linear-gradient(179deg, #543C64 -58.62%, #868CD1 99.12%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>