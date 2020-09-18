import React, { useEffect, useRef, useCallback, memo } from "react";
import { connect } from "react-redux";
import { createDir, addFiles, peekDir, deleteFiles, addSelectedFile, deleteSelectedFiles, deleteSelectedFile, downloadFile } from '../stores/storage/storageActions';
import styled, { keyframes, css } from 'styled-components';
import IconButton from '../components/buttons/dasboard/iconButton';
import GenerateUUID from "../utils/GenerateUUID";
import formBuilder from '../utils/formBuilder';
import Model from '../components/model/model';
import colorChanger from '../utils/colorChanger';
import { addModel, setModelActive, setModelInactive } from '../stores/models/modelActions';
import '../css/storagePage.css';

import DocumentIcon from 'react-ionicons/lib/MdDocument';
import FolderIcon from 'react-ionicons/lib/MdFolderOpen';
import DesktopIcon from 'react-ionicons/lib/MdDesktop';
import ImageIcon from 'react-ionicons/lib/MdImage';
import TrashIcon from 'react-ionicons/lib/MdTrash';
import CloseIcon from 'react-ionicons/lib/MdClose';
import arrowBackIcon from 'react-ionicons/lib/MdArrowBack';
import AlertIcon from 'react-ionicons/lib/MdAlert';

const LONG_PRESS_TIME = 500;

