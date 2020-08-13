export const actions = {
    ADD_MODEL: "ADD_MODEL",
    REMOVE_ALL_MODELS: "REMOVE_ALL_MODELS",
    SET_MODEL_ACTIVE: "SET_MODEL_ACTIVE",
    SET_MODEL_INACTIVE: "SET_MODEL_INACTIVE",
}

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
