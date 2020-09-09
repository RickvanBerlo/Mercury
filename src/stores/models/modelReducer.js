import actions from './modelNames';

const InitState = { models: {}, activeModels: [] }

export default (state = InitState, action) => {

    switch (action.type) {
        case (actions.ADD_MODEL):
            state.models[action.payload.id] = action.payload.model;
            return { ...state, models: { ...state.models } };
        case (actions.REMOVE_ALL_MODELS):
            return { ...state, models: {} };
        case (actions.SET_MODEL_ACTIVE):
            state.activeModels.push(action.payload);
            return { ...state, activeModels: [...state.activeModels] };
        case (actions.SET_MODEL_INACTIVE):
            state.activeModels = state.activeModels.filter(value => value !== action.payload);
            return { ...state, activeModels: [...state.activeModels] };
        default:
            return state;
    }
}