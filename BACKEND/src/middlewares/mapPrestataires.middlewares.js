const validator = require('validator');
const fs = require('fs');
const path = require('path');
const filePathEmp = path.join(__dirname, '..','datasource/emp.json');
const filePathBat = path.join(__dirname, '..','datasource/bat.json');
const pool = require("../database/db.js");



exports.validateempFilterInput = (req, res, next) => {
    next();
}

exports.validatebatTypeFilterInput = (req, res, next) => {
    next();
}

exports.validatebatFilterInputdebug = (req, res, next) => {
    next();


}

exports.validateUpdatebatInput = (req, res, next) => {
    next();
}

exports.validateempUUID = (req, res, next) => {
    next();
}

exports.validateAddbatInputdebug = async (req, res, next) => {
    next();
}

exports.validateAddempInput = async (req, res, next) => {
    const { name, description , matricepoints } = req.body;
    if (!name || !description ||  !matricepoints) {
        return res.status(400).send("Un des champs est nul");
    }
    next();

};


exports.validateDelempInput = (req, res, next) => {
    next();
}

exports.validebatempUUID = (req, res, next) => {
    next();
}

exports.validatebatUUID = (req, res, next) => {
    next();
}

exports.validateUpdateempInput = (req, res, next) => {
    const { uuid, batid } = req.body;
    if (!uuid) {
        return res.status(400).send("Un des champs est nul");
    }
    next();
}

exports.validateUpdateempInfoInput = (req, res, next) => {
    const { uuid, nom , description } = req.body;
    if (!uuid || !nom || !description) {
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
    next();
}




