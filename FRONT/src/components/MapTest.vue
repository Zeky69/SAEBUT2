<template>
  <div id="container">
    <div class="scene-container" style="background-color: beige; width: 100%;">
      <div class="scene1" ref="scene1Container" style="height: 900px; width: 90vw; margin-left: 5vw; margin-right: 5vw; margin-bottom: 5px; background-color: black;"></div>
      <div class="scene2" id="scene2-container" style="height: 40vw; width: 40vw; margin-left: 30vw;"></div>
    </div>

    <button id="btn2">choose batiment</button>
    <input type="number" id="batidInput">
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
    currentIndex:0
  }),
  mounted() {



    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    const scene1Container = this.$refs.scene1Container;
    renderer.setSize(scene1Container.offsetWidth, scene1Container.offsetHeight);
    scene1Container.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);



//const canvasElement = document.querySelector('[data-engine="three.js r156"]');

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 9);
    light.castShadow = true;
    const ambientLight = new THREE.AmbientLight(0x404040); // Couleur en hexadécimal
    ambientLight.intensity = 10; // Intensité de la lumière ambiante

// Définir les propriétés spécifiques aux ombres pour la lumière
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 100;
    light.shadow.camera.top = 10;
    light.shadow.camera.right = 10;
    light.shadow.camera.bottom = -10;
    light.shadow.camera.left = -10;

    light.castShadow = true;

//var id_prestataire = "calixte";








///tableau des assets
    var asset = [];
    var selectab = [];
//

    var children = [];

    let batiment = [];
    let emp = [];


    const loader = new FBXLoader();

    var selectionables = new THREE.Group();


    var raycaster = new THREE.Raycaster();


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


    function findchild(obj, childtab){
      var id = 0;
      obj.traverse(function (child){
        if (child.isMesh){
          //regarder si il est dans le tableau
          var found = false;
          for (var i = 0; i < childtab.length; i++) {
            if (childtab[i] == child) {
              found = true;
            }
          }
          if (!found) {
            var name = child.name;
            var type = {fst : "" , snd : "" };
            //si le nom commence par "zone"
            //ajouter un items dans assets 2
            var newAsset = {
              _id: id, // Remplissez avec une valeur appropriée
              name: name,
              type: type,
              statut: true,
              free: true,
              emp_id: 0,
              id_prestataire: 0, // Remplissez avec une valeur appropriée
              orientation: "none",
              position: child.position, ///bat always 0,0,0
            };
            if(name.slice(-3) == "bat"){
              type = {fst : "bat" /*, snd : ""*/ };
              newAsset.type = type;
              newAsset.free = false;
              newAsset.statut = false;
              newAsset.position = {x : 0, y : child.position.y, z : 0};




            }
            else{
              if(name.slice(-3) == "emp") {
                type = {fst : "emp" /*, snd : ""*/ };
                newAsset.type = type;
                newAsset.free = true;
                newAsset.statut = true;
                newAsset.position = child.position;
              }
              else{
                type = {fst : "sol" /*, snd : ""*/ };
                newAsset.type = type;
                newAsset.free = true;
                newAsset.statut = true;
                newAsset.position = child.position;
              }

            }

            if(asset.find(x => x.name === child.name) == undefined){
              id++;
              asset.push(newAsset);
            }
            childtab.push(child);
            findchild(child, childtab);

          }
        }
      });
    }

    var empGroupe = new THREE.Group();
    var groupe_sol = new THREE.Group();


    function loadfinal(){
      loader.load('map/mapData/map_try2.fbx', (loadedFbx) => {

            findchild(loadedFbx, children);
            console.log(batiment);

            for (var i = 0; i < children.length; i++) {
              if (children[i].name.slice(-3) == "bat"){

                const child = children[i];
                const material = child.material;
                const positionY = child.position.y;
                // Créez un objet ou un tableau imbriqué pour stocker les informations
                const buildingInfo = {
                  child: child,
                  material: material,
                  positionY: positionY
                };
                // Ajoutez l'objet à votre tableau principal
                batiment.push(buildingInfo);

                children[i].castShadow = true;
                children[i].receiveShadow = true;
              } else {
                if (children[i].name.slice(-3) == "emp") {
                  empGroupe.add(children[i]);
                  children[i].castShadow = true;
                  children[i].receiveShadow = true;
                }
                else{
                  const texturesol = new THREE.TextureLoader().load('map/mapData/grass.jpg');
                  texturesol.wrapS = THREE.RepeatWrapping;
                  texturesol.wrapT = THREE.RepeatWrapping;
                  texturesol.repeat.set(2, 2);
                  const material_sol = new THREE.MeshPhongMaterial({ map: texturesol });
                  children[i].material = material_sol;
                  children[i].receiveShadow = true;
                  groupe_sol.add(children[i]);
                }
              }
            }
            groupe_sol.scale.set(0.01, 0.01, 0.01);
          }, undefined, function (error) {
            console.error(error);
          }
      );
    }

    function setup(){

      empGroupe.traverse(function (child) {
        selectionables.add(child);
      });
      for(let y = 0; y < batiment.length; y++){

        var asset_id = asset.find(x => x.name === batiment[y]["child"].name)._id;
        if(asset[asset_id].statut){
          const batiment_clone = batiment[y]["child"].clone();
          const pos = asset[asset_id].position;
          batiment_clone.position.set(pos.x, pos.y, pos.z);
          batiment_clone.rotation.x = 0;
          batiment_clone.rotation.y = 0;
          batiment_clone.rotation.z = 0;
          batiment_clone.castShadow = true;
          batiment_clone.receiveShadow = true;
          batiment_clone.name = batiment[y]["child"].name;
          batiment_clone.material = batiment[y]["material"];
          selectionables.add(batiment_clone);
        }
      }
      selectionables.scale.set(0.01, 0.01, 0.01);
      camera.rotation.x = -0.5;

    }

