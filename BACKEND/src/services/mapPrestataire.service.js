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
        emps = await pool.query(getAllEmpQuery, getAllEmpValues);
        console.log("result", emps.rows);

    } catch (error) {
        console.error('Erreur lors de la récupération des emplacements :', error);
    } finally {
        client.release();
        return emps.rows;
    }

};

const getBatdebug2 = async (req,res) => {
    const client = await pool.connect();
    let result = [];
    try {
        // Récupérer tous les batiments
        const getAllBatimentQuery = 'SELECT * FROM batiment';
        result = await pool.query(getAllBatimentQuery);
        console.log("result",result.rows);

        return result.rows


    } catch (error) {
        console.error('Erreur lors de la récupération des batiments :', error);

    } finally {
        client.release();

    }

};


const getAllEmp = async (req) => {
    const client = await pool.connect();
    let emps = [];
    try {
        // Récupérer tous les batiments
        const getAllEmpQuery = 'SELECT * FROM emplacement';
        emps = await pool.query(getAllEmpQuery);
        console.log("result", emps.rows);

    } catch (error) {
        console.error('Erreur lors de la récupération des emplacements :', error);
    } finally {
        client.release();
        console.log("emps",emps.rows)
        return emps.rows;
    }
}

const getoneEmp = async (req) => {
    const client = await pool.connect();
    let name = req.query.name;
    let posx = req.query.posx;
    let posz = req.query.posz;
    let emps = [];
    try {
        // Récupérer tous les batiments
        const getOneEmpQuery = 'SELECT * FROM emplacement WHERE nom = $1 AND posx = $2 AND posz = $3';
        const getOneEmpValues = [name, posx, posz];
        emps = await pool.query(getOneEmpQuery, getOneEmpValues);
        console.log("result", emps.rows);

    } catch (error) {
        console.error('Erreur lors de la récupération des emplacements :', error);
    }
    finally {
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
        emps = await pool.query(getOneEmpQuery, getOneEmpValues);
        console.log("result", emps.rows);

    } catch (error) {
        console.error('Erreur lors de la récupération des emplacements :', error);
    }
    finally {
        client.release();
        return emps.rows;
    }
}


const getBatType = async (req) => {
    const client = await pool.connect();
    let result = [];
    console.log("getbattype je suis la ")
    try {
        // Récupérer tous les batiments
        const getAllBatimentQuery = 'SELECT * from type';
        result = await pool.query(getAllBatimentQuery);
        console.log("resulsmdslqdkmlqt", result.rows);
    } catch (error) {
        console.error('Erreur lors de la récupération des batiments :', error);
    } finally {
        client.release();
        return result.rows;
    }
}



const createbat = async (req, callback) => {

    console.log("createbat",req.body);
    const {nom, name,emp_uuid, posx, posy, posz,rota, prestataire, description ,status, type } = req.body;
    const client = await pool.connect();
    console.log("connection")
    try {
        // Insérer le nouveau batiment dans la table batiment
        const insertBatimentQuery = 'INSERT INTO batiment (id_batiment,description,nom, name, status, id_emplacement, posx, posy, posz, rota, prestataire_id, type_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9, $10,$11 ,$12) RETURNING *';
        const uuid_bat = uuidv4();
        const insertBatimentValues = [uuid_bat ,description,nom,name,status, emp_uuid, posx, posy, posz, rota, 1 , type];
        const result = await pool.query(insertBatimentQuery, insertBatimentValues);

        // Récupérer le batiment inséré
        const newBatiment = result.rows[0];

        // Appeler le callback avec le nouveau batiment
        callback(null, newBatiment);
    } catch (error) {
        console.error('Erreur lors de l\'ajout du batiment :', error);
        // Appeler le callback avec l'erreur
        callback(error, null);
    }finally {
        client.release();
    }
};


