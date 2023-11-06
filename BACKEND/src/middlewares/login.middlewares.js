//login.middlewares.js
const validator = require('validator');

exports.validateLoginInput = (req, res, next) => {
    
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send("Email et password sont nuls");
    }
    if (!validator.isEmail(email)) {
        return res.status(400).send("Format incorrect pour l'email");
    }
    next();
}