import React from "react";

import Form from '../components/form/form';
import Input from '../components/form/Input';
import TextArea from '../components/form/textArea';
import Checkbox from '../components/form/checkbox';
import TimePicker from '../components/form/timePicker';

class FormBuilder {
    #elements;

    constructor(id) {
        this.elements = [];
    }

    addTextInput(name, props = {}) {
        props.validation = this._getValidation(props);
        this.elements.push(<Input index={this.elements.length} type="text" name={name} props={props}></Input>)
    }

    addTextAreaInput(name, props = {}) {
        props.validation = this._getValidation(props);
        this.elements.push(<TextArea index={this.elements.length} name={name} props={props}></TextArea>)
    }

    addPasswordInput(name, props = {}) {
        props.validation = this._getValidation(props);
        this.elements.push(<Input index={this.elements.length} type="password" name={name} props={props}></Input>)
    }

    addDateInput(name, props = {}) {
        props.validation = this._getValidation(props);
        this.elements.push(<Input index={this.elements.length} type="date" name={name} props={props}></Input>)
    }

    addTimeInput(name, props = {}) {
        props.validation = this._getValidation(props);
        this.elements.push(<TimePicker index={this.elements.length} name={name} props={props}></TimePicker>)
    }

    addCheckboxInput(name, props = {}) {
        this.elements.push(<Checkbox index={this.elements.length} type="checkbox" name={name} props={props}></Checkbox>)
    }


    getForm(name, submitButtonName, onSubmit, props = {}) {
        return <Form name={name} submitButtonName={submitButtonName} elements={this.elements} onSubmit={onSubmit} props={props}></Form>;
    }

    _getValidation(props) {
        return props.validation === undefined && props.required ? this._canNotBeEmptyValidation : props.validation === undefined ? () => { return true } : props.validation;
    }

    _canNotBeEmptyValidation(value) {
        if (value === undefined) return false;
        if (value.length === 0) return false;
        return true;
    }
}

export default FormBuilder;