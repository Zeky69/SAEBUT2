import {getRequest, postRequest, patchRequest} from "@/services/axios.service"

async function getAllEmpFromAPI(){
    return getRequest('/mapPrestataires/emp', 'GETALLEMP')
}

async function getAllEmp() {
    let answer = await getAllEmpFromAPI()
    return answer
}

async function getManyEmpFromAPI(filtre) {
  return getRequest('/mapPrestataires/emp?name='+filtre, 'GETMANYEMP')
}

async function getManyEmp(filtre) {
    let answer = await getManyEmpFromAPI(filtre)
    return answer
}

async function getOneEmpFromAPI(data) {
    console.log("one bat",data)
    return getRequest('/mapPrestataires/emp?name=' + data.name + '&posx=' + data.posx + '&posz' + data.posz, 'GETONEEMP')
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
    return getRequest('/mapPrestataires/emp', data, 'DELETEEMP')
}

async function deleteEmp(data) {
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
        let answer = await updateEmpFreeFromAPI(data);
        return answer;
    } catch (error) {
        // Gérer l'erreur ici
        console.error('Erreur lors de la mise à jour de l\'emplacement :', error.message);
        throw error; // Vous pouvez choisir de gérer l'erreur ici ou la remonter à l'appelant
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

async function deleteBatFromAPI(data) {
    return postRequest('/mapPrestataires/delbat', data, 'DELETEBAT')
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
    deleteBat
}