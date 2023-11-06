//login.controllers.js
const loginService = require('../services/login.service');

exports.login = (req, res) => {
    loginService.login(req,(error,data)=>{
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send("email and password correct");
    })
};

