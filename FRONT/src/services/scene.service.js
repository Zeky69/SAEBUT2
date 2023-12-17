import {getRequest, postRequest,deleteRequest} from "@/services/axios.service"


async function getAllSceneFromAPI(){
    let answer = await getRequest('/scene/', 'GETALLSCENE')
    console.log("return front api",answer)
    return answer
}

async function getAllScene() {
    let answer = await getAllSceneFromAPI()
    console.log("return front",answer)
    return answer
}


async function getOneSceneUUIDFromAPI(uuid) {
    //uuid en parametre
    return getRequest('/scene/' +`/${uuid}`, 'GETONESCENE')
}

async function getOneSceneUUID(uuid) {
    let answer = await getOneSceneUUIDFromAPI(uuid)
    return answer
}

async function createSceneFromAPI(data) {
    return postRequest('/scene/', data, 'CREATESCENE')
}

async function createScene(data) {
    let answer = await createSceneFromAPI(data)
    return answer
}

async function deleteSceneFromAPI(uuid) {
    return deleteRequest('/scene/' +`/${uuid}`, 'DELETESCENE')
}

async function deleteScene(uuid) {
    let answer = await deleteSceneFromAPI(uuid)
    return answer
}



export {
    getAllScene,
    getOneSceneUUID,
    createScene,
    deleteScene
}