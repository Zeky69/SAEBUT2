import {getRequest} from "@/services/axios.service";
const url='/admin'

async function getAllUserFromAPI() {
    return getRequest(url+'', 'GetUsers')
}

async function getAllUsers() {
    try {
        let answer = await getAllUserFromAPI();
        return answer;
    } catch (error) {
        console.error('Erreur de la récupération des utilisateurs', error.message);
        throw error;
    }
}





export default {
    getAllUsers,
}
