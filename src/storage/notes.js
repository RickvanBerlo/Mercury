const notes = [];

export const addNote = (noteProps) => {
    notes[noteProps.id] = noteProps;
}

export const removeNote = (noteProps) => {
    delete notes[noteProps.id];
}

export const getNotes = () => {
    return notes;
}

export const editNote = (noteProps) => {
    notes[noteProps.id] = noteProps;
}