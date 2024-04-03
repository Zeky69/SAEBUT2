const mapPrestatairesService =  require('../services/mapPrestataire.service')
const {response} = require("express");

// ...
exports.getBatdebug2 = async (req,res) => {
    return await mapPrestatairesService.getBatdebug(req,(error, data) => {
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send("Showing all users");
    });
};

exports.updatebat = async (req,res) => {
    let info = req.body;

    let reponse = await mapPrestatairesService.updateBatStatus(info);
    if (reponse) {
        return res.status(200).send(reponse);
    }
    return res.status(401).send("no info");
}

exports.getBatType = async (req,res) => {
    let reponse = await mapPrestatairesService.getBatType(req);
    if (reponse) {
        return res.status(200).send(reponse);
    }
    return res.status(401).send("no info");
}

exports.getBatdebug= async (req,res) => {
    try {
        let info = await mapPrestatairesService.getBatdebug2();
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
    let reponse = await mapPrestatairesService.getEmpUUID(info);
    if (reponse) {
        return res.status(200).send(reponse);
    }
    return res.status(401).send("no info");
}

exports.getBatUUID = async (req,res) => {
    let info = req.params.uuid;
    let reponse = await mapPrestatairesService.getBatUUID(info);
    if (reponse) {
        return res.status(200).send(reponse);
    }
    return res.status(401).send("no info");
}

exports.getBatempUUID = async (req,res) => {
    let info = req.params.uuid;
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

exports.deleteEmp = async (req,res) => {
    let id = req.params.id;
    try {
        let reponse = await mapPrestatairesService.deleteEmp(id);
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
    let info = req.body;
    return await mapPrestatairesService.updateEmpFree(info,(error,data)=>{
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send("emp updated successfully");
    })
}


exports.updateEmpInfo = async (req,res) => {
    try {
        let reponse = await mapPrestatairesService.updateEmp(req);
        if (reponse) {
            return res.status(200).send(reponse);
        }
        return res.status(401).send("pas de reponse update");
    }catch (error) {
        return res.status(500).send(error.message || "Internal error");
    }
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
    let reponse = mapPrestatairesService.deletebat(info);
    if (reponse) {
        return res.status(200).send(reponse);
    }
    return res.status(401).send("no info");
}