// scene 2
    const scene2 = new THREE.Scene();
    const scene2Container = document.getElementById("scene2-container");

    const camera2 = new THREE.PerspectiveCamera(75, scene2Container.offsetWidth/scene2Container.offsetHeight , 0.1, 1000);
    const renderer2 = new THREE.WebGLRenderer();
    renderer2.setSize(window.innerWidth, window.innerHeight);

    scene2Container.appendChild(renderer2.domElement);
    renderer2.setSize(scene2Container.offsetWidth, scene2Container.offsetHeight);
    const controls3 = new OrbitControls(camera2, renderer2.domElement);
///mettre un fond blanc
    scene2.background = new THREE.Color(0xffffff);



    const ambientLightscene2 = new THREE.AmbientLight(0x404040); // Couleur en hexadécimal
    ambientLightscene2.intensity = 10; // Intensité de la lumière ambiante
    scene2.add(ambientLightscene2);

// Appelez la fonction pour charger le bâtiment

    var idbatafficher = -1;




// Positionnez la caméra pour la nouvelle scène
    camera2.position.set(5, 10, 9);

//controle
    controls3.update();

// Vous pouvez également ajouter des lumières ou des contrôles spécifiques à cette scène si nécessaire

    function animateScene2() {
      requestAnimationFrame(animateScene2);
      renderer2.render(scene2, camera2);
    }

// Appelez la fonction d'animation pour la nouvelle scène

    var vitrine = new THREE.Group();
    vitrine.scale.set(0.01, 0.01, 0.01);

// scene 2 fin

