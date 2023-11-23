//admin.service.js

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const filePath = path.join(__dirname, '..','datasource/users.json');


const getAllUsers = (req) => {
    let filtre = req.query.filtre;
    console.log('filtre', filtre)
    console.log('path', filePath)
    let users = [];
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const dataStr = data.toString();
        console.log('before', dataStr)
        temp = JSON.parse(dataStr);
        console.log('temp', temp)
        users = temp.filter(user => user.login.includes(filtre));
        console.log('after', users)
    } catch (errorLecture) {
        console.log(errorLecture);
    }
    return users;
}

const createUser = (req,callback) => {
    const { permission, email, password } = req.body;
    let users = [];
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const dataStr = data.toString();
        users = JSON.parse(dataStr);
    } catch (errorLecture) {
        console.log(errorLecture);
    }
    const newUser = {id_user: uuidv4(), permission: permission, login: email , password: password};
    users.push(newUser);
    try {
        fs.writeFileSync(filePath, JSON.stringify(users));
        callback(null, "success");
    } catch (errorEcriture) {
        callback(errorEcriture, null);
    }
};

const deleteUser = (req,callback) => {
    let id = req.body.id_user;
    let users = [];
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const dataStr = data.toString();
        temp = JSON.parse(dataStr);
        users = temp.filter((user) => user.id_user!=id)
    } catch (errorLecture) {
        console.log(errorLecture);
    }

    try {
        fs.writeFileSync(filePath, JSON.stringify(users));
        callback(null, "success");
    } catch (errorEcriture) {
        callback(errorEcriture, null);
    }
};

const changeUser = (req,callback) => {
    const { id_user, permission, email, password } = req.body;
    let users = [];
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const dataStr = data.toString();
        temp = JSON.parse(dataStr);
        users = temp.filter((user) => user.id_user!=id_user)
    } catch (errorLecture) {
        console.log(errorLecture);
    }
    const newUser = {id_user: id_user, permission: permission, login: email , password: password};
    users.push(newUser);
    try {
        fs.writeFileSync(filePath, JSON.stringify(users));
        callback(null, "success");
    } catch (errorEcriture) {
        callback(errorEcriture, null);
    }
};

module.exports = {
    createUser : createUser,
    getAllUsers : getAllUsers,
    deleteUser : deleteUser,
    changeUser : changeUser,
};