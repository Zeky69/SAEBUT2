const express = require('express');
const CommentaireController = require('../controllers/commentaire.controllers');
var router = express.Router();


router.post('/', CommentaireController.createCommentaire)
router.get('/:idprestataire', CommentaireController.getCommentaire)






module.exports = router;