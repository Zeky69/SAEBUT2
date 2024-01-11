const express = require('express');
const batimentController = require('../controllers/batiment.controllers');
const batimentMiddlewares = require('../middlewares/batiment.middlewares');
var router = express.Router();

router.get('/:idPresta', batimentController.getBatByIdPrestataire);

module.exports = router;