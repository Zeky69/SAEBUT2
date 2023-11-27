//login.controllers.js
const loginService = require('../services/login.service');

exports.login = async (req, res) => {
    const { login, password } = req.body;
    console.log(req.body)


    try {
        const user = await loginService.loginUser(login, password);
        if (!user) {
            return res.status(401).send("Utilisateur non trouvé");
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error('Erreur lors de la tentative de connexion:');
        return res.status(500).send("Erreur lors de la connexion");
    }
};


