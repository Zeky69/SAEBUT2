//users.controllers.js
const prestataireService = require('../services/prestataire.service');


exports.getPrestatairesTypes = async (req,res) => {
    try {
        let reponse = await prestataireService.getPrestatairesTypes();
        if (reponse) {
            return res.status(200).send(reponse);
        }
        return res.status(401).send("Pas d'information trouvé");
    }
    catch (error) {
        return res.status(500).send(error.message || "Internal error");
    }

}



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

exports.getPrestatairesEtatAccepte = async (req,res) => {
    try {
        let reponse = await prestataireService.getPrestatairesEtatAccepte();
        if (reponse) {
            return res.status(200).send(reponse);
        }
        return res.status(401).send("Pas d'information trouvé");
    }
    catch (error) {
        return res.status(500).send(error.message || "Internal error");
    }
}

exports.getPrestatairesShop = async (req,res) => {
    try {
        let reponse = await prestataireService.getPrestatairesShop();
        if (reponse) {
            return res.status(200).send(reponse);
        }
        return res.status(401).send("Pas d'information trouvé");
    }
    catch (error) {
        return res.status(500).send(error.message || "Internal error");
    }
}



exports.updateUserProfile = async (req,res) => {
    try {
        const { id } = req.params;
        const { nomEntreprise, description, photoDeProfil, prenom, nom, email,motDePasse } = req.body;

        await prestataireService.updateUserProfile(id, nomEntreprise, description, photoDeProfil, prenom, nom, motDePasse,email);

        res.status(200).json({ success: true, message: 'Profil utilisateur mis à jour avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la mise à jour du profil utilisateur.' });
    }
}

exports.getPrestatairesServices = async (req,res) => {
    let id_prestataire = req.params.id;
    try {
        let reponse = await prestataireService.getPrestatairesServices(id_prestataire);
        if (reponse) {
            return res.status(200).send(reponse);
        }
        return res.status(401).send("Pas d'information trouvé pour cet id");
    }
    catch (error) {
        return res.status(500).send(error.message || "Internal error");
    }
}

exports.getPrestatairesUnattribuedServices = async (req,res) => {
    let id_prestataire = req.params.id;
    try {
        let reponse = await prestataireService.getPrestatairesUnatribuedServices(id_prestataire);
        if (reponse) {
            return res.status(200).send(reponse);
        }
        return res.status(401).send("Pas d'information trouvé pour cet id");
    }
    catch (error) {
        return res.status(500).send(error.message || "Internal error");
    }

}

exports.updateServiceState = async (req,res) => {
    try {
        const { id } = req.params;
        await prestataireService.updateServiceState(id);

        res.status(200).json({ success: true, message: 'Service mis à jour avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la mise à jour du service.' });
    }
}

exports.updateServiceState = async (req,res) => {
    try {
        const { id } = req.params;
        await prestataireService.updateServiceState(id);

        res.status(200).json({ success: true, message: 'Service mis à jour avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la mise à jour du service.' });
    }
}

exports.addService = async (req,res) => {
    try {
        const idPresta = req.params.idPresta;
        const id_type_serv = req.body.idServ;

        await prestataireService.addServiceToPresta(idPresta, id_type_serv);

        res.status(200).json({ success: true, message: 'Service ajouté avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Une erreur est survenue lors de l ajout du service.' });
    }
}

exports.removeService = async (req,res) => {
    try {
        const idServ= req.params.idServ;
        const idPresta = req.params.idPresta;
        
        console.log(idPresta)
        await prestataireService.removeServicePresta(idServ,idPresta);

        res.status(200).json({ success: true, message: 'Service supprimé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la suppression du service.' });
    }
}