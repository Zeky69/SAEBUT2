import {getRequest, postRequest} from "@/services/axios.service";

const url='/shop';

async function getArticlesFromAPI(id) {
    return getRequest(url+`/articles/${id}`, 'getArticles')
}

async function getArticles(id) {
    try {
        let answer = await getArticlesFromAPI(id);
        console.log(answer)
        return answer;
    } catch (error) {
        console.error('Erreur lors de la récupération des articles', error.message);
        throw error;
    }
}

async function getRandomArticlesFromAPI() {
    return getRequest(url+'/random', 'getRandomArticles')
}

async function getRandomArticles() {
    try {
        let answer = await getRandomArticlesFromAPI();
        return answer;
    } catch (error) {
        console.error('Erreur lors de la récupération des articles', error.message);
        throw error;
    }
}

async function getCategorieFromAPI(id) {
    return getRequest(url+`/categorie/${id}`, 'getCategorie')
}

async function getCategorie(id) {
    try {
        let answer = await getCategorieFromAPI(id);
        console.log(answer)
        return answer;
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories', error.message);
        throw error;
    }
}

async function getAllCategorieFromApi() {
    return getRequest(url+`/categorie`, 'getAllCategorie')
}

async function getAllCategorie() {
    try {
        let answer = await getAllCategorieFromApi();
        return answer;
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories', error.message);
        throw error;
    }
}

async function getCategorieByProductFromAPI(id) {
    return getRequest(url+`/categorie/articles/${id}`, 'getCategorieByProduct')
}

async function getCategorieByProduct(id) {
    try {
        let answer = await getCategorieByProductFromAPI(id);
        console.log(answer)
        return answer;
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories', error.message);
        throw error;
    }
}

async function createCommandeWithoutAccountFromAPI(data) {
    return postRequest(url+`/commande`, data, 'createCommandeWithoutAccount')
}

export async function createCommandeWithoutAccount(data) {
    try{
        let answer = await createCommandeWithoutAccountFromAPI(data);
        return answer;
    }
    catch(error){
        console.error('Erreur lors de la création de la commande', error.message);
        throw error;
    }
}


export default {
getArticles,
    getCategorie,
    getAllCategorie,
    getRandomArticles,
    getCategorieByProduct,
    createCommandeWithoutAccount
}
