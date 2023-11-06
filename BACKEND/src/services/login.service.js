//admin.service.js

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..','datasource/users.json');

const login = (req,callback) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const dataStr = data.toString();
        users = JSON.parse(dataStr);
    } catch (errorLecture) {
        console.log(errorLecture);
    }
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        callback(null, user);
        
    } else {
        
        callback("User not found", null);
        
    }
};

module.exports = {
    login : login,
}