//prestataire.middlewares.js
const validator = require('validator');

exports.validateUserInput = (req, res, next) => {
    const { nom, prenom } = req.body;
    if (!nom || !prenom) {
        return res.status(400).send("Nom et prenom sont nuls");
    }
    if (!validator.isLength(nom, { min: 3}) || !validator.isAlpha(nom, 'en-US', {ignore: ' '}) ) {
        return res.status(400).send("Format incorrect pour le nom");
    }
    if (!validator.isLength(prenom, { min: 3}) || !validator.isAlpha(prenom, 'en-US', {ignore: ' '}) ) {
        return res.status(400).send("Format incorrect pour le prenom");
    }
    next();
}

exports.validateFilterInput = (req, res, next) => {
    const filtre = req.body.filtre;
    if (!validator.isAlpha(filtre, 'en-US', {ignore: ' '})) {
        return res.status(400).send("Format incorrect pour le filtre");
    }
    next();
}