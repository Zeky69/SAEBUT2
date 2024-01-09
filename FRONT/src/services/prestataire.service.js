import {getRequest, putRequest} from "@/services/axios.service"


async function getPrestataire(id) {
    return await getRequest('/prestataires/' + id, 'getPrestataireId')
}



async function updatePage(prestataire){
    return await putRequest('/prestataires/updatePage',prestataire, 'updatePage')
}

export {
    getPrestataire,
    updatePage
}

