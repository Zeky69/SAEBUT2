const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const filePathEmp = path.join(__dirname, '..','datasource/emp.json');
const filePathBat = path.join(__dirname, '..','datasource/bat.json');
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



const createbat = async (req, callback) => {

    console.log("createbat",req.body);
    const { name,emp_uuid, posx, posy, posz, rota, prestataire } = req.body;
    const client = await pool.connect();
    console.log("connection")
    try {
        // Insérer le nouveau batiment dans la table batiment
        const insertBatimentQuery = 'INSERT INTO batiment (id_batiment,description, name, id_emplacement, posx, posy, posz, rota, utilisateur) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9) RETURNING *';
        const uuid_bat = uuidv4();
        const insertBatimentValues = [uuid_bat ,"",name, emp_uuid, posx, posy, posz, rota, prestataire];
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


const deleteEmp = (req,callback) => {
    let name = req.body.name;
    let position = req.body.position;
    let emps = [];
    try {
        const data = fs.readFileSync(filePathEmp, 'utf8');
        const dataStr = data.toString();
        temp = JSON.parse(dataStr);
        emps = temp.filter((emp) => emp.name!=name)
        emps = temp.filter((emp) => emp.position.x!=position.x && emp.position.y!=position.y && emp.position.z!=position.z)
    } catch (errorLecture) {
        console.log(errorLecture);
    }
    try {
        fs.writeFileSync(filePathEmp, JSON.stringify(emps));
        callback(null, "success");
    } catch (errorEcriture) {
        callback(errorEcriture, null);
    }
}


const updateEmpFree = (req, callback) => {
    console.log("updateEmpFree",req.body);
    const { name, posx,posz, batid } = req.body;
    let emps;
    try {
        const data = fs.readFileSync(filePathEmp, 'utf8');
        emps = JSON.parse(data);
        
        const existingEmpIndex = emps.findIndex(emp => emp.objet.object.userData.name === name && emp.posx === posx && emp.posz === posz);

        // Mettre à jour le champ 'free' de l'emploi existant
        if (existingEmpIndex !== -1) {
            emps[existingEmpIndex].batid = batid;

            // Enregistrer les modifications dans le fichier JSON
            fs.writeFileSync(filePathEmp, JSON.stringify(emps));
            callback(null, "success");
        } else {
            callback("L'emploi n'existe pas.", null);
        }
    } catch (error) {
        console.log(error);
        console.log("Erreur lors de la mise à jour de l'emploi.");
        callback(error, null);
    }
};

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






const deletebat = (req,callback) => {
    let name = req.body.name;
    let position = req.body.position;
    let bats = [];
    try {
        const data = fs.readFileSync(filePathBat, 'utf8');
        const dataStr = data.toString();
        temp = JSON.parse(dataStr);
        bats = temp.filter((bat) => bat.name!=name)
        bats = temp.filter((bat) => bat.position.x!=position.x && bat.position.y!=position.y && bat.position.z!=position.z)
    } catch (errorLecture) {
        console.log(errorLecture);
    }
    try {
        fs.writeFileSync(filePathBat, JSON.stringify(bats));
        callback(null, "success");
    } catch (errorEcriture) {
        callback(errorEcriture, null);
    }
}


module.exports = {
    getBatdebug2,
    getBatdebug,
    getManyEmp,
    getAllEmp,
    getoneEmp,
    createEmp,
    deleteEmp,
    updateEmpFree,
    getAllBat,
    getManybat,
    createbat,
    deletebat
}

