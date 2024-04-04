import {getRequest, postRequest} from "@/services/axios.service";

async function updateDisplayToAPI(data) {
    return postRequest('/batiment/updateDisplay', data, 'UPDATEDISPLAY')

}
async function getBatByIdPrestataireToAPI(id) {
    return await getRequest('/batiment/' + id, 'getBatByIdPrestataire')
}

async function getAllBatimentToAPI(){
    return await getRequest('/batiment', 'getAllBatiment')
}

async function updateDisplay(data) {
    try {
        let answer = await updateDisplayToAPI(data)
        console.log("Réponse du back",answer)
        return answer
    } catch (error) {
        // Gérer l'erreur ici
        console.error('Erreur lors de la mise à jour de la disponibilité :', error.message);
        throw error; // Vous pouvez choisir de gérer l'erreur ici ou la remonter à l'appelant
    }
}

async function getBatByIdPrestataire(id) {
    try {
        let answer = await getBatByIdPrestataireToAPI(id)
        console.log("Réponse du back",answer)
        return answer
    } catch (error) {
        // Gérer l'erreur ici
        console.error('Erreur lors de la récupération des batiments :', error.message);
        throw error; // Vous pouvez choisir de gérer l'erreur ici ou la remonter à l'appelant
    }
}

async function getAllBatiment(){
    try {
        let answer = await getAllBatimentToAPI()
        console.log("Réponse du back",answer)
        return answer
    } catch (error) {
        console.error('Erreur lors de la récupération des batiments :', error.message);
        throw error; // Vous pouvez choisir de gérer l'erreur ici ou la remonter à l'appelant
    }
}


export default {
    getBatByIdPrestataire,
    updateDisplay,
    getAllBatiment
}