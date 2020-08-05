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

export const deleteDir = (dir) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.STORAGE_DIR)
        .addMethod(method.DELETE)
        .addHeaders(header.JSON)
        .addBodyString(dir)
        .send();
}

export const uploadFile = (file, path) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("path", path);
    return new requestBuilder(config.MERCURY_API.PATH, repositories.STORAGE_FILE)
        .addMethod(method.POST)
        .addFormdata(formData)
        .send();
}

export const uploadFiles = (files, path) => {
    console.log(path);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
    }
    formData.append("path", path);
    return new requestBuilder(config.MERCURY_API.PATH, repositories.STORAGE_FILES)
        .addMethod(method.POST)
        .addFormdata(formData)
        .send();
}

export const downloadFile = (path) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.STORAGE_FILE)
        .addMethod(method.GET)
        .addURLExtendion(path)
        .send();
}

export const deleteFile = (file) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.STORAGE_FILE)
        .addMethod(method.DELETE)
        .addHeaders(header.JSON)
        .addBodyJson(file)
        .send();
}

export const deleteFiles = (files) => {
    return new requestBuilder(config.MERCURY_API.PATH, repositories.STORAGE_FILES)
        .addMethod(method.DELETE)
        .addHeaders(header.JSON)
        .addBodyJson(files)
        .send();
}
