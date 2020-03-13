import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from 'styled-components';
import backgroundImage from '../assets/background.jpg';
import mobileBackgroundImage from '../assets/backgroundmobile.jpg';
import colors from '../constants/colors';
import { mobilecheck } from '../utils/deviceCheck';
import formBuilder from '../utils/formBuilder';

import AddIcon from 'react-ionicons/lib/MdAdd';

const StyledIcon = styled(AddIcon)`
        transition: background-color 0.2s linear;
        border-radius: 100px;
        box-shadow: inset 0px 0px 10px 10px ${colors.WHITE};
        -webkit-tap-highlight-color: transparent;
        padding-top: 12px;
    `

const Home = () => {
    const [time, setTime] = useState(getTime());
    const [toggle, setToggle] = useState(null);
    let scroll = useRef(false);
    let timeout = useRef(null);
    let searchText = useRef("");

    let webLinks = useRef([{ NAME: "nu", LINK: "https://www.nu.nl/" }]);

    const changeToggle = () => {
        setToggle(!toggle);
    }

    const navigateToLink = (link, newTab) => {
        if (!scroll.current) {
            let win = window.open(link, newTab ? '_blank' : '_self');
            win.focus();
        }
        scroll.current = false;
    }

    const setScroll = () => {
        scroll.current = true;
    }

    const onSubmit = (event, value) => {
        event.preventDefault();
        webLinks.current.push(value);
        changeToggle();
    }

    useEffect(() => {
        const updateTime = () => {
            setTime(getTime())
            timeout.current = setTimeout(updateTime, 500);
        }
        updateTime();
        return () => {
            clearTimeout(timeout.current);
        }
    }, [timeout, setTime]);

    useEffect(() => {
        window.addEventListener("touchmove", setScroll, false);
        document.getElementById('searchbar').focus();
        document.getElementById('searchbar').onkeydown = function (e) {
            if (e.keyCode === 13) {
                navigateToLink("https://www.google.com/search?q=" + searchText.current, true);
            }
        };
        return () => {
            window.removeEventListener("touchmove", setScroll, false);
        }
    }, [])

    return (
        <Container>
            <BackgroundContainer backgroundImage={backgroundImage} mobileBackgroundImage={mobileBackgroundImage}></BackgroundContainer>
            <Clock>{time}</Clock>
            <CenterContainer>
                <SearchBar id="searchbar" type="text" placeholder="Wat wil je vandaag weten?" onChange={(event) => { searchText.current = event.target.value }}></SearchBar>
                <WebsiteLinksContainer>
                    {makeWebsiteLinks(webLinks.current, navigateToLink, changeToggle)}
                </WebsiteLinksContainer>
            </CenterContainer>
            <ContainerPopup enable={toggle}>
                <Popup enable={toggle}>

                    <TopBar><Title>Add a shortcut</Title></TopBar>
                    <MiddleContainer>
                        <FormContainer>
                            {buildForm(onSubmit)}
                        </FormContainer>
                    </MiddleContainer>
                </Popup>
            </ContainerPopup>
        </Container>
    )
}

const buildForm = (onSubmit) => {
    const regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    const builder = new formBuilder();
    builder.addTextInput("NAME", "Titel", undefined, { required: true, placeholder: "Title" });
    builder.addTextInput("LINK", "Link", (value) => { if (value.match(regex) !== null) return true; return false; }, { required: true, placeholder: "www.website.com" });
    return builder.getForm("Aanmaken", onSubmit);
}

const makeWebsiteLinks = (webLinks, navigateToLink, changeToggle) => {
    const links = webLinks.map((weblink, index) => {
        return (
            <WebsiteLinkContainer key={"weblink" + index}>
                <WebsiteLink
                    onClick={(event) => { navigateToLink(weblink.LINK, true) }}
                    onTouchEnd={(event) => { navigateToLink(weblink.LINK, true) }}
                >
                    <DefaultIcon>
                        <DefaultIconText>{weblink.NAME.charAt(0)}</DefaultIconText>
                    </DefaultIcon>
                </WebsiteLink>
                <WebsiteName>{weblink.NAME}</WebsiteName>
            </WebsiteLinkContainer>
        )
    })
    links.push(
        <WebsiteLinkContainer key={"weblink-1"}>
            <WebsiteLink
                onClick={(event) => { changeToggle() }}
                onTouchEnd={(event) => { changeToggle() }}
            >
                <StyledIcon fontSize="35" />
            </WebsiteLink>
            <WebsiteName>Add</WebsiteName>
        </WebsiteLinkContainer >
    )
    return links;
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

const Show = keyframes`
    from{
        top: -450px;
    }
    to {
        top 10%;
    }
`
const Hide = keyframes`
    from{
        top: 10%;
    }
    to {
        top -450px;
    }
`

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    text-align: center;
    background-image: linear-gradient(${colors.HEADER_BACKGROUND_COLOR} 80%, ${colors.DARK_GRAY} 1%, ${colors.DARK_GRAY});
`

const SearchBar = styled.input`
    font: 18px 'Open Sans Bold',sans-serif;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 8px;
    width: 700px;
    max-width: 80%;
    outline: none;
    margin-bottom: 50px;

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
    top: 45%;
    background-color: ${colors.TRANSPARENT};
    width: 100vw;
    text-align: center;
`

const WebsiteLinksContainer = styled.div`
    margin: auto;
    width: 60vw;
    max-height: 400px;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none; 
    &::-webkit-scrollbar { 
        display: none;  /* Safari and Chrome */
    }
`

const WebsiteLinkContainer = styled.div`
    width: ${mobilecheck() ? "80px" : "100px"};
    height: 100px;
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

const Popup = styled.div`
    position: absolute;
    text-align: left;
    width: 700px;
    padding-bottom: 30px;
    top: -450px;
    z-index: 4;
    border-radius: 10px;
    left: 50%;
    transform: translate(-50%, 0%);
    background-color: ${colors.WHITE};
    box-shadow: 0px 2px 5px 0px ${colors.BLACK};
    animation: ${props => props.enable == null ? `none` : props.enable ? css`${Show} 0.6s ease-out forwards` : css`${Hide} 0.5s ease-in forwards`};

`
const TopBar = styled.div`
    width: 100%;
    height: 50px;
`

const Title = styled.p`
    font-size: 25px;
    margin: 0;
    text-align: center;
    line-height: 50px;
    color: ${colors.DARK_GREEN};
    user-select: none;
`

const FormContainer = styled.div`
`

const MiddleContainer = styled.div`
    width: 90%;
    margin: auto;
`

const ContainerPopup = styled.div`
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    visibility: ${props => props.enable ? "visible" : "hidden"}
    transition: visibility 0.1s ${props => props.enable ? "0s" : "0.5s"} linear;
`

export default Home;