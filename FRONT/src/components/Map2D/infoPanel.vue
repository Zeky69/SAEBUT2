<template>
  <div>
    <div class="infoPanel-header">
      <h1>Informations</h1>
    </div>
    <div class="infoPanel-content">
      <table>
        <tbody>
        <tr>
          <th>Type terrain</th>
          <td>{{feature.properties.typeTerrain}}</td>
        </tr>
        <tr>
          <th>Propriétaire</th>
          <td>{{feature.properties.apartient ? feature.properties.apartient : "Libre"}}</td>
        </tr>
        <tr>
          <th>Surface</th>
          <td>{{calculatePolygonArea(convertCoordinatesToMeters(feature.geometry))}} m²</td>
        </tr>
        </tbody>
      </table>


      <p class="description">{{feature.properties.description}}</p>

    </div>
    <div class="infoPanel-footer">

      <button v-if="(feature.properties.apartient === null || (feature.properties.apartient === prestataire.id_prestataire && feature.properties.accept ) )  " @click="btnClicked"  :disabled="feature.properties.apartient !== prestataire.id_prestataire && feature.properties.apartient !== null  ">{{feature.properties.apartient === null  ? "Réserver" : feature.properties.accept && feature.properties.apartient === prestataire.id_prestataire ? "Liberer" : !feature.properties.accept && feature.properties.apartient === prestataire.id_prestataire ? "En attente ": "Indisponible" }} </button>

      <button @click="closePanel">Fermer</button>
  </div>
  </div>
</template>

<script>
export default {
  name: "infoPanel",
  props: ["prestataire" , "feature"],
  methods: {
    closePanel() {
      this.$emit("close-panel");
    },btnClicked() {
      if(this.feature.properties.apartient === null){
        this.$emit("ask", this.feature.id);
      }else if (this.feature.properties.apartient === this.prestataire.id_prestataire ){
        this.$emit("free", this.feature.id);
      }
    },
    convertCoordinatesToMeters(coordinates) {
      const EARTH_RADIUS = 6371000;

      return coordinates.map(coord => {
        const latitude = coord[0] * (Math.PI / 180);
        const longitude = coord[1] * (Math.PI / 180);

        const x = EARTH_RADIUS * Math.cos(latitude) * Math.cos(longitude);
        const y = EARTH_RADIUS * Math.cos(latitude) * Math.sin(longitude);

        return [x, y];
      });
    },
    calculatePolygonArea(coordinates) {
  const n = coordinates.length;
  let area = 0;

  for (let i = 0; i < n - 1; i++) {
    area += (coordinates[i][0] * coordinates[i + 1][1]) - (coordinates[i + 1][0] * coordinates[i][1]);
  }

  area = Math.abs(area) / 2.0;

  return parseInt(area+"");
},

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