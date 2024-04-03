const {checkEmpIsFree, isLocationBelongsToProvider} = require("../services/map2D.service");


exports.checkEmpIsFree = async (req , res , next) => {
    const id_emplacement = req.params.id;
    try {
        const reponse = await checkEmpIsFree(id_emplacement);
        if (reponse) {
            next();
    }
        return res.status(403).send("pas de reponse check");
    } catch (error) {
        return res.status(500).send(error.message || "Internal error")
    }
}

exports.isLocationBelongsToProvider = async (req, res, next) => {
    const id_emplacement = req.params.id;
    const id_prestataire = req.user.prestataire.id_prestataire;
    try {
        const reponse = await isLocationBelongsToProvider(id_emplacement, id_prestataire);
        if (reponse) {
            next();
        }
        return res.status(403).send("Il n'est pas autorisé à accéder à cette ressource car il n'est pas le propriétaire de l'emplacement");
    } catch (error) {
        return res.status(500).send(error.message || "Internal error")
    }
}