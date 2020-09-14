import React, { memo } from "react";
import styled from 'styled-components';


const BackgroundImage = ({ backgroundImage }) => {
    return (
        <BackgroundContainer backgroundImage={backgroundImage}></BackgroundContainer>
    )
}

const BackgroundContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    background: url(${props => props.backgroundImage}) no-repeat center center fixed;
    background-size: cover;
`

const areEqual = (prevProps, nextProps) => {
    return true;
}

const MemoBackgroundImage = memo(BackgroundImage, areEqual)
export default MemoBackgroundImage;