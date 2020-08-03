import * as database from '../../databases/notes';

const init_Note = { id: undefined, title: undefined, description: undefined };

export const actions = {
    ADD: "ADD",
    REMOVE_NOTE: "REMOVE_NOTE",
    REMOVE_NOTES: "REMOVE_NOTES",
    REPLACE: "REPLACE",
    GET_NOTES: "GET_NOTES",
    GET_NOTE: "GET_NOTE",
    PASS_NOTE: "PASS_NOTE",
}

export const passNote = (note = init_Note) => {
    return {
        type: actions.PASS_NOTE,
        payload: note
    }
}

export const add = (note) => {
    return {
        type: actions.ADD,
        payload: database.addNote(note).then(response => response.json())
    }
}

export const removeNotes = () => {
    return {
        type: actions.REMOVE_NOTES,
        payload: database.deleteNotes()
    }
}

export const removeNote = (id) => {
    return {
        type: actions.REMOVE_NOTE,
        payload: database.deleteNote(id)
    }
}

export const replace = (note) => {
    return {
        type: actions.REPLACE,
        payload: database.replaceNote(note).then(response => response.json())
    }
}

export const getNotes = () => {
    return {
        type: actions.GET_NOTES,
        payload: database.getNotes().then(response => response.json())
    }
}

export const getNote = (id) => {
    return {
        type: actions.GET_NOTE,
        payload: database.getNote(id).then(response => response.json())
    }
}