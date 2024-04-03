const express = require('express');
const map2Dcontroller = require('../controllers/map2D.controllers');
const mapPrestatairesMiddlewares = require("../middlewares/mapPrestataires.middlewares");

var router = express.Router();

router.get('/emp',map2Dcontroller.getAllEmp);
router.post('/emp', map2Dcontroller.createEmp);
router.delete('/emp/:id', map2Dcontroller.deleteEmp);
router.patch('/emp', map2Dcontroller.updateEmp);





router.get('/type', map2Dcontroller.getType);

module.exports = router;