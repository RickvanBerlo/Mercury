import * as database from '../../databases/storage';

export const actions = {
    ADD_FILE: "ADD_FILE",
    ADD_FILES: "ADD_FILES",
    REMOVE_DIR: "REMOVE_DIR",
    ADD_DIR: "ADD_DIR",
    PEEK_FOLDER: "PEEK_FOLDER",
    REMOVE_FILE: "REMOVE_FILE",
    REMOVE_FILES: "REMOVE_FILES",
}

export const addFile = (file) => {
    return {
        type: actions.ADD_FILE,
        payload: database.uploadFile(file).then(response => response.json())
    }
}

export const addFiles = (files) => {
    return {
        type: actions.ADD_FILES,
        payload: database.uploadFiles(files).then(response => response.json()),
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

export const removeDir = (dir) => {
    return {
        type: actions.REMOVE_DIR,
        payload: database.removeDir(dir).then(response => response.json()),
    }
}

export const removeFile = (file) => {
    return {
        type: actions.REMOVE_FILE,
        payload: database.removeFile(file).then(response => response.json()),
    }
}

export const removeFiles = (files) => {
    return {
        type: actions.REMOVE_FILES,
        payload: database.removeFiles(files).then(response => response.json()),
    }
}