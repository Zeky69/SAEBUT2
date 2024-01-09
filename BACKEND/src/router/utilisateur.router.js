// utilisateur.router.js

const express = require('express');
const userController = require('../controllers/utilisateur.controllers');
const userMiddlewares = require('../middlewares/utilisateur.middlewares');
var router = express.Router();

//se connecter
//router.get('/', loginMiddlewares.validateLoginInput,loginController.login);

router.post('/login',userMiddlewares.validateLoginInput,userController.login);
router.post('/register',userMiddlewares.validateRegistrationInput,userController.register)
router.get('/:token',userController.getInformationWithToken);


module.exports = router;