import { actions } from './weblinkActions'

const InitState = { weblinks: {} }

const fulfilled = "_FULFILLED";

export default (state = InitState, action) => {

    switch (action.type) {
        case (actions.ADD + fulfilled):
            state.weblinks[action.payload.id] = action.payload;
            return { ...state, weblinks: { ...state.weblinks } };
        case (actions.GET_WEBLINK + fulfilled):
            state.weblinks[action.payload.id] = action.payload;
            return { ...state, weblinks: { ...state.weblinks } };
        case (actions.DELETE_WEBLINK + fulfilled):
            delete state.weblinks[state.passedNote.id];
            return { ...state, weblinks: { ...state.weblinks } };
        case (actions.GET_WEBLINKS + fulfilled):
            action.payload.forEach(weblink => {
                state.weblinks[weblink.id] = weblink
            });
            return { ...state, weblinks: { ...state.weblinks } };
        case (actions.DELETE_WEBLINKS + fulfilled):
            return { ...state, weblinks: {} };
        case (actions.REPLACE + fulfilled):
            state.weblinks[action.payload.id] = action.payload;
            return { ...state, weblinks: { ...state.weblinks } };
        default:
            return state;
    }
}