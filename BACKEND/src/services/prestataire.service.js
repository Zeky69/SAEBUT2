//prestataire.services.js
const { v4: uuidv4 } = require('uuid');
const pool = require("../database/db.js")




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

const getPrestataireById = async (id) => {
    let resultat = null;
    const client = await pool.connect();
    try {
        let sql = 'select * from prestataire WHERE id_prestataire = $1';
        let values = [id];
        resultat = await client.query(sql, values);
        console.log("resultat",resultat.rows);
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





module.exports = {
    getPrestataireById : getPrestataireById,
    updatePrestatairePage :updatePrestatairePage,
    getPrestatairesEtatAccepte :getPrestatairesEtatAccepte
}

