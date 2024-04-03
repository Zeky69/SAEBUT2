//utilisateur.controllers.js
const jwt = require("jsonwebtoken");
const jwtSecret = "djilsietmaxime";
const userService = require("../services/utilisateur.service");
const sendEmail = require("../services/SendMail");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.loginUser(email, password);
    if (!user) {
      return res.status(401).send("Utilisateur non trouvé");
    }
    const token = jwt.sign(user, jwtSecret, { expiresIn: "24h" });
    let oui = {
      token,
      id: user.user_id,
      fname: user.first_name,
      lname: user.last_name,
      email: user.email,
      group_id: user.group_id,

    };

    return res.status(200).json({
      token,
      id: user.user_id,
      fname: user.first_name,
      lname: user.last_name,
      email: user.email,
      group_id: user.group_id,
    });
  } catch (error) {
    console.error("Erreur lors de la tentative de connexion:");
    return res.status(500).send("Erreur lors de la connexion");
  }
};

exports.register = async (req, res) => {
  try {
    const { nom, prenom, email, description, siret } = req.body;

    const result = await userService.registerUser(
      nom,
      prenom,
      email,
      description,
      siret
    );

    if (result) {
      res.status(200).json({
        message: "User registered successfully",
        data: `id_prestataire : ${result}`,
      });
    } else {
      res.status(400).json({ error: "User registration failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getInformationWithToken = async (req, res) => {
  const token = req.params.token; // ou params

  try {
    const information = await userService.getInformationWithToken(token);
    if (!information) {
      return res
        .status(401)
        .send(
          "Problème avec la récupération depuis le token (je fais un test)"
        );
    }
    return res.status(200).json(information);
  } catch (error) {
    return res.status(500).send("Erreur lors de la connexion avec le token");
  }
};

exports.getPrestataireObject = async (req, res) => {
  const id = req.params.id;

  try {
    const prestataire = await userService.getPrestataireObject(id);
    if (!prestataire) {
      return res
        .status(401)
        .send("Problème avec la récupération du prestataire");
    }
    return res.status(200).json(prestataire);
  } catch (error) {
    return res.status(500).send("Erreur lors de la connexion avec le token");
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const resetToken = await userService.generatePasswordResetToken(email);
    sendEmail.sendEmail(
      "Réinitialisation de votre mot de passe",
      email,
      "Pour réinitialiser votre mot de passe cliquez sur ce lien, ce lien est valable 15 min :\n\n http://localhost:8080/reset-password/" +
        resetToken
    );
    res
      .status(200)
      .json({ message: "Un email de réinitialisation a été envoyé." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

exports.resetPassword = async (req, res) => {
  const { newPassword } = req.body;

  const userId = req.user.user_id;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userService.updateUserPassword(userId, hashedPassword);
    res.status(200).json({ message: "Mot de passe réinitialisé avec succès" });
  } catch (error) {
    console.error(
      "Erreur lors de la réinitialisation du mot de passe :",
      error
    );
    res.status(500).send("Erreur lors de la réinitialisation du mot de passe");
  }
};

exports.resetPasswordForm = (req, res) => {
  res
    .status(200)
    .send("Montrer le formulaire de réinitialisation du mot de passe ici.");
};
