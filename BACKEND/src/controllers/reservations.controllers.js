const resaService = require('../services/reservations.service');

exports.test = (req, res) => {
    console.log("test controller");
    return resaService.test(req,(error,data)=>{
        if (error) {
            console.log(error)
            return res.status(500).send("Internal error");
        }
        return res.status(200).send(data);
    });
}

exports.getAllResa = (req, res) => {
    if (req.params.user_id) {
        return resaService.getAllResaByIdUser(req,(error,data)=>{
            if (error) {
                console.log(error)
                return res.status(500).send("Internal error");
            }
            return res.status(200).send(data);
        });
    }
    return resaService.getAllResaById(req,(error,data)=>{
        if (error) {
            console.log(error)
            return res.status(500).send("Internal error");
        }
        return res.status(200).send(data);
    });
}

exports.getAllDispoById = (req, res) => {
    return resaService.getAllDispoById(req,(error,data)=>{
        if (error) {
            console.log(error)
            return res.status(500).send("Internal error");
        }
        return res.status(200).send(data);
    });
}

exports.createDispo = (req, res) => {
    return resaService.createDispo(req,(error,data)=>{
        if (error) {
            console.log(error)
            return res.status(500).send("Internal error");
        }
        console.log(data);
        return res.status(200).send("dispo created");
    });
}

exports.reserver = (req, res) => {
    return resaService.reserver(req,(error,data)=>{
        if (error) {
            return res.status(500).send("Internal error");
        }
        return res.status(200).send("reservation created");
    });
}

exports.deleteDispoById = (req, res) => {
    return resaService.deleteDispoById(req,(error,data)=>{
        if (error) {
            console.log(error)
            return res.status(500).send("Internal error");
        }
        console.log(data);
        return res.status(200).send("dispo deleted");
    });
}

exports.deleteResaById = (req, res) => {
    return resaService.deleteResaById(req,(error,data)=>{
        if (error) {
            console.log(error)
            return res.status(500).send("Internal error");
        }
        console.log(data);
        return res.status(200).send("resa deleted");
    });
}

exports.getDispoByID = (req, res) => {
    return resaService.getDispoByID(req,(error,data)=>{
        if (error) {
            console.log(error)
            return res.status(500).send("Internal error");
        }
        console.log(data);
        return res.status(200).send(data);
    });
}

exports.accepterDispo = (req, res) => {
    return resaService.accepterDispo(req,(error,data)=>{
        if (error) {
            console.log(error)
            return res.status(500).send("Internal error");
        }
        console.log(data);
        return res.status(200).send(data);
    });
}



