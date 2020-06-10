const notes = [];

export const addNote = (noteProps) => {
    notes[noteProps.id] = noteProps;
}

export const removeNote = (noteProps) => {
    notes.splice(notes.indexOf(noteProps.id), 1);
}

export const getNotes = () => {
    return notes;
}