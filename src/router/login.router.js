// login.router.js

const express = require('express');
const loginController = require('../controllers/login.controllers');
const loginMiddlewares = require('../middlewares/login.middlewares');
var router = express.Router();

//se connecter
router.get('/', loginMiddlewares.validateLoginInput,loginController.login);

module.exports = router;