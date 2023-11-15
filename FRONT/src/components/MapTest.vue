<template>
  <div id="container" style="background-color: #D9D9D9; width: 90vw; height: 900px; max-width: 90vw; margin: 5vw; overflow: hidden; display: flex;" >
      <div class="scene1" id="scene1" ref="scene1Container">      </div>

    <div class="selectmenu closed" id="selectmenu" >
      <div class="add" id="add">
        <h2 style="margin-top: 40%; margin-bottom: 5%">previsualisation du batiment</h2>
        <div class="scene2" ref="scene2Container" style="height: 30%; width: 100%; background-color: beige; margin-bottom: 15px;"></div>
        <label for="batidInput">Sélectionnez un bâtiment :</label>
        <select id="batidInput" v-model="idbatafficher">
          <option value="0" disabled selected>Sélectionnez un bâtiment</option>
          <option v-for="batimentsolo in batiment" :key="batimentsolo.id" :value="batimentsolo.id">{{ batimentsolo.name }}</option>
        </select>
        <button id="btn1" @click="refreshcalmyfuncpls(1)" class="custom-btn">Place Batiment</button>
      </div>
      <div class="remove" id="remove">
        <button style="margin-top: 45%;" id="btn1" @click="refreshcalmyfuncpls(2)" class="custom-btn">remove Batiment</button>
      </div>
    </div>

  </div>
</template>

<script>
import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';

