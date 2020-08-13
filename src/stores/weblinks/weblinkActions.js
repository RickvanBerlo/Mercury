import * as database from '../../databases/weblinks';

export const actions = {
    ADD_WEBLINK: "ADD_WEBLINK",
    DELETE_WEBLINK: "DELETE_WEBLINK",
    DELETE_WEBLINKS: "DELETE_WEBLINKS",
    REPLACE_WEBLINK: "REPLACE_WEBLINK",
    GET_WEBLINKS: "GET_WEBLINKS",
    GET_WEBLINK: "GET_WEBLINK",
}

export const add = (weblink) => {
    return {
        type: actions.ADD_WEBLINK,
        payload: database.addWeblink(weblink).then(response => response.json())
    }
}

export const deleteWeblinks = () => {
    return {
        type: actions.DELETE_WEBLINKS,
        payload: database.deleteWeblinks()
    }
}

export const deleteWeblink = (id) => {
    return {
        type: actions.DELETE_WEBLINK,
        payload: database.deleteWeblink(id)
    }
}

export const replace = (weblink) => {
    return {
        type: actions.REPLACE_WEBLINK,
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