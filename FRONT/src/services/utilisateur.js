import {getRequest, postRequest} from "@/services/axios.service";

const url='/user'

async function LoginFromApi(data) {
    return postRequest(url+'/login', data, 'LOGIN')
}

async function verifyTokenResetFromAPI(token){
    return getRequest(url+`/reset-password/${token}`, 'VERIFY')
}

async function RegisterFromApi(data){
    return postRequest(url+'/register',data,'REGISTER')
}

async function ForgetFromAPI(data){
    return postRequest(url+'/forgot-password',data,'FORGET')
}

async function ChangePasswordFROMAPI(token,data){
    return postRequest(url+'/reset-password/'+token,data,'RESET')
}

async function sendContactMessageFromAPI(data){
    console.log(data)
    return postRequest(url+'/contact',data,'CONTACT')
}

async function sendContact(firstname, name, email, object, message) {
    try {
        let answer = await sendContactMessageFromAPI({nom: name, prenom: firstname, email: email, subject: object, message: message});
        return answer;
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message', error.message);
        throw error;
    }
}


async function Login(data) {
    try {
        let answer = await LoginFromApi(data);
        return answer;
    } catch (error) {
        console.error('Erreur lors du login', error.message);
        throw error;
    }
}

async function Register(data){
    try{
        let answer = await RegisterFromApi(data);
        return answer

    }catch (error){
        console.error("Erreur lors de l'inscription",error.message)
        throw error;
    }

}

async function Forget(email){
    try{
        let answer = await ForgetFromAPI({email:email});
        return answer

    }catch (error){
        console.error("Erreur lors de l'envoi pour l'oubli",error.message)
        throw error;
    }
}

async function ChangePassword(token, password){
    try{
        let answer = await ChangePasswordFROMAPI(token, {newPassword:password});
        return answer

    }catch (error){
        console.error("Erreur lors du changement",error.message)
        throw error;
    }
}

async function getInformationFromTokenAPI(token){
    return getRequest(url+`/${token}`,"GetInformation" )
}

async function getInformationFromToken(token) {
    try {
        let information = await getInformationFromTokenAPI(token);
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

async function VerifyToken(token) {
    try {
        let response = await verifyTokenResetFromAPI(token);
        if (response.error) {
            throw new Error(response.data.error);
        }
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des informations depuis le token:', error.message);
        throw error;
    }
}

async function getPrestataireObjectAPI(id_user){
    return getRequest(url+`/prestataire/${id_user}`,"GetPrestataireObject")
}


export const authHeader = () => {

    let token = JSON.parse(localStorage.getItem('token'));
    let header = {}
    if (token ) {
        header['x-xsrf-token'] = token;
    }
    return header;
}

export default {
    Login,
    getInformationFromToken,
    getPrestataireObject,
    Register,
    Forget,
    VerifyToken,
    ChangePassword,
    sendContact
}
