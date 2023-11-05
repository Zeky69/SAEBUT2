//admin.middlewares.js
const validator = require('validator');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..','datasource/users.json');

exports.validateUserToAddInput = (req, res, next) => {
    const { email, password, permission } = req.body;
    if (!email || !password) {
        return res.status(400).send("Email et password sont nuls");
    }
    if (!validator.isEmail(email)) {
        return res.status(400).send("Format incorrect pour l'email");
    }
    if (permission>2 || permission<0){ //Possibilité d'afficher un warning si permision = 0
        return res.status(400).send("Valeur incorrect pour la permission");
    }
    
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const dataStr = data.toString();
        temp = JSON.parse(dataStr);
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].login==email){
                return res.status(400).send("Email déjà utilisé");
            }
        }
    } catch (errorLecture) {
        console.log(errorLecture);
    }
    next();
}

exports.validateUserInput = (req, res, next) => {
    const id= req.body.id_user;
    if (!id) {
        return res.status(400).send("id_user est nul");
    }
    
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const dataStr = data.toString();
        temp = JSON.parse(dataStr);
        users = temp.filter(user => user.id_user===id)
        if (users.length==0){
            return res.status(400).send("Utilisateur non trouvé");
        }
        
    } catch (errorLecture) {
        console.log(errorLecture);
    }
    next();
    
    
}

exports.validateFilterInput = (req, res, next) => {
    const filtre = req.body.filtre;
    if (filtre) {
        if (!validator.isAlpha(filtre, 'en-US', {ignore: ' '})) {
            return res.status(400).send("Format incorrect pour le filtre");
        }
    }
    next();
}