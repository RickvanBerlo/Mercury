import actions from './modelNames';

export const addModel = (id, model) => {
    return {
        type: actions.ADD_MODEL,
        payload: { id, model }
    }
}

export const removeAllModels = () => {
    return {
        type: actions.REMOVE_ALL_MODELS,
    }
}

export const setModelActive = (id) => {
    return {
        type: actions.SET_MODEL_ACTIVE,
        payload: id
    }
}

export const setModelInactive = (id) => {
    return {
        type: actions.SET_MODEL_INACTIVE,
        payload: id
    }
}
