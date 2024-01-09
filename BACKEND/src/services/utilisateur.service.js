//admin.service.js

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..','datasource/users.json');
const pool = require("../database/db.js");

const jwt = require("jsonwebtoken");
const { log } = require('console');
const jwtSecret= "djilsietmaxime";


async function loginUser(login,password){
    const client = await pool.connect();
    try{
        const query = `select * from utilisateurs
        left join MOTS_DE_PASSE_UTILISATEURS ON MOTS_DE_PASSE_UTILISATEURS.user_id=utilisateurs.user_id
        where email=$1 and password=$2;
        `;
        res = await client.query(query,[login,password]);
        console.log("Connexion réussi");
        return res.rows[0];
    }catch(err){
        console.log("Connexion échoué")

    }finally{
        client.release();
    }
}

async function getInformationWithToken(token){
    let response;
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
          console.error('Erreur de décodage du token :');
        } else {
          console.log('Token décodé :', decoded);
          response = {
            'id' : decoded.user_id,
            'fname' : decoded.first_name,
            'lname' : decoded.last_name,
            'email' : decoded.email,
            'group_id' : decoded.group_id
        };
        }
      });
      return response;
}

module.exports = {
    loginUser : loginUser,
    getInformationWithToken : getInformationWithToken
}