import {getRequest, postRequest,deleteRequest} from "@/services/axios.service"


async function getAllToiletteFromAPI(){
    let answer = await getRequest('/toilette/', 'GETALLTOILETTE')
    return answer
}


async function getAllToilettes() {
    let answer = await getAllToiletteFromAPI()
    return answer
}


async function getOneToiletteUUIDFromAPI(uuid) {
    //uuid en parametre
    return getRequest('/toilette/' +`/${uuid}`, 'GETONETOILETTE')
}


async function getOneToiletteUUID(uuid) {
    let answer = await getOneToiletteUUIDFromAPI(uuid)
    return answer
}


async function createToiletteFromAPI(data) {
    return postRequest('/toilette/', data, 'CREATETOILETTE')
}


async function createToilette(data) {
    let answer = await createToiletteFromAPI(data)
    return answer
}


async function deleteToiletteFromAPI(uuid) {
    return deleteRequest('/toilette/' +`/${uuid}`, 'DELETETOILETTE')
}


async function deleteToilette(uuid) {
    let answer = await deleteToiletteFromAPI(uuid)
    return answer
}



export {
    getAllToilettes,
    getOneToiletteUUID,
    createToilette,
    deleteToilette
}