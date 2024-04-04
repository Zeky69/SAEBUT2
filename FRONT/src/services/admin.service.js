import {getRequest,patchRequest, deleteRequest} from "@/services/axios.service";
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

async function deletePrestaFromApi(user_id, prestataire_id){
    return deleteRequest(url+`/manage-prestataire/${user_id}/${prestataire_id}`,'DeletePresta');
}
async function deletePresta(user_id, prestataire_id) {
    try {
        console.log(user_id)
        console.log(prestataire_id)
        console.log('les id')

        const response = await deletePrestaFromApi(user_id, prestataire_id);
        console.log("suppression reussi")
        return response;
    } catch (error) {
        console.error("Error managing prestataire:", error);
        throw error;
    }
}


async function getHomePageFromAPI(){
    return getRequest(url+'/homepage','GetHomePage')
}

export async function getHomePage() {
    try {
        let answer = await getHomePageFromAPI();
        return answer;
    } catch (error) {
        console.error('Erreur de la récupération des utilisateurs', error.message);
        throw error;
    }
}

async function setHomePageFromAPI(data){
    return patchRequest(url+'/homepage',data,'SetHomePage');
}

export async function setHomePage(data) {
    try {
        const response = await setHomePageFromAPI({"homepage":data});
        return response;
    } catch (error) {
        console.error("Error setting homepage:", error);
        throw error;
    }
}



export default {
    getAllUsers,
    managePresta,
    deletePresta,
    getHomePage,
    setHomePage
}
