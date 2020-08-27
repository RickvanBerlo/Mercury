import { actions } from './snackbarActions';
import * as events from '../events/eventActions';
import * as storage from '../storage/storageActions';
import * as weblinks from '../weblinks/weblinkActions';
import * as notes from '../notes/noteActions';


const InitState = { messages: ["Goedemorgen Rick"], timeInSeconds: 3 }

const rejected = "_REJECTED";

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
        case (events.actions.GET_EVENTS_OF_MONTH + rejected):
        case (storage.actions.PEEK_FOLDER + rejected):
        case (weblinks.actions.GET_WEBLINKS + rejected):
        case (notes.actions.GET_NOTES + rejected):
            state.messages.push("Het ophalen van je data is mislukt");
            return { ...state, messages: [...state.messages] };
        default:
            return state;
    }
}