import {deleteRequest, getRequest, postRequest, putRequest} from "@/services/axios.service"
const url='/prestataires/';


export async function getPrestataire(id) {
    const response = await getRequest('/prestataires/' + id, 'getPrestataireId');
    console.log("response",response)
    return response;
}

export async function updatePage(prestataire){
    return await putRequest('/prestataires/updatePage',prestataire, 'updatePage')
}


export async function getPrestataires(){
    return await getRequest('/prestataires', 'getPrestataires')
}

export async function getPrestatairesShop(){
    return await getRequest('/prestataires/shop', 'getPrestataires')
}



 async  function getPrestataireObject(idUser){
    console.log("idUser",idUser)
    console.log("allo)")
    return await getRequest('/user/prestataire/'+idUser,'getPrestataireObject')

}

function updatePrestataireFromApi(user_id,data){
    return putRequest(url+`profil/${user_id}`,data,'UpdatePrestaireInformation')
}

export async function updatePrestataire(user_id, data){
    try {
        const response = await updatePrestataireFromApi(user_id, data);
        return response;
    } catch (error) {
        console.error("Erreur mise à jour données prestataire", error);
        throw error;
    }
}


export async function getPrestatairesTypes(){
    return await getRequest('/prestataires/types', 'getPrestatairesTypes')
}

export async function getPrestatairesServicesFromAPI(id_prestataire){
    return await getRequest(url+`/services/${id_prestataire}`, 'getPrestatairesServices')
}

export async function getPrestatairesServices(id_prestataire){
    try {
        const response = await getPrestatairesServicesFromAPI(id_prestataire);
        return response;
    } catch (error) {
        console.error("Erreur lors de la récupération des services : ", error);
        throw error;
    }
}

export async function getPrestatairesNoServicesFromAPI(id_prestataire){
    return await getRequest(url+`/noservices/${id_prestataire}`, 'getPrestatairesServices')
}

export async function getPrestatairesNoServices(id_prestataire){
    try {
        const response = await getPrestatairesNoServicesFromAPI(id_prestataire);
        return response;
    } catch (error) {
        console.error("Erreur lors de la récupération des non services : ", error);
        throw error;
    }
}


export async function updateServiceStateFromAPI(id_prestataire){
    return await getRequest(url+`/services/update/${id_prestataire}`, 'updateStateServ')
}


async function updateServiceState(id) {
    try {
        let answer = await updateServiceStateFromAPI(id)
        return answer
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la disponibilité :', error.message);
        throw error;
    }
}

export async function addServiceFromAPI(id_prestataire, id_type){
    return await postRequest(url+`/services/${id_prestataire}`,{idServ:id_type}, 'addServ')
}


async function addService(id_prestataire, id_type) {
    try {
        let answer = await addServiceFromAPI(id_prestataire, id_type)
        return answer
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la disponibilité :', error.message);
        throw error;
    }
}


async function deleteServFromApi(serviceId,idPresta){
    return deleteRequest(url+`/services/${serviceId}/${idPresta}`,'DeleteServ');
}

async function deleteServ(serviceId,idPresta) {
    try {

        const response = await deleteServFromApi(serviceId,idPresta);
        console.log("suppression reussi")
        return response;
    } catch (error) {
        console.error("Error managing prestataire:", error);
        throw error;
    }
}



export default{
    updatePrestataire,
    getPrestataire,
    updatePage,
    getPrestataires,
    getPrestataireObject,
    getPrestatairesTypes,
    getPrestatairesServices,
    updateServiceState,
    deleteServ,
    getPrestatairesNoServices,
    addService,
    getPrestatairesShop
}

