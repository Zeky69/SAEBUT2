const express = require('express');
const map2Dcontroller = require('../controllers/map2D.controllers');

var router = express.Router();

router.get('/WC', map2Dcontroller.getToilette);
router.get('/bat', map2Dcontroller.getAllEmplacementWithBatiment);
router.get('/scene', map2Dcontroller.getAllScenes);

router.get('/type', map2Dcontroller.getType);

module.exports = router;