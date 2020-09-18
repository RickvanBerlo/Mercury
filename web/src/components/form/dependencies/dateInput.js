import { largerThen, smallerThen, toggleVisibilityObject } from './generic';

const mustBeSmallerOrEqualThen = (dependencyValue, objectValue, object, changeValidation, inputs) => {
    smallerThen(new Date(dependencyValue).getTime(), new Date(objectValue).getTime(), object, changeValidation);
}

const mustBeLargerOrEqualThen = (dependencyValue, objectValue, object, changeValidation, inputs) => {
    largerThen(new Date(dependencyValue).getTime(), new Date(objectValue).getTime(), object, changeValidation);
}

export default { "smallerThen": mustBeSmallerOrEqualThen, "largerThen": mustBeLargerOrEqualThen, "toggleVisibility": toggleVisibilityObject }