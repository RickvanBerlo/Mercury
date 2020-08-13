import HomePage from '../pages/homePage';
import CalendarPage from '../pages/calendarPage';
import NotesPage from '../pages/notesPage';
import StoragePage from '../pages/storagePage';
//import ScrumboardsPage from '../pages/scrumboardsPage';
//import BillsPage from '../pages/billsPage';
import ConfigPage from '../pages/configPage';
import DayPage from '../pages/dayPage';
import EventEditPage from '../pages/eventEditPage';
import EventPage from '../pages/eventPage';
import NoteEditPage from '../pages/noteEditPage';

import CalanderIcon from 'react-ionicons/lib/MdCalendar';
import HomeIcon from 'react-ionicons/lib/MdHome';
import NotesIcon from 'react-ionicons/lib/MdList';
import StorageIcon from 'react-ionicons/lib/MdFolder';
//import ScrumboardsIcon from 'react-ionicons/lib/MdClipboard';
//import BillsIcon from 'react-ionicons/lib/MdCash';
import ConfigIcon from 'react-ionicons/lib/MdBuild';

export const pageNames = {
    HOME: "Home",
    CALENDAR: "Calendar",
    NOTES: "Notes",
    STORAGE: "Storage",
    //SCRUMBOARDS: "Srumboards",
    //BILLS: "Bills",
    CONFIG: "Config",
    DAY: "Day",
    EVENTEDIT: "EventEdit",
    EVENT: "Event",
    NOTEEDIT: "NoteEdit",
}

export const pages = {
    "Home": { PAGE: HomePage, ICON: HomeIcon },
    "Calendar": { PAGE: CalendarPage, ICON: CalanderIcon },
    "Notes": { PAGE: NotesPage, ICON: NotesIcon },
    "Storage": { PAGE: StoragePage, ICON: StorageIcon },
    //"Srumboards": { PAGE: ScrumboardsPage, ICON: ScrumboardsIcon },
    //"Bills": { PAGE: BillsPage, ICON: BillsIcon },
    "Config": { PAGE: ConfigPage, ICON: ConfigIcon },
    "Day": { PAGE: DayPage },
    "EventEdit": { PAGE: EventEditPage },
    "Event": { PAGE: EventPage },
    "NoteEdit": { PAGE: NoteEditPage },
};
