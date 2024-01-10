//admin.service.js

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const filePath = path.join(__dirname, '..','datasource/users.json');

const pool = require('../database/db');

async function getAllUsers(){
    const client = await pool.connect();
    try{
        const res=await client.query(`SELECT u.FIRST_NAME, u.LAST_NAME, prestataire.description, u.email, u.date_created, etat_libelle,prestataire.etat_id, id_prestataire, prestataire.id_user
        from prestataire
        INNER JOIN ETAT e on e.etat_id = prestataire.etat_id
        INNER JOIN UTILISATEURS u on u.user_id = prestataire.id_user
        ORDER BY etat_libelle ASC;`)
        return res.rows;
    }catch(err){
        console.log("Récupération données impossible -> " + err)

    }finally{
        client.release();
    }
}

async function acceptPrestataire(user_id,prestataire_id) {
    const client = await pool.connect();
  
    try {
      const queryUpdate = 'UPDATE prestataire SET etat_id = 2 WHERE id_prestataire = $1;';
      const queryInsertPassword = `INSERT INTO MOTS_DE_PASSE_UTILISATEURS(user_id, password) VALUES ($1, 'mdp');`;
  
      await client.query('BEGIN');
  
      await client.query(queryUpdate, [prestataire_id]);
  
      await client.query(queryInsertPassword, [user_id]);
  
      await client.query('COMMIT');
  
      console.log(`Prestataire accepté avec succès (ID: ${prestataire_id})`);
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('Acceptation du prestataire échouée:', err);
    } finally {
      client.release();
    }
  }
  

async function refusePrestataire(id) {
    const client = await pool.connect();
    try {
      const query = 'UPDATE prestataire SET etat_id = 3 WHERE id_prestataire = $1;';
      const result = await client.query(query, [id]);  
      console.log(`Prestataire refusé avec succès (ID: ${id})`);
    } catch (err) {
      console.error('Refus du prestataire échoué:', err);
    } finally {
      client.release();
    }
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
    acceptPrestataire,
    refusePrestataire,
    createUser : createUser,
    getAllUsers : getAllUsers,
    deleteUser : deleteUser,
    changeUser : changeUser,
};