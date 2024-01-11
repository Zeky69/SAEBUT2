const express = require('express');
const batimentController = require('../controllers/batiment.controllers');
const batimentMiddlewares = require('../middlewares/batiment.middlewares');
const resaController = require("../controllers/reservations.controllers");
var router = express.Router();

router.get('/:idPresta', batimentController.getBatByIdPrestataire);
router.post('/updateDisplay', batimentController.updateDisplay);

module.exports = router;