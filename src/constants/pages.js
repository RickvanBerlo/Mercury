import CalanderIcon from 'react-ionicons/lib/MdCalendar';
import HomeIcon from 'react-ionicons/lib/MdHome';
import NotesIcon from 'react-ionicons/lib/MdList';
import StorageIcon from 'react-ionicons/lib/MdFolder';
import ConfigIcon from 'react-ionicons/lib/MdBuild';
import HomePage from '../pages/homePage';
import CalendarPage from '../pages/calendarPage';
import NotesPage from '../pages/notesPage';
import StoragePage from '../pages/storagePage';
import ConfigPage from '../pages/configPage';
import DayPage from '../pages/dayPage';
import EventEditPage from '../pages/eventEditPage';
import EventPage from '../pages/eventPage';
import NoteEditPage from '../pages/noteEditPage';

export const pages = {
    "notes/noteedit/:id": { PAGE: NoteEditPage },
    "notes/createnote": { PAGE: NoteEditPage },
    "home": { PAGE: HomePage, ICON: HomeIcon, PUBLIC: true },
    "calendar": { PAGE: CalendarPage, ICON: CalanderIcon },
    "notes": { PAGE: NotesPage, ICON: NotesIcon },
    "storage": { PAGE: StoragePage, ICON: StorageIcon },
    "config": { PAGE: ConfigPage, ICON: ConfigIcon },
    "calendar/:date": { PAGE: DayPage },
    "calendar/:date/events/:id/eventedit": { PAGE: EventEditPage },
    "calendar/:date/createevent/:time": { PAGE: EventEditPage },
    "calendar/:date/events/:id": { PAGE: EventPage },
};
