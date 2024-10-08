const scneneService = require('../services/scene.services');


// ...

exports.getScene = async (req,res) => {
    let reponse = await scneneService.getScene(req);
    if (reponse) {
        return res.status(200).send(reponse);
    }
    return res.status(401).send("no info");
};


exports.getSceneUUID = async (req,res) => {
    let info = req.params.uuid;
    let reponse = await scneneService.getSceneUUID(info);
    if (reponse) {
        return res.status(200).send(reponse);
    }
    return res.status(401).send("no info");
};


exports.saveScene = async (req,res) => {
    try {
        let info = await scneneService.saveScene(req);
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




exports.deleteScene = (req, res) => {
    let info = req.query;
    let reponse = scneneService.deleteScene(info);
    if (reponse) {
        return res.status(200).send(reponse);
    }
    return res.status(401).send("no info");
};


exports.getEvent = async (req,res) => {
    let reponse = await scneneService.getEvent(req);
    if (reponse) {
        return res.status(200).send(reponse);
    }
    return res.status(401).send("no info");

};

exports.getEventUUID = async (req,res) => {
    let info = req.params.uuidEvent;
    let reponse = await scneneService.getEventUUID(info);
    if (reponse) {
        return res.status(200).send(reponse);
    }
    return res.status(401).send("no info");
}

exports.saveEvent = async (req,res) => {
    try {
        let info = await scneneService.saveEvent(req);
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

exports.deleteEvent = (req, res) => {
    let info = req.params.uuidEvent;
    let reponse = scneneService.deleteEvent(info);
    if (reponse) {
        return res.status(200).send(reponse);
    }
    return res.status(401).send("no info");
}


// ...