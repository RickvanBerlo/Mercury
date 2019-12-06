import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import TopNavbar from '../navbars/topNavbar.js';
import Background from '../../assets/city.gif';
import screenResolution from '../../utils/screenResolution';
import IconButton from '../buttons/iconButton';
import colors from '../../constants/colors';
import strings from '../../constants/strings';

const Header = () => {
    const { height, width } = screenResolution();
    console.log(width);
    return (
        <Container height={height + "px"}>
            <TopNavbar />
            <TitleContainer height={(height / 2 - 80) + "px"}>
                <Title>{strings.NAME}</Title>
                <IconButton icon={['fab', 'facebook-f']} size="2x" color="white" onClick={() => window.open("https://www.facebook.com/Rick.van.Berlo", "_blank")} />
                <IconButton icon={['fab', 'linkedin-in']} size="2x" color="white" onClick={() => window.open("https://www.linkedin.com/in/rick-v-8a619799/", "_blank")} />
                <IconButton icon={['fab', 'github']} size="2x" color="white" onClick={() => window.open("https://github.com/RickvanBerlo", "_blank")} />
                <IconButton icon={['fab', 'instagram']} size="2x" color="white" onClick={() => window.open("https://www.instagram.com/rickvanberlo/?hl=nl", "_blank")} />
            </TitleContainer>
        </Container>
    );
}

//styles
const Container = styled.div`
    background: ${colors.DARK_GRAY} url(${Background}) no-repeat center;
    width: 100%;
    height: ${props => props.height};
    background-attachment: fixed;
    position: relative;
    background-size: cover !important;
    text-align: center;
    overflow: hidden;
`
const Title = styled.h1`
    color: white;
    font-size: 78.5px;
    text-shadow: 3px 2px 3px ${colors.TRANSPARENT_80};
`

const TitleContainer = styled.div`
 margin-top: ${props => props.height}
`
export default Header;
