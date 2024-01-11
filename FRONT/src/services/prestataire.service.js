import {getRequest, putRequest} from "@/services/axios.service"
const url='/prestataires/';


async function getPrestataire(id) {
    return await getRequest('/prestataires/' + id, 'getPrestataireId')
}



async function updatePage(prestataire){
    return await putRequest('/prestataires/updatePage',prestataire, 'updatePage')
}


async function getPrestataires(){
    return await getRequest('/prestataires', 'getPrestataires')
}



 async  function getPrestataireObject(idUser){
    return await getRequest('/user/prestataire/'+idUser,'getPrestataireObject')

}

function updatePrestataireFromApi(user_id,data){
    return putRequest(url+`profil/${user_id}`,data,'UpdatePrestaireInformation')
}

async function updatePrestataire(user_id,data){
    try {
        const response = await updatePrestataireFromApi(user_id, data);
        return response;
    } catch (error) {
        console.error("Erreur mise à jour données prestataire", error);
        throw error;
    }
}


async function getPrestatairesTypes(){
    return await getRequest('/prestataires/types', 'getPrestatairesTypes')
}

export {
    updatePrestataire,
    getPrestataire,
    updatePage,
    getPrestataires,
    getPrestataireObject,
    getPrestatairesTypes

}

