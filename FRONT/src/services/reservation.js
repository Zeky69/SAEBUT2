import { getRequest, postRequest} from "@/services/axios.service"

async function getAllResaByIdFromAPI(id_client,id_emp) {
    return getRequest('/reservation/?user_id='+id_client+'&id_emp='+id_emp, 'GETALLRESABYID')
}

async function getAllDispoByIdFromAPI(id) {
    return getRequest('/reservation/disponibilite/?id='+id, 'GETALLDISPOBYID')
}
async function getAuthFromAPI(id_emp,user_id) {
    return getRequest('/reservation/auth/?id_emp='+id_emp+'&user_id='+user_id, 'GETAUTH')
}

async function postDispoToAPI(data) {
    console.log("test sending to API"+data)
    return postRequest('/reservation/createDispo', data, 'POSTDISPO')
}

async function postResaToAPI(data){
    return postRequest('/reservation/reserver', data, 'POSTRESA')
}

async function deleteDispoToAPI(data) {
    return postRequest('/reservation/deleteDispo', data, 'DELETEDISPO')
}

async function deleteResaToAPI(data) {
    return postRequest('/reservation/deleteResa', data, 'DELETERESA')
}



async function getAllResaById(id_client,id_emp) {
    let answer = await getAllResaByIdFromAPI(id_client,id_emp)
    return answer
}

async function getAllDispoById(id) {
    let answer = await getAllDispoByIdFromAPI(id)
    return answer
}
async function getAuth(id_emp,user_id) {
    let answer = await getAuthFromAPI(id_emp,user_id)
    return answer
}

async function postDispo(data) {
    console.log("Entrée dans le service postDispo")
    try {
        let answer = await postDispoToAPI(data)
        console.log("Réponse du back",answer)
        return answer
    } catch (error) {
        // Gérer l'erreur ici
        console.error('Erreur lors de la création de la disponibilité :', error.message);
        throw error; // Vous pouvez choisir de gérer l'erreur ici ou la remonter à l'appelant
    }
}

async function postResa(data) {
    try {
        let answer = await postResaToAPI(data)
        console.log("Réponse du back",answer)
        return answer
    } catch (error) {
        // Gérer l'erreur ici
        console.error('Erreur lors de la reservation de la disponibilité :', error.message);
        throw error; // Vous pouvez choisir de gérer l'erreur ici ou la remonter à l'appelant
    }
}

async function deleteDispo(data) {
    try {
        console.log(data)
        let answer = await deleteDispoToAPI(data)
        console.log("Réponse du back",answer)
        return answer
    } catch (error) {
        // Gérer l'erreur ici
        console.error('Erreur lors de la suppression de la disponibilité :', error.message);
        throw error; // Vous pouvez choisir de gérer l'erreur ici ou la remonter à l'appelant
    }
}

async function deleteResa(data) {
    try {
        let answer = await deleteResaToAPI(data)
        console.log("Réponse du back",answer)
        return answer
    } catch (error) {
        // Gérer l'erreur ici
        console.error('Erreur lors de la suppression de la reservation :', error.message);
        throw error; // Vous pouvez choisir de gérer l'erreur ici ou la remonter à l'appelant
    }
}

export default {
    getAllResaById,
    getAllDispoById,
    getAuth,
    postDispo,
    postResa,
    deleteDispo,
    deleteResa
}