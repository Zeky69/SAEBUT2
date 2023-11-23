const validator = require('validator');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..','datasource/mapPrestataire.json');




exports.validateFilterInput = (req, res, next) => {
    const filtre = req.body.filtre;
    if (filtre) {
        if (!validator.isAlpha(filtre, 'en-US', {ignore: ' '})) {
            return res.status(400).send("Format incorrect pour le filtre");
        }
    }
    next();
}


exports.validateAddempInput = (req, res, next) => {
    const { name , type , position , orientation , free} = req.body;
    if (!name || !type || !position || !orientation || !free) {
        return res.status(400).send("Un des champs est nul");
    }
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const dataStr = data.toString();
        temp = JSON.parse(dataStr);
        for (let i = 0; i < temp.length; i++) {

            if (temp[i].name==name){

                if(temp[i].position.x==position.x && temp[i].position.y==position.y && temp[i].position.z==position.z){
                    return res.status(400).send("emplacment existant");
                }
            }
        }
    } catch (errorLecture) {
        console.log(errorLecture);
    }
    next();
}

exports.validateDelempInput = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).send("Un des champs est nul");
    }
    next();
}