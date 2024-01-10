// prestataires.router.js

const express = require('express');
const prestaController = require('../controllers/prestataires.controllers');
const prestaMiddlewares = require('../middlewares/prestataire.middlewares');
var router = express.Router();

router.get('/', prestaController.getPrestatairesEtatAccepte); //a changer de place 

router.put('/profil/:id',prestaController.updateUserProfile)

router.put('/updatePage', prestaController.updatePrestatairePage);

router.get('/types', prestaController.getPrestatairesTypes); //a changer de place

router.get('/:id', prestaController.getPrestataireById); // a changer de place 

module.exports = router;