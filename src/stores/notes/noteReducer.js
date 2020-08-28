import actions from './noteNames';

const InitState = { notes: [], passedNote: undefined}

const fulfilled = "_FULFILLED";

export default (state = InitState, action) => {

    switch (action.type) {
        case (actions.ADD_NOTE + fulfilled):
            state.notes[action.payload.id] = action.payload;
            return { ...state, notes: [...state.notes] };
        case (actions.GET_NOTE + fulfilled):
            state.notes[action.payload.id] = action.payload;
            return { ...state, notes: [...state.notes] };
        case (actions.REMOVE_NOTE + fulfilled):
            delete state.notes[state.passedNote.id];
            return { ...state, notes: [...state.notes] };
        case (actions.GET_NOTES + fulfilled):
            return { ...state, notes: action.payload };
        case (actions.REMOVE_NOTES + fulfilled):
            return { ...state, notes: [] };
        case (actions.REPLACE_NOTE + fulfilled):
            state.notes[action.payload.id] = action.payload;
            return { ...state, notes: [...state.notes] };
        case actions.PASS_NOTE:
            return { ...state, passedNote: action.payload };
        default:
            return state;
    }
}