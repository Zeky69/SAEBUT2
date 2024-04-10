const express = require('express');
const batimentController = require('../controllers/batiment.controllers');
const batimentMiddlewares = require('../middlewares/batiment.middlewares');
const resaController = require("../controllers/reservations.controllers");
var router = express.Router();

router.get('/', batimentController.getAllBatiment);
/**
 * @swagger
 * /batiment :
 *     get:
 *       summary: Obtenir les bâtiments associés à un prestataire
 *       tags:
 *       - Batiment
 *       responses:
 *         200:
 *           description: Succès - Récupération des bâtiments associés réussie
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id_emplacement:
 *                   type: string
 *                   description: L'identifiant du bâtiment
 *                 id_type:
 *                   type: string
 *                   description: L'identifiant du type du bâtiment
 *                 description:
 *                   type: string
 *                   description: La description du bâtiment
 *                 nom:
 *                   type: string
 *                   description: Le nom du bâtiment
 *                 accepted:
 *                   type: string
 *                   description: Le statut du bâtiment (accepté ou non)
 *                 prestataire_id:
 *                   type: boolean
 *                   description: L'identifiant du prestataire associé
 *                 use_resa:
 *                   type: boolean
 *                   description: Utilisation des réservations pour le bâtiment
 *         500:
 *           description: Erreur interne du serveur
 */

router.get('/:idPresta', batimentController.getBatByIdPrestataire);
/**
 * @swagger
 * /batiment :
 *     get:
 *       summary: Obtenir les bâtiments associés à un prestataire
 *       tags:
 *       - Batiment
 *       parameters:
 *         - name: idPresta
 *           in: path
 *           required: true
 *           type: integer
 *           description: L'identifiant du prestataire pour lequel récupérer les bâtiments associés
 *       responses:
 *         200:
 *           description: Succès - Récupération des bâtiments associés réussie
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id_emplacement:
 *                   type: string
 *                   description: L'identifiant du bâtiment
 *                 id_type:
 *                   type: string
 *                   description: L'identifiant du type du bâtiment
 *                 description:
 *                   type: string
 *                   description: La description du bâtiment
 *                 nom:
 *                   type: string
 *                   description: Le nom du bâtiment
 *                 accepted:
 *                   type: string
 *                   description: Le statut du bâtiment (accepté ou non)
 *                 prestataire_id:
 *                   type: boolean
 *                   description: L'identifiant du prestataire associé
 *                 use_resa:
 *                   type: boolean
 *                   description: Utilisation des réservations pour le bâtiment
 *         500:
 *           description: Erreur interne du serveur
 */

router.post('/updateDisplay', batimentController.updateDisplay);
/**
 * @swagger
 * /batiment/updateDisplay:
 *    post:
 *       summary: Mettre à jour l'affichage des réservations pour un bâtiment
 *       tags:
 *       - Batiment
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: body
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               id_bat:
 *                 type: string
 *                 description: L'identifiant du bâtiment à mettre à jour
 *       responses:
 *         200:
 *           description: Mise à jour de l'affichage réussie
 *         500:
 *           description: Erreur interne du serveur
 */

module.exports = router;