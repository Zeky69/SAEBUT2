//login.controllers.js
const loginService = require('../services/login.service');

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    loginService.login(email,password,(error,data)=>{
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send("User logged in successfully");
    })
};

