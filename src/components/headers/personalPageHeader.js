import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TopNavbar from '../navbars/topNavbar.js';
//import background from '../../assets/city.gif';
import IconButton from '../buttons/iconButton';
import colors from '../../constants/colors';
import strings from '../../constants/strings';
import background from '../../assets/background.png'
import screenResolution from '../../utils/screenResolution';

const Header = () => {
    const [offesetY, setOffesetY] = useState(0);
    let width = screenResolution().width;

    const listenScrollEvent = () => {
        setOffesetY("-" + window.scrollY / 3 + "px");
    }

    useEffect(() => {
        //if (width > 767)
        //window.addEventListener('scroll', listenScrollEvent)
    })

    return (
        <Container offesetY={offesetY}>
            <TopNavbar />
            <TitleContainer>
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
    background: ${colors.DARK_GRAY} url(${background}) no-repeat center;
    width: 100%;
    height: 100vh;
    background-position-y: ${props => props.offesetY};
    background-attachment: fixed;
    position: relative;
    background-size: cover !important;
    text-align: center;
    overflow: hidden;
`
const Title = styled.h1`
    color: white;
    font: 90px 'Open Sans Bold',sans-serif;
    font-weight:600;
    text-shadow: 3px 2px 3px ${colors.TRANSPARENT_80};
    @media (max-width: 767px) {
        font: 55px 'Open Sans Bold',sans-serif;
      }
`

const TitleContainer = styled.div`
 margin-top: 40vh;
 @media (max-width: 767px) {
    margin-top:30vh;
  }
`
export default Header;
