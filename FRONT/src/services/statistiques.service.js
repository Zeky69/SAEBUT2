import {getRequest} from "@/services/axios.service";

const baseUrl='/statistiques'

async function getVenteBilletParDateFromAPI() {
    return getRequest(baseUrl+'/venteBilletParDate', 'GET')
}

async function getVenteBilletParTypeFromAPI() {
    return getRequest(baseUrl+'/venteBilletParType', 'GET')
}

async function getVenteArticleFromAPI() {
    return getRequest(baseUrl+'/venteArticle', 'GET')
}

async function getVenteParCategorieFromAPI() {
    return getRequest(baseUrl+'/venteParCatetorie', 'GET')
}

async function getVenteArticleParIdPrestataireFromAPI(id) {
    return getRequest(baseUrl+'/venteArticle/'+id, 'GET')
}

async function getVenteBilletParDate() {
    try {
        let answer = await getVenteBilletParDateFromAPI();
        return answer;
    } catch (error) {
        console.error('Erreur lors de la récupération des ventes de billets par date', error.message);
        throw error;
    }
}

async function getVenteBilletParType() {
    try {
        let answer = await getVenteBilletParTypeFromAPI();
        return answer;
    } catch (error) {
        console.error('Erreur lors de la récupération des ventes de billets par type', error.message);
        throw error;
    }
}

async function getVenteArticle() {
    try {
        let answer = await getVenteArticleFromAPI();
        return answer;
    } catch (error) {
        console.error('Erreur lors de la récupération des ventes d\'articles', error.message);
        throw error;
    }
}

async function getVenteArticleParIdPrestataire(id) {
    try {
        let answer = await getVenteArticleParIdPrestataireFromAPI(id);
        return answer;
    } catch (error) {
        console.error('Erreur lors de la récupération des ventes d\'articles', error.message);
        throw error;
    }
}

async function getVenteParCategorie() {
    try {
        let answer = await getVenteParCategorieFromAPI();
        return answer;
    } catch (error) {
        console.error('Erreur lors de la récupération des ventes par catégorie', error.message);
        throw error;
    }
}

export default {
    getVenteBilletParDate,
    getVenteBilletParType,
    getVenteArticle,
    getVenteParCategorie,
    getVenteArticleParIdPrestataire
}