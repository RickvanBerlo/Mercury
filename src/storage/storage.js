
import { pageNames } from '../constants/pages';
import { getEvents, setEvent, getEventsOfDay, removeEvent } from './events';
import { addNote, removeNote, getNotes, editNote } from './notes';
import { getFiles, addFile, removeFile } from './files';

const SHARED_STORAGE = {
    getEvents: getEvents,
    setEvent: setEvent,
    getEventsOfDay: getEventsOfDay,
    removeEvent: removeEvent,
    addNote: addNote,
    removeNote: removeNote,
    getNotes: getNotes,
    editNote: editNote,
    getFiles: getFiles,
    addFile: addFile,
    removeFile: removeFile,
};

class Storage {
    #storage;

    constructor() {
        this.storage = [];

        for (var key in pageNames) {
            switch (pageNames[key]) {
                case pageNames.HOME:
                    //this.storage[pageNames[key]] = { shared: SHARED_STORAGE, weblinks: [{ NAME: "nu", LINK: "https://www.nu.nl/", COLOR: "#9c1b08" }] };
                    break;
                default:
                    this.storage[pageNames[key]] = { shared: SHARED_STORAGE };
                    break;
            }
        }
    }

    getStorage(name) {
        return this.storage[name];

    }

}

export default Storage;