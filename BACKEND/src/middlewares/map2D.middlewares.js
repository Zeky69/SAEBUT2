const {checkEmpIsFree,haveAskEmp, isLocationBelongsToProvider} = require("../services/map2D.service");


exports.checkEmpIsFree = async (req , res , next) => {
    const id_emplacement = req.params.id;
    try {
        const reponse = await checkEmpIsFree(id_emplacement);
        console.log(reponse)
        if (reponse) {
            next();
        }else {
            return res.status(403).send("L'emplacement n'est pas libre");
        }
    } catch (error) {
        return res.status(500).send(error.message || "Internal error")
    }
}

exports.isLocationBelongsToProvider = async (req, res, next) => {
    const id_emplacement = req.params.id;
    const id_prestataire = req.prestataire.id_prestataire;
    try {
        const reponse = await isLocationBelongsToProvider(id_emplacement, id_prestataire);
        if (reponse) {
            next();
        }else {
            return res.status(403).send("Il n'est pas autorisé à accéder à cette ressource car il n'est pas le propriétaire de l'emplacement");
        }
    } catch (error) {
        return res.status(500).send(error.message || "Internal error")
    }
}

exports.haveAskEmp= async (req, res, next) => {
    const id_emplacement = req.params.id;
    const id_prestataire = req.prestataire.id_prestataire;
    try {
        const reponse = await haveAskEmp(id_emplacement, id_prestataire);
        if (reponse) {
            next();
        }else {
            return res.status(403).send("Il n'est pas autorisé à accéder à cette ressource car il n'est pas le propriétaire de l'emplacement");
        }
    } catch (error) {
        return res.status(500).send(error.message || "Internal error")
    }
}