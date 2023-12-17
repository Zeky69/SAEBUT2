const express = require('express');
const toiletteControllers = require('../controllers/toilette.controllers');
const toiletteMiddlewares = require('../middlewares/toilette.middleware');
var router = express.Router();


//recupere les toilettes
router.get('/', toiletteMiddlewares.validateFilterInput, toiletteControllers.getToilette);

//recupere une toilette
router.get('/:uuid', toiletteMiddlewares.validateUUID, toiletteControllers.getToiletteUUID);

//ajoute une toilette
router.post('/', toiletteMiddlewares.validateAddInput, toiletteControllers.saveToilette);

//supprime une toilette
router.delete('/:uuid', toiletteMiddlewares.validateDelInput, toiletteControllers.deleteToilette);


module.exports = router;
