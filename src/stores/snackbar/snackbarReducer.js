import { actions } from './snackbarActions'

const InitState = { messages: ["Goedemorgen Rick"], timeInSeconds: 3 }


export default (state = InitState, action) => {

    switch (action.type) {
        case (actions.ADD_MESSAGE):
            state.messages.push(action.payload);
            return { ...state, messages: [...state.messages] };
        case (actions.POP_MESSAGE):
            state.messages.pop();
            return { ...state, messages: [...state.messages] };
        case (actions.SET_TIME):
            return { ...state, timeInSeconds: action.payload };
        default:
            return state;
    }
}