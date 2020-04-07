import colors from '../../../constants/colors';

export const toggleVisibilityObject = (dependencyValue, objectValue, object, changeValidation, inputs) => {
    if (!dependencyValue) object.style.display = "none";
    else object.style.display = "block"
    object.onchange("toggleVisibility");
}

export const smallerThen = (dependencyValue, objectValue, object, changeValidation, inputs) => {
    if (dependencyValue < objectValue) {
        const input = getVisibleItem(object);
        input.title = "Deze waarde is te hoog";
        input.style.borderColor = colors.RED;
        changeValidation(false);
    }
    else {
        const input = getVisibleItem(object);
        input.title = "Click om een waarde in te vullen of te selecteren.";
        input.style.borderColor = colors.GRAY;
        changeValidation(true);
    }
}

export const largerThen = (dependencyValue, objectValue, object, changeValidation, inputs) => {
    if (dependencyValue > objectValue) {
        const input = getVisibleItem(object);
        input.title = "Deze waarde is te laag";
        input.style.borderColor = colors.RED;
        changeValidation(false);
    }
    else {
        const input = getVisibleItem(object);
        input.title = "Click om een waarde in te vullen of te selecteren.";
        input.style.borderColor = colors.GRAY;
        changeValidation(true);
    } changeValidation(true);
}

export const getVisibleItem = (object) => {
    for (let item of object.children) {
        if (item.className.includes("input")) {
            return item;
        }
    }
    return null;
}