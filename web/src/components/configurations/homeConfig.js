import React, { memo, useEffect } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import BaseConfig from './baseConfig';
import SliderButton from '../buttons/dasboard/sliderButton';
import { changeClock, changeBackgroundImage, removeBackgroundImage } from '../../stores/preferences/preferencesActions';
import { addMessage } from '../../stores/snackbar/snackbarActions';
import colorChanger from '../../utils/colorChanger';
import IconButton from "../buttons/cv/iconButton";

import removeImageIcon from 'react-ionicons/lib/MdCloseCircle';

const MAX_FILE_SIZE = 1000000;

const HomeConfig = ({ changeClock, clock, colors, changeBackgroundImage, removeBackgroundImage, backgroundImage, addMessage }) => {
    const onChangeClock = (bool) => {
        changeClock(bool);
    }

    const imageSelector = (e) => {
        if (e.target.files[0].size > MAX_FILE_SIZE){
            addMessage("Your image size needs to be below 1MB")
        }else{
            changeBackgroundImage(e.target.files[0]);
        }
    }

    useEffect(() => {
        const removeImageButton = document.getElementById("removeImageIcon");
        removeImageButton.addEventListener("click", removeBackgroundImage, false);
        return () => {
            removeImageButton.removeEventListener("click", removeBackgroundImage, false);
        }
    },[removeBackgroundImage])

    const createContent = () => {
        return (
            <Container>
                <ItemContainer>
                    <Description color={colors.TEXT} position="left">Analog Clock</Description>
                    <SliderButton onChange={onChangeClock} checked={clock}/>
                    <Description color={colors.TEXT} position="right">Digital Clock</Description>
                </ItemContainer>
                <ItemContainer>
                    <Description color={colors.TEXT} position="left">Background Image</Description>
                    <InputContainer>
                        <HiddenFileSelect id="imageSelector" name="imageSelector" accept="image/*" onChange={imageSelector}/>
                        <SelectedImage colors={colors} htmlFor="imageSelector">{backgroundImage.name}</SelectedImage>
                    </InputContainer>
                    <ContainerImage>
                        <IconButton icon={removeImageIcon} id="removeImageIcon" fontSize={30} color="red" hoverColor="darkred"/>
                    </ContainerImage>
                </ItemContainer>
            </Container>
        )
    }

    return (
        <BaseConfig title="Home" content={createContent()} maxHeight="120px" />
    )
}

const Container = styled.div`
    height: fit-content;
    margin: auto;
    margin-top: 5px;
    margin-bottom: 5px;
    max-width: 600px;
    padding-left: 20px;
    padding-right: 20px;
    text-align: left;
`
const ContainerImage = styled.div`
    margin-top: 7px;
    margin-bottom: 3px;
`

const HiddenFileSelect = styled.input.attrs({ type: 'file' })`
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
`

const InputContainer = styled.div`
    flex: 1;

`

const SelectedImage = styled.label`
    display: inline-block;
    height: 30px;
    min-width: calc(100% - 10px);
    background-color: ${props => props.colors.SECONDARY};
    color: ${props => props.colors.TEXT};
    font-size: 18px;
    line-height: 30px;
    border: 1px solid ${props => colorChanger(props.colors.SECONDARY, -0.3)};
    border-radius: 5px;
    padding-left: 5px;
    padding-right: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    transition: background-color 0.3s linear, color 0.3s linear, border 0.3s linear;
    &:hover{
        cursor: pointer;
    }
`

const ItemContainer = styled.div`
    display: flex;
    height: 50px;
`

const Description = styled.p`
    font-size: 18px;
    line-height: 50px;
    flex: 1;
    margin: 0;
    text-align: ${props => props.position};
    color: ${props => props.color};
    transition: color 0.3s linear; 
`


const areEqual = (prevProps, nextProps) => {
    return true;
}

const mapStateToProps = state => {
    return { 
        clock: state.preferencesReducer.clock,
        colors: state.preferencesReducer.colors,
        backgroundImage: state.preferencesReducer.backgroundImage,
    };
};

const mapDispatchToProps = {
    changeClock,
    changeBackgroundImage, 
    removeBackgroundImage,
    addMessage
}

const MemoHomeConfig = memo(connect(mapStateToProps, mapDispatchToProps)(HomeConfig), areEqual)
export default MemoHomeConfig;