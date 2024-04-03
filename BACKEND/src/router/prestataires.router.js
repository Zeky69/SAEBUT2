// prestataires.router.js

const express = require('express');
const prestaController = require('../controllers/prestataires.controllers');
const prestaMiddlewares = require('../middlewares/prestataire.middlewares');
var router = express.Router();

router.get('/', prestaController.getPrestatairesEtatAccepte); //a changer de place 

router.put('/profil/:id',prestaController.updateUserProfile)
/**
 * @swagger
 * /prestataires/profil/{id}:
 *     put:
 *       summary: Mettre à jour le profil utilisateur
 *       tags:
 *       - Prestataires
 *       consumes:
 *         - application/json
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           type: integer
 *           description: L'identifiant de l'utilisateur dont le profil doit être mis à jour
 *         - in: body
 *           name: body
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               nomEntreprise:
 *                 type: string
 *                 description: Le nom de l'entreprise
 *               description:
 *                 type: string
 *                 description: La description de l'entreprise
 *               photoDeProfil:
 *                 type: string
 *                 description: L'URL de la photo de profil
 *               prenom:
 *                 type: string
 *                 description: Le prénom de l'utilisateur
 *               nom:
 *                 type: string
 *                 description: Le nom de l'utilisateur
 *               motDePasse:
 *                 type: string
 *                 description: Le nouveau mot de passe de l'utilisateur
 *               email:
 *                 type: string
 *                 format: email
 *                 description: L'adresse e-mail de l'utilisateur
 *       responses:
 *         200:
 *           description: Profil utilisateur mis à jour avec succès
 *         400:
 *           description: Requête invalide - Vérifiez la structure de la requête
 *         500:
 *           description: Erreur interne du serveur lors de la mise à jour du profil utilisateur
 */

router.put('/updatePage', prestaController.updatePrestatairePage);

router.get('/types', prestaController.getPrestatairesTypes); //a changer de place

router.get('/:id', prestaController.getPrestataireById); // a changer de place 

module.exports = router;