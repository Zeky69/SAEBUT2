const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const filePathEmp = path.join(__dirname, '..','datasource/emp.json');
const filePathBat = path.join(__dirname, '..','datasource/bat.json');
const pool = require("../database/db.js")



const getManyEmp = (req) => {
    let filtre = req.query.name;
    let emps = [];
    try {
        const data = fs.readFileSync(filePathEmp, 'utf8');
        const dataStr = data.toString();
        let temp = JSON.parse(dataStr);
        emps = temp.filter(emp => emp.objet.object.userData.name.includes(filtre));
    } catch (errorLecture) {
        console.log(errorLecture);
    }
    return emps;
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


const getAllEmp = (req) => {
    let emps = [];
    try {
        const data = fs.readFileSync(filePathEmp, 'utf8');
        const dataStr = data.toString();
        temp = JSON.parse(dataStr);
        emps = temp;
    } catch (errorLecture) {
        console.log(errorLecture);
    }
    return emps;
}

const getoneEmp = (req) => {
    let name = req.query.name;
    let posx = req.query.posx;
    let posz = req.query.posz;
    let emps = [];
    try {
        const data = fs.readFileSync(filePathEmp, 'utf8');
        const dataStr = data.toString();
        temp = JSON.parse(dataStr);
        emps = temp.filter((emp) => emp.objet.object.userData.name==name);
        emps = temp.filter((emp) => emp.posx == posx && emp.posz == posz);
    } catch (errorLecture) {
        console.log(errorLecture);
    }
    return emps;
}

const createEmp = (req, callback) => {
    const { objet , idModel , posx ,posy ,posz , batid } = req.body;
    console.log(req.body.objet.object.name);
    let emps;

    try {
        // Lire le contenu actuel du fichier
        const data = fs.readFileSync(filePathEmp, 'utf8');
        emps = JSON.parse(data);
    } catch (errorLecture) {
        console.log(errorLecture);
        emps = [];
    }
    // Créer le nouvel "emp"
    var newEmp = 0;
    if(batid != null){
        newEmp = { objet: objet , idModel: idModel , posx: posx, posy: posy,posz: posz , batid: batid };
    }
    else{
        newEmp = { objet: objet , idModel: idModel , posx: posx, posy: posy ,posz: posz , batid: null };
    }
    

    // Ajouter le nouvel "emp" au tableau existant
    emps.push(newEmp);

    // Écrire le tableau 'emps' mis à jour dans le fichier
    try {
        fs.writeFileSync(filePathEmp, JSON.stringify(emps));
        callback(null, "success");
    }
    catch (errorEcriture) {
        callback(errorEcriture, null);

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

