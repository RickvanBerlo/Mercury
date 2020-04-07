import { largerThen, smallerThen, toggleVisibilityObject } from './generic';

const mustBeSmallerOrEqualThen = (dependencyValue, objectValue, object, changeValidation, inputs) => {
    smallerThen(parseInt(dependencyValue.replace(/:/g, '')), parseInt(objectValue.replace(/:/g, '')), object, changeValidation);
}

const mustBeLargerOrEqualThen = (dependencyValue, objectValue, object, changeValidation, inputs) => {
    largerThen(parseInt(dependencyValue.replace(/:/g, '')), parseInt(objectValue.replace(/:/g, '')), object, changeValidation);
}

export default { "smallerThen": mustBeSmallerOrEqualThen, "largerThen": mustBeLargerOrEqualThen, "toggleVisibility": toggleVisibilityObject }