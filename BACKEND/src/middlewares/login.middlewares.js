//login.middlewares.js
const validator = require('validator');

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
        return res.status(400).send("Email et password sont nuls");
    }
    if (!validator.isEmail(email)) {
        return res.status(400).send("Format incorrect pour l'email");
    }
    next();
}