
import CalanderIcon from 'react-ionicons/lib/MdCalendar';
import HomeIcon from 'react-ionicons/lib/MdHome';
import NotesIcon from 'react-ionicons/lib/MdList';
import StorageIcon from 'react-ionicons/lib/MdFolder';
import ScrumboardsIcon from 'react-ionicons/lib/MdClipboard';
import BillsIcon from 'react-ionicons/lib/MdCash';
import ConfigIcon from 'react-ionicons/lib/MdBuild';

import HomePage from '../pages/homePage';
import CalendarPage from '../pages/calendarPage';
import NotesPage from '../pages/notesPage';
import StoragePage from '../pages/storagePage';
import ScrumboardsPage from '../pages/scrumboardsPage';
import BillsPage from '../pages/billsPage';
import ConfigPage from '../pages/configPage';

export default [
    { NAME: "Home", ICON: HomeIcon, PAGE: HomePage },
    { NAME: "Calendar", ICON: CalanderIcon, PAGE: CalendarPage },
    { NAME: "Notes", ICON: NotesIcon, PAGE: NotesPage },
    { NAME: "Storage", ICON: StorageIcon, PAGE: StoragePage },
    { NAME: "Srumboards", ICON: ScrumboardsIcon, PAGE: ScrumboardsPage },
    { NAME: "Bills", ICON: BillsIcon, PAGE: BillsPage },
    { NAME: "Config", ICON: ConfigIcon, PAGE: ConfigPage },
]