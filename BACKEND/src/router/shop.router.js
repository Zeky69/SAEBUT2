// shop.router

const express = require('express');
const shopController = require('../controllers/shop.controller')
var router = express.Router();

router.get('/articles/:id',shopController.getArticles)
router.get('/categorie/:id',shopController.getCategorie)


module.exports = router;