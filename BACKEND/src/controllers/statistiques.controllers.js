//statistiques.controllers

const statistiquesService = require("../services/statistiques.service");

exports.getVenteBilletParDate = async (req, res) => {
    try {
        const result = await statistiquesService.getVenteBilletParDate();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.getVenteBilletParType = async (req, res) => {
    try {
        const result = await statistiquesService.getVenteBilletParType();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.getVenteArticle = async (req, res) => {
    try {
        const result = await statistiquesService.getVenteArticle(req);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.getVenteParCategorie = async (req, res) => {
    try {
        const result = await statistiquesService.getVenteParCategorie();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}