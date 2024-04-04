//commandes.controllers

const commandesService = require("../services/commandes.service");

exports.getCommandes = async (req, res) => {
    try {
        const result = await commandesService.getCommandes();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
