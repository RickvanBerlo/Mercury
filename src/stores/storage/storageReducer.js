import { actions } from './storageActions';

const InitState = { storage: { "/": [] }, currentPath: "/", selectedFiles: {} }

const fulfilled = "_FULFILLED";

const deleteFromArray = (array, obj) => {
    const index = array.findIndex(item => item.fileName === obj.fileName);
    array.splice(index, 1)
    return array;
};

function containsObject(obj, list) {
    let bool = false;
    bool = list.find((file) => {
        return (file.fileName === obj.fileName)
    })
    return bool;
}

export default (state = InitState, action) => {

    switch (action.type) {
        case (actions.ADD_FILE + fulfilled):
            state.storage[state.currentPath].push(action.payload);
            return { ...state, storage: { ...state.storage } };
        case (actions.ADD_FILES + fulfilled):
            action.payload.forEach((file) => {
                state.storage[state.currentPath].push(file);
            })
            return { ...state, storage: { ...state.storage } };
        case (actions.ADD_DIR + fulfilled):
            state.storage[action.payload.fileName] = [];
            state.storage[state.currentPath].push(action.payload);
            return { ...state, storage: { ...state.storage } };
        case (actions.PEEK_FOLDER + fulfilled):
            state.currentPath = action.payload.path;
            if (state.storage[state.currentPath] === undefined) state.storage[state.currentPath] = [];
            action.payload.files.forEach((file) => {
                if (!containsObject(file, state.storage[state.currentPath])) {
                    state.storage[state.currentPath].push(file);
                }
            })
            return { ...state, storage: { ...state.storage }, currentPath: state.currentPath };
        case (actions.DELETE_DIR + fulfilled):
            delete state.storage[state.currentPath];
            return { ...state, storage: state.storage };
        case (actions.DELETE_FILE + fulfilled):
        case (actions.DELETE_FILES + fulfilled):
            for (const key in state.selectedFiles) {
                state.storage[state.currentPath] = deleteFromArray(state.storage[state.currentPath], state.selectedFiles[key]);
            }
            return { ...state, storage: { ...state.storage }, selectedFiles: {} }
        case (actions.ADD_SELECTEDFILE):
            state.selectedFiles[action.payload.fileName] = action.payload;
            return { ...state, selectedFiles: { ...state.selectedFiles } };
        case (actions.DELETE_SELECTEDFILE):
            delete state.selectedFiles[action.payload.fileName];
            return { ...state, selectedFiles: { ...state.selectedFiles } };
        case (actions.DELETE_SELECTEDFILES):
            return { ...state, selectedFiles: {} };
        case (actions.DOWNLOAD_FILE + fulfilled):
            const array = action.payload.url.split('/');
            const name = array[array.length - 1];
            action.payload.blob().then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = name;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            return state;
        default:
            return state;
    }
}