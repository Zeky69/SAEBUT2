// utilisateur.router.js

const express = require("express");
const userController = require("../controllers/utilisateur.controllers");
const userMiddlewares = require("../middlewares/utilisateur.middlewares");
var router = express.Router();

//se connecter
//router.get('/', loginMiddlewares.validateLoginInput,loginController.login);

router.post("/login", userMiddlewares.validateLoginInput, userController.login);
router.post(
  "/register",
  userMiddlewares.validateRegistrationInput,
  userController.register
);
router.post("/forgot-password", userController.forgotPassword);
router.get(
  "/reset-password/:token",
  userMiddlewares.verifyTokenMiddleware,
  userController.resetPasswordForm
);

router.post(
  "/reset-password/:token",
  userMiddlewares.verifyTokenMiddleware,
  userController.resetPassword
);
/**
 * @swagger
 * /utilisateur/register:
 *    post:
 *       summary: Enregistrer un nouvel utilisateur
 *       tags:
 *       - Utilisateur
 *       consumes:
 *         - application/json
 *       parameters:
 *         - in: body
 *           name: body
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Le nom de l'utilisateur
 *               prenom:
 *                 type: string
 *                 description: Le prénom de l'utilisateur
 *               email:
 *                 type: string
 *                 format: email
 *                 description: L'adresse e-mail de l'utilisateur
 *               description:
 *                 type: string
 *                 description: La description de l'utilisateur
 *               siret:
 *                 type: string
 *                 description: Le numéro de SIRET de l'utilisateur
 *       responses:
 *         200:
 *           description: Utilisateur enregistré avec succès
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Message de succès
 *               data:
 *                 type: string
 *                 description: Identifiant de l'utilisateur (id_prestataire)
 *         400:
 *           description: Requête invalide - Vérifiez la structure de la requête
 *         500:
 *           description: Erreur interne du serveur lors de l'enregistrement de l'utilisateur
 */
router.get("/prestataire/:id", userController.getPrestataireObject);


router.post("/contact", userMiddlewares.validateContactInput, userController.sendContactViaMail);

router.get(
  "/:token",(req,res,next)=>{
    console.log("Token reçu")
    next()
  },
  userMiddlewares.verifyTokenMiddleware,
  userController.getInformationWithToken
);

module.exports = router;
