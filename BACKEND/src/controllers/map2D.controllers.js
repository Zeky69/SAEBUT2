const Map2DService =  require('../services/map2D.service')


exports.getToilette = async (req,res) => {
    try{
        let response = await Map2DService.getToilette();
        if(response){
            return res.status(200).send(response);
    }
    return res.status(401).send("Pas de toilettes");
    }catch (error) {
        return res.status(500).send("Internal error");
    }
}

exports.getAllEmplacementWithBatiment = async (req,res) => {
    try{
        let response = await Map2DService.getAllEmplacementWithBatiment();
        if(response){
            return res.status(200).send(response);
    }
    return res.status(401).send("Aucun batiment trouvé");
    }catch (error) {
        return res.status(500).send("Internal error");
    }
}

exports.getAllScenes = async (req,res) => {
    try{
        let response = await Map2DService.getAllScenes();
        if(response){
            return res.status(200).send(response);
    }
    return res.status(401).send(" Aucune scene trouvée");
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