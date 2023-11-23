const express = require('express');
const mapPrestatairesControllers = require('../controllers/mapPrestataires.controllers');
const mapPrestatairesMiddlewares = require('../middlewares/mapPrestataires.middlewares');
var router = express.Router();




//repuperer tout les emplacements
router.get('/emp', mapPrestatairesMiddlewares.validateFilterInput,(req, res) => {
    res.send(mapPrestatairesControllers.getAllEmp(req,res));
});


router.post('/addemp', mapPrestatairesMiddlewares.validateAddempInput , mapPrestatairesControllers.saveEmp);

router.post('/delemp', mapPrestatairesMiddlewares.validateDelempInput , mapPrestatairesControllers.deleteEmp);




module.exports = router;