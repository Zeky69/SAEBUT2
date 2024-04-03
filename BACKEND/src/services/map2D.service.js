const pool = require("../database/db.js")
const { v4: uuidv4 } = require('uuid');
const {query} = require("express");




const getType = async (req,res) => {
    const client = await pool.connect();
    try {
        const typeQuery = 'select id_type as value , libelle from type\n';
        const res = await client.query(typeQuery);
        return res.rows;
    } catch (error) {
        console.log("error",error);
        return error;
    }
    finally {
        client.release();
    }
}

const getTerrainWithPrestataireValid = async (req,res) => {
    const client = await pool.connect();
    try {
        const terrainQuery = 'select nom , id_emplacement, description ,t.id_type ,prestataire_id , matricepoints , t.marker from emplacement inner join public.type t on t.id_type = emplacement.id_type  where prestataire_id is not null and accepted = true ';
        const res = await client.query(terrainQuery);
        return res.rows;
    } catch (error) {
        console.log("error",error);
        return error;
    }
    finally {
        client.release();
    }

}

const getAllEmp = async (req) => {
    const client = await pool.connect();
    let emps = [];
    try {
        // Récupérer tous les batiments
        const getAllEmpQuery = 'SELECT * FROM emplacement';
        emps = await client.query(getAllEmpQuery);
        console.log("Récupération de tous les emplacements réussie");
        console.log(emps);
        return emps.rows;

    } catch (error) {
        console.error('Erreur lors de la récupération des emplacements :', error);
    } finally {
        client.release();

    }
}


const createEmp = async (req, callback) => {
    const { name, description , matricepoints , type_id , prestaire_id} = req.body;
    const client = await pool.connect();

    try {
        const uuid_emp = uuidv4();
        // Insérer le nouveau batiment dans la table batiment
        const insertEmpQuery = 'INSERT INTO emplacement(id_emplacement, description ,nom , matricepoints, prestataire_id , id_type) VALUES ($1, $2, $3, $4 , $5 ,$6) RETURNING *';
        const insertEmpValues = [uuid_emp ,description,name, {matricepoints} ,prestaire_id , type_id];
        const result = await client.query(insertEmpQuery, insertEmpValues);

        // Récupérer le batiment inséré
        const newEmp = result.rows[0];

        // Appeler le callback avec le nouveau batiment
        callback(null, newEmp);
    }
    catch (error) {
        console.error('Erreur lors de l\'ajout du batiment :', error);
        // Appeler le callback avec l'erreur
        callback(error, null);
    }
    finally {
        client.release();
    }

};


const deleteEmp = async (id) => {
    const client = await pool.connect();
    try {
        let res;
        let sql = "DELETE FROM emplacement WHERE id_emplacement = $1 RETURNING *";
        res = await client.query(sql, [id]);
        console.log("Suppression réussie de l'emplacement avec id" + id );
        return res.rows;
    } catch (err) {
        console.log(err);
        return err;

    }finally {
        client.release();
    }

}


const updateEmp = async (req) => {
    const client = await pool.connect();
    let uuid = req.params.id;
    let { description, nom , type_id, prestataire_id , matricepoints ,accept} = req.body;
    let sqlQuery = "UPDATE emplacement SET";
    let sqlValues = [];
    let sqlParams = [];
    let i = 1;
    if (description) {
        sqlParams.push(`description = $${i}`);
        sqlValues.push(description);
        i++;
    }
    if (nom) {
        sqlParams.push(`nom = $${i}`);
        sqlValues.push(nom);
        i++;
    }
    if (type_id) {
        sqlParams.push(`id_type = $${i}`);
        sqlValues.push(type_id);
        i++;
    }
    if (prestataire_id) {
        sqlParams.push(`prestataire_id = $${i}`);
        sqlValues.push(prestataire_id);
        i++;
    }
    if (matricepoints) {
        sqlParams.push(`matricepoints = $${i}`);
        sqlValues.push(matricepoints);
        i++;
    }
    if (accept) {
        sqlParams.push(`accepted = $${i}`);
        sqlValues.push(accept);
        i++;
    }
    sqlQuery += " " + sqlParams.join(", ") + " WHERE id_emplacement = $"+i+" RETURNING *";

    sqlValues.push(uuid);
    try {
        let res;
        res = await client.query(sqlQuery, sqlValues);
        console.log("Modification réussie de l'emplacement avec id" + uuid);
        return res.rows;
    } catch (err) {
        console.log(err);
        return err;

}
    finally {
        client.release();

    }
}

