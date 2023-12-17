import {getRequest, postRequest,deleteRequest, patchRequest} from "@/services/axios.service"

async function getAllEmpFromAPI(){
    let answer = await getRequest('/mapPrestataires/emp', 'GETALLEMP')
    console.log("return front api",answer)
    return answer
}

async function getAllEmp() {
    let answer = await getAllEmpFromAPI()
    console.log("return front",answer)
    return answer
}

async function getManyEmpFromAPI(filtre) {
  return getRequest('/mapPrestataires/emp?name='+filtre, 'GETMANYEMP')
}

async function getManyEmp(filtre) {
    let answer = await getManyEmpFromAPI(filtre)
    return answer
}

async function getOneEmpUUIDFromAPI(uuid) {
    //uuid en parametre
    return getRequest('/mapPrestataires/emp' +`/${uuid}`, 'GETONEEMP')
}

async function getOneEmpUUID(uuid) {
    let answer = await getOneEmpUUIDFromAPI(uuid)
    return answer
}

async function getOneEmpFromAPI(data) {
    return getRequest('/mapPrestataires/emp?name=' + data.name + '&posx=' + data.posx + '&posz' + data.posz, 'GETONEEMP')
}
async function getBatFromAPIdebug() {
    return getRequest('/mapPrestataires/bat/debug', 'GETBATDEBUG')
}

async function getBatdebug() {
    let answer = await getBatFromAPIdebug()
    return answer
}



async function getOneEmp(data) {
    console.log(data)
    let answer = null;
    try {
        answer = await getOneEmpFromAPI(data);
        return answer;
    } catch (error) {
        // Gérer l'erreur ici
        console.error('Erreur lors de la récupération de l\'emplacement :', error.message);
        throw error; // Vous pouvez choisir de gérer l'erreur ici ou la remonter à l'appelant
    }
}


async function createEmpFromAPI(data) {
    console.log("route front",data)
    return postRequest('/mapPrestataires/emp', data, 'CREATEEMP')
}


async function createEmp(data) {
    try {
        let answer = await createEmpFromAPI(data);
        return answer;
    } catch (error) {
        // Gérer l'erreur ici
        console.error('Erreur lors de la création de l\'emplacement :', error.message);
        throw error; // Vous pouvez choisir de gérer l'erreur ici ou la remonter à l'appelant
    }
}


async function deleteEmpFromAPI(data) {
    return deleteRequest('/mapPrestataires/emp/'+data, 'DELETEEMP')
}

async function deleteEmp(data) {
    console.log("data del front",data)
    try {
        let answer = await deleteEmpFromAPI(data);
        return answer;
    } catch (error) {
        // Gérer l'erreur ici
        console.error('Erreur lors de la suppression de l\'emplacement :', error.message);
        throw error; // Vous pouvez choisir de gérer l'erreur ici ou la remonter à l'appelant
    }
}

async function updateEmpFreeFromAPI(data) {
    return patchRequest('/mapPrestataires/emp', data, 'UPDATEEMPFREE')
}

async function updateEmpFree(data) {
    try {
        console.log("data update front",data)
        let answer = await updateEmpFreeFromAPI(data);
        return answer;
    } catch (error) {
        // Gérer l'erreur ici
        console.error('Erreur lors de la mise à jour de l\'emplacement :', error.message);
        throw error; // Vous pouvez choisir de gérer l'erreur ici ou la remonter à l'appelant
    }
}


async function updateEmpInfoFromAPI(data){
    return patchRequest('/mapPrestataires/emp/info', data, 'UPDATEEMPINFO')
}

async function updateEmpInfo(data) {
    try {
        console.log("data update front",data)
        let answer = await updateEmpInfoFromAPI(data);
        return answer;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'emplacement :', error.message);
        throw error;
    }
}


async function getAllBatFromAPI() {
    return getRequest('/mapPrestataires/bat', 'GETALLBAT')
}

async function getAllBat() {
    let answer = await getAllBatFromAPI()
    return answer
}

async function getOneBatFromAPI(data) {
    return getRequest('/mapPrestataires/bat?name='+data.name+'&posx='+data.posx+'&posz='+data.posz, 'GETONEBAT')
}

async function getOneBat(data) {
    try {
        let answer = await getOneBatFromAPI(data);
        return answer;
    } catch (error) {
        // Gérer l'erreur ici
        console.error('Erreur lors de la récupération du batiment :', error.message);
        throw error; // Vous pouvez choisir de gérer l'erreur ici ou la remonter à l'appelant
    }
}

async function getManyBatFromAPI(filtre) {
    return getRequest('/mapPrestataires/bat?name='+filtre, 'GETMANYBAT')
}

async function getManyBat(filtre) {
    let answer = await getManyBatFromAPI(filtre)
    return answer
}

async function createBatFromAPI(data) {
    console.log("route front",data)
    return postRequest('/mapPrestataires/bat', data, 'CREATEBAT')
}

async function createBat(data) {
    try {
        let answer = await createBatFromAPI(data);
        return answer;
    } catch (error) {
        // Gérer l'erreur ici
        console.error('Erreur lors de la création du batiment :', error.message);
        throw error; // Vous pouvez choisir de gérer l'erreur ici ou la remonter à l'appelant
    }
}

async function getBatbyEmpUUIDFromAPI(uuid) {
    return getRequest('/mapPrestataires/bat/emp' +`/${uuid}`, 'GETBATBYEMP')
}

async function getBatbyEmpUUID(uuid) {
    let answer = await getBatbyEmpUUIDFromAPI(uuid)
    return answer
}


async function getBatTypeFromAPI() {
    return getRequest('/mapPrestataires/bat/type', 'GETBATTYPE')
}


async function getBatType() {
    let answer = await getBatTypeFromAPI()
    return answer
}


async function getOneBatUUIDFromAPI(uuid) {
    return getRequest('/mapPrestataires/bat' +`/${uuid}`, 'GETONEBAT')
}

async function getOneBatUUID(uuid) {
    let answer = await getOneBatUUIDFromAPI(uuid)
    return answer
}

async function deleteBatFromAPI(data) {
    return deleteRequest('/mapPrestataires/bat?uuid='+data, 'DELETEBAT')
}

async function deleteBat(data) {
    try {
        let answer = await deleteBatFromAPI(data);
        return answer;
    } catch (error) {
        // Gérer l'erreur ici
        console.error('Erreur lors de la suppression du batiment :', error.message);
        throw error; // Vous pouvez choisir de gérer l'erreur ici ou la remonter à l'appelant
    }
}





export {
    getOneBatUUID,
    getBatbyEmpUUID,
    getOneEmpUUID,
    getBatdebug,
    getAllEmp,
    getManyEmp,
    getOneEmp,
    createEmp,
    deleteEmp,
    updateEmpFree,
    createBat,
    getOneBat,
    getAllBat,
    getManyBat,
    deleteBat,
    getBatType,
    updateEmpInfo
}