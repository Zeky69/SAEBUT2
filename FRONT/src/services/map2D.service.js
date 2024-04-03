import {deleteRequest, getRequest, patchRequest, postRequest} from "@/services/axios.service"



async function getAllEmp() {
    let answer = await getAllEmpFromAPI(false)
    return answer
}
async function getAllEmpFromAPI(withPrestataire){
    let answer = await getRequest('/map2D/emp?withPrestataire='+withPrestataire, 'GETALLEMP')
    return answer
}

async function getAllEmpWithPrestataire() {
    let answer = await getAllEmpFromAPI(true)
    return answer
}



async function getMap2DType() {
    let answer = await getRequest('/map2D/type', 'GETMAP2DTYPE')
    return answer
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
async function createEmpFromAPI(data) {
    return postRequest('/map2D/emp', data, 'CREATEEMP')
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
async function deleteEmpFromAPI(id) {
    return deleteRequest('/map2D/emp/'+id, 'DELETEEMP')
}



async function updateEmpInfoFromAPI(data){
    return patchRequest('/map2D/emp', data, 'UPDATEEMPINFO')
}

async function updateEmp(data) {
    try {
        let answer = await updateEmpInfoFromAPI(data);
        return answer;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'emplacement :', error.message);
        throw error;
    }
}








export {
    getMap2DType,
    getAllEmpWithPrestataire,
    getAllEmp,
    createEmp,
    deleteEmp,
    updateEmp
}