/*

    btn2.addEventListener("click", function() {
      // Récupérez la valeur de l'input
      console.log(scene2)
      if(idbatafficher != -1){
        ///remove tout les enfants de la vitrine
        while(vitrine.children.length > 0) {
          vitrine.remove(vitrine.children[0]);
        }
      }
      idbatafficher = batidInput.value;
      console.log("batiment choisi", batiment[idbatafficher]["child"] )
      const objet= batiment[idbatafficher]["child"].clone();
      objet.name = batiment[idbatafficher]["child"].name;
      objet.material = batiment[idbatafficher]["material"];
      console.log("objet", objet)
      objet.position.set(0, 0, 0);
      vitrine.add(objet);

      // Faites quelque chose avec la valeur, par exemple, affichez-la dans la console
      console.log("Valeur de l'input : " + idbatafficher);
    });
/////////////////////*/




    function start(){
      camera.position.set( 5, 10, 9 );
      loadfinal();
      setup();
      const texture_emp = new THREE.TextureLoader().load('map/mapData/tex_socle.jpg');
      const texture_bat = new THREE.TextureLoader().load('map/mapData/albedo.jpg');
      const material_emp = new THREE.MeshPhongMaterial({ map: texture_emp });
      const material_bat = new THREE.MeshPhongMaterial({ map: texture_bat });
      for (var i = 0; i < batiment.length; i++) {
        batiment[i].material = material_bat;
      }
      for (var j = 0; j < emp.length; j++) {
        emp[j].material = material_emp;
      }

      scene.add(selectionables);
      scene.add(groupe_sol);
      scene.add(light);
      scene.add(ambientLight);

      animate();
      console.log("start" + batiment);
      //creation d'un cube pour scene2

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      vitrine.add(cube);
      scene2.add(vitrine);




      animateScene2();
    }

    renderer.domElement.addEventListener('mousemove', onMouseMove);

    function onMouseMove(event) {
      var position = new THREE.Vector2();
      var domRect = renderer.domElement.getBoundingClientRect();
      position.x = ((event.clientX - domRect.left) / domRect.width) * 2 - 1;
      position.y = -((event.clientY - domRect.top) / domRect.height) * 2 + 1;

      var selectedObject = getSelectionneLePlusProche(position);

      // Vérifier si l'objet est sélectionnable
      if (selectedObject) {
        // Changer le curseur en pointeur
        renderer.domElement.style.cursor = 'pointer';
      } else {
        // Rétablir le curseur par défaut
        renderer.domElement.style.cursor = 'auto';
      }
    }

    function getSelectionneLePlusProche(position) {
      // Mise à jour de la position du rayon à lancer.
      raycaster.setFromCamera(position, camera);
      // Obtenir la liste des intersections
      var selectionnes = raycaster.intersectObjects(selectionables.children);
      if (selectionnes.length) {
        return selectionnes[0].object;
      }
      else{
        return 0;
      }
    }


    var selectedObject = 0;

    function onMouseClick(event) {
      var position = new THREE.Vector2();
      var domRect = renderer.domElement.getBoundingClientRect();
      position.x = ((event.clientX - domRect.left) / domRect.width) * 2 - 1;
      position.y = -((event.clientY - domRect.top) / domRect.height) * 2 + 1;

      selectedObject = getSelectionneLePlusProche(position);

      var originmat;
      var origineColor;
      if(selectedObject != 0){
        originmat = selectedObject.material.clone();
        origineColor = selectedObject.material.color.getHex();
      }



      if (selectedObject != 0) {
        var id_asset = asset.find(x => x.name === selectedObject.name)._id;
        if (selectedObject.name.slice(-3) == "bat") {
          console.log("bat");
          if(selectab.length == 0 && id_asset != undefined){
            selectedObject.material.color.setHex(0xff0000);
            var info = {obj: selectedObject,id: id_asset, mat: originmat, col: origineColor}
            selectab.push(info);
          }
          else{
            if(selectedObject.uuid == selectab[0]["obj"].uuid){
              selectedObject.material = selectab[0]["mat"].clone()
              selectedObject.material.color.setHex(selectab[0]["col"])
              selectab.pop(0)
              selectedObject = 0
            }
            else{
              console.log("un objet est deja select")
              selectedObject = 0
            }
          }
        }
        else {
          if (selectedObject.name.slice(-3) == "emp") {
            console.log(selectab.length)
            if(selectab.length == 0 && id_asset != undefined ){
              console.log("id_asset", id_asset);
              console.log("asset", asset[id_asset]);
              if(asset[id_asset].free){
                ///mettre l'emp en rouge
                selectedObject.material.color.setHex(0xff0000);
                var info2 = {obj: selectedObject,id: id_asset, mat: originmat, col: origineColor}
                selectab.push(info2);
              }
              else{
                console.log("l'emp est deja pris")
                selectedObject = 0
                console.log(selectedObject)
              }
            }
            else{
              if(selectedObject.name == selectab[0]["obj"].name){
                selectedObject.material = selectab[0]["mat"]
                selectedObject.material.color.setHex(selectab[0]["col"])
                selectab.pop(0)
                selectedObject = 0
              }
              else{
                console.log("un objet est deja select")
                selectedObject = 0
              }

            }



          }
        }
      }
    }


    function refresh(){
      idbatafficher = 2;
      if(selectab.length == 1 && idbatafficher >= 0 && idbatafficher <= batiment.length){


        var id_asset = selectab[0]["id"]
        var selected = asset[id_asset]
        var uuid = selectab[0]["obj"].uuid
        console.log(selected)
        if(selected.type["fst"] == "emp"){

          var batimentadd = batiment[idbatafficher]["child"].clone();
          batimentadd.material = batiment[idbatafficher]["material"].clone();
          var pos = asset[id_asset].position;
          var y = batimentadd.position.y;


          batimentadd.position.set(pos.x, y, pos.z);
          //to do rota
          batimentadd.castShadow = true;
          batimentadd.receiveShadow = true;
          selectionables.add(batimentadd);


          ///to do gerer les asset pour save dans la bdd
          asset[id_asset].statut = true;
          asset[id_asset].free = false;

          selectab[0]["obj"].material = selectab[0]["mat"]
          selectab[0]["obj"].material.color.setHex(selectab[0]["col"])
        }
        else{
          selectionables.traverse(function (child) {
                if (child.uuid == uuid){
                  selectionables.remove(child);
                  asset[id_asset].statut = false;
                  console.log("pos", child.position.x)
                  console.log(asset)
                  asset[asset.find(x => x.position["x"] == child.position.x)._id].free = true;
                }
              }
          );

        }
        while(selectab.length > 0) {
          console.log("pop")
          selectab.pop(0);
        }
        selectedObject = 0
      }
      else{
        console.log("selectionné un batiment a retirer")
      }
    }


///bouton
//    document.getElementById("btn").addEventListener("click", function() {
//      refresh()
//    });

    renderer.domElement.addEventListener('click', onMouseClick);

    document.addEventListener('keydown', function(event) {
      if(event.keyCode == 67) {
        refresh()
        console.log("c");
      }
    });




    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }


    start();
  },
};
</script>
