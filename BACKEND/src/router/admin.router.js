// admin.router.js

const express = require('express');
const adminController = require('../controllers/admin.controllers');
const adminMiddlewares = require('../middlewares/admin.middlewares');
const {verifyToken, verifyisAdmin} = require("../middlewares/utilisateur.middlewares");
var router = express.Router();

//affiche tous les utilisateurs
router.get('/', adminController.getAllUsers );

//gere prestataire
router.patch('/manage-prestataire/:prestataire_id', adminController.updatePrestataireStatus);

router.delete('/manage-prestataire/:user_id/:prestataire_id', adminController.removePrestataireProfile);



//enregistre un utilisateur
router.post('/add', adminMiddlewares.validateUserToAddInput,adminController.saveUser);

//efface un utilisateur
router.post('/delete', adminMiddlewares.validateUserInput, adminController.deleteUser);

//modifie un utilisateur
router.post('/change',adminMiddlewares.validateUserInput, adminController.changeUser);

router.patch('/homepage',verifyToken,verifyisAdmin,adminController.setHomePage);

router.get('/homepage',adminController.getHomePage);

module.exports = router;