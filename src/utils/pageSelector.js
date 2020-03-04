import { pages } from '../constants/pages';

export const getCorrectPageByName = (name) => {
    let page = undefined;
    pages.forEach((item) => {
        if (item.NAME === name) page = item.PAGE;
    })
    if (page === undefined) throw new Error("getCorrectPageByName: no page found by this name")
    return page;
}

export const getAllSideMenuButtonPages = () => {
    let buttons = [];
    pages.forEach((item) => {
        if (item.ICON !== undefined) buttons.push(item);
    })
    return buttons;
}