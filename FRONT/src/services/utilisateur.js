import axios from "axios";

const userAPI = 'http://localhost:3000/login';

async function Login(data) {
    try {
        const response = await axios.post(userAPI, data);
        return response;
    } catch (err) {
        console.log("Impossible de se connecter --> " + err);
        throw err;
    }
}

export default {
    Login,
}
