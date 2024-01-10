import {getRequest, postFileRequest, deleteRequest} from "@/services/axios.service";

async function getImage(filename) {
    return await getRequest('/image/' + filename, 'GETIMAGE')
}

async function uploadImage(file) {
    let formData = new FormData();
    formData.append('file', file);
    return await postFileRequest('/image', formData, 'UPLOADIMAGE')
}

async function deleteImage(filename) {
    return await deleteRequest('/image/' + filename, 'DELETEIMAGE')
}

export {
    getImage,
    uploadImage,
    deleteImage
}