export default {
  name: 'TestMap',
  data : () => ({
    currentIndex:0,
    idbat: 0,
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    raycaster: null,
    selectedObject: 0,
    asset: [],
    selectab: [],
    children: [],
    batiment: [],
    emp: [],
    selectionables: null,
    light: null,
    ambientLight: null,
    idbatafficher: 0,
    vitrine: null,
    scene2: null,
    camera2: null,
    renderer2: null,
    controls3: null,
    texture_emp: null,
    empGroupe: null,
    groupe_sol: null,
    ambientLightscene2: null,
    scene2Container: null,



  }),
  watch: {
    idbatafficher() {
      // Appeler la fonction batvitrine avec la nouvelle valeur
      this.batvitrine();
    }
  },
  methods: {
      batvitrine() {
        console.log("rentrer dans vitrine")
        console.log("idbat", this.idbatafficher)
        if (this.idbatafficher !== 0) {
          // Retirez tous les enfants de la vitrine
          while (this.vitrine.children.length > 0) {
            this.vitrine.remove(this.vitrine.children[0]);
          }

          // Ajoutez le nouvel objet à la vitrine
          const objet = this.batiment[this.idbatafficher-1].child.clone();
          objet.name = this.batiment[this.idbatafficher-1].child.name;
          objet.material = this.batiment[this.idbatafficher-1].material;
          objet.position.set(0, 0, 0);
          console.log("objet", objet)
          this.vitrine.add(objet);
          console.log("vitrien", this.vitrine)
          console.log("batiment", this.batiment)
          console.log("scene2", this.scene2)
        }
      },

    creationscene2(){
      //test


      setTimeout(() => {
        this.scene2 = new THREE.Scene();
        this.scene2Container = this.$refs.scene2Container;

        this.camera2 = new THREE.PerspectiveCamera(75, this.scene2Container.offsetWidth/this.scene2Container.offsetHeight , 0.1, 1000);
        this.renderer2 = new THREE.WebGLRenderer();
        this.renderer2.setSize(window.innerWidth, window.innerHeight);
        this.scene2Container.appendChild(this.renderer2.domElement);
        this.renderer2.setSize(this.scene2Container.offsetWidth, this.scene2Container.offsetHeight);
        this.controls3 = new OrbitControls(this.camera2, this.renderer2.domElement);
        //mettre un fond blanc
        this.scene2.background = new THREE.Color(0xffffff)

        this.ambientLightscene2 = new THREE.AmbientLight(0x404040);
        this.ambientLightscene2.intensity = 10; // Intensité de la lumière ambiante
        this.scene2.add(this.ambientLightscene2);
        this.controls3.update();
        this.scene2.add(this.vitrine);
        this.camera2.rotation.x = -0.5;
        this.camera2.position.set( 2.5, 5, 4.5 );

      }, 310);
      ////

    },

    deletscene2(){
        this.scene2Container.removeChild(this.scene2Container.firstChild)
    },

    onMouseMove(event) {
      var position = new THREE.Vector2();
      var domRect = this.renderer.domElement.getBoundingClientRect();
      position.x = ((event.clientX - domRect.left) / domRect.width) * 2 - 1;
      position.y = -((event.clientY - domRect.top) / domRect.height) * 2 + 1;

      var temp = this.getSelectionneLePlusProche2(position);

      if(temp == 1){
        this.selectedObject = this.getSelectionneLePlusProche(position);
      }
      else{
        this.selectedObject = 0
      }
      // Vérifier si l'objet est sélectionnable
      if (this.selectedObject != 0) {
        // Changer le curseur en pointeur
        this.renderer.domElement.style.cursor = 'pointer';
      } else {
        // Rétablir le curseur par défaut
        this.renderer.domElement.style.cursor = 'auto';
      }
    },


    getSelectionneLePlusProche(position) {
      // Mise à jour de la position du rayon à lancer.
      this.raycaster.setFromCamera(position, this.camera);
      // Obtenir la liste des intersections
      var selectionnes = this.raycaster.intersectObjects(this.selectionables.children);
      if (selectionnes.length) {
        return selectionnes[0].object;
      }
      else{
        console.log("pas sur un obj")
        return null
      }
    },

    getSelectionneLePlusProche2(position) {
      // Mise à jour de la position du rayon à lancer.
      this.raycaster.setFromCamera(position, this.camera);
      // Obtenir la liste des intersections
      var selectionnes = this.raycaster.intersectObjects(this.selectionables.children);
      if (selectionnes.length) {
        return 1;
      } else {
        console.log("pas sur un obj");
        return 0;
      }
    },


    onMouseClick(event) {
      var position = new THREE.Vector2();
      var domRect = this.renderer.domElement.getBoundingClientRect();
      position.x = ((event.clientX - domRect.left) / domRect.width) * 2 - 1;
      position.y = -((event.clientY - domRect.top) / domRect.height) * 2 + 1;
      var temp = this.getSelectionneLePlusProche2(position);

      if(temp == 1){
        this.selectedObject = this.getSelectionneLePlusProche(position);
      }
      else{
        this.selectedObject = 0
      }


      var originmat;
      var origineColor;
      if(this.selectedObject){
        originmat = this.selectedObject.material.clone();
        origineColor = this.selectedObject.material.color.getHex();
      }



      if (this.selectedObject != 0) {
        var id_asset = this.asset.find(x => x.name === this.selectedObject.name)._id;
        if (this.selectedObject.name.slice(-3) == "bat") {
          console.log("bat");
          if(this.selectab.length == 0 && id_asset != undefined){
              // Toggle the 'active' class on the selectmenu div
              document.getElementById('selectmenu').classList.toggle('closed');
            document.getElementById('selectmenu').classList.toggle('supr');
              document.getElementById('remove').classList.toggle('active');
              document.getElementById('scene1').classList.toggle('active');

            this.selectedObject.material.color.setHex(0xff0000);
            var info = {obj: this.selectedObject,id: id_asset, mat: originmat, col: origineColor}
            this.selectab.push(info);
          }
          else{
            if(this.selectedObject.uuid == this.selectab[0]["obj"].uuid){
              // Toggle the 'active' class on the selectmenu div
              document.getElementById('selectmenu').classList.toggle('closed');

              document.getElementById('scene1').classList.toggle('active');
              //wait 300ms
              setTimeout(() => {
                document.getElementById('remove').classList.toggle('active');
                document.getElementById('selectmenu').classList.toggle('supr');
              }, 300);
              this.selectedObject.material = this.selectab[0]["mat"].clone()
              this.selectedObject.material.color.setHex(this.selectab[0]["col"])
              this.selectab.pop(0)
              this.selectedObject = 0
            }
            else{
              console.log("un objet est deja select")
              this.selectedObject = 0
            }
          }
        }
        else {
          if (this.selectedObject.name.slice(-3) == "emp") {
            console.log(this.selectab.length)
            if(this.selectab.length == 0 && id_asset != undefined ){
              // Toggle the 'active' class on the selectmenu div
              document.getElementById('selectmenu').classList.toggle('supr');
              document.getElementById('selectmenu').classList.toggle('closed');

              document.getElementById('add').classList.toggle('active');
              document.getElementById('scene1').classList.toggle('active');
              this.creationscene2()
              console.log("id_asset", id_asset);
              console.log("asset", this.asset[id_asset]);
              if(this.asset[id_asset].free){
                ///mettre l'emp en rouge
                this.selectedObject.material.color.setHex(0xff0000);
                var info2 = {obj: this.selectedObject,id: id_asset, mat: originmat, col: origineColor}
                this.selectab.push(info2);
              }
              else{
                console.log("l'emp est deja pris")
                this.selectedObject = 0
                console.log(this.selectedObject)
              }
            }
            else{
              if(this.selectedObject.name == this.selectab[0]["obj"].name){
                // Toggle the 'active' class on the selectmenu div
                document.getElementById('selectmenu').classList.toggle('closed');

                document.getElementById('scene1').classList.toggle('active');
                //wait 300ms
                setTimeout(() => {
                  document.getElementById('add').classList.toggle('active');
                  document.getElementById('selectmenu').classList.toggle('supr');
                }, 300);
                this.deletscene2()
                this.selectedObject.material = this.selectab[0]["mat"]
                this.selectedObject.material.color.setHex(this.selectab[0]["col"])
                this.selectab.pop(0)
                this.selectedObject = 0
              }
              else{
                console.log("un objet est deja select")
                this.selectedObject = 0
              }

            }



          }
        }
      }
    },

    refreshcalmyfuncpls(mode){
      console.log("refresh")
      if(this.selectab.length == 1 && this.idbatafficher >= 0 && this.idbatafficher <= this.batiment.length){

        if(mode == 1){
          document.getElementById('selectmenu').classList.toggle('closed');

          document.getElementById('scene1').classList.toggle('active');
          //wait 300ms
          setTimeout(() => {
            document.getElementById('add').classList.toggle('active');
            document.getElementById('selectmenu').classList.toggle('supr');
          }, 300);

          this.deletscene2()
        }
        if(mode == 2){
          document.getElementById('selectmenu').classList.toggle('closed');

          document.getElementById('scene1').classList.toggle('active');
          //wait 300ms
          setTimeout(() => {
            document.getElementById('remove').classList.toggle('active');
            document.getElementById('selectmenu').classList.toggle('supr');
          }, 300);

        }
        var id_asset = this.selectab[0]["id"]
        var selected = this.asset[id_asset]
        var uuid = this.selectab[0]["obj"].uuid
        console.log(selected)
        if(selected.type["fst"] == "emp"){

          var batimentadd = this.batiment[this.idbatafficher-1]["child"].clone();
          batimentadd.material = this.batiment[this.idbatafficher-1]["material"].clone();
          var pos = this.asset[id_asset].position;
          var y = batimentadd.position.y;


          batimentadd.position.set(pos.x, y, pos.z);
          //to do rota
          batimentadd.castShadow = true;
          batimentadd.receiveShadow = true;
          this.selectionables.add(batimentadd);


          ///to do gerer les asset pour save dans la bdd
          this.asset[id_asset].statut = true;
          this.asset[id_asset].free = false;

          this.selectab[0]["obj"].material = this.selectab[0]["mat"]
          this.selectab[0]["obj"].material.color.setHex(this.selectab[0]["col"])
        }
        else{
          this.selectionables.traverse((child) => {
            if (child.uuid == uuid) {
              this.selectionables.remove(child);
              this.asset[id_asset].statut = false;
              console.log("pos", child.position.x);
              console.log(this.asset);
              this.asset[this.asset.find((x) => x.position["x"] == child.position.x)._id].free = true;
            }
          });

        }
        while(this.selectab.length > 0) {
          console.log("pop")
          this.selectab.pop(0);
        }
        this.selectedObject = 0
      }
      else{
        console.log("selectionné un batiment a retirer ")
      }
    },

    findchild(obj, childtab) {
      var id = 0;
      obj.traverse((child) => {
        if (child.isMesh) {
          var found = false;
          for (var i = 0; i < childtab.length; i++) {
            if (childtab[i] == child) {
              found = true;
            }
          }
          if (!found) {
            var name = child.name;
            var type = { fst: "", snd: "" };

            var newAsset = {
              _id: id,
              name: name,
              type: type,
              statut: true,
              free: true,
              emp_id: 0,
              id_prestataire: 0,
              orientation: "none",
              position: child.position,
            };

            if (name.slice(-3) == "bat") {
              type = { fst: "bat" };
              newAsset.type = type;
              newAsset.free = false;
              newAsset.statut = false;
              newAsset.position = { x: 0, y: child.position.y, z: 0 };
            } else {
              if (name.slice(-3) == "emp") {
                type = { fst: "emp" };
                newAsset.type = type;
                newAsset.free = true;
                newAsset.statut = true;
                newAsset.position = child.position;
              } else {
                type = { fst: "sol" };
                newAsset.type = type;
                newAsset.free = true;
                newAsset.statut = true;
                newAsset.position = child.position;
              }
            }

            if (this.asset.find((x) => x.name === child.name) == undefined) {
              id++;
              this.asset.push(newAsset);
            }
            childtab.push(child);
            this.findchild(child, childtab);
          }
        }
      });
    },


    setup() {
      this.empGroupe.traverse((child) => {
        this.selectionables.add(child);
      });

      for (let y = 0; y < this.batiment.length; y++) {
        var asset_id = this.asset.find((x) => x.name === this.batiment[y]["child"].name)._id;
        if (this.asset[asset_id].statut) {
          const batiment_clone = this.batiment[y]["child"].clone();
          const pos = this.asset[asset_id].position;
          batiment_clone.position.set(pos.x, pos.y, pos.z);
          batiment_clone.rotation.x = 0;
          batiment_clone.rotation.y = 0;
          batiment_clone.rotation.z = 0;
          batiment_clone.castShadow = true;
          batiment_clone.receiveShadow = true;
          batiment_clone.name = this.batiment[y]["child"].name;
          batiment_clone.material = this.batiment[y]["material"];
          this.selectionables.add(batiment_clone);
        }
      }

      this.selectionables.scale.set(0.01, 0.01, 0.01);
      this.camera.rotation.x = -0.5;
      this.camera.position.set( 5, 10, 9 );
    },



    loadfinal(){
      const loader = new FBXLoader();
        loader.load('map/mapData/map_try2.fbx', (loadedFbx) => {

              this.findchild(loadedFbx, this.children);
              var indicebat = 0;
              for (var i = 0; i < this.children.length; i++) {
                if (this.children[i].name.slice(-3) == "bat"){
                  indicebat++;
                  const child = this.children[i];
                  const material = child.material;
                  const positionY = child.position.y;
                  // Créez un objet ou un tableau imbriqué pour stocker les informations
                  const buildingInfo = {
                    child: child,
                    material: material,
                    positionY: positionY,
                    name: child.name,
                    id: indicebat
                  };
                  // Ajoutez l'objet à votre tableau principal
                  this.batiment.push(buildingInfo);
                  console.log("buildinf", buildingInfo)
                  this.children[i].castShadow = true;
                  this.children[i].receiveShadow = true;
                } else {
                  if (this.children[i].name.slice(-3) == "emp") {
                    this.empGroupe.add(this.children[i]);
                    this.children[i].castShadow = true;
                    this.children[i].receiveShadow = true;
                  }
                  else{
                    const texturesol = new THREE.TextureLoader().load('map/mapData/grass.jpg');
                    texturesol.wrapS = THREE.RepeatWrapping;
                    texturesol.wrapT = THREE.RepeatWrapping;
                    texturesol.repeat.set(2, 2);
                    const material_sol = new THREE.MeshPhongMaterial({ map: texturesol });
                    this.children[i].material = material_sol;
                    this.children[i].receiveShadow = true;
                    this.groupe_sol.add(this.children[i]);
                  }
                }
              }
              this.groupe_sol.scale.set(0.01, 0.01, 0.01);
            }, undefined, function (error) {
              console.error(error);
            }
        );
      },


    async start(){
      await this.loadfinal();
      await this.setup();
      const texture_emp = new THREE.TextureLoader().load('map/mapData/tex_socle.jpg');
      const texture_bat = new THREE.TextureLoader().load('map/mapData/albedo.jpg');
      const material_emp = new THREE.MeshPhongMaterial({ map: texture_emp });
      const material_bat = new THREE.MeshPhongMaterial({ map: texture_bat });
      for (var i = 0; i < this.batiment.length; i++) {
        this.batiment[i].material = material_bat;
      }
      for (var j = 0; j < this.emp.length; j++) {
        this.emp[j].material = material_emp;
      }

      console.log("selectionnable" , this.selectionables)

      this.scene.add(this.selectionables);
      this.scene.add(this.groupe_sol);
      this.scene.add(this.light);
      this.scene.add(this.ambientLight);

      this.animate();

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      this.vitrine.add(cube);
      this.scene2.add(this.vitrine);


      this.animateScene2();
    },



    animateScene2() {
      requestAnimationFrame(this.animateScene2);
      this.controls3.update();
      this.renderer2.render(this.scene2, this.camera2);
    },

    animate() {
      requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }
  },


  mounted() {

    this.scene = new THREE.Scene();
    //90% de la largueur de l'ecran
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.shadowMap.enabled = true;
    this.renderer.setClearColor(0x000000, 0);
    const scene1Container = this.$refs.scene1Container;
    this.renderer.setSize(window.innerWidth, scene1Container.offsetHeight);
    scene1Container.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);



//const canvasElement = document.querySelector('[data-engine="three.js r156"]');

    this.light = new THREE.DirectionalLight(0xffffff, 1);
    this.light.position.set(5, 10, 9);
    this.light.castShadow = true;
    this.ambientLight = new THREE.AmbientLight(0x404040); // Couleur en hexadécimal
    this.ambientLight.intensity = 10; // Intensité de la lumière ambiante

// Définir les propriétés spécifiques aux ombres pour la lumière
    this.light.shadow.mapSize.width = 1024;
    this.light.shadow.mapSize.height = 1024;
    this.light.shadow.camera.near = 0.1;
    this.light.shadow.camera.far = 100;
    this.light.shadow.camera.top = 10;
    this.light.shadow.camera.right = 10;
    this.light.shadow.camera.bottom = -10;
    this.light.shadow.camera.left = -10;

    this.light.castShadow = true;
//var id_prestataire = "calixte";

    this.selectionables = new THREE.Group();
    this.raycaster = new THREE.Raycaster();





    ///fonction
    /*
    asset template


    var newAsset = {
        _id: 0, // Remplissez avec une valeur appropriée
        name: emp_1_res_north, ou bat_1_res_north
        type: none, with name
        statut: true,

        free: true, ///bat always false
        id_prestataire: "test", // Remplissez avec une valeur appropriée
        orientation: rotation
        position: child.position, , ///bat always 0,0,0
    };

    */

    this.empGroupe = new THREE.Group();
    this.groupe_sol = new THREE.Group();
    this.vitrine = new THREE.Group();
    this.vitrine.scale.set(0.01, 0.01, 0.01);




// scene 2
    this.scene2 = new THREE.Scene();
    this.scene2Container = this.$refs.scene2Container;
    this.camera2 = new THREE.PerspectiveCamera(75, this.scene2Container.offsetWidth/this.scene2Container.offsetHeight , 0.1, 1000);
    this.renderer2 = new THREE.WebGLRenderer();
    this.renderer2.setSize(window.innerWidth, window.innerHeight);
    this.controls3 = new OrbitControls(this.camera2, this.renderer2.domElement);
///mettre un fond vert
    this.scene2.background = new THREE.Color(0x00ff00);

    this.ambientLightscene2 = new THREE.AmbientLight(0x404040); // Couleur en hexadécimal
    this.ambientLightscene2.intensity = 10; // Intensité de la lumière ambiante
    this.scene2.add(this.ambientLightscene2);
    this.controls3.update();
// Vous pouvez également ajouter des lumières ou des contrôles spécifiques à cette scène si nécessaire




/// scene 2 fin






    this.renderer.domElement.addEventListener('mousemove', this.onMouseMove);
    this.renderer.domElement.addEventListener('click', this.onMouseClick);


    this.start();
    document.getElementById('selectmenu').classList.toggle('init');


  },
};
</script>

<style>
.custom-btn {
  margin: 10px;
  background-color: #28a745; /* couleur verte */
  color: #fff; /* couleur du texte blanc */
  padding: 10px 15px; /* rembourrage du bouton */
  border: none; /* pas de bordure */
  border-radius: 5px; /* coins arrondis */
  cursor: pointer; /* curseur main au survol */
  font-size: 16px; /* taille du texte */
}

.custom-btn:hover {
  background-color: #218838; /* couleur verte légèrement plus foncée au survol */
}

.selectmenu {
  width: 30%;
  height: 100%;
  background-color: #D9D9D9;
  transition:right 0.3s ease-in-out;
  min-width: 30%;
}


.selectmenu.closed{
  right: -30%;
}


.scene1{
  height: 100%;
  width: 100%;
  background-color: black;
  transition: width 0.3s ease-in-out;
}

.scene1.active{
  width: 70%;
}

.add{
  display: none;
  height: 100%;
}

.add.active{
  display: block;
}

.remove{
  display: none;
}

.remove.active{
  display: block;
}
</style>
