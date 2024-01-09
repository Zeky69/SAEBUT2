import {getRequest,patchRequest} from "@/services/axios.service";
const url='/admin'

async function getAllUserFromAPI() {
    return getRequest(url+'', 'GetUsers')
}

async function getAllUsers() {
    try {
        let answer = await getAllUserFromAPI();
        return answer;
    } catch (error) {
        console.error('Erreur de la récupération des utilisateurs', error.message);
        throw error;
    }
}


async function managePrestaFromAPI(data, prestataire_id){
    return patchRequest(url+`/manage-prestataire/${prestataire_id}`,data,'ManagePresta');
}
async function managePresta(data, prestataire_id) {
    try {
        const response = await managePrestaFromAPI(data, prestataire_id);
        return response;
    } catch (error) {
        console.error("Error managing prestataire:", error);
        throw error;
    }
}



export default {
    getAllUsers,
    managePresta
}
