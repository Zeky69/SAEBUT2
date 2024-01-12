const express = require('express');
const CommentaireController = require('../controllers/commentaire.controllers');
var router = express.Router();


router.post('/', CommentaireController.createCommentaire)
/**
 * @swagger
 * /commentaire/{idprestataire}:
 *    post:
 *       summary: Créer un commentaire
 *       tags:
 *       - commentaire
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: body
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               id_prestataire:
 *                 type: integer
 *                 description: L'identifiant du prestataire associé au commentaire
 *               nom:
 *                 type: string
 *                 description: Le nom associé au commentaire
 *               commentaire:
 *                 type: string
 *                 description: Le contenu du commentaire
 *               note:
 *                 type: integer
 *                 description: La note associée au commentaire (peut être un nombre entier)
 *       responses:
 *         200:
 *           description: Commentaire créé avec succès
 *           schema:
 *             type: object
 *             properties:
 *               id_commentaire:
 *                 type: integer
 *                 description: L'identifiant du commentaire créé
 *               id_prestataire:
 *                 type: integer
 *                 description: L'identifiant du prestataire associé au commentaire
 *               nom:
 *                 type: string
 *                 description: Le nom associé au commentaire
 *               commentaire:
 *                 type: string
 *                 description: Le contenu du commentaire
 *               note:
 *                 type: integer
 *                 description: La note associée au commentaire
 *               date_commentaire:
 *                 type: string
 *                 format: date-time
 *                 description: La date et l'heure de création du commentaire
 *         401:
 *           description: Erreur lors de la création du commentaire
 *         500:
 *           description: Erreur interne du serveur
 */

router.get('/:idprestataire', CommentaireController.getCommentaire)
/**
 * @swagger
 * /commentaire/{idprestataire}:
 *     get:
 *       summary: Obtenir les commentaires associés à un prestataire
 *       tags:
 *       - commentaire
 *       parameters:
 *         - name: idprestataire
 *           in: path
 *           required: true
 *           type: integer  # Assurez-vous que le type correspond au type réel de votre identifiant de prestataire
 *           description: L'identifiant du prestataire pour lequel récupérer les commentaires
 *       responses:
 *         200:
 *           description: Succès - Récupération des commentaires réussie
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id_commentaire:
 *                   type: integer
 *                   description: L'identifiant du commentaire
 *                 id_prestataire:
 *                   type: integer
 *                   description: L'identifiant du prestataire associé au commentaire
 *                 nom:
 *                   type: string
 *                   description: Le nom associé au commentaire
 *                 commentaire:
 *                   type: string
 *                   description: Le contenu du commentaire
 *                 note:
 *                   type: integer
 *                   description: La note associée au commentaire
 *                 date_commentaire:
 *                   type: string
 *                   format: date-time
 *                   description: La date et l'heure de création du commentaire
 *         401:
 *           description: Erreur lors de la récupération des commentaires
 *         500:
 *           description: Erreur interne du serveur
 */

module.exports = router;