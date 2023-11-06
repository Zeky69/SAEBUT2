// admin.router.js

const express = require('express');
const adminController = require('../controllers/admin.controllers');
const adminMiddlewares = require('../middlewares/admin.middlewares');
var router = express.Router();

//affiche tous les utilisateurs
router.get('/', adminMiddlewares.validateFilterInput,(req, res) => {
    res.send(adminController.getAllUsers(req,res));
});

//enregistre un utilisateur
router.post('/add', adminMiddlewares.validateUserToAddInput,adminController.saveUser);

//efface un utilisateur
router.post('/delete', adminMiddlewares.validateUserInput, adminController.deleteUser);

//modifie un utilisateur
router.post('/change',adminMiddlewares.validateUserInput, adminController.changeUser);

module.exports = router;