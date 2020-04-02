import { largerThen, smallerThen, toggleVisibilityObject } from './generic';

const mustBeSmallerOrEqualThen = (dependencyValue, objectValue, object, changeValidation) => {
    smallerThen(parseInt(dependencyValue.replace(/:/g, '')), parseInt(objectValue.replace(/:/g, '')), object, changeValidation);
}

const mustBeLargerOrEqualThen = (dependencyValue, objectValue, object, changeValidation) => {
    largerThen(parseInt(dependencyValue.replace(/:/g, '')), parseInt(objectValue.replace(/:/g, '')), object, changeValidation);
}

export default { "smallerThen": mustBeSmallerOrEqualThen, "largerThen": mustBeLargerOrEqualThen, "toggleVisibility": toggleVisibilityObject }