const express = require('express');
const map2Dcontroller = require('../controllers/map2D.controllers');
const { verifyisAdmin, verifyisPrestataire, getPrestaireId, verifyToken} = require("../middlewares/utilisateur.middlewares");
const {checkEmpIsFree ,isLocationBelongsToProvider, haveAskEmp} = require("../middlewares/map2D.middlewares");

var router = express.Router();

router.get('/emp',map2Dcontroller.getAllEmp);
/**
 * @swagger
 * /emp:
 *     get:
 *       summary: Récupérer tous les emplacements
 *       parameters:
 *         - name: withPrestataire
 *           in: query
 *           description: Si true, retourne les emplacements avec prestataire accepté
 *           schema:
 *             type: boolean
 *       responses:
 *         '200':
 *           description: Liste des emplacements récupérée avec succès
 *
 */

router.post('/emp',verifyToken,verifyisAdmin, map2Dcontroller.createEmp);
/**
 * @swagger
 * /emp:
 *   post:
 *       summary: Créer un emplacement
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nom:
 *                   type: string
 *                 description:
 *                   type: string
 *                 type:
 *                   type: string
 *                 prix:
 *                   type: number
 *                 id_prestataire:
 *                   type: number
 *       responses:
 *         '200':
 *           description: Emplacement créé avec succès
 */

/**
 * Supprimer un emplacement
 * params : id de l'emplacement
 */
router.delete('/emp/:id',verifyToken,verifyisAdmin, map2Dcontroller.deleteEmp);
/**
 * @swagger
 * /emp/{id}:
 *     delete:
 *       summary: Supprimer un emplacement
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID de l'emplacement à supprimer
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Emplacement supprimé avec succès
 */

router.patch('/emp/:id',verifyToken,verifyisPrestataire,getPrestaireId,isLocationBelongsToProvider, map2Dcontroller.updateEmpPresataire);
/**
 * @swagger
 * /emp/{id}:
 *    patch:
 *       summary: Modifier les informations d'un emplacement
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID de l'emplacement à modifier
 *           required: true
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nom:
 *                   type: string
 *                 description:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Informations de l'emplacement modifiées avec succès
 */

router.patch('/emp/admin/:id',verifyToken,verifyisAdmin, map2Dcontroller.updateEmp);
/**
 * @swagger
 * /emp/admin/{id}:
 *     patch:
 *       summary: Modifier les informations d'un emplacement par l'admin
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID de l'emplacement à modifier
 *           required: true
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 *                 nom:
 *                   type: string
 *                 type_id:
 *                   type: integer
 *                 prestataire_id:
 *                   type: integer
 *                 matricepoints:
 *                   type: object
 *                 accept:
 *                   type: boolean
 *       responses:
 *         '200':
 *           description: Informations de l'emplacement modifiées par l'admin avec succès
 */

router.post('/emp/ask/:id',verifyToken,checkEmpIsFree,getPrestaireId, map2Dcontroller.askEmp);
/**
 * @swagger
 * /emp/ask/{id}:
 *     post:
 *       summary: Demander un emplacement
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID de l'emplacement demandé
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Demande d'emplacement effectuée avec succès
 */

router.post('/emp/accept/:id',verifyToken,verifyisAdmin, map2Dcontroller.acceptEmp);
/**
 * @swagger
 * /emp/accept/{id}:
 *     post:
 *       summary: Accepter une demande d'emplacement
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID de l'emplacement à accepter
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Demande d'emplacement acceptée avec succès
 */

router.post('/emp/refuse/:id',verifyToken,verifyisAdmin, map2Dcontroller.refuseEmp);
/**
 * @swagger
 * /emp/refuse/{id}:
 *     post:
 *       summary: Refuser une demande d'emplacement
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID de l'emplacement à refuser
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Demande d'emplacement refusée avec succès
 */

router.post('/emp/free/:id',verifyToken,verifyisPrestataire,getPrestaireId, haveAskEmp ,map2Dcontroller.freeEmp);
/**
 * @swagger
 * /emp/free/{id}:
 *     post:
 *       summary: Libérer un emplacement
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID de l'emplacement à libérer
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Emplacement libéré avec succès
 */

router.get('/type', map2Dcontroller.getType);
/**
 * @swagger
 * /type:
 *     get:
 *       summary: Obtenir les types de prestations
 *       responses:
 *         '200':
 *           description: Types de prestations récupérés avec succès
 */


module.exports = router;