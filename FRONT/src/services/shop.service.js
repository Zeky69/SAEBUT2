import {getRequest, postRequest, putRequest, deleteRequest, patchRequest } from "@/services/axios.service";

const url='/shop';

async function getArticleFromAPI(id) {
    return getRequest(url+`/articles/${id}`, 'getArticle')
}

export async function getArticle(id) {
    try {
        let answer = await getArticleFromAPI(id);
        console.log(answer)
        return answer;
    } catch (error) {
        console.error('Erreur lors de la récupération des articles', error.message);
        throw error;
    }
}

async function getArticlesFromAPI() {
    return getRequest(url+'/articles', 'getArticles')
}

async function getArticles() {
    try {
        let answer = await getArticlesFromAPI();
        return answer;
    } catch (error) {
        console.error('Erreur lors de la récupération des articles', error.message);
        throw error;
    }
}

async function getArticlesByPrestataireFromAPI(id) {
    return getRequest(url+`/articles/prestataire/${id}`, 'getArticlesByPrestataire')
}

async function getArticlesByPrestataire(id) {
    try {
        let answer = await getArticlesByPrestataireFromAPI(id);
        return answer;
    }
    catch (error) {
        console.error('Erreur lors de la récupération des articles', error.message);
        throw error;
    }
}

async function getArticlesByCategorieFromAPI(id) {
    return getRequest(url+`articles/${id}`, 'getArticlesByCategorie')
}

async function getArticlesByCategorie(id) {
    try {
        let answer = await getArticlesByCategorieFromAPI(id);
        return answer;
    } catch (error) {
        console.error('Erreur lors de la récupération des articles', error.message);
        throw error;
    }
}

async function addArticleFromAPI(article) {
    return postRequest(url+'/articles', article, 'addArticle')
}

async function addArticle(article){
    try {
        let answer = await addArticleFromAPI(article);
        return answer;
    } catch (error) {
        console.error('Erreur lors de la récupération des articles', error.message);
        throw error;
    }
}

async function modifyArticleFromAPI(id,article) {
    return putRequest(url+`/articles/${id}`, article, 'modifyArticle')
}

async function modifyArticle(id,article){
    console.log(article)
    console.log(id)
    try {
        let answer = await modifyArticleFromAPI(id,article);
        return answer;
    } catch (error) {
        console.error('Erreur lors de la récupération des articles', error.message);
        throw error;
    }
}

async function deleteArticleFromAPI(id) {
    return deleteRequest(url+`/articles/${id}`, 'deleteArticle')
}

async function deleteArticle(id){
    try {
        let answer = await deleteArticleFromAPI(id);
        return answer;
    } catch (error) {
        console.error('Erreur lors de la récupération des articles', error.message);
        throw error;
    }
}


async function getCommandesFromAPI() {
    return getRequest(url+'/commande', 'getCommandes')
}

async function getCommandes() {
    console.log('getCommandes front')
    try {
        let answer = await getCommandesFromAPI();
        return answer;
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes', error.message);
        throw error;
    }
}

async function getCommandeFromAPI(id) {
    return getRequest(url+`/commande/${id}`, 'getCommande')
}

async function getCommande(id) {
    try {
        let answer = await getCommandeFromAPI(id);
        return answer;
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes', error.message);
        throw error;
    }
}

async function updateCommandeLigneFromAPI(id, idligne) {
    console.log('updateCommandeLigneFromAPI', id, idligne)
    return patchRequest(url+`/commande/${id}/ligne/${idligne}`, 'updateCommandeLigne')
}

async function updateCommandeLigne(id, idligne) {
    console.log('updateCommandeLigne front', id, idligne)
    try {
        let answer = await updateCommandeLigneFromAPI(id, idligne);
        console.log('updateCommandeLigne reponse front', answer)
        return answer;
    } catch (error) {
        console.error('Erreur lors modiffication de la ligne', error.message);
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


export default{
    getArticles,
    addArticle,
    modifyArticle,
    deleteArticle,
    getCategorie,
    getArticlesByCategorie,
    getArticlesByPrestataire,
    getArticle,
    getCommande,
    getCommandes,
    updateCommandeLigne,
    getAllCategorie,
    getRandomArticles,
    getCategorieByProduct,
    createCommandeWithoutAccount
}
