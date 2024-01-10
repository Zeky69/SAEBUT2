// prestataires.router.js

const express = require('express');
const prestaController = require('../controllers/prestataires.controllers');
const prestaMiddlewares = require('../middlewares/prestataire.middlewares');
var router = express.Router();

router.get('/', prestaController.getPrestatairesEtatAccepte);




router.put('/updatePage', prestaController.updatePrestatairePage);


router.get('/:id', prestaController.getPrestataireById);

module.exports = router;