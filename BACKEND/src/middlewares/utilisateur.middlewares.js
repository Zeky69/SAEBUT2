//utilisateur.middlewares.js
const validator = require('validator');
const userService = require('../services/utilisateur.service')

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];


    if (token == null)  {
        console.log("token null")
        return res.sendStatus(401);}

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        console.log("token ok")
        next();
    });
}

exports.validateLoginInput = (req, res, next) => {
    
    const { email, password } = req.body;
    if (!email || !password) {
        console.log("oui")
        return res.status(400).send("Email et password sont nuls");
    }
    if (!validator.isEmail(email)) {
        return res.status(400).send("Format incorrect pour l'email");
    }
    next();
}

exports.validateRegistrationInput = async (req, res, next) => {
    try {
      const { nom, prenom, email } = req.body;
  
      if (!nom || typeof nom !== 'string' || !prenom || typeof prenom !== 'string') {
        return res.status(400).json({ error: 'Invalid name or surname' });
      }
  
      if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
  
      const existingUser = await userService.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: 'Email already exists' });
      }
    
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };