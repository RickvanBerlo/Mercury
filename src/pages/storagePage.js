import React, { useEffect, useState, useRef } from "react";
import styled from 'styled-components';
import colors from '../constants/colors';
import IconButton from '../components/buttons/dasboard/iconButton';
import GenerateUUID from "../utils/GenerateUUID";
import '../css/storagePage.css';

import DocumentIcon from 'react-ionicons/lib/MdDocument';
import FolderIcon from 'react-ionicons/lib/MdFolderOpen';
import ImageIcon from 'react-ionicons/lib/MdImage';
import TrashIcon from 'react-ionicons/lib/MdTrash';
import CloseIcon from 'react-ionicons/lib/MdClose';

const Storage = ({ storage }) => {
    const [update, setUpdate] = useState(true);
    const timer = useRef(undefined);
    const pressDown = useRef(false);
    const [path, setPath] = useState('/');
    const selectedItems = useRef([]);

    const addDocument = (e) => {
        document.getElementById("fileUpload").click();
    }

    const addFolder = (e) => {

    }

    const fileUpload = (e) => {
        storage.shared.addFile(e.target.files[0]);
        setUpdate(!update);
    }

    const mouseUp = (e, name) => {
        if (timer.current !== undefined) {
            console.log("short");
            pressDown.current = false;
            clearTimeout(timer.current);
            timer.current = undefined;
            if (path === "Remove") {
                selectedItems.current[name] = name;
                setUpdate(!update);
            }
            //else download file or open map.
        }

    }

    const mouseDown = (e, name) => {
        timer.current = setTimeout((event) => { longPress(event, name) }, 500);
        pressDown.current = true;
    }

    const longPress = (e, name) => {
        if (pressDown.current) {
            console.log("long");
            timer.current = undefined;
            setPath("Remove");
            selectedItems.current[name] = name;
            setUpdate(!update);
        }
    }

    const undo = (e) => {
        selectedItems.current = [];
        setPath("/");
    }

    const enterDropzone = (e) => {
        e.preventDefault();
        document.getElementById("dropzone").classList.add("dragging");
    }

    const exitDropzone = (e) => {
        e.preventDefault();
        document.getElementById("dropzone").classList.remove("dragging");
    }

    const preventDefault = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        const dropFile = (e) => {
            e.preventDefault();
            for (let i = 0; i < e.dataTransfer.files.length; i++) {
                storage.shared.addFile(e.dataTransfer.files[i]);
            }
            document.getElementById("dropzone").classList.remove("dragging");
            setUpdate(!update);
        }

        const removeItems = (e) => {
            for (const name in selectedItems.current) {
                storage.shared.removeFile(name);
            }
            selectedItems.current = [];
            setPath('/');
        }
        const dropzone = document.getElementById("dropzone");
        const documentButton = document.getElementById("addDocument");
        const folderButton = document.getElementById("addFolder");
        const undoButton = document.getElementById("undo");
        const removeButton = document.getElementById("remove");
        documentButton.addEventListener("click", addDocument, false);
        folderButton.addEventListener("click", addFolder, false);
        undoButton.addEventListener("click", undo, false);
        removeButton.addEventListener("click", removeItems, false);
        dropzone.addEventListener("dragenter", enterDropzone, false);
        dropzone.addEventListener("dragleave", exitDropzone, false);
        dropzone.addEventListener("drop", dropFile, false);
        window.addEventListener("dragover", preventDefault, false);
        window.addEventListener("drop", preventDefault, false);
        return () => {
            documentButton.removeEventListener("click", addDocument, false);
            folderButton.removeEventListener("click", addFolder, false);
            undoButton.removeEventListener("click", undo, false);
            removeButton.removeEventListener("click", removeItems, false);
            dropzone.removeEventListener("dragenter", enterDropzone, false);
            dropzone.removeEventListener("dragleave", exitDropzone, false);
            dropzone.removeEventListener("drop", dropFile, false);
            window.removeEventListener("dragover", preventDefault, false);
            window.removeEventListener("drop", preventDefault, false);
        }
    }, [storage, update])

    return (
        <Container>
            <TopBar>
                <Title>{path}</Title>
                <PositionLeftButtonContainer hide={path !== "Remove" ? true : false}>
                    <IconButton id="undo" icon={CloseIcon} fontSize="40px" color={colors.DARK_GREEN} />
                </PositionLeftButtonContainer>
                <PositionRightButtonContainer>
                    <VisibilityContainer hide={path !== "Remove" ? true : false}><IconButton id="remove" icon={TrashIcon} fontSize="40px" color={colors.DARK_GREEN} /></VisibilityContainer>
                    <VisibilityContainer hide={path !== "Remove" ? false : true}><IconButton id="addDocument" icon={DocumentIcon} fontSize="40px" color={colors.DARK_GREEN} /></VisibilityContainer>
                    <VisibilityContainer hide={path !== "Remove" ? false : true}><IconButton id="addFolder" icon={FolderIcon} fontSize="40px" color={colors.DARK_GREEN} /></VisibilityContainer>

                </PositionRightButtonContainer>
            </TopBar>
            <ItemsContainer id="dropzone">
                <FileUpload id="fileUpload" onChange={fileUpload} type="file" />
                {createItems(storage.shared.getFiles(), selectedItems, mouseUp, mouseDown)}
            </ItemsContainer>
        </Container>
    )
}

