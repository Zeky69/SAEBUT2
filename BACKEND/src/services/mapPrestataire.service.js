const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const filePath = path.join(__dirname, '..','datasource/mapPrestataire.json');



const getAllEmp = (req) => {
    let filtre = req.query.filtre;
    let users = [];
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const dataStr = data.toString();
        temp = JSON.parse(dataStr);
        emps = temp.filter(emp => emp.name.includes(filtre));
    } catch (errorLecture) {
        console.log(errorLecture);
    }
    return emps;
}

const createEmp = (req,callback) => {
    const { name , type , position , orientation , free} = req.body;
    let emps = [];
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const dataStr = data.toString();
        emps = JSON.parse(dataStr);
    } catch (errorLecture){
        console.log(errorLecture);
    }
    const newEmp = {name: name, type: type, position: position, free: free}
    emps.push(newEmp);
    try{
        fs.writeFileSync(filePath, JSON.stringify(emps));
        callback(null, "success");
    } catch (errorEcriture) {
        callback(errorEcriture, null);
    }     
};

const deleteEmp = (req,callback) => {
    let name = req.body.name;
    let position = req.body.position;
    let emps = [];
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const dataStr = data.toString();
        temp = JSON.parse(dataStr);
        emps = temp.filter((emp) => emp.name!=name)
        emps = temp.filter((emp) => emp.position.x!=position.x && emp.position.y!=position.y && emp.position.z!=position.z)
    } catch (errorLecture) {
        console.log(errorLecture);
    }
    try {
        fs.writeFileSync(filePath, JSON.stringify(emps));
        callback(null, "success");
    } catch (errorEcriture) {
        callback(errorEcriture, null);
    }
}



module.exports = {
    getAllEmp,
    createEmp,
    deleteEmp
}

