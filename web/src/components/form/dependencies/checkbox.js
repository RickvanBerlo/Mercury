import { toggleVisibilityObject } from './generic';

const hideCheckbox = (dependencyValue, objectValue, object, changeValidation, inputs) => {
    toggleVisibilityObject(dependencyValue, objectValue, object, changeValidation, inputs);
}

export default { "hideCheckbox": hideCheckbox }