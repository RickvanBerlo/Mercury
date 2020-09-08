import actions from './keycloakNames';

export const login = () => {
    return {
        type: actions.LOGIN,
    }
}

export const logout = () => {
    return {
        type: actions.LOGOUT,
    }
}

export const init = (keycloak) => {
    return {
        type: actions.INIT,
        payload: keycloak.init({
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: 'http://localhost:3000/silent-check-sso.html'
        })
    }
}