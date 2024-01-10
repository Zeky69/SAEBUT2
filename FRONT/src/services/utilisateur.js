import {getRequest, postRequest} from "@/services/axios.service";

const url='/user'

async function LoginFromApi(data) {
    return postRequest(url+'/login', data, 'LOGIN')
}

async function RegisterFromApi(data){
    return postRequest(url+'/register',data,'REGISTER')
}


async function Login(data) {
    try {
        let answer = await LoginFromApi(data);
        console.log(answer)
        return answer;
    } catch (error) {
        console.error('Erreur lors du login', error.message);
        throw error;
    }
}

async function Register(data){
    try{
        let answer = await RegisterFromApi(data);
        console.log("ouiiii")
        console.log(answer);
        return answer

    }catch (error){
        console.error("Erreur lors de l'inscription",error.message)
        throw error;
    }

}

async function getInformationFromTokenAPI(token){
    return getRequest(url+`/${token}`,"GetInformation")
}

async function getInformationFromToken(token) {
    try {
        let information = await getInformationFromTokenAPI(token);
        console.log(information);
        return information;
    } catch (error) {
        console.error('Erreur lors de la récupération des informations depuis le token', error.message);
        throw error;
    }
}
async function getPrestataireObject(id_user){
    try{
        return await getPrestataireObjectAPI(id_user);
    }catch (error){
        console.error("Erreur lors de la récupération du prestataire",error.message);
        throw error;
    }
}

async function getPrestataireObjectAPI(id_user){
    return getRequest(url+`/prestataire/${id_user}`,"GetPrestataireObject")
}

export default {
    Login,
    getInformationFromToken,
    getPrestataireObject,
    Register
}
