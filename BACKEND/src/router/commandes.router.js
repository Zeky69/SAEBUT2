// commandes.router.js

const express = require("express");
const commandesController = require("../controllers/commandes.controllers");
var router = express.Router();

router.get("/", commandesController.getCommandes);
/**
 * @swagger
 * /commandes :
 *     get:
 *       summary: Obtenir les commandes de billets
 *       tags:
 *       - Commandes
 *       responses:
 *         200:
 *           description: Succès - Récupération des billets réussie
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 uuid:
 *                   type: string
 *                   description: L'identifiant du billet
 *                 title:
 *                   type: string
 *                   description: Le nom du billet
 *                 nom:
 *                   type: string
 *                   description: Le nom du propriétaire du billet
 *                 prenom:
 *                   type: string
 *                   description: Le prenom du propriétaire du billet
 *                 date:
 *                   type: string
 *                   description: La date de la commande
 *         500:
 *           description: Erreur interne du serveur
 */
module.exports = router;