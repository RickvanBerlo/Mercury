import * as database from "../database/notes";

let notes = [];

export const addNote = (noteProps) => {
    const promise = database.addNote(noteProps);
    promise.then(response => response.json()).then(data => notes[data.id] = data);
    return true;
}

export const removeNote = (noteProps) => {
    database.deleteNote(noteProps.id);
    delete notes[noteProps.id];
}

export const getNotes = () => {
    const promise = database.getNotes();
    promise.then(response => response.json()).then(data => notes = data);
    return notes;
}

export const editNote = (noteProps) => {
    const promise = database.replaceNote(noteProps);
    promise.then(response => response.json()).then(data => notes[data.id] = data);
}