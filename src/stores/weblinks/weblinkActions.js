import * as database from '../../databases/weblinks';

export const actions = {
    ADD: "ADD",
    DELETE_WEBLINK: "DELETE_WEBLINK",
    DELETE_WEBLINKS: "DELETE_WEBLINKS",
    REPLACE: "REPLACE",
    GET_WEBLINKS: "GET_WEBLINKS",
    GET_WEBLINK: "GET_WEBLINK",
}

export const add = (weblink) => {
    return {
        type: actions.ADD,
        payload: database.addWeblink(weblink).then(response => response.json())
    }
}

export const deleteWeblinks = () => {
    return {
        type: actions.REMOVE_WEBLINKS,
        payload: database.deleteWeblinks()
    }
}

export const deleteWeblink = (id) => {
    return {
        type: actions.REMOVE_WEBLINK,
        payload: database.deleteWeblink(id)
    }
}

export const replace = (weblink) => {
    return {
        type: actions.REPLACE,
        payload: database.replaceWeblink(weblink).then(response => response.json())
    }
}

export const getWeblinks = () => {
    return {
        type: actions.GET_WEBLINKS,
        payload: database.getWeblinks().then(response => response.json())
    }
}

export const getWeblink = (id) => {
    return {
        type: actions.GET_WEBLINK,
        payload: database.getWeblink(id).then(response => response.json())
    }
}