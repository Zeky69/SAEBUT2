const Map2DService =  require('../services/map2D.service')



exports.getAllEmp = async (req,res) => {
    let {withPrestataire} = req.query;
    try{
        if(withPrestataire === "true"){
        let response = await Map2DService.getTerrainWithPrestataireValid();
            if(response){
            return res.status(200).send(response);
        }}
        else{
            let response = await Map2DService.getAllEmp();
            if(response){
                return res.status(200).send(response);
            }
        }
        return res.status(401).send("Aucun batiment trouvé");
    }catch (error) {
        return res.status(500).send("Internal error");
    }
}



exports.getType = async (req,res) => {
    try{
        let response = await Map2DService.getType();
        if(response){
            return res.status(200).send(response);
    }
    return res.status(401).send("Aucun type trouvé");
    }catch (error) {
        return res.status(500).send("Internal error");
    }
}


exports.createEmp = async (req, res) => {

    await Map2DService.createEmp(req,(error,data)=>{
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send("emp saved successfully");
    })
};


exports.updateEmpPresataire = async (req, res) => {
    let id = req.params.id;
    let {nom , description} = req.body
    try {
        let reponse = await Map2DService.updateEmpPresataire(id,description, nom);
        console.log(reponse)
        if (reponse) {
            return res.status(200).send(reponse);
        }
        return res.status(401).send("pas de reponse update");
    }catch (error) {
        return res.status(500).send(error.message || "Internal error");
    }

}

exports.deleteEmp = async (req,res) => {
    let id = req.params.id;
    try {
        let reponse = await Map2DService.deleteEmp(id);
        if (reponse) {
            return res.status(200).send(reponse);
        }
        return res.status(401).send("pas de reponse delete");
    }
    catch (error) {
        return res.status(500).send(error.message || "Internal error");
    }

}


exports.updateEmp = async (req,res) => {
    try {
        let reponse = await Map2DService.updateEmp(req);
        if (reponse) {
            return res.status(200).send(reponse);
        }
        return res.status(401).send("pas de reponse update");
    }catch (error) {
        return res.status(500).send(error.message || "Internal error");
    }
}
exports.askEmp = async (req, res) => {
    let id_emplacement = req.params.id;
    let id_prestataire = req.prestataire.id_prestataire;
    console.log('id_prestataire', id_prestataire);
    console.log('id_emplacement', id_emplacement);

    try {
        let reponse = await Map2DService.askEmp(id_prestataire, id_emplacement);
        if (reponse) {
            return res.status(200).send(reponse);
        } else {
            return res.status(401).send("pas de reponse ask");
        }
    } catch (e) {
        return res.status(500).send(e.message || "Internal error");
    }
};



exports.acceptEmp =  async (req, res) => {
    let id_emplacement = req.params.id;
    try {
        let reponse  = await Map2DService.acceptEmp(id_emplacement);
        if (reponse) {
            return res.status(200).send(reponse);
        }
        return res.status(401).send("pas de reponse accept");
    }
    catch (error) {
        return res.status(500).send(error.message || "Internal error")
    }
}

exports.refuseEmp =  async (req, res) => {
    let id_emplacement = req.params.id;
    try {
        let reponse  = await Map2DService.refuseEmp(id_emplacement);
        if (reponse) {
            return res.status(200).send(reponse);
        }
        return res.status(401).send("pas de reponse refuse");
    }
    catch (error) {
        return res.status(500).send(error.message || "Internal error")
    }
}

exports.freeEmp = async (req, res) => {
    let id_emplacement = req.params.id;
    try {
        let reponse = await Map2DService.freeEmp(id_emplacement);
        if (reponse) {
            return res.status(200).send(reponse);
        }
        return res.status(401).send("pas de reponse free");
    } catch (error) {
        return res.status(500).send(error.message || "Internal error")
    }
}



