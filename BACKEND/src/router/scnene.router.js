const express = require('express');
const sceneControllers = require('../controllers/scnene.controllers');
const sceneMiddlewares = require('../middlewares/scnene.middlewares');
var router = express.Router();


//recupere les scenes
router.get('/', sceneMiddlewares.validateFilterInput, sceneControllers.getScene);

//recupere une scenes

router.get('/:uuid', sceneMiddlewares.validateUUID, sceneControllers.getSceneUUID);

//ajoute une scene

router.post('/', sceneMiddlewares.validateAddInput, sceneControllers.saveScene);

//supprime une scene

router.delete('/:uuid', sceneMiddlewares.validateDelInput, sceneControllers.deleteScene);


module.exports = router;


