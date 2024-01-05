const express = require('express');
const resaController = require('../controllers/reservations.controllers');
var router = express.Router();

router.get('/test', resaController.test);
router.get('/', resaController.getAllResa);
router.get('/disponibilite', resaController.getAllDispoById);
router.get('/auth', resaController.getAuth);

router.post('/createDispo', resaController.createDispo);
router.post('/reserver', resaController.reserver)

router.post('/deleteDispo', resaController.deleteDispoById);
router.post('/deleteResa', resaController.deleteResaById);


module.exports = router;