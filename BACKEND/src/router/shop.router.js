// shop.router

const express = require('express');
const shopController = require('../controllers/shop.controller')
var router = express.Router();

router.get('/random',shopController.getRandomArticles)
router.get('/articles/:id',shopController.getArticles)
router.get('/categorie',shopController.getAllCategorie)
router.get('/categorie/articles/:id',shopController.getCategorieByProduct)
router.get('/categorie/:id',shopController.getCategorie)

router.post('/commande',shopController.createCommandeWithoutAccount)


module.exports = router;