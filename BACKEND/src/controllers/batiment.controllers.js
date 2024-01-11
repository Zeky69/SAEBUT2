const batimentService = require('../services/batiment.service');
const resaService = require("../services/reservations.service");

exports.getBatByIdPrestataire = async (req, res) => {
    return batimentService.getBatByIdPrestataire(req, (error, data) => {
        if (error) {
            console.log(error)
            return res.status(500).send("Internal error");
        }
        return res.status(200).send(data);
    });
}

exports.updateDisplay = (req, res) => {
    return batimentService.updateDisplay(req,(error,data)=>{
        if (error) {
            console.log(error)
            return res.status(500).send("Internal error");
        }
        console.log(data);
        return res.status(200).send("display updated");
    });
}