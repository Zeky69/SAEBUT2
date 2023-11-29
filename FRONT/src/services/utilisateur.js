import {postRequest} from "@/services/axios.service";

async function LoginFromApi(data) {
    console.log("route front",data)
    return postRequest('/login', data, 'LOGIN')
}


async function Login(data) {
    console.log("why")
    try {
        let answer = await LoginFromApi(data);
        console.log("HHAHAHAHHA")
        console.log(answer)
        return answer;
    } catch (error) {
        console.error('Erreur lors du login', error.message);
        throw error;
    }
}


export default {
    Login,
}