const createItems = (items, selectedItems, mouseUp, mouseDown) => {
    const itemComponents = [];
    for (const item in items) {
        itemComponents.push(
            <ItemContainer key={GenerateUUID()} color={selectedItems.current[item] !== undefined ? colors.LIGHT_GRAY : colors.WHITE} onMouseDown={(e) => { mouseDown(e, items[item].name) }} onMouseUp={(e) => { mouseUp(e, items[item].name) }}>
                <CenterImageContainer>
                    {getCorrectIcon(items[item].type)}
                </CenterImageContainer>
                <ItemText>{items[item].name.replace(/\.[^/.]+$/, "")}</ItemText>
                <ItemText>{getCorrectSize(items[item].size)}</ItemText>
                <ItemText>{new Date(items[item].lastModifiedDate).toLocaleDateString("fr-CA")}</ItemText>
            </ItemContainer>
        );
    }

    return itemComponents;
}

const getCorrectIcon = (type) => {
    if (type === undefined) return <FolderIcon fontSize={"40px"} color={colors.DARK_GREEN} />;
    switch (type.split('/')[0]) {
        case "image": return <ImageIcon fontSize={"40px"} color={colors.DARK_GREEN} />;
        default: return <DocumentIcon fontSize={"40px"} color={colors.DARK_GREEN} />;
    }
}

const getCorrectSize = (bytes) => {
    if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
    else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
    else if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(2) + " KB"; }
    else if (bytes > 1) { bytes = bytes + " bytes"; }
    else if (bytes === 1) { bytes = bytes + " byte"; }
    else { bytes = "0 bytes"; }
    return bytes;
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    text-align: center;
`

const FileUpload = styled.input`
    display: none;
`

const ItemsContainer = styled.div`
    width: 100%;
    height: calc(100% -  50px);
    border: 0px solid ${colors.DARK_GREEN};
    transition: all 0.3s linear;
    &:dragging{
        background-color: ${colors.BLACK};
    }
`

const PositionRightButtonContainer = styled.div`
    position: absolute;
    top: 5px;
    right: 20px;
    display: flex;
`

const VisibilityContainer = styled.div`
    display: ${props => props.hide ? "none" : "visible"}
`

const PositionLeftButtonContainer = styled.div`
    position: absolute;
    display: ${props => props.hide ? "none" : "visible"}
    top: 5px;
    left: 10px;
`

const CenterImageContainer = styled.div`
    margin: 10px;
`

const Title = styled.p`
    font-size: 25px;
    width: 100%;
    line-height: 50px;
    text-align:center;
    margin: 0;
    color: ${colors.DARK_GREEN};
`

const TopBar = styled.div`
    position: relative;
    z-index: 2;
    width: 100vw;
    height: 50px;
    box-shadow: 0px 2px 5px 0px ${colors.BLACK};
`

const ItemContainer = styled.div`
    width: 100%;
    height: 60px;
    border-bottom: 1px solid ${colors.BLACK};
    display: flex;
    cursor: pointer;
    background-color: ${props => props.color};
    transition: background-color 0.3s linear;
    &:hover{
        background-color: ${colors.LIGHT_GRAY};
    }
`

const ItemText = styled.p`
    font-size: 20px;
    line-height: 60px;
    margin: 0;
    color: ${colors.DARK_GREEN};
    white-space: nowrap;
    overflow: hidden;
    flex: 1;
    user-select: none;
    text-overflow: ellipsis;
`

export default Storage;