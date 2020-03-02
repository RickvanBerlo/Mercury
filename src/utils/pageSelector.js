import sideMenuButtons from '../constants/sideMenuButtons';

export const getCorrectPageByName = (name) => {
    let pageIndex = -1;
    sideMenuButtons.forEach((item, index) => {
        if (name === item.NAME) pageIndex = index;
    })
    if (pageIndex === -1) throw new Error("getCorrectPageByName: did not find the correct page");
    return pageIndex;
}