const updateEmpPresataire = async (uuid,description, nom ) => {
    const client = await pool.connect();

    try {
        let res;
        let sql = "UPDATE emplacement SET description = $1, nom = $2 WHERE id_emplacement = $3 RETURNING *";
        res = await client.query(sql, [description, nom, uuid]);
        console.log("Modification réussie de l'emplacement avec id" + uuid);
        return res.rows;
    } catch (err) {
        console.log(err);
        return err;

    }finally {
        client.release();
    }
}



//verifier si l'emplacement apartient au prestataire

const isLocationBelongsToProvider = async (id_emplacement , prestataire_id) => {
    const client = await pool.connect();


    try {
        let res;
        let sql = "SELECT * FROM emplacement WHERE id_emplacement = $1 AND prestataire_id = $2";
        res = await client.query(sql, [id_emplacement, prestataire_id]);
        return res.rows.length > 0;
    }
    catch (err) {
        console.log(err);
        return false;
    }
    finally {
        client.release();
    }

}




const askEmp = async (id_prestataire,id_emplacement) => {
    const client = await pool.connect();


    try {
        let res;
        let sql = "UPDATE emplacement SET prestataire_id = $1 , accepted = false WHERE id_emplacement = $2 RETURNING *";
        res = await client.query(sql, [id_prestataire, id_emplacement]);
        console.log("Modification réussie de l'emplacement avec id" + id_emplacement);
        return res.rows;
    } catch (err) {
        console.log(err);
        return err;

    }finally {
        client.release();
    }

}


const acceptEmp = async (id_emplacement) => {
    const client = await pool.connect();


    try {
        let res;
        let sql = "UPDATE emplacement SET accepted = true WHERE id_emplacement = $2 RETURNING *";
        res = await client.query(sql, [id_emplacement]);
        return res.rows;
    } catch (err) {
        console.log(err);
        return err;

    }finally {
        client.release();
    }

}

const refuseEmp = async (id_emplacement) => {
    const client = await pool.connect();
    try {
        let res;
        let sql = "UPDATE emplacement SET prestataire_id = null , accepted = false WHERE id_emplacement = $2 RETURNING *";
        res = await client.query(sql, [id_emplacement]);
        return res.rows;
    }
    catch (err) {
        console.log(err);
        return
    }
    finally {
        client.release();
    }
}

const checkEmpIsFree = async (id_emplacement) => {
    const client = await pool.connect();
    try {
        let res;
        let sql = "SELECT * FROM emplacement WHERE id_emplacement = $1 AND prestataire_id IS NULL";
        res = await client.query(sql, [id_emplacement]);
        return res.rows.length > 0;
    }
    catch (err) {
        console.log(err);
        return false;
    }
    finally {
        client.release();
    }

}

const freeEmp = async (id_emplacement) => {
    const client = await pool.connect();
    try {
        let res;
        let sql = "UPDATE emplacement SET prestataire_id = null , accepted = false WHERE id_emplacement = $1 RETURNING *";
        res = await client.query(sql, [id_emplacement]);
        return res.rows;
    }
    catch (err) {
        console.log(err);
        return
    }
    finally {
        client.release();
    }
}



module.exports = {
    getType,
    getTerrainWithPrestataireValid,
    getAllEmp,
    createEmp,
    deleteEmp,
    updateEmp,
    askEmp,
    acceptEmp,
    refuseEmp,
    checkEmpIsFree,
    isLocationBelongsToProvider,
    updateEmpPresataire,
    freeEmp
}




