const scneneService = require('../services/scene.services');


// ...

exports.getScene = async (req,res) => {
    let reponse = await scneneService.getScene(req);
    console.log("reponse controller",reponse);
    if (reponse) {
        return res.status(200).send(reponse);
    }
    return res.status(401).send("no info");
};


exports.getSceneUUID = async (req,res) => {
    let info = req.params.uuid;
    console.log("info",info);
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
    console.log("info",info);
    let reponse = scneneService.deleteScene(info);
    if (reponse) {
        return res.status(200).send(reponse);
    }
    return res.status(401).send("no info");
};


// ...