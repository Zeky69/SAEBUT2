import {deleteRequest, getRequest, patchRequest, postRequest} from "@/services/axios.service"


async function getAllEmp() {
    return await getAllEmpFromAPI(false)
}
async function getAllEmpFromAPI(withPrestataire){
    return await getRequest('/map2D/emp?withPrestataire=' + withPrestataire, 'GETALLEMP')
}

async function getAllEmpWithPrestataire() {
    return await getAllEmpFromAPI(true)
}



async function getMap2DType() {
    return await getRequest('/map2D/type', 'GETMAP2DTYPE')
}

async function createEmp(data) {
    try {
        return await createEmpFromAPI(data);
    } catch (error) {
        // Gérer l'erreur ici
        console.error('Erreur lors de la création de l\'emplacement :', error.message);
        throw error; // Vous pouvez choisir de gérer l'erreur ici ou la remonter à l'appelant
    }
}
async function createEmpFromAPI(data) {
    return postRequest('/map2D/emp', data, 'CREATEEMP')
}



async function deleteEmp(data) {
    try {
        return await deleteEmpFromAPI(data);
    } catch (error) {
        // Gérer l'erreur ici
        console.error('Erreur lors de la suppression de l\'emplacement :', error.message);
        throw error; // Vous pouvez choisir de gérer l'erreur ici ou la remonter à l'appelant
    }
}
async function deleteEmpFromAPI(id) {
    return deleteRequest('/map2D/emp/'+id, 'DELETEEMP')
}



async function updateEmpInfoFromAPI(id,data){
    return patchRequest(`/map2D/emp/admin/${id}`, data, 'UPDATEEMPINFO')
}

async function updateEmp(id,data) {
    try {
        return await updateEmpInfoFromAPI(id, data);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'emplacement :', error.message);
        throw error;
    }
}

async function updateInfoEmpPrestataire(id, data){
    try {
        return await updateInfoEmpPrestataireFromAPI(id, data);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'emplacement :', error.message);
        throw error;
    }
}

async function updateInfoEmpPrestataireFromAPI(id ,data){
    return patchRequest(`/map2D/emp/${id}`, data, 'UPDATEINFOEMPPRESTATAIRE')

}


async function askEmpFromAPI(id){
    return postRequest(`/map2D/emp/ask/${id}`,{}, 'ASKEMP')
}

async function askEmp(id){
    try {
        let answer = await askEmpFromAPI(id);
        return answer;
    } catch (error) {
        console.error('Erreur lors de la demande de l\'emplacement :', error.message);
        throw error;
    }
}

async function acceptEmpFromAPI(id){
    return postRequest(`/map2D/emp/accept/${id}`,{}, 'ACCEPTEMP')

}

async function acceptEmp(id){
    try {
        return await acceptEmpFromAPI(id);
    } catch (error) {
        console.error('Erreur lors de la demande de l\'emplacement :', error.message);
        throw error;
    }
}

async function refuseEmpFromAPI(id){
    return postRequest(`/map2D/emp/refuse/${id}`,{}, 'REFUSEEMP')
}

async function refuseEmp(id){
    try {
        return await refuseEmpFromAPI(id);
    } catch (error) {
        console.error('Erreur lors de la demande de l\'emplacement :', error.message);
        throw error;
    }
}

async function freeEmpFromAPI(id){
    return postRequest(`/map2D/emp/free/${id}`,{}, 'FREEEMP')
}

async function freeEmp(id){
    try {
        return await freeEmpFromAPI(id);
    } catch (error) {
        console.error('Erreur lors de la demande de l\'emplacement :', error.message);
        throw error;
    }
}






export {
    getMap2DType,
    getAllEmpWithPrestataire,
    getAllEmp,
    createEmp,
    deleteEmp,
    updateEmp,
    updateInfoEmpPrestataire,
    askEmp,
    acceptEmp,
    refuseEmp,
    freeEmp
}