const createEmp = async (req, callback) => {
    const { name, description , posx, posy, posz, rota, matricepoints } = req.body;
    const client = await pool.connect();
    console.log("connection")
    try {
        const uuid_emp = uuidv4();
        // Insérer le nouveau batiment dans la table batiment
        const insertEmpQuery = 'INSERT INTO emplacement (id_emplacement, description ,nom , posx, posy, posz, rotationx, matricepoints) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

        console.log("uuid",uuid_emp)
        const insertEmpValues = [uuid_emp ,description,name, posx, posy, posz, rota, {matricepoints}];
        const result = await pool.query(insertEmpQuery, insertEmpValues);

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
    console.log("deleteEmp",id)
    try {
        let res;
        let sql = "DELETE FROM emplacement WHERE id_emplacement = $1 RETURNING *";
        res = await pool.query(sql, [id]);
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
    let { uuid, description, nom } = req.body;

    try {
        let res;
        let sql = "UPDATE emplacement SET description = $1, nom = $2 WHERE id_emplacement = $3 RETURNING *";
        res = await pool.query(sql, [description, nom, uuid]);
        console.log("Modification réussie de l'emplacement avec id" + uuid);
        return res.rows;
    } catch (err) {
        console.log(err);
        return err;

    }finally {
        client.release();
    }
}


const updateEmpFree =async  (req,callback) => {
    let uuid = req.uuid;
    let batid = req.batid;
    console.log("update service emp",uuid,batid);
    const client = await pool.connect();
    try {
        if(batid !== 0){
            const updateBatQuery = 'UPDATE emplacement SET batiment_id = $1 WHERE id_emplacement = $2';
            const updateBatValues = [batid, uuid];
            await pool.query(updateBatQuery, updateBatValues);
        }
        else{
            const updateBatQuery = 'UPDATE emplacement SET batiment_id = $1 WHERE id_emplacement = $2';
            const updateBatValues = [null,uuid];
            await pool.query(updateBatQuery, updateBatValues);
        }
        return callback(null, "success");
    }catch (error) {
        console.error('Erreur lors de la mise à jour de l\'emplacement :', error);
        // Appeler le callback avec l'erreur
        callback(error, null);

    }
    finally{
        client.release();
    }
};

const getBatempUUID = async (req) => {
    const uuid = req;
    const client = await pool.connect();
    let result = [];
    try {
        // Récupérer tous les batiments
        const getAllBatimentQuery = 'SELECT * FROM batiment WHERE id_emplacement = $1';
        const getAllBatimentValues = [uuid];
        result = await pool.query(getAllBatimentQuery, getAllBatimentValues);
        console.log("result", result.rows);
    } catch (error) {
        console.error('Erreur lors de la récupération des batiments :', error);
    } finally {
        client.release();
        return result.rows;
    }
}

const getBatUUID = async (req) => {
    const uuid = req;
    const client = await pool.connect();
    let result = [];
    try {
        // Récupérer tous les batiments
        const getAllBatimentQuery = 'SELECT * FROM batiment WHERE batiment.id_batiment = $1';
        const getAllBatimentValues = [uuid];
        result = await pool.query(getAllBatimentQuery, getAllBatimentValues);
        console.log("result", result.rows);
    }
    catch (error) {
        console.error('Erreur lors de la récupération des batiments :', error);
    }
    finally {
        client.release();
        return result.rows;
    }
}

const getBatdebug = async () => {
    const client = await pool.connect();
    let result = [];
    try {
        // Récupérer tous les batiments
        const getAllBatimentQuery = 'SELECT * FROM batiment';
        result = await pool.query(getAllBatimentQuery);
        console.log("result", result.rows);
    }
    catch (error) {
        console.error('Erreur lors de la récupération des batiments :', error);
    }
    finally {
        client.release();
        return result.rows;
    }

};

const getManybat = async (req) => {
    let filtre = req.query.name;
    let bats = [];
    const client = await pool.connect();
    try {

        const getManyBatimentQuery = 'SELECT * FROM batiment WHERE name LIKE $1';
        const getManyBatimentValues = ['%' + filtre + '%'];

        bats = await pool.query(getManyBatimentQuery, getManyBatimentValues);
        console.log("result", bats.rows);

    }
    catch (error) {
        console.error('Erreur lors de la récupération des batiments :', error);
    }
    finally {
        client.release();
        return bats.rows;
    }
}


const getAllBat = async (req) => {
    const client = await pool.connect();
    let result = [];
    try {
        // Récupérer tous les batiments
        const getAllBatimentQuery = 'SELECT * FROM batiment';
        result = await pool.query(getAllBatimentQuery);
        console.log("result allbat", result.rows);
    }
    catch (error) {
        console.error('Erreur lors de la récupération des batiments :', error);
    }
    finally {
        client.release();
        return result.rows;
    }

}

const getOnebat = async (req) => {
    const { name, posx, posz } = req.query;
    let bats = [];
    const client = await pool.connect();
    try {

            const getOneBatimentQuery = 'SELECT * FROM batiment WHERE name = $1 AND posx = $2 AND posz = $3';
            const getOneBatimentValues = [name, posx, posz];

            bats = await pool.query(getOneBatimentQuery, getOneBatimentValues);
            console.log("result", bats.rows);


    }
    catch (error) {
        console.error('Erreur lors de la récupération des batiments :', error);

    }
    finally {
        client.release();
        return bats.rows;
    }
}






const deletebat = async (req) => {
    let id_batiment = req.uuid
    console.log("deletebat",id_batiment)
    const client = await pool.connect();
    try {
        const deleteBatimentQuery = 'DELETE FROM batiment WHERE id_batiment = $1';
        const deleteBatimentValues = [id_batiment];
        await pool.query(deleteBatimentQuery, deleteBatimentValues);
    }
    catch (error) {
        console.error('Erreur lors de la suppression du batiment :', error);
    }
    finally {
        client.release();
    }
}





module.exports = {
    getBatUUID,
    getBatempUUID,
    getEmpUUID,
    getBatdebug2,
    getBatdebug,
    getManyEmp,
    getAllEmp,
    getoneEmp,
    getOnebat,
    createEmp,
    deleteEmp,
    updateEmpFree,
    getAllBat,
    getManybat,
    createbat,
    deletebat,
    getBatType,
    updateEmp,
}

