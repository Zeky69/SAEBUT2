import {getRequest} from "@/services/axios.service";

const baseUrl='/commandes'

async function getCommandesFromAPI() {
    return getRequest(baseUrl+'/', 'GET')
}


async function getCommandes() {
    try {
        let answer = await getCommandesFromAPI();
        return answer;
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes', error.message);
        throw error;
    }
}

export default {
    getCommandes,
}