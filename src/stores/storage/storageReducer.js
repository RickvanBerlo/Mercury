import { actions } from './storageActions'

const InitState = { storage: { "/": [] }, currentPath: "/", selectedFiles: [] }

const fulfilled = "_FULFILLED";

const removeFromArray = (array, from, to) => {
    var rest = array.slice((to || from) + 1 || array.length);
    array.length = from < 0 ? array.length + from : from;
    return array.push.apply(array, rest);
};

export default (state = InitState, action) => {

    switch (action.type) {
        case (actions.ADD_FILE + fulfilled):
            state.storage[state.currentFolder].push(action.payload);
            return { ...state, storage: state.storage };
        case (actions.ADD_FILES + fulfilled):
            action.payload.forEach((file) => {
                state.storage[state.currentFolder].push(file);
            })
            return Object.assign({}, state, { ...state, storage: state.storage });
        case (actions.ADD_DIR + fulfilled):
            state.storage[action.payload.fileName] = [];
            state.storage[state.currentPath].push(action.payload);
            console.log(state);
            return { ...state, storage: { ...state.storage } };
        case (actions.PEEK_FOLDER + fulfilled):
            state.currentFolder = action.payload.path;
            if (state.storage[state.currentFolder] === undefined) state.storage[state.currentFolder] = [];
            action.payload.files.forEach((file) => {
                state.storage[state.currentFolder].push(file);
            })
            return { ...state, storage: { ...state.storage }, currentFolder: state.currentFolder };
        case (actions.REMOVE_DIR + fulfilled):
            delete state.storage[state.currentFolder];
            return { ...state, storage: state.storage };
        case (actions.REMOVE_FILE + fulfilled):
        case (actions.REMOVE_FILES + fulfilled):
            state.selectedFiles.forEach((file) => {
                state.storage[state.currentFolder] = removeFromArray(state.storage[state.currentFolder], state.storage[state.currentFolder].indexOf(file));
            })
            return { ...state, storage: state.storage };
        default:
            return state;
    }
}