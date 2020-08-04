import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { createDir, addFile, addFiles, peekDir, removeDir, removeFile, removeFiles } from '../stores/storage/storageActions';
import styled from 'styled-components';
import colors from '../constants/colors';
import IconButton from '../components/buttons/dasboard/iconButton';
import GenerateUUID from "../utils/GenerateUUID";
import formBuilder from '../utils/formBuilder';
import Model from '../components/model/model';
import '../css/storagePage.css';

import DocumentIcon from 'react-ionicons/lib/MdDocument';
import FolderIcon from 'react-ionicons/lib/MdFolderOpen';
import DesktopIcon from 'react-ionicons/lib/MdDesktop';
import ImageIcon from 'react-ionicons/lib/MdImage';
import TrashIcon from 'react-ionicons/lib/MdTrash';
import CloseIcon from 'react-ionicons/lib/MdClose';
import AlertIcon from 'react-ionicons/lib/MdAlert';

const Storage = ({ createDir, addFile, addFiles, peekDir, removeDir, removeFile, removeFiles, files, currentPath }) => {
    const timer = useRef(undefined);
    const pressDown = useRef(false);
    const editState = useRef(false);
    const [toggle, setToggle] = useState(null);
    const selectedItems = useRef([]);


    const addDocument = (e) => {
        document.getElementById("fileUpload").click();
    }

    const openModal = () => {
        setToggle(!toggle);
    }

    const onSubmit = (event, value) => {
        event.preventDefault();
        setToggle(!toggle);
        createDir(value.NAME);
    }

    const fileUpload = (e) => {
        addFile(e.target.files[0]);
    }

    const mouseUp = (e, name) => {
        if (timer.current !== undefined) {
            console.log("short");
            pressDown.current = false;
            clearTimeout(timer.current);
            timer.current = undefined;
            if (editState.current) {
                selectedItems.current[name] = name;
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
            editState.current = true;
            selectedItems.current[name] = name;
        }
    }

    const undo = (e) => {
        selectedItems.current = [];
        peekDir(currentPath.split(/[/]+/).pop());
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
        peekDir("/");

        const dropFile = (e) => {
            e.preventDefault();
            addFiles(e.dataTransfer.files);
            document.getElementById("dropzone").classList.remove("dragging");
        }

        const removeItems = (e) => {
            removeFiles(selectedItems.current);
            selectedItems.current = [];
        }
        const dropzone = document.getElementById("dropzone");
        const documentButton = document.getElementById("addDocument");
        const folderButton = document.getElementById("addFolder");
        const undoButton = document.getElementById("undo");
        const removeButton = document.getElementById("remove");
        documentButton.addEventListener("click", addDocument, false);
        folderButton.addEventListener("click", openModal, false);
        undoButton.addEventListener("click", undo, false);
        removeButton.addEventListener("click", removeItems, false);
        dropzone.addEventListener("dragenter", enterDropzone, false);
        dropzone.addEventListener("dragleave", exitDropzone, false);
        dropzone.addEventListener("drop", dropFile, false);
        window.addEventListener("dragover", preventDefault, false);
        window.addEventListener("drop", preventDefault, false);
        return () => {
            documentButton.removeEventListener("click", addDocument, false);
            folderButton.removeEventListener("click", openModal, false);
            undoButton.removeEventListener("click", undo, false);
            removeButton.removeEventListener("click", removeItems, false);
            dropzone.removeEventListener("dragenter", enterDropzone, false);
            dropzone.removeEventListener("dragleave", exitDropzone, false);
            dropzone.removeEventListener("drop", dropFile, false);
            window.removeEventListener("dragover", preventDefault, false);
            window.removeEventListener("drop", preventDefault, false);
        }
    }, [addFiles, removeFiles, peekDir])

    return (
        <Container>
            <TopBar>
                <Title>{currentPath}</Title>
                <PositionLeftButtonContainer hide={currentPath.split('/')[0] === "" ? true : false}>
                    <IconButton id="undo" icon={CloseIcon} fontSize="40px" color={colors.DARK_GREEN} />
                </PositionLeftButtonContainer>
                <PositionRightButtonContainer>
                    <VisibilityContainer hide={!editState.current}><IconButton id="remove" icon={TrashIcon} fontSize="40px" color={colors.DARK_GREEN} /></VisibilityContainer>
                    <VisibilityContainer hide={editState.current}><IconButton id="addDocument" icon={DocumentIcon} fontSize="40px" color={colors.DARK_GREEN} /></VisibilityContainer>
                    <VisibilityContainer hide={editState.current}><IconButton id="addFolder" icon={FolderIcon} fontSize="40px" color={colors.DARK_GREEN} /></VisibilityContainer>

                </PositionRightButtonContainer>
            </TopBar>
            <ItemsContainer id="dropzone">
                <FileUpload id="fileUpload" onChange={fileUpload} type="file" />
                {createItems(files, currentPath, selectedItems, mouseUp, mouseDown)}
            </ItemsContainer>
            <Model toggle={toggle} setToggle={setToggle} title="Toevoegen Map" content={buildForm(onSubmit)} />
        </Container>
    )
}

