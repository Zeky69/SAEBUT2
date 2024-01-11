import {getRequest} from "@/services/axios.service";


async function getBatByIdPrestataire(id) {
    return await getRequest('/batiment/' + id, 'getBatByIdPrestataire')
}

export {
    getBatByIdPrestataire
}