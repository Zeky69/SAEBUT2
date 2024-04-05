// statistiques.router.js

const express = require("express");
const userController = require("../controllers/statistiques.controllers");
var router = express.Router();

router.get("/venteBilletParDate", userController.getVenteBilletParDate);
/**
 * @swagger
 * /statistiques/venteBilletParDate:
 *     get:
 *       summary: récupérer les ventes de billet par date
 *       tags:
 *          - statistiques
 *       consumes:
 *          - application/json
 *       responses:
 *         200:
 *           description: récupération avec succès  des données
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                  nbr_billet_vendus:
 *                   type: string
 *                   description: nombre de billets vendus ce jour
 *                  date:
 *                   type: string
 *                   format: date
 *                   description: Date d'achat des billets
 *         500:
 *           description: Erreur interne du serveur lors de la récupération des ventes
 */

router.get("/venteBilletParType", userController.getVenteBilletParType);
/**
 * @swagger
 * /statistiques/venteBilletParType:
 *     get:
 *       summary: récupérer les ventes de billet par date
 *       tags:
 *         - statistiques
 *       consumes:
 *         - application/json
 *       responses:
 *         200:
 *           description: récupération avec succès  des données
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                  title:
 *                   type: string
 *                   description: nom du billet
 *                  quantitetotalebillet:
 *                   type: string
 *                   description: quantité totale des billets vendus
 *                  price:
 *                   type: string
 *                   description: prix de vente de billets chaque billet
 *                  prixtotalbillet:
 *                   type: string
 *                   description: prix total des billets vendus
 *         500:
 *           description: Erreur interne du serveur lors de la récupération des ventes
 */

router.get("/venteArticle", userController.getVenteArticle);
/**
 * @swagger
 * /statistiques/venteArticle:
 *     get:
 *       summary: récupérer les ventes d'article'
 *       tags:
 *         - statistiques
 *       consumes:
 *         - application/json
 *       responses:
 *         200:
 *           description: récupération avec succès  des données
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                  nom:
 *                   type: string
 *                   description: nom des articles vendus
 *                  quantitetotalearticle:
 *                   type: string
 *                   description: Quantité totale vendue de cet article
 *                  prix:
 *                   type: string
 *                   description: Prix de vente de l'article
 *                  prixtotalarticle:
 *                   type: string
 *                   description: Prix total des articles vendus
 *         500:
 *           description: Erreur interne du serveur lors de la récupération des ventes
 */

router.get("/venteArticle/:id", userController.getVenteArticle);
/**
 * @swagger
 * /statistiques/venteArticle/{id}:
 *     get:
 *       summary: récupérer les ventes d'article'
 *       tags:
 *         - statistiques
 *       parameters:
 *         - name: id
 *           in: path
 *           required: false
 *           type: string
 *           description: L'identifiant du prestataire pour lequel récupérer les ventes
 *           example: 5
 *       consumes:
 *         - application/json
 *       responses:
 *         200:
 *           description: récupération avec succès  des données
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                  nom:
 *                   type: string
 *                   description: nom des articles vendus
 *                  quantitetotalearticle:
 *                   type: string
 *                   description: Quantité totale vendue de cet article
 *                  prix:
 *                   type: string
 *                   description: Prix de vente de l'article
 *                  prixtotalarticle:
 *                   type: string
 *                   description: Prix total des articles vendus
 *         500:
 *           description: Erreur interne du serveur lors de la récupération des ventes
 */

router.get("/venteParCatetorie", userController.getVenteParCategorie);
/**
 * @swagger
 * /statistiques/venteParCategorie:
 *     get:
 *       summary: récupérer les ventes d'article par catégorie
 *       tags:
 *         - statistiques
 *       consumes:
 *         - application/json
 *       responses:
 *         200:
 *           description: récupération avec succès des données
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                  libelle_categorie:
 *                   type: string
 *                   description: nom de la catégorie
 *                  totalventecategorie:
 *                   type: string
 *                   description: Prix total vendu de cet catégorie
 *         500:
 *           description: Erreur interne du serveur lors de la récupération des ventes
 */

router.post("/addConnexionToday", userController.addConnexionToday);
router.get("/getConnextionToday", userController.getConnextionToday);
router.get("/commande", userController.getCountCommande);
router.get("/ventesTotales", userController.getVentesTotales);

router.get("/note/:id", userController.getAverageNote);
module.exports = router;