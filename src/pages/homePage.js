import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import backgroundImage from '../assets/background.jpg';
import mobileBackgroundImage from '../assets/backgroundmobile.jpg';
import colors from '../constants/colors';
import { mobilecheck } from '../utils/deviceCheck';

const Home = () => {
    const [time, setTime] = useState(getTime());
    let scroll = useRef(false);

    const webLinks = [{ NAME: "nu", LINK: "https://www.nu.nl/" }, { NAME: "nu", LINK: "https://www.nu.nl/" }, { NAME: "nu", LINK: "https://www.nu.nl/" }, { NAME: "nu", LINK: "https://www.nu.nl/" }, { NAME: "nu", LINK: "https://www.nu.nl/" }, { NAME: "nu", LINK: "https://www.nu.nl/" }, { NAME: "nu", LINK: "https://www.nu.nl/" }, { NAME: "nu", LINK: "https://www.nu.nl/" }, { NAME: "nu", LINK: "https://www.nu.nl/" }, { NAME: "nu", LINK: "https://www.nu.nl/" }, { NAME: "nu", LINK: "https://www.nu.nl/" }, { NAME: "nu", LINK: "https://www.nu.nl/" }, { NAME: "nu", LINK: "https://www.nu.nl/" }]

    const updateTime = () => {
        setTime(getTime())
        setTimeout(updateTime, 500);
    }

    const navigateToLink = (link) => {
        if (!scroll.current) {
            let win = window.open(link, '_blank');
            win.focus();
        }
        scroll.current = false;
    }

    useEffect(() => {
        updateTime();
        window.addEventListener("touchmove", () => { scroll.current = true; }, false);
    })

    return (
        <Container>
            <BackgroundContainer backgroundImage={backgroundImage} mobileBackgroundImage={mobileBackgroundImage}></BackgroundContainer>
            <Clock>{time}</Clock>
            <CenterContainer>
                <WebsiteLinksContainer>
                    {makeWebsiteLinks(webLinks, navigateToLink)}
                </WebsiteLinksContainer>
            </CenterContainer>
        </Container>
    )
}

const makeWebsiteLinks = (webLinks, navigateToLink) => {
    return webLinks.map((weblink, index) => {
        return (
            <WebsiteLinkContainer key={index}>
                <WebsiteLink
                    onClick={(event) => { navigateToLink(weblink.LINK) }}
                    onTouchEnd={(event) => { navigateToLink(weblink.LINK) }}
                >
                    <DefaultIcon>
                        <DefaultIconText>{weblink.NAME.charAt(0)}</DefaultIconText>
                    </DefaultIcon>
                </WebsiteLink>
                <WebsiteName>{weblink.NAME}</WebsiteName>
            </WebsiteLinkContainer>
        )
    })
}

const getTime = () => {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return h + ":" + m + ":" + s;
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    text-align: center;
    background-image: linear-gradient(${colors.HEADER_BACKGROUND_COLOR} 80%, ${colors.DARK_GRAY} 1%, ${colors.DARK_GRAY});
`

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

const Clock = styled.p`
    position: absolute;
    user-select: none;
    margin: 0;
    font-size: ${mobilecheck() ? "80px" : "100px"};
    color: ${colors.WHITE}
    top: 25%;
    text-align: center;
    width: 100vw;
`

const CenterContainer = styled.div`
    position: absolute;
    top: 50%;
    background-color: ${colors.TRANSPARENT};
    width: 100vw;
    text-align: center;
`

const WebsiteLinksContainer = styled.div`
    margin: auto;
    background-color: ${colors.TRANSPARENT_20_WHITE};
    width: 60vw;
    max-height: 400px;
    overflow: auto;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none; 
    &::-webkit-scrollbar { 
        display: none;  /* Safari and Chrome */
    }
`

const WebsiteLinkContainer = styled.div`
    width: ${mobilecheck() ? "80px" : "100px"};
    height: 100px;
    margin: auto;
    background-color: ${colors.TRANSPARENT};
    transition: background-color 0.3s linear
    &:hover{
        background-color: ${colors.TRANSPARENT_20_WHITE};
        cursor: pointer;
    }
    $:active{
        background-color: ${colors.TRANSPARENT_20_WHITE};
    }
`

const WebsiteLink = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    margin: auto;
    margin-top: 10px;
    background-color: ${colors.WHITE};
`
const WebsiteName = styled.p`
    margin: 4px;
    text-overflow: ellipsis;
    user-select: none;
    display:block;
    white-space: nowrap;
    overflow: hidden;
    color: ${colors.WHITE}
    margin: 5px 10px;
`

const DefaultIcon = styled.div`
    margin: auto;
    background-color: ${colors.RED};
    width: 50px;
    height: 50px;
    border-radius: 25px;
    transform: translateY(5px);
`
const DefaultIconText = styled.p`
    margin: 0;
    user-select: none;
    transform: translateY(5px);
    color: ${colors.WHITE};
    font-size: 30px;
`

export default Home;