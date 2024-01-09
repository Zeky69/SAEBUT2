//users.controllers.js
const prestataireService = require('../services/prestataire.service');


exports.getPrestataireById = async (req,res) => {
    let id = req.params.id;
    try {
        let reponse = await prestataireService.getPrestataireById(id);
        if (reponse) {
            return res.status(200).send(reponse);
        }
        return res.status(401).send("Pas d'information trouvé pour cet id");
    }
    catch (error) {
        return res.status(500).send(error.message || "Internal error");
    }

}

exports.updatePrestatairePage = async (req,res) => {
    let prestataire = req.body;
    try {
        let reponse = await prestataireService.updatePrestatairePage(prestataire);
        if (reponse) {
            return res.status(200).send("Page modifiée");
        }
        return res.status(401).send("Pas d'information trouvé pour cet id");
    }
    catch (error) {
        return res.status(500).send(error.message || "Internal error");
    }
}