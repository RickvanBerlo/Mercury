import React from "react";

import Form from '../components/form/form';
import Input from '../components/form/Input';
import Checkbox from '../components/form/checkbox';

class FormBuilder {
    #elements;

    constructor(id) {
        this.elements = [];
    }

    canNotBeEmptyValidation(value) {
        if (value === undefined) return false;
        if (value.length === 0) return false;
        return true;
    }

    addTextInput(name, validation = undefined, props = {}) {
        const val = validation === undefined && props.required ? this.canNotBeEmptyValidation : validation;
        this.elements.push(<Input index={this.elements.length} type="text" name={name} validation={val} props={props}></Input>)
    }

    addPasswordInput(name, validation = undefined, props = {}) {
        const val = validation === undefined && props.required ? this.canNotBeEmptyValidation : validation;
        this.elements.push(<Input index={this.elements.length} type="password" name={name} validation={val} props={props}></Input>)
    }

    addDateInput(name, validation = undefined, props = {}) {
        const val = validation === undefined && props.required ? this.canNotBeEmptyValidation : validation;
        this.elements.push(<Input index={this.elements.length} type="date" name={name} validation={val} props={props}></Input>)
    }

    addCheckboxInput(name, label, props = {}) {
        this.elements.push(<Checkbox index={this.elements.length} type="checkbox" name={name} label={label} props={props}></Checkbox>)
    }


    getForm(submitButtonName, onSubmit) {
        return <Form submitButtonName={submitButtonName} elements={this.elements} onSubmit={onSubmit}></Form>;
    }
}

export default FormBuilder;