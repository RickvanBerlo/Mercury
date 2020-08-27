export const actions = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
}

export const login = (keycloak) => {
    return {
        type: actions.LOGIN,
        payload: keycloak
    }
}

export const logout = () => {
    return {
        type: actions.LOGOUT,
    }
}