import React from 'react';
import styled from 'styled-components';
import IconButton from '../buttons/iconButton';
import colors from '../../constants/colors';
import strings from '../../constants/strings';
import background from '../../assets/background.jpg';
import backgroundMobile from '../../assets/backgroundmobile.jpg';

const Header = () => {
    return (
        <Container>
            <BackgroundContainer></BackgroundContainer>
            <CenterContainer>
                <Title>{strings.NAME}</Title>
                {/* <IconButton icon={['fab', 'facebook-f']} size="2x" color="white" onClick={() => window.open("https://www.facebook.com/Rick.van.Berlo", "_blank")} /> */}
                <IconButton icon={['fab', 'linkedin-in']} size="2x" color="white" onClick={() => window.open("https://www.linkedin.com/in/rick-v-8a619799/", "_blank")} />
                <IconButton icon={['fab', 'github']} size="2x" color="white" onClick={() => window.open("https://github.com/RickvanBerlo", "_blank")} />
                {/* <IconButton icon={['fab', 'instagram']} size="2x" color="white" onClick={() => window.open("https://www.instagram.com/rickvanberlo/?hl=nl", "_blank")} /> */}
            </CenterContainer>
            <NavContainer>
                <IconButton icon={['fas', 'arrow-alt-circle-down']} size="3x" color="white" onClick={() => { window.scrollTo(0, window.scrollY + document.getElementById('headSection').getBoundingClientRect().y + 4); }} />
            </NavContainer>
        </Container>
    );
}

//styles
const Container = styled.div`
height: 100vh;
width: 100vw;
background-image: linear-gradient(${colors.HEADER_BACKGROUND_COLOR} 80%, ${colors.DARK_GRAY} 1%, ${colors.DARK_GRAY});
`

const BackgroundContainer = styled.div`
position: absolute;
top: 0;
right: 0;
bottom: 0px;
left: 0;
box-sizing: border-box;
background: url(${background}) bottom;
background-size: 100vw;
background-repeat: no-repeat;
@media (max-width: 767px) {
    background: url(${backgroundMobile}) center;
    background-size: cover;
    @media (max-height: 467px) {
        background: url(${background}) bottom;
        background-size: 100vw;
        background-repeat: no-repeat;
    }
}
`

const NavContainer = styled.div`
   position: absolute;
   bottom: 5vh;
   width: 100vw;
   text-align: center;
`

const Title = styled.h1`
    color: white;
    user-select: none;
    font: 90px 'Open Sans Bold',sans-serif;
    font-weight:600;
    margin-top: 0;
    margin-bottom: 20px
    text-shadow: 3px 2px 3px ${colors.TRANSPARENT_80};
    @media (max-width: 767px) {
        font: 55px 'Open Sans Bold',sans-serif;
    }
    @media (max-width: 340px) {
        font: 40px 'Open Sans Bold',sans-serif;
    }
`

const CenterContainer = styled.div`
    position: absolute;
    top: 30vh;
    width: 100vw;
    text-align: center;
    @media (max-height: 467px) {
        top: 15vh;
    }
`
export default Header;
