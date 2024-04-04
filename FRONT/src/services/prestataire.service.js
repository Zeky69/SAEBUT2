import {getRequest, putRequest} from "@/services/axios.service"
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

export default{
    updatePrestataire,
    getPrestataire,
    updatePage,
    getPrestataires,
    getPrestataireObject,
    getPrestatairesTypes
}

