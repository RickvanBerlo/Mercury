import HomePage from '../pages/homePage';
import CalendarPage from '../pages/calendarPage';
import NotesPage from '../pages/notesPage';
import StoragePage from '../pages/storagePage';
import ScrumboardsPage from '../pages/scrumboardsPage';
import BillsPage from '../pages/billsPage';
import ConfigPage from '../pages/configPage';
import DayPage from '../pages/dayPage';
import EventEditPage from '../pages/eventEditPage';
import EventPage from '../pages/eventPage';

import CalanderIcon from 'react-ionicons/lib/MdCalendar';
import HomeIcon from 'react-ionicons/lib/MdHome';
import NotesIcon from 'react-ionicons/lib/MdList';
import StorageIcon from 'react-ionicons/lib/MdFolder';
import ScrumboardsIcon from 'react-ionicons/lib/MdClipboard';
import BillsIcon from 'react-ionicons/lib/MdCash';
import ConfigIcon from 'react-ionicons/lib/MdBuild';

export const pageNames = {
    HOME: "Home",
    CALENDAR: "Calendar",
    NOTES: "Notes",
    STORAGE: "Storage",
    SCRUMBOARDS: "Srumboards",
    BILLS: "Bills",
    CONFIG: "Config",
    DAY: "Day",
    EVENTEDIT: "EventEdit",
    EVENT: "Event",
}

export const pages = [
    { NAME: pageNames.HOME, PAGE: HomePage, ICON: HomeIcon },
    { NAME: pageNames.CALENDAR, PAGE: CalendarPage, ICON: CalanderIcon },
    { NAME: pageNames.NOTES, PAGE: NotesPage, ICON: NotesIcon },
    { NAME: pageNames.STORAGE, PAGE: StoragePage, ICON: StorageIcon },
    { NAME: pageNames.SCRUMBOARDS, PAGE: ScrumboardsPage, ICON: ScrumboardsIcon },
    { NAME: pageNames.BILLS, PAGE: BillsPage, ICON: BillsIcon },
    { NAME: pageNames.CONFIG, PAGE: ConfigPage, ICON: ConfigIcon },
    { NAME: pageNames.DAY, PAGE: DayPage },
    { NAME: pageNames.EVENTEDIT, PAGE: EventEditPage },
    { NAME: pageNames.EVENT, PAGE: EventPage },
]