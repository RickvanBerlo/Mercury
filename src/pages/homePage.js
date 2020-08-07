import React, { useState, useEffect, useRef, memo } from "react";
import styled from 'styled-components';
import backgroundImage from '../assets/background.jpg';
import mobileBackgroundImage from '../assets/backgroundmobile.jpg';
import colors from '../constants/colors';
import { mobilecheck } from '../utils/deviceCheck';
import formBuilder from '../utils/formBuilder';
import Model from '../components/model/model';
import UUID from '../utils/GenerateUUID';
import { connect } from "react-redux";
import Clock from '../components/clock/clock';
import BackgroundImage from '../components/backgroundImage/backgroundImage';
import { deleteWeblink, getWeblinks, add, replace } from '../stores/weblinks/weblinkActions';

import AddIcon from 'react-ionicons/lib/MdAdd';

const LONG_PRESS_TIME = 500;

const StyledIcon = styled(AddIcon)`
        transition: background-color 0.2s linear;
        border-radius: 100px;
        box-shadow: inset 0px 0px 10px 10px ${colors.WHITE};
        -webkit-tap-highlight-color: transparent;
        padding-top: 12px;
    `

const Home = ({ deleteWeblink, getWeblinks, add, replace, weblinks }) => {
    const [toggle, setToggle] = useState(null);
    const scroll = useRef(false);
    const searchText = useRef("");
    const selectedWeblink = useRef(undefined);
    const timer = useRef(undefined);
    const pressDown = useRef(false);

    const changeToggle = () => {
        selectedWeblink.current = undefined;
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
        if (selectedWeblink.current !== undefined) {
            replace(value)
        } else {
            add(value);
        }
        selectedWeblink.current = undefined;
        changeToggle();
    }

    const mouseUp = (e, key) => {
        if (timer.current !== undefined) {
            pressDown.current = false;
            navigateToLink(weblinks[key].url, true)
        }

    }

    const mouseDown = (e, key) => {
        timer.current = setTimeout((event) => { longPress(event, key) }, LONG_PRESS_TIME);
        pressDown.current = true;
    }

    const longPress = (e, key) => {
        if (pressDown.current) {
            timer.current = undefined;
            selectedWeblink.current = weblinks[key];
            setToggle(true);
        }
    }

    const actionDeleteWeblink = (e) => {
        e.preventDefault();
        setToggle(false);
        deleteWeblink(selectedWeblink.current.id);
        selectedWeblink.current = undefined;
    }

    useEffect(() => {
        getWeblinks();
    }, [getWeblinks])

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
            <BackgroundImage backgroundImage={backgroundImage} mobileBackgroundImage={mobileBackgroundImage}></BackgroundImage>
            <Clock />
            <CenterContainer>
                <SearchBar id="searchbar" type="text" placeholder="Wat wil je vandaag weten?" onChange={(event) => { searchText.current = event.target.value }}></SearchBar>
                <WebsiteLinksContainer>
                    {makeWebsiteLinks(weblinks, changeToggle, mouseDown, mouseUp)}
                </WebsiteLinksContainer>
            </CenterContainer>
            <Model toggle={toggle} setToggle={setToggle} title={selectedWeblink.current === undefined ? "Snelkoppeling toevoegen" : "Snelkoppelin aanpassen"} content={buildForm(onSubmit, selectedWeblink.current !== undefined ? actionDeleteWeblink : undefined, selectedWeblink.current)} />
        </Container>
    )
}

const buildForm = (onSubmit, actionDeleteWeblink, weblink = {}) => {
    const regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    const builder = new formBuilder();
    builder.addHiddenInput("id", { value: weblink.id });
    builder.addTextInput("title", { value: weblink.title, required: true, placeholder: "Title", label: "Title" });
    builder.addTextInput("url", { required: true, value: weblink.url, placeholder: "www.website.com", label: "Link", validation: (value) => { if (value.match(regex) !== null) return true; return false; } });
    builder.addColorInput("color", { value: weblink.color, label: "Kleur", });
    return (
        <ContentContainer key={UUID()}>
            {builder.getForm("weblinkForm", "Aanmaken", onSubmit, { reset: true, onDelete: actionDeleteWeblink })}
        </ContentContainer>
    )
}

const makeWebsiteLinks = (weblinks, changeToggle, mouseDown, mouseUp) => {
    const links = [];
    for (const key in weblinks) {
        links.push(<WebsiteLinkContainer key={"weblink-" + weblinks[key].id}>
            <WebsiteLink
                onMouseDown={(e) => { mouseDown(e, key) }}
                onMouseUp={(e) => { mouseUp(e, key) }}
            >
                <DefaultIcon key={"weblink-" + weblinks[key].id} color={weblinks[key].color}>
                    <DefaultIconText>{weblinks[key].title.charAt(0)}</DefaultIconText>
                </DefaultIcon>
            </WebsiteLink>
            <WebsiteName>{weblinks[key].title}</WebsiteName>
        </WebsiteLinkContainer>)
    }
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

const mapStateToProps = state => {
    return { weblinks: state.weblinkReducer.weblinks };
};

const mapDispatchToProps = {
    deleteWeblink,
    getWeblinks,
    add,
    replace
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    text-align: center;
    background-image: linear-gradient(${colors.HEADER_BACKGROUND_COLOR} 80%, ${colors.DARK_GRAY} 1%, ${colors.DARK_GRAY});
`

const ContentContainer = styled.div`
    width: 400px;
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
    transition: all 0.3s linear;
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
    background-color: ${props => props.color};
    width: 50px;
    height: 50px;
    border-radius: 25px;
    transform: translateY(5px);
    transition: all 0.5s linear;
`
const DefaultIconText = styled.p`
    margin: 0;
    user-select: none;
    transform: translateY(5px);
    color: ${colors.WHITE};
    font-size: 30px;
`
const areEqual = (prevProps, nextProps) => {
    return true;
}

const MemoHome = memo(connect(mapStateToProps, mapDispatchToProps)(Home), areEqual)
export default MemoHome;