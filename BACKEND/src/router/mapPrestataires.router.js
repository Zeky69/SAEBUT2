const express = require('express');
const mapPrestatairesControllers = require('../controllers/mapPrestataires.controllers');
const mapPrestatairesMiddlewares = require('../middlewares/mapPrestataires.middlewares');
var router = express.Router();




//repuperer tout les emplacements
router.get('/emp', mapPrestatairesMiddlewares.validateempFilterInput,mapPrestatairesControllers.getEmp);

router.get('/emp/:uuid', mapPrestatairesMiddlewares.validateempUUID,mapPrestatairesControllers.getEmpUUID);

router.post('/emp', mapPrestatairesMiddlewares.validateAddempInput , mapPrestatairesControllers.saveEmp);

router.delete('/emp/:id', mapPrestatairesMiddlewares.validateDelempInput , mapPrestatairesControllers.deleteEmp);

router.patch('/emp', mapPrestatairesMiddlewares.validateUpdateempInput , mapPrestatairesControllers.updateEmp);
router.patch('/emp/info', mapPrestatairesMiddlewares.validateUpdateempInfoInput , mapPrestatairesControllers.updateEmpInfo);



router.post('/bat', mapPrestatairesMiddlewares.validateAddbatInputdebug , mapPrestatairesControllers.savebat);

router.patch('/bat', mapPrestatairesMiddlewares.validateUpdatebatInput , mapPrestatairesControllers.updatebat);

router.delete('/bat', mapPrestatairesMiddlewares.validateDelbatInput , mapPrestatairesControllers.deletebat);


router.get('/bat/debug',mapPrestatairesMiddlewares.validatebatFilterInputdebug, mapPrestatairesControllers.getBatdebug);







module.exports = router;