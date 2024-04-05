import {deleteRequest, getRequest, patchRequest, postRequest} from "@/services/axios.service"

async function getAllResaByIdFromAPI(id) {
    return getRequest('/reservation/'+id, 'GETALLRESABYID')
}

async function getAllResaByIdTicketFromAPI(id) {
    return getRequest('/reservation/ticket/'+id, 'GETALLRESABYIDTICKET')
}

async function getAllDispoByIdFromAPI(id) {
    return getRequest('/reservation/disponibilite/'+id, 'GETALLDISPOBYID')
}

async function postDispoToAPI(data) {
    return postRequest('/reservation/disponibilite/', data, 'POSTDISPO')
}

async function postResaToAPI(data){
    return postRequest('/reservation/', data, 'POSTRESA')
}

async function deleteDispoToAPI(data) {
    return deleteRequest('/reservation/disponibilite/'+data.id_dispo, data, 'DELETEDISPO')
}

async function deleteResaToAPI(data) {
    return patchRequest('/reservation/', data, 'DELETERESA')
}

async function getDispoByIDFromAPI(id) {
    return getRequest('/reservation/disponibilite/id/'+id, 'GETDISPOBYID')
}

async function accepterDispoFromAPI(id_dispo) {
    return patchRequest('/reservation/disponibilite/'+id_dispo, 'ACCEPTERDISPO')

}


async function getAllResaById(id_bat) {
    let answer = await getAllResaByIdFromAPI(id_bat)
    return answer
}

async function getAllResaByIdTicket(id_ticket) {
    let answer = await getAllResaByIdTicketFromAPI(id_ticket)
    return answer
}

async function getAllDispoById(id) {
    let answer = await getAllDispoByIdFromAPI(id)
    return answer
}

async function postDispo(data) {
    try {
        let answer = await postDispoToAPI(data)
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

async function getDispoByID(id) {
    try {
        let answer = await getDispoByIDFromAPI(id)
        console.log("Réponse du back", answer)
        return answer
    }
    catch (error) {
        console.error('Erreur lors de la récupération de la disponibilité :', error.message);
        throw error;
    }
}

async function accepterDispo(id) {
    try {
        let answer = await accepterDispoFromAPI(id)
        console.log("Réponse du back", answer)
        return answer
    }
    catch (error) {
        console.error('Erreur lors de la récupération de la disponibilité :', error.message);
        throw error;
    }
}


export default {
    getAllResaById,
    getAllResaByIdTicket,
    getAllDispoById,
    postDispo,
    postResa,
    deleteDispo,
    deleteResa,
    getDispoByID,
    accepterDispo,
}