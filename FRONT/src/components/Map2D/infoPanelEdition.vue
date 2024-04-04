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
        <tr>

          <th>Type terrain</th>
          <td>
          <select v-model=newfeature.properties.typeTerrain name="types" id="types">
            <option v-for="(type , index) in types"  :key="index" :value=type.value :selected="type.value == feature.properties.typeTerrain">{{type.libelle}}</option>
          </select>
          </td>
        </tr>
        <tr>
          <th>Propriétaire</th>
          <td>
          <select v-model=newfeature.properties.apartient name="providers" id="providers">
            <option value=null :selected="feature.properties.apartient === null">Libre</option>
            <option v-for="(provider , index) in providers" :key="index" :value=provider.id_prestataire :selected="provider.id_prestataire == feature.properties.apartient" >{{provider.nom}}</option>
          </select>
          </td>
        </tr>

        <tr>
          <th>Etat</th>
          <td>
            <label for="accept"></label>
            <input id="accept" type="checkbox" v-model="newfeature.properties.accept"   >
          </td>
        </tr>



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
     "typeTerrain": this.feature.properties.typeTerrain,
     "apartient": this.feature.properties.apartient,
      "accept": this.feature.properties.accept

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
         "typeTerrain": null,
       "apartient": null,
        "accept": false
      }
    },
    filteredProvider: []
  })

,
  watch: {

    feature: {
      handler: function () {

        this.newfeature = {
          "geometry": this.feature.geometry,
          "properties": {
            "id": this.feature.properties.id,
            "name": this.feature.properties.name,
            "description": this.feature.properties.description,
            "typeTerrain": this.feature.properties.typeTerrain,
            "apartient": this.feature.properties.apartient,
            "accept": this.feature.properties.accept
          }
        }
        console.log(this.newfeature);
      },
      deep: true
    },
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