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
    ///:uuid/event',
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


async function getEventFromAPI(uuid) {
    return getRequest('/scene/' +`${uuid}/event`, 'GETEVENT')
}

async function getEvent(uuid) {
    let answer = await getEventFromAPI(uuid)
    return answer
}

async function getEventUUIDFromAPI(uuidEvent) {
    return getRequest('/scene/event/' +  `${uuidEvent}`, 'GETEVENTUUID')
}

async function getEventUUID( uuidEvent) {
    let answer = await getEventUUIDFromAPI(uuidEvent)
    return answer
}


async function createEventFromAPI(data,uuid) {
    console.log("createvent front api")
    let response = await postRequest('/scene' +`/${uuid}/event`, data, 'CREATEEVENT')
    console.log("response create event",response)
    return response
}

async function createEvent(data,uuid) {
    console.log("createvent front")
    let answer = await createEventFromAPI(data,uuid)
    return answer
}


async function deleteEventFromAPI( uuidEvent) {
    return deleteRequest('/scene/event/'+`${uuidEvent}`, 'DELETEEVENT')
}

async function deleteEvent(uuidEvent) {
    let answer = await deleteEventFromAPI( uuidEvent)
    return answer
}

export {
    getAllScene,
    getOneSceneUUID,
    createScene,
    deleteScene,
    getEvent,
    getEventUUID,
    createEvent,
    deleteEvent
}

