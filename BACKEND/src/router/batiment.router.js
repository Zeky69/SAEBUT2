const express = require('express');
const batimentController = require('../controllers/batiment.controllers');
const batimentMiddlewares = require('../middlewares/batiment.middlewares');
const resaController = require("../controllers/reservations.controllers");
var router = express.Router();

router.get('/:idPresta', batimentController.getBatByIdPrestataire);
/**
 * @swagger
 * /batiment/{idPresta}:
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
 *                 id_batiment:
 *                   type: string
 *                   description: L'identifiant du bâtiment
 *                 description:
 *                   type: string
 *                   description: La description du bâtiment
 *                 nom:
 *                   type: string
 *                   description: Le nom du bâtiment
 *                 name:
 *                   type: string
 *                   description: Le nom de l'objet 3D associé au bâtiment
 *                 status:
 *                   type: string
 *                   description: Le statut du bâtiment (accepté ou non)
 *                 posx:
 *                   type: double
 *                   description: La position en x du bâtiment
 *                 posy:
 *                   type: double
 *                   description: La position en y du bâtiment
 *                 posz:
 *                   type: double
 *                   description: La position en z du bâtiment
 *                 rota:
 *                   type: double
 *                   description: La rotation du bâtiment
 *                 prestataire_id:
 *                   type: integer
 *                   description: L'identifiant du prestataire associé
 *                 image_path:
 *                   type: string
 *                   description: Le chemin vers l'image du bâtiment
 *                 id_emplacement:
 *                   type: string
 *                   description: L'identifiant de l'emplacement associé
 *                 use_resa:
 *                   type: boolean
 *                   description: Utilisation des réservations pour le bâtiment
 *         404:
 *           description: Aucun bâtiment trouvé pour le prestataire spécifié
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
 *         400:
 *           description: Requête invalide - Vérifiez la structure de la requête
 *         500:
 *           description: Erreur interne du serveur
 */

module.exports = router;