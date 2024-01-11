import {getRequest, postRequest} from "@/services/axios.service";

async function sendCommentaire(data){
    try{
        let answer = await sendCommentaireAPI(data);
        return answer
    }catch (error){
        console.error("Erreur lors de l'envoie du commentaire",error.message)
        throw error;
    }

}

async function getCommentaireIdPrestataire(id_prestataire){
    try{
        let answer = await getCommentaireIdPrestataireAPI(id_prestataire);
        return answer
    }catch (error){
        console.error("Erreur lors de la recuperation des commentaire",error.message)
        throw error;
    }
}

async function getCommentaireIdPrestataireAPI(id_prestataire){
    return getRequest('/commentaire/'+`${id_prestataire}`, 'GETCOMMENTAIRE')

}

async function sendCommentaireAPI(data){
    return postRequest('/commentaire/', data, 'CREATECOMMENTAIRE')
}

export {
    sendCommentaire,
    getCommentaireIdPrestataire
}