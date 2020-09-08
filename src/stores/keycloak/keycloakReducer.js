import actions from './keycloakNames';
import Keycloak from 'keycloak-js';
import props from '../../constants/keycloak';

const InitState = { keycloak: Keycloak(props), init: false };

// useEffect(() => {
//     if (!authenticated) {
//         keycloak.init().then(function (authenticated) {
//             if (!authenticated)
//                 keycloak.login();
//             else {
//                 login(keycloak);
//             }
//         }).catch(function () {
//             alert('failed to initialize');
//         });
//     }
// }, [login, authenticated])

const fulfilled = "_FULFILLED";

export default (state = InitState, action) => {
    switch (action.type) {
        case actions.LOGIN:
            state.keycloak.login();
            return {...state, authenticated: true};
        case actions.LOGOUT:
            state.keycloak.logout({ redirectUri: "http://localhost:3000"});
            return { ...state, authenticated: false };
        case actions.INIT + fulfilled:
            console.log(action.payload)
            return { ...state, init: true}
        default:
            return state;
    }
}