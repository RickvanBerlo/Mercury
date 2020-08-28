import actions from './weblinkNames';

const InitState = { weblinks: {} }

const fulfilled = "_FULFILLED";

export default (state = InitState, action) => {

    switch (action.type) {
        case (actions.ADD_WEBLINK + fulfilled):
            state.weblinks[action.payload.id] = action.payload;
            return { ...state, weblinks: { ...state.weblinks } };
        case (actions.GET_WEBLINK + fulfilled):
            state.weblinks[action.payload.id] = action.payload;
            return { ...state, weblinks: { ...state.weblinks } };
        case (actions.DELETE_WEBLINK + fulfilled):
            const id = action.payload.url.split('/').pop();
            delete state.weblinks[id];
            return { ...state, weblinks: { ...state.weblinks } };
        case (actions.GET_WEBLINKS + fulfilled):
            action.payload.forEach(weblink => {
                state.weblinks[weblink.id] = weblink
            });
            return { ...state, weblinks: { ...state.weblinks } };
        case (actions.DELETE_WEBLINKS + fulfilled):
            return { ...state, weblinks: {} };
        case (actions.REPLACE_WEBLINK + fulfilled):
            state.weblinks[action.payload.id] = action.payload;
            return { ...state, weblinks: { ...state.weblinks } };
        default:
            return state;
    }
}