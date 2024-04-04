// shop.router

const express = require('express');
const shopController = require('../controllers/shop.controller')
const {getDateBillet} = require("../controllers/shop.controller");
var router = express.Router();

router.get('/random',shopController.getRandomArticles)
router.get('/articles/:id',shopController.getArticle)
router.post('/articles',shopController.createArticle)
router.put('/articles/:id',shopController.updateArticle)
router.delete('/articles/:id',shopController.deleteArticle)


router.get('/articles',shopController.getAllArticles)
router.get('/articles/prestataire/:id',shopController.getArticlesByPrestataire)


router.get('/categorie',shopController.getAllCategorie)
router.get('/articles/:id',shopController.getArticlesByCategorie)
router.get('/categorie/:id',shopController.getCategorie)






router.get('/commande',shopController.getCommandes)
router.get('/commande/:id',shopController.getCommande)


router.patch('/commande/:id/ligne/:idligne',shopController.updateCommandeLigne)

router.post('/commande',shopController.createCommandeWithoutAccount)

router.get('/date',getDateBillet)


module.exports = router;