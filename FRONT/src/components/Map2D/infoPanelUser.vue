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

.infoPanel-header {
  font-family: Syne, Helvetica, sans-serif;
  font-size: 15px;
  width: 100%;
  text-align: center;
}

.infoPanel-content {
  font-family: "DM Sans Medium", Syne, Helvetica, sans-serif;
  width: 100%;

  margin-top: 10px;
}

button {
  background-color: #786385;
  backdrop-filter: blur(10px);
  border: none;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
  font-family: "DM Sans Medium", Syne, Helvetica, sans-serif;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

button:hover {
  background-color: #584169;
}

.infoPanel-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}




</style>