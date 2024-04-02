const { v4: uuidv4 } = require('uuid');
const pool = require("../database/db.js")



const getManyEmp = async (req) => {
    const client = await pool.connect();
    let filtre = req.query.name;
    let emps = [];
    try {
        // Récupérer tous les batiments
        const getAllEmpQuery = 'SELECT * FROM emplacement WHERE nom LIKE $1';
        const getAllEmpValues = ['%' + filtre + '%'];
        emps = await client.query(getAllEmpQuery, getAllEmpValues);

    } catch (error) {
        console.error('Erreur lors de la récupération des emplacements :', error);
    } finally {
        client.release();
        return emps.rows;
    }

};


const getAllEmp = async (req) => {
    const client = await pool.connect();
    let emps = [];
    try {
        // Récupérer tous les batiments
        const getAllEmpQuery = 'SELECT * FROM emplacement';
        emps = await client.query(getAllEmpQuery);

    } catch (error) {
        console.error('Erreur lors de la récupération des emplacements :', error);
    } finally {
        client.release();
        return emps.rows;
    }
}


const getEmpUUID = async (req) => {
    const client = await pool.connect();
    let uuid = req;
    let emps = [];
    try {
        // Récupérer tous les batiments
        const getOneEmpQuery = 'SELECT * FROM emplacement WHERE id_emplacement = $1';
        const getOneEmpValues = [uuid];
        emps = await client.query(getOneEmpQuery, getOneEmpValues);

    } catch (error) {
        console.error('Erreur lors de la récupération des emplacements :', error);
    }
    finally {
        client.release();
        return emps.rows;
    }
}


const getEmpType = async (req) => {
    const client = await pool.connect();
    let result = null;
    try {
        // Récupérer tous les batiments
        const getAllBatimentQuery = 'SELECT * from type';
        result = await client.query(getAllBatimentQuery);
        return result.rows;

    } catch (error) {
        console.error('Erreur lors de la récupération des batiments :', error);
    } finally {
        client.release();
        return result;
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
    let { uuid, description, nom , type_id, prestataire_id , matricepoints} = req.body;

    try {
        let res;
        let sql = "UPDATE emplacement SET description = $1, nom = $2 , id_type= $3, prestataire_id = $4 , matricepoints= $5  WHERE id_emplacement = $6 RETURNING *";
        res = await client.query(sql, [description, nom, type_id, prestataire_id , {matricepoints}, uuid]);
        console.log("Modification réussie de l'emplacement avec id" + uuid);
        return res.rows;
    } catch (err) {
        console.log(err);
        return err;

    }finally {
        client.release();
    }
}











module.exports = {

    getEmpUUID,
    getManyEmp,
    getAllEmp,
    createEmp,
    deleteEmp,
    updateEmp,
}

