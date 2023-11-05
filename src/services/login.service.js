//admin.service.js

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const filePath = path.join(__dirname,'admin.json');

const login = (email,password,callback) => {
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

module.exports = {
    login : login,
}