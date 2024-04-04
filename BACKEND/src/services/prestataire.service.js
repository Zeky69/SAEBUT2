//prestataire.services.js
const { v4: uuidv4 } = require('uuid');
const pool = require("../database/db.js")
const bcrypt = require("bcrypt")
const saltRounds = 10;




const getPrestatairesEtatAccepte = async () => {
    let resultat = null;
    const client = await pool.connect();
    try {
        let sql = 'select * from prestataire WHERE etat_id = 2 ORDER BY id_prestataire ASC';
        resultat = await client.query(sql);
        return resultat.rows;
    }
    catch (error) {
        console.log(error);
        return error;
    }
    finally {
        client.release();
    }
}

const getPrestatairesShop= async () => {
    let resultat = null;
    const client = await pool.connect();
    try {
        let sql = `select * from prestataire 
        inner join service s on s.id_prestataire= prestataire.id_prestataire
        WHERE etat_id = 2 and id_type_service = 2 and etat = true
        ORDER BY prestataire.id_prestataire ASC`;
        resultat = await client.query(sql);
        return resultat.rows;
    }
    catch (error) {
        console.log(error);
        return error;
    }
    finally {
        client.release();
    }
}


const getPrestatairesTypes = async () => {
    let resultat = null;
    const client = await pool.connect();
    try {
        let sql = 'SELECT DISTINCT t.libelle , t.id_type , emplacement.prestataire_id FROM emplacement INNER JOIN public.type t on t.id_type = emplacement.id_type WHERE emplacement.id_emplacement in (SELECT id_emplacement from emplacement WHERE emplacement.prestataire_id is not null);';        resultat = await client.query(sql);
        return resultat.rows;
    }
    catch (error) {
        console.log(error);
        return error;
    }
    finally {
        client.release();
    }
}

const getPrestataireById = async (id) => {
    let resultat = null;
    const client = await pool.connect();
    try {
        let sql = 'select * from prestataire WHERE id_prestataire = $1';
        let values = [id];
        resultat = await client.query(sql, values);
        return resultat.rows;
    }
    catch (error) {
        console.log("error",error);
        return error;
    }
    finally {
        client.release();
    }
}


const updatePrestatairePage = async (prestataire) => {

    const client = await pool.connect();
    try {
        let sql = 'UPDATE prestataire SET page_info = $1 WHERE id_prestataire = $2';
        let values = [prestataire.page_info,prestataire.id_prestataire];
        await client.query(sql, values);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
    finally {
        client.release();
    }

}

async function updateUserProfile(user_id, nomEntreprise, description,photoDeProfil,prenom,nom,motDePasse,email){
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

    let query = `UPDATE prestataire 
        SET nom=$1, description=$2, photo_profil=$3
        WHERE id_user=$4;`;

    let res = await client.query(query, [
      nomEntreprise,
      description,
      photoDeProfil,
      user_id,
    ]);

    query = `UPDATE utilisateurs
        SET LAST_NAME=$1, FIRST_NAME=$2, email=$3
        WHERE user_id=$4;`;

    res = await client.query(query, [nom, prenom, email, user_id]);

    if (motDePasse) {
      const hashedPassword = bcrypt.hashSync(motDePasse, saltRounds);

      query = `UPDATE MOTS_DE_PASSE_UTILISATEURS 
            SET Password=$1 where user_id=$2;`;

      res = await client.query(query, [hashedPassword, user_id]);
    }
    await client.query("COMMIT");

    console.log("Insertion réussit !");
  } catch (err) {
    await client.query("ROLLBACK");
    console.log(err);
  } finally {
    client.release();
  }
}

const getPrestatairesServices = async (prestataire_id) => {
    let resultat = null;
    const client = await pool.connect();
    try {
        let sql = `select * from service INNER JOIN type_service tp on tp.id_type_service= service.id_type_service where id_prestataire=$1`;
        resultat = await client.query(sql,[prestataire_id]);
        return resultat.rows;
    }
    catch (error) {
        console.log(error);
        return error;
    }
    finally {
        client.release();
    }
}

const getPrestatairesUnatribuedServices = async (prestataire_id) => {
    let resultat = null;
    const client = await pool.connect();
    try {
        let sql = `select * from type_service 
        where id_type_service not in(select service.id_type_service from service
        where id_prestataire=$1);`;
        resultat = await client.query(sql,[prestataire_id]);
        return resultat.rows;
    }
    catch (error) {
        console.log(error);
        return error;
    }
    finally {
        client.release();
    }
}

async function updateServiceState(id_serv){
    const client = await pool.connect();
    let display=false;

    try {
        await client.query('BEGIN');
        let query = `SELECT etat
                     FROM service
                     WHERE id_service = $1`;

        oldDisplay = await client.query(query, [id_serv]);
        if (oldDisplay.rows[0].etat === false) {
            display = true;
        }
        query = `UPDATE service
                 SET etat=$1
                 WHERE id_service = $2`;
        await client.query(query, [display, id_serv]);
        await client.query("COMMIT");
        console.log("Update state réussit !");
    } catch (err) {
        await client.query("ROLLBACK");
        console.log(err);
    } finally {
        client.release();
    }    
}

const addServiceToPresta = async (idPresta, idType) => {
    const client = await pool.connect();

    console.log(idPresta)
    console.log(idType)
    try {
        let sql = `INSERT INTO service(id_type_service, id_prestataire, etat) VALUES($1,$2,true);`;
        let values = [idType,idPresta];
        await client.query(sql, values);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
    finally {
        client.release();
    }
}

const removeServicePresta = async (idService, idPresta) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        

        let sql = `DELETE FROM service where id_service=$1 and id_prestataire=$2 returning id_type_service;`;
        let values = [idService,idPresta];
        let rows = await client.query(sql, values);
        if(! rows.rows[0].id_type_service){
            throw new Error("Service is empty")

        }
        let id_type = rows.rows[0].id_type_service;


        console.log(id_type)

        switch(id_type){
            case 1:
                sql = `DELETE FROM commentaire where id_prestataire=$1;`;
                break;
            case 2:
                sql = `DELETE FROM produit where prestataire_id=$1;`;
                break;
            default:
                break;
        }
        await client.query(sql, [idPresta])
        await client.query("COMMIT");
        console.log("Delete service réussit !");    
    }
    catch (error) {
        await client.query("ROLLBACK");
        console.log(error);
    }
    finally {
        client.release();
    }
}


module.exports = {
    updateUserProfile,
    getPrestataireById : getPrestataireById,
    updatePrestatairePage :updatePrestatairePage,
    getPrestatairesEtatAccepte :getPrestatairesEtatAccepte,
    getPrestatairesTypes :getPrestatairesTypes,
    getPrestatairesServices:getPrestatairesServices,
    updateServiceState,
    addServiceToPresta,
    removeServicePresta,
    getPrestatairesUnatribuedServices,
    getPrestatairesShop
}

