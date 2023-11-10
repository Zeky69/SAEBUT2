<template>
  <div id="container">
    <div class="scene-container" style="background-color: beige; width: 100%;">
      <button id="btn1">Place Batiment</button>
      <div class="scene1" ref="scene1Container" style="height: 900px; width: 90vw; margin-left: 5vw; margin-right: 5vw; margin-bottom: 5px; background-color: black;"></div>
      <div class="scene2" ref="scene2Container" style="height: 40vw; width: 40vw; margin-left: 30vw;"></div>
    </div>

    <button id="btn2">choose batiment</button>
    <input type="number" id="batidInput" v-model="ibat">
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
    idbatafficher: -1,
    vitrine: null,
    scene2: null,
    camera2: null,
    renderer2: null,
    controls3: null,
    texture_emp: null,
    empGroupe: null,
    groupe_sol: null,



  }),
  methods: {
    ibat: function(){
      this.batvitrine();
    },
    batvitrine(){
      // Récupérez la valeur de l'input
      console.log(this.scene2)
      if(this.idbatafficher != -1){
        ///remove tout les enfants de la vitrine
        while(this.vitrine.children.length > 0) {
          this.vitrine.remove(this.vitrine.children[0]);
        }
      }
      console.log("batiment choisi", this.batiment[this.idbatafficher]["child"] )
      const objet= this.batiment[this.idbatafficher]["child"].clone();
      objet.name = this.batiment[this.idbatafficher]["child"].name;
      objet.material = this.batiment[this.idbatafficher]["material"];
      console.log("objet", objet)
      objet.position.set(0, 0, 0);
      this.vitrine.add(objet);

      // Faites quelque chose avec la valeur, par exemple, affichez-la dans la console
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
            this.selectedObject.material.color.setHex(0xff0000);
            var info = {obj: this.selectedObject,id: id_asset, mat: originmat, col: origineColor}
            this.selectab.push(info);
          }
          else{
            if(this.selectedObject.uuid == this.selectab[0]["obj"].uuid){
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

    refreshcalmyfuncpls(){
      console.log("refresh")
      this.idbatafficher = 2;
      if(this.selectab.length == 1 && this.idbatafficher >= 0 && this.idbatafficher <= this.batiment.length){


        var id_asset = this.selectab[0]["id"]
        var selected = this.asset[id_asset]
        var uuid = this.selectab[0]["obj"].uuid
        console.log(selected)
        if(selected.type["fst"] == "emp"){

          var batimentadd = this.batiment[this.idbatafficher]["child"].clone();
          batimentadd.material = this.batiment[this.idbatafficher]["material"].clone();
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
          this.selectionables.traverse(function (child) {
                if (child.uuid == uuid){
                  this.selectionables.remove(child);
                  this.asset[id_asset].statut = false;
                  console.log("pos", child.position.x)
                  console.log(this.asset)
                  this.asset[this.asset.find(x => x.position["x"] == child.position.x)._id].free = true;
                }
              }
          );

        }
        while(this.selectab.length > 0) {
          console.log("pop")
          this.selectab.pop(0);
        }
        this.selectedObject = 0
      }
      else{
        console.log("selectionné un batiment a retirer")
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

              for (var i = 0; i < this.children.length; i++) {
                if (this.children[i].name.slice(-3) == "bat"){

                  const child = this.children[i];
                  const material = child.material;
                  const positionY = child.position.y;
                  // Créez un objet ou un tableau imbriqué pour stocker les informations
                  const buildingInfo = {
                    child: child,
                    material: material,
                    positionY: positionY
                  };
                  // Ajoutez l'objet à votre tableau principal
                  this.batiment.push(buildingInfo);

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

      console.log("scene",this.scene)
    },



    animateScene2() {
      requestAnimationFrame(this.animateScene2);
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
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.shadowMap.enabled = true;
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    const scene1Container = this.$refs.scene1Container;
    this.renderer.setSize(scene1Container.offsetWidth, scene1Container.offsetHeight);
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




// scene 2
    this.scene2 = new THREE.Scene();
    const scene2Container = this.$refs.scene2Container;
    this.camera2 = new THREE.PerspectiveCamera(75, scene2Container.offsetWidth/scene2Container.offsetHeight , 0.1, 1000);
    this.renderer2 = new THREE.WebGLRenderer();
    this.renderer2.setSize(window.innerWidth, window.innerHeight);
    scene2Container.appendChild(this.renderer2.domElement);
    this.renderer2.setSize(scene2Container.offsetWidth, scene2Container.offsetHeight);
    this.controls3 = new OrbitControls(this.camera2, this.renderer2.domElement);
///mettre un fond blanc
    this.scene2.background = new THREE.Color(0xffffff);



    const ambientLightscene2 = new THREE.AmbientLight(0x404040); // Couleur en hexadécimal
    ambientLightscene2.intensity = 10; // Intensité de la lumière ambiante
    this.scene2.add(ambientLightscene2);

// Appelez la fonction pour charger le bâtiment
    this.idbatafficher = 2;




// Positionnez la caméra pour la nouvelle scène
    this.camera2.position.set(5, 10, 9);

//controle
    this.controls3.update();

// Vous pouvez également ajouter des lumières ou des contrôles spécifiques à cette scène si nécessaire



// Appelez la fonction d'animation pour la nouvelle scène

    this.vitrine = new THREE.Group();
    this.vitrine.scale.set(0.01, 0.01, 0.01);

// scene 2 fin






    this.renderer.domElement.addEventListener('mousemove', this.onMouseMove);
    this.renderer.domElement.addEventListener('click', this.onMouseClick);


    this.start();
  },
};
</script>
