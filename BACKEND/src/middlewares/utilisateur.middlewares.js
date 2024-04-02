//utilisateur.middlewares.js
const validator = require("validator");
const userService = require("../services/utilisateur.service");
const jwt = require("jsonwebtoken");
const jwtSecret = "djilsietmaxime";

exports.validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log("oui");
    return res.status(400).send("Email et password sont nuls");
  }
  if (!validator.isEmail(email)) {
    return res.status(400).send("Format incorrect pour l'email");
  }
  next();
};

exports.validateRegistrationInput = async (req, res, next) => {
  try {
    const { nom, prenom, email } = req.body;

    if (
      !nom ||
      typeof nom !== "string" ||
      !prenom ||
      typeof prenom !== "string"
    ) {
      return res.status(400).json({ error: "Invalid name or surname" });
    }

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.verifyTokenMiddleware = (req, res, next) => {
  const token = req.params.token;
  if (!token) {
    console.log("Token non fourni");
    return res.status(401).send("Token non fourni");
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      console.log("Token invalide");
      return res.status(403).send("Token invalide");
    }

    req.user = decoded;
    console.log("Token validé");
    next();
  });
};
