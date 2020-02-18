import React from "react";

import Form from '../components/form/form';
import Input from '../components/form/Input';

class FormBuilder {
    #elements;

    constructor(id) {
        this.elements = [];
    }

    addTextInput(name, validation = undefined, props) {
        this.elements.push(<Input index={this.elements.length} type="text" name={name} validation={validation} props={props}></Input>)
    }

    addPasswordInput(name, validation = undefined, props) {
        this.elements.push(<Input index={this.elements.length} type="password" name={name} validation={validation} props={props}></Input>)
    }

    getForm(submitButtonName, onSubmit) {
        return <Form submitButtonName={submitButtonName} elements={this.elements} onSubmit={onSubmit}></Form>;
    }
}

export default FormBuilder;