import { pages } from '../constants/pages';

export const getAllSideMenuButtonPages = () => {
    let buttons = {};
    for (var key in pages) {
        if (pages[key].ICON !== undefined) buttons[key] = (pages[key]);
    }
    return buttons;
}