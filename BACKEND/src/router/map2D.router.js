const express = require('express');
const map2Dcontroller = require('../controllers/map2D.controllers');
const { verifyisAdmin, verifyisPrestataire, getPrestaireId, verifyToken} = require("../middlewares/utilisateur.middlewares");
const {checkEmpIsFree ,isLocationBelongsToProvider, haveAskEmp} = require("../middlewares/map2D.middlewares");

var router = express.Router();

/**
 * Récupérer tous les emplacements
 * filtre possible :
 * query :
 * withPrestataire : boolean -> si true, retourne les emplacements avec prestataire accepté
 *
 */
router.get('/emp',map2Dcontroller.getAllEmp);

/**
 * Créer un emplacement
 * body :
 * {
 * nom : string,
 * description : string,
 * type : string,
 * prix : number,
 * id_prestataire : number
 * }
 */
router.post('/emp',verifyToken,verifyisAdmin, map2Dcontroller.createEmp);

/**
 * Supprimer un emplacement
 * params : id de l'emplacement
 */
router.delete('/emp/:id',verifyToken,verifyisAdmin, map2Dcontroller.deleteEmp);

/**
 * Modifier les informations d'un emplacement
* params : id de l'emplacement
* body :
* {
* nom : string,
* description : string,
*
* */
router.patch('/emp/:id',verifyToken,verifyisPrestataire,getPrestaireId,isLocationBelongsToProvider, map2Dcontroller.updateEmpPresataire);


/**
 * Modifier les informations d'un emplacement par l'admin
 * params : id de l'emplacement
 * body :
 * { description: String
 * ,nom : String
 * ,type_id : number
 * prestataire_id : number
 * matricepoints : Json ,
 * accept : boolean
 * }
 */

router.patch('/emp/admin/:id',verifyToken,verifyisAdmin, map2Dcontroller.updateEmp);

/**
*  Demander un emplacement
* params : id de l'emplacement
*
* */
router.post('/emp/ask/:id',verifyToken,checkEmpIsFree,getPrestaireId, map2Dcontroller.askEmp);

/**
 * accepter une demande d'emplacement
* params : id de l'emplacement
*
* */
router.post('/emp/accept/:id',verifyToken,verifyisAdmin, map2Dcontroller.acceptEmp);

/**
 * refuser une demande d'emplacement
* params : id de l'emplacement
 */
router.post('/emp/refuse/:id',verifyToken,verifyisAdmin, map2Dcontroller.refuseEmp);


/**
 * libérer un emplacement
 * params : id de l'emplacement
 */
router.post('/emp/free/:id',verifyToken,verifyisPrestataire,getPrestaireId, haveAskEmp ,map2Dcontroller.freeEmp);

/**
 *   get type prestations
 */
router.get('/type', map2Dcontroller.getType);


module.exports = router;