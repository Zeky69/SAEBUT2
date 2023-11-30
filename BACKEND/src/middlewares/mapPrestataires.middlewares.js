const validator = require('validator');
const fs = require('fs');
const path = require('path');
const filePathEmp = path.join(__dirname, '..','datasource/emp.json');
const filePathBat = path.join(__dirname, '..','datasource/bat.json');
const pool = require("../database/db.js");



exports.validateempFilterInput = (req, res, next) => {
    next();
}

exports.validatebatFilterInputdebug = (req, res, next) => {
    console.log("valide bat debug middle");
    next();


}

exports.validateAddbatInputdebug = async (req, res, next) => {
    console.log("valide add middle");
    next();
}

exports.validateAddempInput = async (req, res, next) => {
    const { name, description , posx, posy, posz, rota, matricepoints } = req.body;
    console.log("valide add emp",req.body);
    if (!name || !description || !posx || !posy || !posz || rota === undefined || !matricepoints) {
        return res.status(400).send("Un des champs est nul");
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
    const { name,emp_uuid, posx, posy, posz,rota, prestataire} = req.body;

    if (!name || !emp_uuid || !posx || !posy || !posz || !prestataire) {
        return res.status(400).send("Un des champs est nul");
    }
    try {

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




