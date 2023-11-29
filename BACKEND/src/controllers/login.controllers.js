//login.controllers.js
const jwt = require("jsonwebtoken")
const jwtSecret= "djilsietmaxime";
const loginService = require('../services/login.service');

exports.login = async (req, res) => {
    const { login, password } = req.body;
    console.log(req.body)


    try {
        const user = await loginService.loginUser(login, password);
        if (!user) {
            return res.status(401).send("Utilisateur non trouvé");
        }
        const token = jwt.sign(user,jwtSecret, {expiresIn: '5s'});
        console.log(user)
        let oui = {token,'id' : user.user_id, 'fname' : user.first_name, 'lname' :user.last_name, 'email' : user.email, 'group_id' : user.group_id};
        console.log(oui)
        

        return res.status(200).json({token,'id' : user.user_id, 'fname' : user.first_name, 'lname' :user.last_name, 'email' : user.email, 'group_id' : user.group_id});
    } catch (error) {
        console.error('Erreur lors de la tentative de connexion:');
        return res.status(500).send("Erreur lors de la connexion");
    }
};

exports.getInformationWithToken = async (req,res) => {
    const token = req.params.token // ou params

    try{
        const information = await loginService.getInformationWithToken(token);
        if(!information){
            return res.status(401).send("Problème avec la récupération depuis le token");
        }
        return res.status(200).json(information);
    } catch(error){
        return res.status(500).send("Erreur lors de la connexion avec le token");
    }

}


