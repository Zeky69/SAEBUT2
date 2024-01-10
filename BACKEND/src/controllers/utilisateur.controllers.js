//utilisateur.controllers.js
const jwt = require("jsonwebtoken")
const jwtSecret= "djilsietmaxime";
const userService = require('../services/utilisateur.service');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)


    try {
        const user = await userService.loginUser(email, password);
        if (!user) {
            return res.status(401).send("Utilisateur non trouvé");
        }
        const token = jwt.sign(user,jwtSecret, {expiresIn: '24h'});
        console.log(user)
        let oui = {token,'id' : user.user_id, 'fname' : user.first_name, 'lname' :user.last_name, 'email' : user.email, 'group_id' : user.group_id};
        console.log(oui)
        

        return res.status(200).json({token,'id' : user.user_id, 'fname' : user.first_name, 'lname' :user.last_name, 'email' : user.email, 'group_id' : user.group_id});
    } catch (error) {
        console.error('Erreur lors de la tentative de connexion:');
        return res.status(500).send("Erreur lors de la connexion");
    }
};

exports.register = async(req,res) => {
    try {
      const { nom, prenom, email, description, siret } = req.body;
  
      const result = await userService.registerUser(nom, prenom, email, description, siret);
  
      if (result) {
        res.status(200).json({ message: 'User registered successfully', data: `id_prestataire : ${result}` });
      } else {
        res.status(400).json({ error: 'User registration failed' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

exports.getInformationWithToken = async (req,res) => {
    const token = req.params.token // ou params

    try{
        const information = await userService.getInformationWithToken(token);
        if(!information){
            return res.status(401).send("Problème avec la récupération depuis le token (je fais un test)");
        }
        return res.status(200).json(information);
    } catch(error){
        return res.status(500).send("Erreur lors de la connexion avec le token");
    }

}

exports.getPrestataireObject = async (req,res) => {
    const id = req.params.id

    try{
        const prestataire = await userService.getPrestataireObject(id);
        if(!prestataire){
            return res.status(401).send("Problème avec la récupération du prestataire");
        }
        return res.status(200).json(prestataire);
    } catch(error){
        return res.status(500).send("Erreur lors de la connexion avec le token");
    }
}


