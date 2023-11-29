const validator = require('validator');
const fs = require('fs');
const path = require('path');
const filePathEmp = path.join(__dirname, '..','datasource/emp.json');
const filePathBat = path.join(__dirname, '..','datasource/bat.json');



exports.validateempFilterInput = (req, res, next) => {
    next();
}


exports.validateAddempInput = (req, res, next) => {
    const { objet, idModel, posx, posz, batid } = req.body;

    try {
        const data = fs.readFileSync(filePathEmp, 'utf8');
        const dataObj = JSON.parse(data);

        const emps = dataObj

        // Vérifier si un employé existe déjà aux mêmes coordonnées
        const existingEmp = emps.find(emp => emp.posx === posx && emp.posz === posz);

        if (existingEmp) {
            return res.status(400).json({error: "l'emp existe deja"});
        }

    } catch (errorLecture) {
            console.log(errorLecture);
    }
    
    next();
};


exports.validateDelempInput = (req, res, next) => {
    next();
}

exports.validateUpdateempInput = (req, res, next) => {
    const { name, posx, posz, batid } = req.body;
    console.log("valide up",req.body);
    if (!name || !posx || !posz) {
        return res.status(400).send("Un des champs est nul");
    }
    next();
}


exports.validatebatFilterInput = (req, res, next) => {
    next();
}

//bat =  {name: "batiment1", type: "batiment", position: {x: 0, y: 0, z: 0}, rotation: {x: 0, y: 0, z: 0}, name_of_emp: "emp1", prestataire_id: "prestataire1"}
exports.validateAddbatInput = (req, res, next) => {
    const { objet,idModel, posx, posy, posz, prestataire_id, status} = req.body;

    if (!objet || !posx || !posy || !posz || !prestataire_id || !status) {
        return res.status(400).send("Un des champs est nul");
    }
    try {
        const data = fs.readFileSync(filePathBat, 'utf8');
        const dataObj = JSON.parse(data);

        // Vérifier si le fichier contient un tableau 'bat'
        const bats = dataObj;

        // Vérifier si l'emp existe déjà à l'emplacement spécifié
        const existingBat = bats.find(bat => bat.posx === posx && bat.posz === posz);

        if (existingBat) {
            return res.status(400).json({error: "le batiment existe deja"});
        }
    } catch (errorLecture) {
        console.log(errorLecture);
    }
    next();
}

exports.validateDelbatInput = (req, res, next) => {
    const { name , nameofemp, position} = req.body;
    if (!name, !nameofemp, !position) {
        return res.status(400).send("Un des champs est nul");
    }
    next();
}




