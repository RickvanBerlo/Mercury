import { actions } from './snackbarActions';
import weblinks from '../weblinks/weblinkNames';
import notes from '../notes/noteNames';
import storage from '../storage/storageNames';
import events from '../events/eventNames';


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
        case (events.GET_EVENTS_OF_MONTH + rejected):
        case (storage.PEEK_FOLDER + rejected):
        case (weblinks.GET_WEBLINKS + rejected):
        case (notes.GET_NOTES + rejected):
            state.messages.push("Het ophalen van je data is mislukt");
            return { ...state, messages: [...state.messages] };
        default:
            return state;
    }
}