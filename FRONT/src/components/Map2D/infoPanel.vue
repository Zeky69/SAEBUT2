<template>
  <div v-if=" !(feature.properties.accept && feature.properties.apartient === prestataire.id_prestataire)">
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
          <td>{{providername}}</td>
        </tr>
        <tr>
          <th>Nom du terrain</th>
          <td>{{feature.properties.name}}</td>
        </tr>
        <tr>
          <th>Description</th>
          <td>{{feature.properties.description}}</td>
        </tr>

        </tbody>
      </table>


      <p class="description">{{feature.properties.description}}</p>

    </div>
    <div class="infoPanel-footer">

      <button  @click="btnClicked"  :disabled="feature.properties.apartient !== prestataire.id_prestataire && feature.properties.apartient !== null  ">{{feature.properties.apartient === null  ? "Réserver" : feature.properties.accept && feature.properties.apartient === prestataire.id_prestataire ? "Liberer" : !feature.properties.accept && feature.properties.apartient === prestataire.id_prestataire ? "Annuler la demande ": "Indisponible" }} </button>

      <button @click="closePanel">Fermer</button>
  </div>
  </div>
  <div v-else>
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
          <td>{{providername}}</td>
        </tr>
        <tr>
          <th>Nom du terrain</th>
          <td><input type="text" v-model="newfeature.properties.name" ></td>
        </tr>

        <tr>
          <th>Description</th>
          <td><input type="text" v-model="newfeature.properties.description" ></td>
        </tr>

        </tbody>
      </table>


      <p class="description">{{feature.properties.description}}</p>

    </div>
    <div class="infoPanel-footer">
      <button @click="updateFeature">Modifier</button>

      <button  @click="btnClicked"  :disabled="feature.properties.apartient !== prestataire.id_prestataire && feature.properties.apartient !== null  ">{{feature.properties.apartient === null  ? "Réserver" : feature.properties.accept && feature.properties.apartient === prestataire.id_prestataire ? "Liberer" : !feature.properties.accept && feature.properties.apartient === prestataire.id_prestataire ? "Annuler la demande ": "Indisponible" }} </button>

      <button @click="closePanel">Fermer</button>
    </div>
  </div>

</template>

<script>
export default {
  name: "infoPanel",
  props: ["prestataire", "providers", "feature"],
  computed: {

    providername() {
      if (this.feature.properties.apartient === null) {
        return "Libre";
      } else {
        for (let i = 0; i < this.providers.length; i++) {
          if (this.providers[i].id_prestataire === this.feature.properties.apartient) {
            return this.providers[i].nom;
          }
        }
        return "Inconnu";
      }
    }

  },
  data() {
    return {
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
    };
  },
  watch: {

    'feature': function () {
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

    }
  },


  mounted() {
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
  },
  methods: {
    closePanel() {
      this.$emit("close-panel");
    }, btnClicked() {
      if (this.feature.properties.apartient === null) {
        this.$emit("ask", this.feature.properties.id);
      } else if (this.feature.properties.apartient === this.prestataire.id_prestataire) {
        this.$emit("free", this.feature.properties.id);
      }
    },
    updateFeature() {
      this.$emit("edit-feature", this.newfeature);
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