const toiletteService = require('../services/toilette.service');



exports.getToilette = async (req,res) => {
    let reponse = await toiletteService.getToilette(req);
    console.log("reponse controller",reponse);
    if (reponse) {
        return res.status(200).send(reponse);
    }
    return res.status(401).send("no info");
}


exports.getToiletteUUID = async (req,res) => {
    let info = req.params.uuid;
    console.log("info",info);
    let reponse = await toiletteService.getToiletteUUID(info);
    if (reponse) {
        return res.status(200).send(reponse);
    }
    return res.status(401).send("no info");
}


exports.saveToilette = async (req,res) => {
    try {
        let info = await toiletteService.saveToilette(req);
        if(info){
            return res.status(200).send(info);
        }else{
            return res.status(401).send("no info");
        }
    }
    catch (error) {
        return res.status(500).send("Internal error");
    }
}


exports.deleteToilette = (req, res) => {
    let info = req.query;
    console.log("info",info);
    let reponse = toiletteService.deleteToilette(info);
    if (reponse) {
        return res.status(200).send(reponse);
    }
    return res.status(401).send("no info");
}