import { actions } from './keycloakActions';

const InitState = { keycloak: null, authenticated: false }

export default (state = InitState, action) => {
    switch (action.type) {
        case actions.LOGIN:
            return {...state, keycloak: action.payload, authenticated: true};
        case actions.LOGOUT:
            state.keycloak.logout({ redirectUri: "http://localhost:3000"});
            return { ...state, authenticated: false };
        default:
            return state;
    }
}