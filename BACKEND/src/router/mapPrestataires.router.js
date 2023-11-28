const express = require('express');
const mapPrestatairesControllers = require('../controllers/mapPrestataires.controllers');
const mapPrestatairesMiddlewares = require('../middlewares/mapPrestataires.middlewares');
var router = express.Router();




//repuperer tout les emplacements
router.get('/emp', mapPrestatairesMiddlewares.validateempFilterInput,(req, res) => {
    res.send(mapPrestatairesControllers.getEmp(req,res));
});

router.post('/emp', mapPrestatairesMiddlewares.validateAddempInput , mapPrestatairesControllers.saveEmp);

router.delete('/emp', mapPrestatairesMiddlewares.validateDelempInput , mapPrestatairesControllers.deleteEmp);

router.patch('/emp', mapPrestatairesMiddlewares.validateUpdateempInput , mapPrestatairesControllers.updateEmp);

router.get('/bat', mapPrestatairesMiddlewares.validatebatFilterInput,(req, res) => {
    res.send(mapPrestatairesControllers.getBat(req,res));
});
router.post('/bat', mapPrestatairesMiddlewares.validateAddbatInput , mapPrestatairesControllers.savebat);

router.delete('/bat', mapPrestatairesMiddlewares.validateDelbatInput , mapPrestatairesControllers.deletebat);





module.exports = router;