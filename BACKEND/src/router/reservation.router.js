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
 *       tags:
 *       - Reservation
 *       parameters:
 *         - name: id_bat
 *           in: path
 *           required: true
 *           type: string
 *           description: L'identifiant du bâtiment pour lequel récupérer les disponibilités
 *           example: de6255e4-3453-4989-8831-c8b2b102c99a
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
 *       tags:
 *       - Reservation
 *       parameters:
 *         - name: id_bat
 *           in: path
 *           required: true
 *           type: string
 *           description: L'identifiant du bâtiment pour lequel récupérer les réservations
 *           example: de6255e4-3453-4989-8831-c8b2b102c99a
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

router.get('/ticket/:idTicket', resaController.getAllResaTicket);

router.post('/disponibilite/', resaController.createDispo);
/**
 * @swagger
 * /reservation/disponibilite:
 *    post:
 *       summary: Créer une nouvelle disponibilité pour un bâtiment
 *       tags:
 *       - Reservation
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
 *                 example: de6255e4-3453-4989-8831-c8b2b102c99a
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: La date et l'heure d'ouverture de la disponibilité
 *                 example: 2024-06-01T08:30
 *               duree:
 *                 type: string
 *                 description: La durée de la disponibilité au format HH:mm
 *                 example: 00:30
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
 *       tags:
 *       - Reservation
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
 *                 example: 2
 *               id_dispo:
 *                 type: integer
 *                 description: L'identifiant de la disponibilité à réserver
 *                 example: 1
 *       responses:
 *         200:
 *           description: Réservation réussie
 *         400:
 *           description: Requête invalide - Vérifiez la structure de la requête
 *         500:
 *           description: Erreur interne du serveur
 */

router.get('/disponibilite/id/:id_dispo', resaController.getDispoByID);

router.patch('/disponibilite/:id_dispo', resaController.accepterDispo);

router.delete('/disponibilite/:id_dispo', resaController.deleteDispoById);
/**
 * @swagger
 * /reservation/disponibilite/{id_dispo}:
 *     delete:
 *       summary: Supprimer une disponibilité
 *       tags:
 *       - Reservation
 *       parameters:
 *         - name: id_dispo
 *           in: path
 *           required: true
 *           type: integer
 *           description: L'identifiant de la disponibilité à supprimer
 *           example: 1
 *       responses:
 *         200:
 *           description: Suppression de la disponibilité réussie
 *         400:
 *           description: Disponibilité non trouvée pour l'identifiant spécifié
 *         500:
 *           description: Erreur interne du serveur
 */

router.patch('/', resaController.deleteResaById);
/**
 * @swagger
 * /reservation:
 *    patch:
 *       summary: Annuler une réservation
 *       tags:
 *       - Reservation
 *       parameters:
 *         - in: body
 *           name: body
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               id_resa:
 *                 type: integer
 *                 description: L'identifiant de la réservation à annuler
 *                 example: 1
 *       responses:
 *         200:
 *           description: Annulation de la réservation réussie
 *         400:
 *           description: Requête invalide - Vérifiez la structure de la requête
 *         500:
 *           description: Erreur interne du serveur
 */

module.exports = router;