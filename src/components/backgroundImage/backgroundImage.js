import React, { memo } from "react";
import styled from 'styled-components';


const BackgroundImage = ({ backgroundImage, mobileBackgroundImage }) => {
    return (
        <BackgroundContainer backgroundImage={backgroundImage} mobileBackgroundImage={mobileBackgroundImage}></BackgroundContainer>
    )
}

const BackgroundContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0px;
    left: 0;
    box-sizing: border-box;
    background: url(${props => props.backgroundImage}) bottom;
    background-size: 100vw;
    background-repeat: no-repeat;
    transition: background-image 0.1s ease-in-out;
    @media (max-width: 767px) {
        background: url(${props => props.mobileBackgroundImage}) center;
        background-size: cover;
        @media (max-height: 467px) {
            background: url(${props => props.backgroundImage}) bottom;
            background-size: 100vw;
            background-repeat: no-repeat;
        }
    }
`

const areEqual = (prevProps, nextProps) => {
    return true;
}

const MemoBackgroundImage = memo(BackgroundImage, areEqual)
export default MemoBackgroundImage;