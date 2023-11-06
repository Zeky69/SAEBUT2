//prestataire.services.js

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const filePath = path.join(__dirname, '..','prestataires.json');

const createUser = (prenom,nom,callback) => {
    let users = [];
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const dataStr = data.toString();
        users = JSON.parse(dataStr);
    } catch (errorLecture) {
        console.log(errorLecture);
    }
    const newUser = {id: uuidv4(), nom: nom , prenom: prenom};
    users.push(newUser);
    try {
        fs.writeFileSync(filePath, JSON.stringify(users));
        callback(null, "success");
    } catch (errorEcriture) {
        callback(errorEcriture, null);
    }
};

const getAllUsers = (req) => {
    let users = [];
    let filtre = req.body.filtre;
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const dataStr = data.toString();
        temp = JSON.parse(dataStr);
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].nom.includes(filtre) ){
                users.push(temp[i]);
            }
        }
    } catch (errorLecture) {
        console.log(errorLecture);
    }
    return users;
}

module.exports = {
    createUser : createUser,
    getAllUsers : getAllUsers
}

