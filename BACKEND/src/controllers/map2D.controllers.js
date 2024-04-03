const Map2DService =  require('../services/map2D.service')



exports.getAllEmp = async (req,res) => {
    let {withPrestataire} = req.query;
    console.log(withPrestataire);
    try{
        if(withPrestataire === "true"){
        let response = await Map2DService.getTerrainWithPrestataire();
            console.log("je suis pas dans GetAllEmp");

            if(response){
            return res.status(200).send(response);
        }}
        else{
            let response = await Map2DService.getAllEmp();
            console.log("je suis dans getallEmp");
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


