const pool = require("../database/db.js")
const { v4: uuidv4 } = require('uuid');




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

const getTerrainWithPrestataire = async (req,res) => {
    const client = await pool.connect();
    try {
        const terrainQuery = 'select nom , id_emplacement, description ,t.id_type ,prestataire_id , matricepoints , t.marker from emplacement inner join public.type t on t.id_type = emplacement.id_type  where prestataire_id is not null';
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
    getType,
    getTerrainWithPrestataire,
    getAllEmp,
    createEmp,
    deleteEmp,
    updateEmp,
}




