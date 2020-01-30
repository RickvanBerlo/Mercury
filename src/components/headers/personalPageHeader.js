import React from 'react';
import styled from 'styled-components';
import TopNavbar from '../navbars/topNavbar.js';
import IconButton from '../buttons/iconButton';
import colors from '../../constants/colors';
import strings from '../../constants/strings';
import background from '../../assets/background.jpg';
import backgroundMobile from '../../assets/backgroundmobile.jpg';

//onClick={() => { window.scrollTo(0, window.scrollY + document.getElementById('headSection').getBoundingClientRect().y + 4); }}

const Header = () => {
    return (
        <Container>
            <TopNavbar />
            <TitleContainer>
                <Title>{strings.NAME}</Title>
                {/* <IconButton icon={['fab', 'facebook-f']} size="2x" color="white" onClick={() => window.open("https://www.facebook.com/Rick.van.Berlo", "_blank")} /> */}
                <IconButton icon={['fab', 'linkedin-in']} size="2x" color="white" onClick={() => window.open("https://www.linkedin.com/in/rick-v-8a619799/", "_blank")} />
                <IconButton icon={['fab', 'github']} size="2x" color="white" onClick={() => window.open("https://github.com/RickvanBerlo", "_blank")} />
                {/* <IconButton icon={['fab', 'instagram']} size="2x" color="white" onClick={() => window.open("https://www.instagram.com/rickvanberlo/?hl=nl", "_blank")} /> */}
            </TitleContainer>
            <NavContainer>
                <BottomContainer>
                    <IconButton icon={['fas', 'arrow-alt-circle-down']} size="3x" color="white" onClick={() => { window.scrollTo(0, window.scrollY + document.getElementById('headSection').getBoundingClientRect().y + 4); }} />
                </BottomContainer>
            </NavContainer>
        </Container>
    );
}

//styles
const Container = styled.div`
    background: ${colors.DARK_GRAY} url(${background}) no-repeat center;
    width: 100%;
    height: 100vh;
    position: relative;
    background-size: cover !important;
    text-align: center;
    overflow: hidden;
    background-color: ${colors.DARK_GRAY};
    @media (max-width: 767px) {
        background: ${colors.DARK_GRAY} url(${backgroundMobile}) no-repeat center;
    }

`
const NavContainer = styled.div`
    display: table;
`
const BottomContainer = styled.div`
    width: 100vw;
    height: 35vh;
    display: table-cell;
    text-align: center;
    vertical-align: bottom;
`

const Title = styled.h1`
    color: white;
    user-select: none;
    font: 90px 'Open Sans Bold',sans-serif;
    font-weight:600;
    text-shadow: 3px 2px 3px ${colors.TRANSPARENT_80};
    @media (max-width: 767px) {
        font: 55px 'Open Sans Bold',sans-serif;
    }
    @media (max-width: 340px) {
        font: 40px 'Open Sans Bold',sans-serif;
    }
`

const TitleContainer = styled.div`
    margin-top: 40vh;
    @media (max-width: 767px) {
        margin - top:30vh;
    }
`
export default Header;
