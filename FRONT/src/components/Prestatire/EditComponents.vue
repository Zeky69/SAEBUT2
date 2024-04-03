<template>
  <div class="PrestataireProfile">
    <div class="modification">
      <div class="edit-image card">
        <img :src="photoDeProfilChoisi" id="photo-profil" >
        <label for="images" class="drop-container" id="dropcontainer">
          <span class="drop-title">Déposez votre photo ici !</span>
          or
          <input type="file" @change="onFileSelected" id="images" accept="image/*" ref="imageInput" enctype="multipart/form-data"/>

        </label>


        <button class="btn accept-btn" @click="changeImage">Valider</button>
      </div>

      <div class="edit-content card">
        <h2>Informations personnelles</h2>

        <!-- Label and Input for Nom de l'entreprise -->
        <div class="input-content">
          <label for="nomEntreprise">Nom de l'entreprise:</label>
          <input type="text" :disabled="!isEditing" v-model="nomEntreprise" placeholder="Entrez le nom de l'entreprise"
                 id="nomEntreprise">
        </div>

        <!-- Label and Input for Description -->
        <div class="input-content">
          <label for="description">Description:</label>
          <input type="text" :disabled="!isEditing" v-model="description" placeholder="Entrez la description"
                 id="description">
        </div>

        <div class="input-content">
          <label for="email">Email:</label>
          <input type="text" :disabled="!isEditing" v-model="email" placeholder="Entrez la description"
                 id="email">
        </div>


        <!-- Label and Input for Prénom -->
        <div class="input-content">
          <label for="prenom">Prénom:</label>
          <input type="text" :disabled="!isEditing" v-model="prenom" placeholder="Entrez le prénom" id="prenom">

        </div>


        <!-- Label and Input for Nom -->
        <div class="input-content">

          <label for="nom">Nom:</label>
          <input type="text" :disabled="!isEditing" v-model="nom" placeholder="Entrez le nom" id="nom">
        </div>

        <!-- Label and Input for Mot de passe -->
        <div class="input-content">
          <label for="motDePasse">Mot de passe:</label>
          <form id="myForm">
            <input :type="showPassword ? 'text' : 'password'" :disabled="!isEditing" v-model="motDePasse" autocomplete="off" placeholder="Entrez le mot de passe" id="motDePasse" form="myForm">
          </form>

        </div>
        <div v-if="isEditing" class="show-pass"><input type="checkbox" @click="toggleShowPassword">{{textPassword}}</div>


        <!-- Edit button to toggle editing state -->
        <div v-if="!isEditing">
          <button class="btn edit-btn" @click="toggleEditing">Éditer</button>
        </div>
        <div class="validation" v-else>
          <button class="btn reject-btn" @click="cancel">Annuler</button>
          <button class="btn accept-btn" @click="accept">Valider</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import {updatePrestataire} from "@/services/prestataire.service";
import {getImage,uploadImage,deleteImage} from "@/services/image.service"

export default {
  name: 'EditComponents',
  data: () => ({
    nomEntreprise: '',
    description: '',
    photoDeProfil: '',
    photoDeProfilChoisi: null,
    photoChoisiName:'',
    prenom: '',
    nom: '',
    motDePasse: '',
    isEditing: false, // New state to track editing mode
    showPassword:false,
    textPassword:'Afficher mot de passe',
    file:null
  }),
  computed: {
    ...mapState(['lname', 'fname', 'email', 'user_id', 'prestataireObject']),
  },
  methods: {
    ...mapActions(['getPrestataireObject']),
    async getInformation() {
      await this.getPrestataireObject(this.user_id);
      const presta = this.prestataireObject;

      this.nomEntreprise = presta.nom;
      this.description = presta.description;

      this.photoDeProfil = presta.photo_profil;
      this.photoChoisiName = this.photoDeProfil;
      this.photoDeProfilChoisi = getImage(this.photoChoisiName);


      this.prenom = this.fname;
      this.nom = this.lname;
    },
    onFileSelected(eve) {
      this.file = eve.target.files[0];
      this.photoChoisiName = this.file.name;
      this.photoDeProfilChoisi = URL.createObjectURL(this.file);
    },
    toggleEditing() {
      this.isEditing = !this.isEditing;
    },
    toggleShowPassword(){
      this.showPassword = !this.showPassword;
      if(!this.showPassword)
        this.textPassword= 'Afficher mot de passe';
      else
        this.textPassword ='Cacher mot de passe';
    },cancel(){
      this.isEditing = false;
      this.getInformation();
    },changeImage() {
      try {
        if(this.photoDeProfil){
          deleteImage(this.photoDeProfil)
          this.photoDeProfil="";
        }
        if(this.file){
          this.photoDeProfil = this.photoChoisiName;
          uploadImage(this.file);
        }
        this.accept();
      } catch (error) {
        console.error("Une erreur est survenue lors du changement d'image:", error.message);
      }
    },
    async accept(){
      const data={
        nomEntreprise:this.nomEntreprise,
        description : this.description,
        photoDeProfil: this.photoDeProfil,
        prenom:this.prenom,
        nom:this.nom,
        email:this.email,
        motDePasse:this.motDePasse
      };

      try {
        await updatePrestataire(this.user_id,data)
        this.isEditing=false;
      } catch (error) {
        console.error("Error managing user:", error);
      }

    }
  },
  mounted() {
    this.getInformation();
  },
};
</script>

