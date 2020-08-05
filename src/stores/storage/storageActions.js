import * as database from '../../databases/storage';

export const actions = {
    ADD_FILE: "ADD_FILE",
    ADD_FILES: "ADD_FILES",
    DELETE_DIR: "DELETE_DIR",
    ADD_DIR: "ADD_DIR",
    PEEK_FOLDER: "PEEK_FOLDER",
    DELETE_FILE: "DELETE_FILE",
    DELETE_FILES: "DELETE_FILES",
    ADD_SELECTEDFILE: "ADD_SELECTEDFILE",
    DELETE_SELECTEDFILES: "DELETE_SELECTEDFILES",
    DELETE_SELECTEDFILE: "DELETE_SELECTEDFILE",
    DOWNLOAD_FILE: "DOWNLOAD_FILE",
}

export const addFile = (file, path) => {
    return {
        type: actions.ADD_FILE,
        payload: database.uploadFile(file, path).then(response => response.json())
    }
}

export const addFiles = (files, path) => {
    return {
        type: actions.ADD_FILES,
        payload: database.uploadFiles(files, path).then(response => response.json()),
    }
}

export const createDir = (dir) => {
    return {
        type: actions.ADD_DIR,
        payload: database.createDir(dir).then(response => response.json()),
    }
}

export const peekDir = (dir) => {
    return {
        type: actions.PEEK_FOLDER,
        payload: database.getContent(dir).then(response => response.json()),
    }
}

export const deleteDir = (dir) => {
    return {
        type: actions.DELETE_DIR,
        payload: database.deleteDir(dir).then(response => response.json()),
    }
}

export const deleteFile = (file) => {
    return {
        type: actions.DELETE_FILE,
        payload: database.deleteFile(file).then(response => response.json()),
    }
}

export const deleteFiles = (files) => {
    let fileInfos = [];
    for (var key in files) {
        fileInfos.push(files[key]);
    }
    return {
        type: actions.DELETE_FILES,
        payload: database.deleteFiles(fileInfos),
    }
}

export const addSelectedFile = (file) => {
    return {
        type: actions.ADD_SELECTEDFILE,
        payload: file,
    }
}

export const deleteSelectedFile = (file) => {
    return {
        type: actions.DELETE_SELECTEDFILE,
        payload: file,
    }
}

export const deleteSelectedFiles = () => {
    return {
        type: actions.DELETE_SELECTEDFILES,
    }
}

export const downloadFile = (path) => {
    return {
        type: actions.DOWNLOAD_FILE,
        payload: database.downloadFile(path),
    }
}
