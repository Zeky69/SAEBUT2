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


//recupere les event d'une scene
router.get('/:uuid/event', sceneMiddlewares.validateEvent, sceneControllers.getEvent);

//recupere un event d'une scene
router.get('/event/:uuidEvent', sceneMiddlewares.validateEventUUID, sceneControllers.getEventUUID);

//ajoute un event a une scene
router.post('/:uuid/event', sceneMiddlewares.validateAddEventInput, sceneControllers.saveEvent);

//supprime un event d'une scene
router.delete('/event/:uuidEvent', sceneMiddlewares.validateDelEventInput, sceneControllers.deleteEvent);



module.exports = router;


