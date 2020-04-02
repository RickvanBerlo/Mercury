
import { pageNames } from '../constants/pages';

const SHARED_STORAGE = { events: {} };
class Storage {
    #storage;

    constructor() {
        this.storage = [];

        for (var key in pageNames) {
            switch (pageNames[key]) {
                case pageNames.HOME:
                    this.storage[pageNames[key]] = { shared: SHARED_STORAGE, weblinks: [{ NAME: "nu", LINK: "https://www.nu.nl/", COLOR: "#9c1b08" }] };
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