import React from "react";
import styled from 'styled-components';
import colors from '../constants/colors';

import Form from '../components/form/form';
import TextInput from '../components/form/textInput';
import PasswordInput from '../components/form/passwordInput';

class FormBuilder {
    #elements;

    constructor(id) {
        this.elements = [];
    }

    addTextInput(validation = undefined, props) {
        this.elements.push(<TextInput index={this.elements.length} validation={validation} props={props}></TextInput>)
    }

    addPasswordInput(validation = undefined, props) {
        this.elements.push(<PasswordInput index={this.elements.length} validation={validation} props={props}></PasswordInput>)
    }

    getForm(submitButtonName) {
        return <Form submitButtonName={submitButtonName} elements={this.elements}></Form>;
    }
}

export default FormBuilder;