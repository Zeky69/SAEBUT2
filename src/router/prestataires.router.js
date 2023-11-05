// prestataires.router.js

const express = require('express');
const prestaController = require('../controllers/prestataires.controllers');
const prestaMiddlewares = require('../middlewares/prestataire.middlewares');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello world');
});

module.exports = router;