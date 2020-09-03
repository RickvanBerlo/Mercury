import { lazy } from 'react';
import CalanderIcon from 'react-ionicons/lib/MdCalendar';
import HomeIcon from 'react-ionicons/lib/MdHome';
import NotesIcon from 'react-ionicons/lib/MdList';
import StorageIcon from 'react-ionicons/lib/MdFolder';
//import ScrumboardsIcon from 'react-ionicons/lib/MdClipboard';
//import BillsIcon from 'react-ionicons/lib/MdCash';
import ConfigIcon from 'react-ionicons/lib/MdBuild';
//import ScrumboardsPage from '../pages/scrumboardsPage';
//import BillsPage from '../pages/billsPage';
const HomePage = lazy(() => import('../pages/homePage'));
const CalendarPage = lazy(() => import('../pages/calendarPage'));
const NotesPage = lazy(() => import('../pages/notesPage'));
const StoragePage = lazy(() => import('../pages/storagePage'));
const ConfigPage = lazy(() => import('../pages/configPage'));
const DayPage = lazy(() => import('../pages/dayPage'));
const EventEditPage = lazy(() => import('../pages/eventEditPage'));
const EventPage = lazy(() => import('../pages/eventPage'));
const NoteEditPage = lazy(() => import('../pages/noteEditPage'));

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
