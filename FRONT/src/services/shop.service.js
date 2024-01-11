import {getRequest} from "@/services/axios.service";

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


export default {
getArticles,
    getCategorie
}