const Storage = ({ createDir, addModel, setModelActive, setModelInactive, addFiles, peekDir, downloadFile, deleteFiles, files, currentPath, selectedFiles, addSelectedFile, deleteSelectedFiles, deleteSelectedFile, colors }) => {
    const timer = useRef(undefined);
    const pressDown = useRef(false);
    const editState = useRef(false);
    const animation = useRef(true);
    const storedCurrentPath = useRef(currentPath);
    const addDocumentModelId = useRef(GenerateUUID());

    const addDocuments = (e) => {
        document.getElementById("filesUpload").click();
    }

    const filesUpload = (e) => {
        addFiles(e.target.files, currentPath);
    }

    const mouseUp = (e, file) => {
        if (timer.current !== undefined) {
            pressDown.current = false;
            clearTimeout(timer.current);
            timer.current = undefined;
            changeStateSelectedFiles(file);
        }
    }

    const changeStateSelectedFiles = (file) => {
        if (editState.current) {
            if (selectedFiles[file.fileName] !== undefined) {
                if (Object.keys(selectedFiles).length === 1) {
                    editState.current = false;
                }
                deleteSelectedFile(file);
            }
            else {
                addSelectedFile(file);
            }
        }
        else {
            if (file.fileType === null) {
                peekDir(file.path);
            } else {
                downloadFile(file.path)
            }
        }
    }

    const mouseDown = (e, file) => {
        timer.current = setTimeout((event) => { longPress(event, file) }, LONG_PRESS_TIME);
        pressDown.current = true;
    }

    const longPress = (e, file) => {
        if (pressDown.current) {
            editState.current = true;
            timer.current = undefined;
            changeStateSelectedFiles(file);
        }
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

    const openModal = useCallback(() => {
        setModelActive(addDocumentModelId.current);
    }, [setModelActive]);

    const undo = useCallback(() => {
        peekDir(currentPath.substr(0, currentPath.lastIndexOf("/")));
    }, [currentPath, peekDir]);

    const deleteItems = useCallback(() => {
        deleteFiles(selectedFiles);
        editState.current = false;
    }, [selectedFiles, deleteFiles]);

    useEffect(() => {
        animation.current = Object.keys(selectedFiles).length > 0 ? false : true;
    }, [selectedFiles])

    useEffect(() => {
        const dropFile = (e) => {
            e.preventDefault();
            addFiles(e.dataTransfer.files, storedCurrentPath.current);
            document.getElementById("dropzone").classList.remove("dragging");
        }

        const ActionDeleteSelectedFileButton = (e) => {
            editState.current = false;
            deleteSelectedFiles();
        }

        const dropzone = document.getElementById("dropzone");
        const documentsButton = document.getElementById("addDocuments");
        const folderButton = document.getElementById("addFolder");
        const undoButton = document.getElementById("undo");
        const deleteItemsButton = document.getElementById("deleteItems");
        const deleteSelectedFilesButton = document.getElementById("deleteSelectedFiles");
        documentsButton.addEventListener("click", addDocuments, false);
        folderButton.addEventListener("click", openModal, false);
        undoButton.addEventListener("click", undo, false);
        deleteSelectedFilesButton.addEventListener("click", ActionDeleteSelectedFileButton, false);
        deleteItemsButton.addEventListener("click", deleteItems, false);
        dropzone.addEventListener("dragenter", enterDropzone, false);
        dropzone.addEventListener("dragleave", exitDropzone, false);
        dropzone.addEventListener("drop", dropFile, false);
        window.addEventListener("dragover", preventDefault, false);
        window.addEventListener("drop", preventDefault, false);
        return () => {
            documentsButton.removeEventListener("click", addDocuments, false);
            folderButton.removeEventListener("click", openModal, false);
            undoButton.removeEventListener("click", undo, false);
            deleteSelectedFilesButton.removeEventListener("click", ActionDeleteSelectedFileButton, false);
            deleteItemsButton.removeEventListener("click", deleteItems, false);
            dropzone.removeEventListener("dragenter", enterDropzone, false);
            dropzone.removeEventListener("dragleave", exitDropzone, false);
            dropzone.removeEventListener("drop", dropFile, false);
            window.removeEventListener("dragover", preventDefault, false);
            window.removeEventListener("drop", preventDefault, false);
        }
    }, [addFiles, peekDir, openModal, undo, deleteSelectedFiles, selectedFiles, deleteItems])

    useEffect(() => {
        storedCurrentPath.current = currentPath;
    }, [currentPath])

    useEffect(() => {
        const onSubmit = (event, value) => {
            event.preventDefault();
            setModelInactive(addDocumentModelId.current);
            if (storedCurrentPath.current === "/") createDir(storedCurrentPath.current + value.NAME);
            else createDir(storedCurrentPath.current + "/" + value.NAME);
        }
        addModel(
            addDocumentModelId.current,
            <Model
                key={addDocumentModelId.current}
                id={addDocumentModelId.current}
                title="Toevoegen Map"
                content={buildForm(onSubmit)}
            />
        )
    }, [addModel, createDir, setModelInactive])

    useEffect(() => {
        peekDir("/");
    }, [peekDir])

    if (editState.current === true) animation.current = false;
    return (
        <Container colors={colors}>
            <TopBar colors={colors}>
                <ButtonContainer>
                    <FloatLeftContainer>
                        <VisibilityContainer hide={(currentPath.split('/')[1] === "") ? true : (editState.current ? true : false)}><IconButton id="undo" icon={arrowBackIcon} fontSize={40} color={colors.DARK_GREEN} /></VisibilityContainer>
                        <VisibilityContainer hide={!editState.current}><IconButton id="deleteSelectedFiles" icon={CloseIcon} fontSize={40} color={colors.DARK_GREEN} /></VisibilityContainer>
                    </FloatLeftContainer>
                </ButtonContainer>
                <TitleContainer>
                    <Title colors={colors} key={GenerateUUID()} length={currentPath.length}>{currentPath}</Title>
                </TitleContainer>
                <ButtonContainer>
                    <FloatRightContainer>
                        <VisibilityContainer hide={!editState.current}><IconButton id="deleteItems" icon={TrashIcon} fontSize={40} color={colors.DARK_GREEN} /></VisibilityContainer>
                        <VisibilityContainer hide={editState.current}><IconButton id="addDocuments" icon={DocumentIcon} fontSize={40} color={colors.DARK_GREEN} /></VisibilityContainer>
                        <VisibilityContainer hide={editState.current}><IconButton id="addFolder" icon={FolderIcon} fontSize={40} color={colors.DARK_GREEN} /></VisibilityContainer>
                    </FloatRightContainer>
                </ButtonContainer>
            </TopBar>
            <ItemsContainer id="dropzone">
                <FilesUpload id="filesUpload" onChange={filesUpload} type="file" multiple />
                {createItems(files, currentPath, selectedFiles, mouseUp, mouseDown, animation.current, colors)}
            </ItemsContainer>
        </Container >
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

const createItems = (items, currentPath, selectedFiles, mouseUp, mouseDown, animation, colors) => {
    const itemComponents = [];
    items[currentPath].forEach((item, index) => {
        itemComponents.push(
            <ItemContainer key={GenerateUUID()} delay={index} animation={animation} color={selectedFiles[item.fileName] !== undefined ? colorChanger(colors.PRIMARY, -0.1) : colors.PRIMARY} onMouseDown={(e) => { mouseDown(e, item) }} onMouseUp={(e) => { mouseUp(e, item) }}>
                <CenterImageContainer>
                    {getCorrectIcon(item.fileName, colors)}
                </CenterImageContainer>
                <ItemText color={colors.MAIN}>{item.fileName}</ItemText>
                <ItemText color={colors.MAIN}>{getCorrectSize(item.size)}</ItemText>
                <ItemText color={colors.MAIN}>{new Date(item.lastModifiedDate).toLocaleDateString("fr-CA")}</ItemText>
            </ItemContainer>
        );
    })

    return itemComponents;
}

const getCorrectIcon = (fileName, colors) => {
    if (fileName.split('.')[1] === undefined) return <FolderIcon fontSize={"40px"} color={colors.MAIN} />;
    switch (fileName.split('.')[1].toLowerCase()) {
        case "png":
        case "jpg":
        case "webp":
        case "svg": return <ImageIcon fontSize={"40px"} color={colors.MAIN} />;
        case "exe": return <DesktopIcon fontSize={"40px"} color={colors.MAIN} />;
        case "docx":
        case "txt": return <DocumentIcon fontSize={"40px"} color={colors.MAIN} />;
        default: return <AlertIcon fontSize={"40px"} color={colors.MAIN} />;
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
    return { 
        files: state.storageReducer.storage, 
        currentPath: state.storageReducer.currentPath, 
        selectedFiles: state.storageReducer.selectedFiles, 
        colors: state.preferencesReducer.colors , 
    };
};

const mapDispatchToProps = {
    createDir,
    addFiles,
    peekDir,
    downloadFile,
    deleteFiles,
    addSelectedFile,
    deleteSelectedFiles,
    deleteSelectedFile,
    addModel,
    setModelActive,
    setModelInactive
}

const Container = styled.div`
    width: 100vw;
    min-height: 100vh;
    text-align: center;
    background-color: ${props => props.colors.PRIMARY}
`

const ContentContainer = styled.div`
    width: 400px;
`

const FilesUpload = styled.input`
    display: none;
`

const fadein = keyframes`
  from { 
    opacity: 0
  }
  to {
    opacity: 1
  }
`

const blinkCaret = (color) => keyframes`
    from{
        border-color: transparent; 
    } 
    50% {
        border-right: .05em solid ${color};
    }
    to { 
      border-color: transparent; 
    }
`

const typing = keyframes`
    from { width: 0 }
    to { width: 100 % }
`

const FloatLeftContainer = styled.div`
    display: flex;
`

const FloatRightContainer = styled.div`
    display: flex;
    float: right;
`

const ButtonContainer = styled.div`
    margin: auto;
    margin-right: 10px; 
    margin-left: 10px;
    width: 200px;
`

const ItemsContainer = styled.div`
    position: fixed;
    top: 50px;
    width: 100%;
    overflow: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    height: calc(100% -  50px);
    transition: background-color 0.3s linear, box-shadow 0.3s linear;
    &::-webkit-scrollbar {
        display: none;
    }
`

const VisibilityContainer = styled.div`
    display: ${props => props.hide ? "none" : "block"}
`

const CenterImageContainer = styled.div`
    margin: 10px;
`

const Title = styled.p`
    font-size: 25px;
    width: 100%;
    margin: auto;
    margin-top: 10px;
    overflow: hidden;
    color: ${props => props.colors.MAIN};
    animation ${props => css`${typing} ${props.length * 0.1}s steps(${props.length}, end), ${props => blinkCaret(props.colors.MAIN)} 0.5s step-end ${props.length / 3.6} `};
`

const TitleContainer = styled.div`
`

const TopBar = styled.div`
    position: fixed;
    top: 0;
    justify-content: space-between;
    z-index: 1;
    display: flex;
    width: 100vw;
    height: 50px;
    box-shadow: 0px 2px 5px 0px black;
    background-color: ${props => props.colors.SECONDARY};
`

const ItemContainer = styled.div`
    width: 100%;
    height: 60px;
    border-bottom: 1px solid black;
    display: flex;
    cursor: pointer;
    opacity: ${props => props.animation ? 0 : 1};
    background-color: ${props => props.color};
    transition: background-color 0.3s linear;
    animation: ${props => props.animation ? css`${fadein} 0.2s linear ${props.delay * 0.1}s forwards` : css`none`};
    &:hover{
        background-color: ${props => colorChanger(props.color, -0.1)};
    }
`

const ItemText = styled.p`
    font-size: 20px;
    line-height: 60px;
    margin: 0;
    color: ${props => props.color};
    white-space: nowrap;
    overflow: hidden;
    flex: 1;
    user-select: none;
    text-overflow: ellipsis;
`
const areEqual = (prevProps, nextProps) => {
    return true;
}

const MemoStorage = memo(connect(mapStateToProps, mapDispatchToProps)(Storage), areEqual)
export default MemoStorage;