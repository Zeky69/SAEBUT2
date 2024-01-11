const express = require('express');
const resaController = require('../controllers/reservations.controllers');
var router = express.Router();

router.get('/test', resaController.test);
router.get('/disponibilite/:id_bat',resaController.getAllDispoById);
/**
 * @swagger
 * /reservation/disponibilite/{id_bat}:
 *   get:
 *       get:
 *       summary: Obtenir toutes les disponibilités pour un bâtiment spécifié
 *       parameters:
 *         - name: id_bat
 *           in: path
 *           required: true
 *           type: integer  # Assurez-vous que le type correspond au type réel de votre identifiant
 *           description: L'identifiant du bâtiment pour lequel récupérer les disponibilités
 *       responses:
 *         200:
 *           description: Succès - Récupération des disponibilités réussie
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 ouverture:
 *                   type: string
 *                   format: date-time
 *                   description: Date et heure d'ouverture de la disponibilité
 *                 duree:
 *                   type: string
 *                   description: Durée de la disponibilité en minutes
 *                 id_batiment:
 *                   type: string
 *                   description: L'identifiant du bâtiment
 *                 id_client:
 *                   type: integer
 *                   description: L'identifiant du client (sera null pour les disponibilités)
 *                 amount:
 *                   type: integer
 *                   description: Nombre total de réservations (avec id_client is null)
 *                 id_reservation:
 *                   type: integer
 *                   description: L'identifiant de la réservation associée (en option)
 *         404:
 *           description: Aucune disponibilité trouvée pour le bâtiment spécifié
 *         500:
 *           description: Erreur interne du serveur
 */
router.get('/:id_bat', resaController.getAllResa);
/**
 * @swagger
 * /reservation/{id_bat}:
 *    get:
 *       summary: Obtenir toutes les réservations pour un bâtiment spécifié
 *       parameters:
 *         - name: id_bat
 *           in: path
 *           required: true
 *           type: string
 *           description: L'identifiant du bâtiment pour lequel récupérer les réservations
 *       responses:
 *         200:
 *           description: Succès - Récupération des réservations réussie
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 ouverture:
 *                   type: string
 *                   format: date-time
 *                   description: Date et heure d'ouverture de la réservation
 *                 duree:
 *                   type: string
 *                   description: Durée de la réservation en minutes
 *                 id_batiment:
 *                   type: string
 *                   description: L'identifiant du bâtiment
 *                 id_client:
 *                   type: integer
 *                   description: L'identifiant du client
 *                 amount:
 *                   type: integer
 *                   description: Nombre total de réservations
 *                 id_reservation:
 *                   type: integer
 *                   description: L'identifiant de la réservation (en option)
 *         404:
 *           description: Aucune réservation trouvée pour le bâtiment spécifié
 *         500:
 *           description: Erreur interne du serveur
 */

router.post('/disponibilite/', resaController.createDispo);
/**
 * @swagger
 * /reservation/disponibilite:
 *    post:
 *       summary: Créer une nouvelle disponibilité pour un bâtiment
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
 *                 description: L'identifiant du bâtiment pour lequel créer une disponibilité
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: La date et l'heure d'ouverture de la disponibilité
 *               duree:
 *                 type: string
 *                 description: La durée de la disponibilité au format HH:mm
 *       responses:
 *         200:
 *           description: Création de la disponibilité réussie
 *         400:
 *           description: Requête invalide - Vérifiez la structure de la requête
 *         500:
 *           description: Erreur interne du serveur
 *
 */
router.post('/', resaController.reserver)
/**
 * @swagger
 * /reservation:
 *     post:
 *       summary: Réserver une disponibilité
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: body
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               id_client:
 *                 type: integer
 *                 description: L'identifiant du client effectuant la réservation
 *               id_dispo:
 *                 type: integer
 *                 description: L'identifiant de la disponibilité à réserver
 *       responses:
 *         200:
 *           description: Réservation réussie
 *         400:
 *           description: Requête invalide - Vérifiez la structure de la requête
 *         500:
 *           description: Erreur interne du serveur
 */

router.delete('/disponibilite/:id_dispo', resaController.deleteDispoById);
router.patch('/', resaController.deleteResaById);


module.exports = router;