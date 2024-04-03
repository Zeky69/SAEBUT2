// admin.router.js

const express = require('express');
const adminController = require('../controllers/admin.controllers');
const adminMiddlewares = require('../middlewares/admin.middlewares');
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

module.exports = router;