import lazy from "react-lazy-with-preload";
import CalanderIcon from 'react-ionicons/lib/MdCalendar';
import HomeIcon from 'react-ionicons/lib/MdHome';
import NotesIcon from 'react-ionicons/lib/MdList';
import StorageIcon from 'react-ionicons/lib/MdFolder';
import ConfigIcon from 'react-ionicons/lib/MdBuild';
// import CalendarPage from '../pages/calendarPage';
// import NotesPage from '../pages/notesPage';
// import StoragePage from '../pages/storagePage';
// import ConfigPage from '../pages/configPage';
// import DayPage from '../pages/dayPage';
// import EventEditPage from '../pages/eventEditPage';
// import EventPage from '../pages/eventPage';
// import NoteEditPage from '../pages/noteEditPage';
export const HomePage = lazy(() => import('../pages/homePage'));
export const CalendarPage = lazy(() => import('../pages/calendarPage'));
export const NotesPage = lazy(() => import('../pages/notesPage'));
export const StoragePage = lazy(() => import('../pages/storagePage'));
export const ConfigPage = lazy(() => import('../pages/configPage'));
export const DayPage = lazy(() => import('../pages/dayPage'));
export const EventEditPage = lazy(() => import('../pages/eventEditPage'));
export const EventPage = lazy(() => import('../pages/eventPage'));
export const NoteEditPage = lazy(() => import('../pages/noteEditPage'));

export const pages = {
    "notes/noteedit/:id": { PAGE: NoteEditPage },
    "calendar/:date": { PAGE: DayPage },
    "calendar/:date/events/:id/eventedit": { PAGE: EventEditPage },
    "calendar/:date/createevent/:time": { PAGE: EventEditPage },
    "calendar/:date/events/:id": { PAGE: EventPage },
    "notes/createnote": { PAGE: NoteEditPage },
    "home": { PAGE: HomePage, ICON: HomeIcon, PUBLIC: true },
    "calendar": { PAGE: CalendarPage, ICON: CalanderIcon },
    "notes": { PAGE: NotesPage, ICON: NotesIcon },
    "storage": { PAGE: StoragePage, ICON: StorageIcon },
    "config": { PAGE: ConfigPage, ICON: ConfigIcon },
};