const buildForm = (onSubmit) => {
    const builder = new formBuilder();
    builder.addTextInput("NAME", { required: true, placeholder: "Name", label: "Naam" });
    return (
        <ContentContainer>
            {builder.getForm("directoryForm", "Aanmaken", onSubmit, { reset: true })}
        </ContentContainer>
    )
}

const createItems = (items, currentPath, selectedItems, mouseUp, mouseDown) => {
    const itemComponents = [];
    items[currentPath].forEach((item) => {
        itemComponents.push(
            <ItemContainer key={GenerateUUID()} color={selectedItems.current[item] !== undefined ? colors.LIGHT_GRAY : colors.WHITE} onMouseDown={(e) => { mouseDown(e, items[item].name) }} onMouseUp={(e) => { mouseUp(e, items[item].name) }}>
                <CenterImageContainer>
                    {getCorrectIcon(item.fileName)}
                </CenterImageContainer>
                <ItemText>{item.fileName}</ItemText>
                <ItemText>{getCorrectSize(item.size)}</ItemText>
                <ItemText>{new Date(item.lastModifiedDate).toLocaleDateString("fr-CA")}</ItemText>
            </ItemContainer>
        );
    })

    return itemComponents;
}

const getCorrectIcon = (fileName) => {
    if (fileName.split('.')[1] === undefined) return <FolderIcon fontSize={"40px"} color={colors.DARK_GREEN} />;
    switch (fileName.split('.')[1].toLowerCase()) {
        case "png": return <ImageIcon fontSize={"40px"} color={colors.DARK_GREEN} />;
        case "jpg": return <ImageIcon fontSize={"40px"} color={colors.DARK_GREEN} />;
        case "svg": return <ImageIcon fontSize={"40px"} color={colors.DARK_GREEN} />;
        case "exe": return <DesktopIcon fontSize={"40px"} color={colors.DARK_GREEN} />;
        case "docx": return <DocumentIcon fontSize={"40px"} color={colors.DARK_GREEN} />;
        case "txt": return <DocumentIcon fontSize={"40px"} color={colors.DARK_GREEN} />;
        default: return <AlertIcon fontSize={"40px"} color={colors.DARK_GREEN} />;
    }
}

const getCorrectSize = (bytes) => {
    if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
    else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
    else if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(2) + " KB"; }
    else if (bytes > 1) { bytes = bytes + " bytes"; }
    else if (bytes === 1) { bytes = bytes + " byte"; }
    else { bytes = "-"; }
    return bytes;
}

const mapStateToProps = state => {
    return { files: state.storageReducer.storage, currentPath: state.storageReducer.currentPath };
};

const mapDispatchToProps = {
    createDir,
    addFile,
    addFiles,
    peekDir,
    removeDir,
    removeFile,
    removeFiles
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    text-align: center;
`

const ContentContainer = styled.div`
    width: 400px;
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

export default connect(mapStateToProps, mapDispatchToProps)(Storage);