const validator = require('validator');
const fs = require('fs');
const path = require('path');
const filePathEmp = path.join(__dirname, '..','datasource/emp.json');
const filePathBat = path.join(__dirname, '..','datasource/bat.json');
const pool = require("../database/db.js");



exports.validateFilterInput = (req, res, next) => {
    next();
}


exports.validateUUID = (req, res, next) => {
    next();
}

exports.validateAddInput = async (req, res, next) => {
    next();
}

exports.validateDelInput = (req, res, next) => {
    next();
}
