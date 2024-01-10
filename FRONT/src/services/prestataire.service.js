import {getRequest, putRequest} from "@/services/axios.service"


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

export {
    getPrestataire,
    updatePage,
    getPrestataires,
    getPrestataireObject
}

