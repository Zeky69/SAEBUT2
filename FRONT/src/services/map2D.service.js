import {getRequest} from "@/services/axios.service"



async function getMap2DBat() {
    let answer = await getRequest('/map2D/bat', 'GETMAP2DBAT')
    return answer
}

async function getMap2DWC() {
    let answer = await getRequest('/map2D/wc', 'GETMAP2DWC')
    return answer
}


async function getMap2DScene() {
    let answer = await getRequest('/map2D/scene', 'GETMAP2DSCENE')
    return answer
}

async function getMap2DType() {
    let answer = await getRequest('/map2D/type', 'GETMAP2DTYPE')
    return answer
}

export {
    getMap2DBat,
    getMap2DWC,
    getMap2DScene,
    getMap2DType
}