<style scoped>
.PrestataireProfile {

}

.modification {
  display: flex;
  margin: 2%;
  height: 800px;
  gap: 30px;
}

.card {
  border-radius: 30px;
  backdrop-filter: blur(16px) saturate(94%);
  -webkit-backdrop-filter: blur(16px) saturate(94%);
  background-color: rgba(255, 255, 255, 0.67);
  border: 1px solid rgba(255, 255, 255, 0.125);
}

.edit-image {
  padding: 2%;
  flex: 1.3;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6%;
}

#photo-profil {
  width: 70%;
  height: 60%;
  border-radius: 1000px;
  object-fit: cover;
  object-position: center;
}

input[type=file]{
  border: 1px solid black;
  border-radius: 10px;

}

input[type=file]::file-selector-button {
  margin-right: 20px;
  border: none;
  background: #084cdf;
  padding: 10px 20px;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: background .2s ease-in-out;
}

input[type=file]::file-selector-button:hover {
  background: #0d45a5;
}

.drop-container {
  position: relative;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 150px;
  padding: 20px;
  border-radius: 10px;
  border: 2px dashed #555;
  color: #444;
  cursor: pointer;
  transition: background .2s ease-in-out, border .2s ease-in-out;
}

.drop-container:hover {
  background: #eee;
  border-color: #111;
}

.drop-container:hover .drop-title {
  color: #222;
}

.drop-title {
  color: #444;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  transition: color .2s ease-in-out;
}
.edit-content {
  padding: 5%;
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
}

.input-content{
  width: 100%;
}

.input-content label {
  margin-bottom: 8px;
  display: block;
}

.input-content input {
  width: 100%;
  padding: 8px;
}


.validation {
  display: flex;
  width: 103%;
  justify-content: space-between;
}

.show-pass{
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.accept-btn {
  background-color: $purple;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  opacity: 0.6;
  margin-top: auto;
  margin-bottom: auto;
  background: rgba(255, 255, 255, 0.23);
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border: 1px solid rgba(116, 116, 116, 0.43);

  border-color: rgb(65, 147, 65);
  color: rgb(65, 147, 65);

  padding: 0.5rem 4rem;
  font-size: 16px;

  &:hover {
    background-color: rgb(67, 152, 70);
    color: white;
  }
}

.reject-btn {
  background-color: $purple;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  opacity: 0.6;
  margin-top: 5%;
  margin-bottom: auto;
  background: rgba(255, 255, 255, 0.23);
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border: 1px solid rgba(116, 116, 116, 0.43);

  border-color: rgb(142, 58, 58);
  color: rgb(142, 58, 58);

  padding: 0.5rem 4rem;
  font-size: 16px;

  &:hover {
    background-color: rgb(173, 84, 84);
    color: white;
    transition: color 0.2s ease-in-out;
  }
}

.edit-btn {
  background-color: $purple;
  padding: 0.5rem 5rem;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  opacity: 0.6;
  margin-top: auto;
  margin-bottom: auto;
  background: rgba(255, 255, 255, 0.23);
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border: 1px solid #FEB42D;
  color: #FEB42D;

  &:hover {
    background-color: #FEB42D;
    color: white;
    transition: color 0.2s ease-in-out;  }
}
</style>