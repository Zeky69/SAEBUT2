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

async function updateUserProfile(user_id, nomEntreprise, description,photoDeProfil,prenom,nom,motDePasse){
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        let query = `UPDATE prestataire 
        SET nom =$1, description=$2, photo_profil=$3 
        WHERE id_user=$4;`;

        let res = await client.query(query, [nomEntreprise, description, photoDeProfil,user_id]);

        query = `UPDATE utilisateurs
        SET LAST_NAME=$1, FIRST_NAME=$2
        WHERE user_id=$3;`;

        res = await client.query(query, [nom, prenom, user_id]);

        if(motDePasse){
            query = `UPDATE MOTS_DE_PASSE_UTILISATEURS 
            SET Password=$1 where user_id=$2;`;
    
            res = await client.query(query, [motDePasse, user_id]);
            await client.query('COMMIT');
        }

        console.log("Insertion réussit !")
    } catch (err) {
        await client.query('ROLLBACK');
        console.log(err);
    } finally {
        client.release();
    }
}




module.exports = {
    updateUserProfile,
    getPrestataireById : getPrestataireById,
    updatePrestatairePage :updatePrestatairePage,
    getPrestatairesEtatAccepte :getPrestatairesEtatAccepte
}

