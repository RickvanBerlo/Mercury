
import { pageNames } from '../constants/pages';

const SHARED_STORAGE = { events: [{ title: "test", startDate: "2020-04-01", endDate: "2020-04-01", time: true, startTime: "00:30", endTime: "04:00", description: "test" }] };
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