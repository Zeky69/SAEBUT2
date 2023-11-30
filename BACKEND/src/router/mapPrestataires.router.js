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

router.get('/bat', mapPrestatairesMiddlewares.validatebatFilterInput, mapPrestatairesControllers.getBat);


router.post('/bat', mapPrestatairesMiddlewares.validateAddbatInputdebug , mapPrestatairesControllers.savebat);

router.delete('/bat', mapPrestatairesMiddlewares.validateDelbatInput , mapPrestatairesControllers.deletebat);

//router.get('/bat/debug',mapPrestatairesMiddlewares.validatebatFilterInputdebug, (req,res) =>{res.send(mapPrestatairesControllers.getBatdebug(req,res))});

router.get('/bat/debug',mapPrestatairesMiddlewares.validatebatFilterInputdebug, mapPrestatairesControllers.getBatdebug);





module.exports = router;