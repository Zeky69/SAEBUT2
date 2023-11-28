const mapPrestatairesService =  require('../services/mapPrestataire.service')


exports.getEmp = (req,res) => {
    let info = req.query;
    if (info.name) {
        if(info.posx && info.posz){
            return mapPrestatairesService.getoneEmp(req,(error,data)=>{
                if (error) {
                    return res.status(500).send("Internal error");
                }
                return res.status(200).send("Showing all users");
            })
        }
        return mapPrestatairesService.getManyEmp(req,(error,data)=>{
            if (error) {
                return res.status(500).send("Internal error");
            }
            return res.status(200).send("Showing all users");
        })
    }


    return mapPrestatairesService.getAllEmp(req,(error,data)=>{
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send("Showing all users");
    })
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


exports.getBat = (req,res) => {
    let info = req.query;
    if (info.name) {
        if(info.posx && info.posz){
            return mapPrestatairesService.getonebat(req,(error,data)=>{
                if (error) {
                    return res.status(500).send("Internal error");
                }
                return res.status(200).send("Showing all users");
            })
        }
        return mapPrestatairesService.getManybat(req,(error,data)=>{
            if (error) {
                return res.status(500).send("Internal error");
            }
            return res.status(200).send("Showing all users");
        })
    }
    return mapPrestatairesService.getAllbat(req,(error,data)=>{
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send("Showing all users");
    })
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
