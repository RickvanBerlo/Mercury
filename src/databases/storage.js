import requestBuilder from '../utils/requestBuilder';
import config from '../constants/config';
import header from '../constants/requestHeader';
import method from '../constants/requestMethod';
import repositories from '../constants/repositories';

export const createDir = (dir) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.STORAGE_DIR)
        .addMethod(method.POST)
        .addBodyString(dir)
        .logData()
        .send();
}

export const getContent = (path) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.STORAGE_DIR)
        .addMethod(method.GET)
        .addHeaders(header.JSON)
        .addURLParams({ "path": path })
        .send();
}

export const removeDir = (dir) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.STORAGE_DIR)
        .addMethod(method.DELETE)
        .addHeaders(header.JSON)
        .addBody({ "dir": dir })
        .send();
}

export const uploadFile = (file) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.STORAGE_FILE)
        .addMethod(method.POST)
        .addHeaders(header.JSON)
        .addBody(file)
        .send();
}

export const uploadFiles = (files) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.STORAGE_FILES)
        .addMethod(method.POST)
        .addHeaders(header.JSON)
        .addBody(files)
        .send();
}

export const downloadFile = (name) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.STORAGE_FILE)
        .addMethod(method.GET)
        .addHeaders(header.JSON)
        .addURLExtendion(name)
        .send();
}

export const removeFile = (file) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.STORAGE_FILE)
        .addMethod(method.DELETE)
        .addHeaders(header.JSON)
        .addBody(file)
        .send();
}

export const removeFiles = (files) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.STORAGE_FILES)
        .addMethod(method.DELETE)
        .addHeaders(header.JSON)
        .addBody(files)
        .send();
}
