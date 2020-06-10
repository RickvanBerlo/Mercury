import React, { memo, useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import colors from '../../constants/colors';
import generateUUID from '../../utils/GenerateUUID';
import ReactQuill from 'react-quill';
import '../../css/quill.css';

const TextEditorWrapper = ({ type, name, getValues, refresh, classname, props }) => {
    const [value, setValue] = useState(props.value === undefined ? "" : props.value);
    const UUID = useRef(generateUUID());

    const onChange = (value) => {
        setValue(value);
    }

    useEffect(() => {
        if (refresh)
            setValue("");
    }, [refresh]);

    useEffect(() => {
        getValues(name, value, props.validation(value))
    }, [value, getValues, name, props]);

    useEffect(() => {
        const callback = (value) => {
            switch (value) {
                default: console.error("no case was found for " + value + " in the Callback function in TextArea!");
            }
        }
        document.getElementById(UUID.current).callback = callback;
    }, [props])

    return (
        <Container id={UUID.current} className={classname}>
            {props.label !== undefined ? <Label>{props.label}</Label> : null}
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
            />
        </Container >
    )
}

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

const Container = styled.div`
    margin-bottom: 20px;
`

const Label = styled.div`
    color: ${colors.DARK_GREEN};
    margin-left: 10px;
    margin-bottom:2px;
`

const areEqual = (prevProps, nextProps) => {
    if (nextProps.refresh) return false;
    return true;
}

const MemoEditorAreaWrapper = memo(TextEditorWrapper, areEqual)
export default MemoEditorAreaWrapper;