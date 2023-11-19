<template>
  <div >
    <div class="infoPanel-header">
      <h1>{{feature.properties.name}}</h1>
    </div>
    <div class="infoPanel-content">
      <p class="description">{{feature.properties.description}}</p>

    </div>
    <div class="infoPanel-footer">
      <button @click="closePanel">Fermer</button>
  </div>
  </div>
</template>

<script>
export default {
  name: "infoPanelUser",
  props: ["feature"],
  methods: {
    closePanel() {
      this.$emit("close-panel");
    }


},
}
</script>


<style scoped>

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  text-align: left;
  padding: 8px;
}


tr:nth-child(odd) {
  background-color: #f2f2f2;}

.description{
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 15px;

}

button {
  background-color: #FEB42D;
  color: white;
  font-weight: bold;
  border-radius: 50px;
  padding: 4% 20%;
  border: none;
  cursor: pointer;
  margin: 5px 0;
}
button:disabled {
  background-color: #d0d0d0;
  color: white;
  font-weight: bold;
  border-radius: 50px;
  padding: 4% 20%;
  border: none;
  cursor: pointer;
}





</style>