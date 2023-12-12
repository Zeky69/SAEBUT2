const mapPrestatairesService =  require('../services/mapPrestataire.service')

// ...
exports.getBatdebug2 = async (req,res) => {
    console.log("debug before service");
    return await mapPrestatairesService.getBatdebug(req,(error, data) => {
        console.log("debug after service");
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send("Showing all users");
    });
};

exports.getBatdebug= async (req,res) => {
    try {
        let info = await mapPrestatairesService.getBatdebug2();
        console.log("info",info);
        if(info){
            return res.status(200).send(info);
        }else{
            return res.status(401).send("no info");
        }
    }
    catch (error) {
        return res.status(500).send("Internal error");
    }
};

exports.getEmpUUID = async (req,res) => {
    let info = req.params.uuid;
    console.log("info",info);
    let reponse = await mapPrestatairesService.getEmpUUID(info);
    if (reponse) {
        return res.status(200).send(reponse);
    }
    return res.status(401).send("no info");
}

exports.getBatUUID = async (req,res) => {
    let info = req.params.uuid;
    console.log("info",info);
    let reponse = await mapPrestatairesService.getBatUUID(info);
    if (reponse) {
        return res.status(200).send(reponse);
    }
    return res.status(401).send("no info");
}

exports.getBatempUUID = async (req,res) => {
    let info = req.params.uuid;
    console.log("info",info);
    let reponse = await mapPrestatairesService.getBatempUUID(info);
    if (reponse) {
        return res.status(200).send(reponse);
    }
    return res.status(401).send("no info");
}

// ...


exports.getEmp =  async (req,res) => {
    let info = req.query;
    if (info.name) {
        if (info.posx && info.posz) {
            reponse = await mapPrestatairesService.getoneEmp(req);
            if (reponse) {
                return res.status(200).send(reponse);
            }
            return res.status(401).send("no info");
        }
        reponse = await mapPrestatairesService.getManyEmp(req);
        if (reponse) {
            return res.status(200).send(reponse);
        }
        return res.status(401).send("no info");
    }
    reponse = await mapPrestatairesService.getAllEmp(req);
    if (reponse) {
        return res.status(200).send(reponse);
    }
    return res.status(401).send("no info");
}

exports.saveEmp = (req, res) => {
    
    mapPrestatairesService.createEmp(req,(error,data)=>{
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send("emp saved successfully");
    })
};

exports.deleteEmp = (req,res) => {
    mapPrestatairesService.deleteEmp(req, (error,data)=> {
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send("emp deleted successfully");
    })
}

exports.updateEmp = async (req,res) => {
    let info = req.body;
    return await mapPrestatairesService.updateEmpFree(info,(error,data)=>{
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send("emp updated successfully");
    })
}


exports.getBat = async (req,res) => {
    let info = req.query;
    let reponse = [];
        if (info.name) {
            if(info.posx && info.posz){
                reponse = await mapPrestatairesService.getOneBat(req);
                if (reponse) {
                    return res.status(200).send(reponse);
                }
                return res.status(401).send("no info");
            }
            reponse = await mapPrestatairesService.getManybat(req);
            if (reponse) {
                return res.status(200).send(reponse);
            }
            return res.status(401).send("no info");
        }
        reponse = await mapPrestatairesService.getAllBat(req);
        if (reponse) {
            return res.status(200).send(reponse);
        }
        return res.status(401).send("no info");

};

exports.getBatUUID = async (req,res) => {
    let info = req.params.uuid;
    console.log("info",info);
    let reponse = await mapPrestatairesService.getBatUUID(info);
    if (reponse) {
        return res.status(200).send(reponse);
    }
    return res.status(401).send("no info");
}


exports.savebat = (req, res) => {
    mapPrestatairesService.createbat(req,(error,data)=>{
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send("bat saved successfully");
    })
}

exports.deletebat = (req,res) => {
    let info = req.query;
    console.log("info",info);
    let reponse = mapPrestatairesService.deletebat(info);
    if (reponse) {
        return res.status(200).send(reponse);
    }
    return res.status(401).send("no info");
}
