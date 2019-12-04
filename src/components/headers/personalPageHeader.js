import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import TopNavbar from '../navbars/topNavbar.js';
import Background from '../../assets/city.gif';
import screenResolution from '../../utils/screenResolution';

const Header = () => {
    const { height, width } = screenResolution();
    console.log(width);
    return (
        <Container height={height - 20 + "px"}>
            <TopNavbar />
            <TitleContainer height={(height / 2 - 80) + "px"}>
                <Title> Rick van Berlo</Title>
            </TitleContainer>
        </Container>
    );
}

//styles
const Container = styled.div`
    background: #1F1F1F url(${Background}) no-repeat center;
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
    text-shadow: 3px 2px 3px rgba(0, 0, 0, .8);
`

const TitleContainer = styled.div`
 margin-top: ${props => props.height}
`
export default Header;
