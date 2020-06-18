
const files = [];

export const getFiles = () => {
    return files;
}


export const addFile = (file) => {
    files[file.name] = file;
}

export const removeFile = (name) => {
    delete files[name];
}