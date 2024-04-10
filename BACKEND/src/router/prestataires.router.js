// prestataires.router.js

const express = require('express');
const prestaController = require('../controllers/prestataires.controllers');
const prestaMiddlewares = require('../middlewares/prestataire.middlewares');
const userMiddlewares = require('../middlewares/utilisateur.middlewares')

var router = express.Router();

router.get('/', prestaController.getPrestatairesEtatAccepte); //a changer de place 
router.get('/shop', prestaController.getPrestatairesShop); //a changer de place 


router.put('/profil/:id',prestaController.updateUserProfile)
/**
 * @swagger
 * /prestataires/profil/{id}:
 *     put:
 *       summary: Mettre à jour le profil utilisateur
 *       tags:
 *         - Prestataires
 *       consumes:
 *         - application/json
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           type: integer
 *           description: L'identifiant de l'utilisateur dont le profil doit être mis à jour
 *
 */

router.get('/services/update/:id',prestaController.updateServiceState)
/**
 * @swagger
 * /prestataires/services/update/{id}:
 *    get:
 *       summary: Mettre à jour l'état d'un service
 *       tags:
 *         - Prestataires
 *       consumes:
 *         - application/json
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           type: integer
 *           description: Le service de l'utilisateur qui doit être mis à jour
 *       responses:
 *         200:
 *           description: Succès - Mise à jour du service réussie
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: true si la mise à jour a réussi, false sinon
 *                 message:
 *                   type: string
 *                   description: Message de succès ou d'erreur
 *         500:
 *           description: Erreur interne du serveur
 */

router.post('/services/:idPresta', userMiddlewares.verifyToken,prestaController.addService)
/**
 * @swagger
 * /prestataires/services/{idPresta}:
 *    get:
 *       summary: Mettre à jour l'état d'un service
 *       tags:
 *         - Prestataires
 *       consumes:
 *         - application/json
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           type: integer
 *           description: L'identifiant du prestataire qui doit être mis à jour
 *         - in: body
 *           name: idServ
 *           required: true
 *           type: integer
 *           description: L'identifiant du service de l'utilisateur qui doit être mis à jour
 *       responses:
 *         200:
 *           description: Succès - Mise à jour du service réussie
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: true si la mise à jour a réussi, false sinon
 *                 message:
 *                   type: string
 *                   description: Message de succès ou d'erreur
 *         500:
 *           description: Erreur interne du serveur
 */

router.get('/noservices/:id',prestaController.getPrestatairesUnattribuedServices)
/**
 * @swagger
 * /prestataires/noservices/{id}:
 *   get:
 *       summary: Récupérer les services non attribués à un prestataire
 *       tags:
 *         - Prestataires
 *       consumes:
 *         - application/json
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           type: integer
 *           description: L'identifiant de l'utilisateur
 *       responses:
 *         200:
 *           description: Succès - Mise à jour du service réussie
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id_type_service:
 *                   type: integer
 *                   description: L'identifiant du service
 *                 nom:
 *                   type: string
 *                   description: Nom du service
 *         500:
 *           description: Erreur interne du serveur
 */


router.get('/services/:id',prestaController.getPrestatairesServices)
/**
 * @swagger
 * /prestataires/services/{id}:
 *    get:
 *      summary: Récupérer les services attribués à un prestataire
 *      tags:
 *         - Prestataires
 *      consumes:
 *         - application/json
 *      parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           type: integer
 *           description: L'identifiant de l'utilisateur
 *      responses:
 *         200:
 *           description: Succès - récupération des services réussie
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id_service:
 *                   type: integer
 *                   description: L'identifiant du service
 *                 id_type_service:
 *                   type: integer
 *                   description: L'identifiant du type du service
 *                 id_prestataire:
 *                   type: integer
 *                   description: L'identifiant du prestataire
 *                 etat:
 *                   type: boolean
 *                   description: L'état du service
 *                 nom:
 *                   type: string
 *                   description: Nom du service
 *         500:
 *           description: Erreur interne du serveur
 */

router.delete('/services/:idServ/:idPresta',userMiddlewares.verifyToken,prestaController.removeService)

router.put('/updatePage', prestaController.updatePrestatairePage);
/**
 * @swagger
 * /prestataires/updatePage:
 *    put:
 *      summary: Mettre à jour la page d'un prestataire
 *      tags:
 *         - Prestataires
 *      consumes:
 *         - application/json
 *      parameters:
 *         - in: body
 *           name: body
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               page_info:
 *                 type: string
 *                 description: Les informations de la page
 *               id_prestataire:
 *                 type: integer
 *                 description: L'identifiant du prestataire
 */

router.get('/types', prestaController.getPrestatairesTypes); //a changer de place
/**
 * @swagger
 * /prestataires/types:
 *    get:
 *      summary: Récupérer les types de prestataires
 *      tags:
 *        - Prestataires
 *      consumes:
 *         - application/json
 *      responses:
 *         200:
 *           description: Succès - récupération des types de prestataires réussie
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 libelle:
 *                   type: string
 *                   description: Le libellé du type
 *                 id_type:
 *                   type: string
 *                   description: L'identifiant du type
 *                 prestataire_id:
 *                   type: integer
 *                   description: L'identifiant du prestataire
 *         500:
 *           description: Erreur interne du serveur
 */

router.get('/:id', prestaController.getPrestataireById); // a changer de place 
/**
 * @swagger
 * /prestataires/{id}:
 *     get:
 *       summary: Récupérer un prestataire par son identifiant
 *       tags:
 *        - Prestataires
 *       consumes:
 *         - application/json
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           type: integer
 *           description: L'identifiant de l'utilisateur
 *       responses:
 *         200:
 *           description: Succès - récupération des types de prestataires réussie
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 id_prestataire:
 *                   type: integer
 *                   description: L'identifiant du prestataire
 *                 description:
 *                   type: string
 *                   description: La description du prestataire
 *                 nom:
 *                   type: string
 *                   description: Le nom du prestataire
 *                 id_user:
 *                   type: integer
 *                   description: L'identifiant de l'utilisateur
 *                 etat_id:
 *                   type: integer
 *                   description: L'identifiant de l'état
 *                 page_info:
 *                   type: string
 *                   description: Les informations de la page
 *                 photo_profil:
 *                   type: string
 *                   description: Le nom de la photo de profil
 *         500:
 *           description: Erreur interne du serveur
 */


module.exports = router;