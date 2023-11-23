
const mapPrestatairesService =  require('../services/mapPrestataire.service')


exports.getAllEmp = (req,res) => {
    return mapPrestatairesService.getAllEmp(req,(error,data)=>{
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send("Showing all users");
    });
};

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
