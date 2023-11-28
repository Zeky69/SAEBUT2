const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const filePathEmp = path.join(__dirname, '..','datasource/emp.json');
const filePathBat = path.join(__dirname, '..','datasource/bat.json');



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
}

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


const getManybat = (req) => {
    let filtre = req.query.name;
    let bats = [];
    try {
        const data = fs.readFileSync(filePathBat, 'utf8');
        const dataStr = data.toString();
        let temp = JSON.parse(dataStr);
        bats = temp.filter(bat => bat.name.includes(filtre));
    }
    catch (errorLecture) {
        console.log(errorLecture);

    }
    return bats;
}


const getAllbat = (req) => {
    let bats = [];
    try {
        const data = fs.readFileSync(filePathBat, 'utf8');
        const dataStr = data.toString();
        temp = JSON.parse(dataStr);
        bats = temp;
    } catch (errorLecture) {
        console.log(errorLecture);
    }
    return bats;
}

const getOnebat = (req) => {
    const { name, posx, posz } = req.query;
    let bats = [];
    try {
        const data = fs.readFileSync(filePathBat, 'utf8');
        const dataStr = data.toString();
        temp = JSON.parse(dataStr);
        bats = temp.filter((bat) => bat.name.includes(name));
        bats = temp.filter((bat) => bat.position.x==posx && bat.position.z==posz);
    }
    catch (errorLecture) {
        console.log(errorLecture);
    }
    return bats;
}



const createbat = (req, callback) => {
    const { objet, idModel, posx, posy, posz, prestataire_id, status } = req.body;
    let bats;

    try {
        // Lire le contenu actuel du fichier
        const data = fs.readFileSync(filePathBat, 'utf8');
        bats = JSON.parse(data);
    } catch (errorLecture) {
        console.log(errorLecture);
        bats = [];
    }

    // Créer le nouvel "bat"
    const newbat = { objet: objet, idModel :idModel, posx: posx, posy: posy, posz: posz , prestataire_id: prestataire_id, status: status };

    // Ajouter le nouvel "bat" au tableau existant
    bats.push(newbat);

    // Écrire le tableau 'bats' mis à jour dans le fichier
    try {
        fs.writeFileSync(filePathBat, JSON.stringify(bats));
        callback(null, "success");
    } catch (errorEcriture) {
        callback(errorEcriture, null);
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
    getManyEmp,
    getAllEmp,
    getoneEmp,
    createEmp,
    deleteEmp,
    updateEmpFree,
    getAllbat,
    getManybat,
    createbat,
    deletebat
}

