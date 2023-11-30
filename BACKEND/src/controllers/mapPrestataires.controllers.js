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

exports.updateEmp = (req,res) => {
    mapPrestatairesService.updateEmpFree(req,(error,data)=>{
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send("Showing all users");
    });
}


exports.getBat = async (req,res) => {
    let info = req.query;
    let reponse = [];
        if (info.name) {
            if(info.posx && info.posz){
                reponse = await mapPrestatairesService.getoneBat(req);
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


exports.savebat = (req, res) => {
    mapPrestatairesService.createbat(req,(error,data)=>{
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send("bat saved successfully");
    })
}

exports.deletebat = (req,res) => {
    mapPrestatairesService.deletebat(req, (error,data)=> {
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send("bat deleted successfully");
    })
}
