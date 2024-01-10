<template>
  <div >
    <div class="infoPanel-header">
      <h1>Informations</h1>
    </div>
    <div class="infoPanel-content">
      <table>
        <tbody>
        <tr>
          <th>Nom</th>
          <td><input v-model=newfeature.properties.name type="text" name="name" id="name"></td>
        </tr>
        <tr>
          <th>Description</th>
          <td><input v-model=newfeature.properties.description type="text" name="description" id="description"></td>
        </tr>
<!--        <tr>-->

<!--          <th>Type terrain</th>-->
<!--          <td>-->
<!--          <select v-model=newfeature.properties.typeTerrain name="types" id="types">-->
<!--            <option v-for="(type , index) in types"  :key="index" :value=type :selected="type === feature.properties.typeTerrain">{{type}}</option>-->
<!--          </select>-->
<!--          </td>-->
<!--        </tr>-->
<!--        <tr>-->
<!--          <th>Propriétaire</th>-->
<!--          <td>-->
<!--          <select v-model=newfeature.properties.apartient name="providers" id="providers">-->
<!--            <option value=null :selected="feature.properties.apartient === null">Libre</option>-->
<!--            <option v-for="(provider , index) in filteredProvider" :key="index" :value=provider :selected="provider ===feature.properties.apartient" >{{provider}}</option>-->
<!--          </select>-->
<!--          </td>-->
<!--        </tr>-->
<!--        <tr>-->
<!--          <th>Surface</th>-->
<!--          <td>{{calculatePolygonArea(convertCoordinatesToMeters(feature.geometry))}} m²</td>-->
<!--        </tr>-->
        </tbody>
      </table>

    </div>
    <div class="list-btn">

      <button class="btn-green"  @click="editPolygon">Modifier</button>
      <button class="btn-red" @click="delPolygon">Supprimer</button>
      <button class="btn-yellow" @click="closePanel">Fermer</button>
  </div>
  </div>
</template>
<script>

export default {
  name: "infoPanel-Edition",
  props: ["feature","types","providers"],
  mounted() {
    this.newfeature ={
      "geometry": this.feature.geometry,
      "properties": {
      "id": this.feature.properties.id,
      "name": this.feature.properties.name,
      "description": this.feature.properties.description,
      // "typeTerrain": this.feature.properties.typeTerrain,
      // "apartient": this.feature.properties.apartient,
    }
  }
  }
,

  data:() => ({
    newfeature: {
      "geometry": [],
      "properties": {
        "id": null,
        "name": null,
        "description": null,
        // "typeTerrain": null,
        // "apartient": null,
      }
    },
    filteredProvider: []
  })

,
  watch: {
    // 'newfeature.properties.typeTerrain': function () {
    //   // Watch for changes in newfeature.properties.typeTerrain
    //   // and update filteredProvider accordingly
    //   this.filterProvider();
    // },
    'feature': function (){
      this.newfeature ={
        "geometry": this.feature.geometry,
        "properties": {
          "id": this.feature.properties.id,
          "name": this.feature.properties.name,
          "description": this.feature.properties.description,
          // "typeTerrain": this.feature.properties.typeTerrain,
          // "apartient": this.feature.properties.apartient,
        }
      }

    }
  },
  methods: {
    closePanel() {
      this.$emit("close-panel");
    },
    editPolygon(){
      this.$emit("edit-feature", this.feature , this.newfeature);
    },
    delPolygon(){
      this.$emit("del-feature", this.feature);
    }

  ,
    filterProvider(){
      for (let i = 0; i < this.types.length; i++) {
        if(this.types[i] === this.newfeature.properties.typeTerrain){
          this.filteredProvider = this.providers[i];

        }
      }
    }
  ,
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

.btn-yellow {
  background-color: #FEB42D;
  color: white;
  font-weight: bold;
  border-radius: 50px;
padding: 5px 10px;
  border: none;
  cursor: pointer;
  margin: 5px 5px;
  width: fit-content;

}
.btn-red {
  background-color: #e70000;
  color: white;
  font-weight: bold;
  width: fit-content;
  border-radius: 50px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  margin: 5px 5px;
}
.btn-green{
  background-color: #458d09;
  color: white;
  font-weight: bold;
  border-radius: 50px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  margin: 5px 5px;
  width: fit-content;

}
.list-btn{
  display: flex;
  flex-direction: row;
}

button:disabled {
  background-color: #d0d0d0;
  color: white;
  font-weight: bold;
  border-radius: 50px;
  border: none;
  cursor: pointer;
}





</style>