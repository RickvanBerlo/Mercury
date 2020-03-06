import React from "react";

import Form from '../components/form/form';
import Input from '../components/form/Input';
import Checkbox from '../components/form/checkbox';
import TimePicker from '../components/form/timePicker';

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

    addTextInput(name, label = undefined, validation = undefined, props = {}) {
        const val = validation === undefined && props.required ? this.canNotBeEmptyValidation : validation;
        this.elements.push(<Input index={this.elements.length} label={label} type="text" name={name} validation={val} props={props}></Input>)
    }

    addPasswordInput(name, label = undefined, validation = undefined, props = {}) {
        const val = validation === undefined && props.required ? this.canNotBeEmptyValidation : validation;
        this.elements.push(<Input index={this.elements.length} label={label} type="password" name={name} validation={val} props={props}></Input>)
    }

    addDateInput(name, label = undefined, validation = undefined, props = {}) {
        const val = validation === undefined && props.required ? this.canNotBeEmptyValidation : validation;
        this.elements.push(<Input index={this.elements.length} label={label} type="date" name={name} validation={val} props={props}></Input>)
    }

    addTimeInput(name, label = undefined, validation = undefined, props = {}) {
        const val = validation === undefined && props.required ? this.canNotBeEmptyValidation : validation;
        this.elements.push(<TimePicker index={this.elements.length} label={label} name={name} validation={val} props={props}></TimePicker>)
    }

    addCheckboxInput(name, label, props = {}) {
        this.elements.push(<Checkbox index={this.elements.length} type="checkbox" name={name} label={label} props={props}></Checkbox>)
    }


    getForm(submitButtonName, onSubmit) {
        return <Form submitButtonName={submitButtonName} elements={this.elements} onSubmit={onSubmit}></Form>;
    }
}

export default FormBuilder;