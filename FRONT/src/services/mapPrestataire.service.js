import {getRequest, postRequest,deleteRequest, patchRequest} from "@/services/axios.service"



async function getAllEmp() {
    let answer = await getAllEmpFromAPI()
    return answer
}
async function getAllEmpFromAPI(){
    let answer = await getRequest('/mapPrestataires/emp', 'GETALLEMP')
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
    return postRequest('/mapPrestataires/emp', data, 'CREATEEMP')
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
async function deleteEmpFromAPI(data) {
    return deleteRequest('/mapPrestataires/emp/'+data, 'DELETEEMP')
}

async function updateEmpInfoFromAPI(data){
    return patchRequest('/mapPrestataires/emp/info', data, 'UPDATEEMPINFO')
}

async function updateEmpInfo(data) {
    try {
        let answer = await updateEmpInfoFromAPI(data);
        return answer;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'emplacement :', error.message);
        throw error;
    }
}







export {
    getAllEmp,
    createEmp,
    deleteEmp,
    updateEmpInfo,
}