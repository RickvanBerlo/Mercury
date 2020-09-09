import React, { useState, useEffect, useRef, memo } from "react";
import styled, { keyframes } from 'styled-components';
import backgroundImage from '../assets/background.webp';
import mobileBackgroundImage from '../assets/backgroundmobile.webp';
import colors from '../constants/colors';
import { mobilecheck } from '../utils/deviceCheck';
import formBuilder from '../utils/formBuilder';
import Model from '../components/model/model';
import UUID from '../utils/GenerateUUID';
import { connect } from "react-redux";
import Clock from '../components/clock/clock';
import BackgroundImage from '../components/backgroundImage/backgroundImage';
import { deleteWeblink, getWeblinks, add } from '../stores/weblinks/weblinkActions';
import { addModel, setModelActive, setModelInactive } from '../stores/models/modelActions';
import { login } from '../stores/keycloak/keycloakActions';
import TodoList from '../components/todoList/todoList';

import AddIcon from 'react-ionicons/lib/MdAdd';
import PersonIcon from 'react-ionicons/lib/MdPerson';

const LONG_PRESS_TIME = 500;

const AddStyledIcon = styled(AddIcon)`
        transition: background-color 0.2s linear;
        border-radius: 100px;
        box-shadow: inset 0px 0px 10px 10px ${colors.WHITE};
        -webkit-tap-highlight-color: transparent;
        padding-top: 12px;
    `
const LoginStyledIcon = styled(PersonIcon)`
    margin: 5px;
`


const Home = ({ deleteWeblink, getWeblinks, add, weblinks, addModel, setModelActive, setModelInactive, clock, init, keycloak, login }) => {
    const scroll = useRef(false);
    const searchText = useRef("");
    const [selectedWeblink, setSelectedWeblink] = useState({});
    const timer = useRef(undefined);
    const pressDown = useRef(false);
    const addWeblinkModelId = useRef(UUID());
    
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

    const mouseUp = (e, key) => {
        if (timer.current !== undefined) {
            pressDown.current = false;
            if (selectedWeblink.id === key) {
                deleteWeblink(key);
            } else {
                navigateToLink(weblinks[key].url, true)
            }
        }

    }

    const mouseDown = (e, key) => {
        timer.current = setTimeout((event) => { longPress(event, key) }, LONG_PRESS_TIME);
        pressDown.current = true;
    }

    const longPress = (e, key) => {
        if (pressDown.current) {
            timer.current = undefined;
            if (selectedWeblink.id === weblinks[key].id) {
                setSelectedWeblink({});
            } else {
                setSelectedWeblink(weblinks[key]);
            }
        }
    }

    const onClickLogin = (e) => {
        login()
    }

    useEffect(() => {
        if (init && keycloak.authenticated)
            getWeblinks();
    }, [getWeblinks, keycloak, init])

    useEffect(() => {
        const onSubmit = (event, value) => {
            event.preventDefault();
            add(value);
            setModelInactive(addWeblinkModelId.current);
        }

        addModel(
            addWeblinkModelId.current,
            <Model
                key={addWeblinkModelId.current}
                id={addWeblinkModelId.current}
                title={"Snelkoppeling toevoegen"}
                content={buildForm(onSubmit)}
            />
        )
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
    }, [add, setModelInactive, addModel])

    return ( 
        <Container>
            <BackgroundImage backgroundImage={backgroundImage} mobileBackgroundImage={mobileBackgroundImage}></BackgroundImage>
            <Clock digital={clock}/>
            {keycloak.authenticated && <TodoList key={UUID()}/>}
            <CenterContainer>
                <SearchBar id="searchbar" type="text" placeholder="Wat wil je vandaag weten?" onChange={(event) => { searchText.current = event.target.value }}></SearchBar>
                {keycloak.authenticated && <WebsiteLinksContainer>
                    {makeWebsiteLinks(weblinks, () => { setModelActive(addWeblinkModelId.current) }, selectedWeblink, mouseDown, mouseUp)}
                </WebsiteLinksContainer>}
            </CenterContainer>
            {!keycloak.authenticated && 
                <LoginButton onClick={onClickLogin}>
                    <LoginText>Login</LoginText>
                    <LoginStyledIcon fontSize="30px" color={colors.WHITE} />   
                </LoginButton>
            }
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

const makeWebsiteLinks = (weblinks, setModelActive, selectedWeblink, mouseDown, mouseUp) => {
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
            <WebsiteName>{selectedWeblink.id === key ? "verwijderen" : weblinks[key].title}</WebsiteName>
        </WebsiteLinkContainer>)
    }
    links.push(
        <WebsiteLinkContainer key={"weblink-1"}>
            <WebsiteLink
                onClick={(event) => { setModelActive() }}
                onTouchEnd={(event) => { setModelActive() }}
            >
                <AddStyledIcon fontSize="35" />
            </WebsiteLink>
            <WebsiteName>Add</WebsiteName>
        </WebsiteLinkContainer >
    )
    return links;
}

const mapStateToProps = state => {
    return { 
        weblinks: state.weblinkReducer.weblinks,
        clock: state.preferencesReducer.clock,
        init: state.keycloakReducer.init,
        keycloak: state.keycloakReducer.keycloak,
    };
};

const mapDispatchToProps = {
    deleteWeblink,
    getWeblinks,
    add,
    addModel,
    setModelActive,
    setModelInactive,
    login
}

const fadein = keyframes`
  from { 
    opacity: 0
  }
  to {
    opacity: 1
  }
`

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

const LoginText = styled.p`
  color: ${colors.WHITE}
  font-size: 18px;
  line-height: 40px;
  flex: 1;
  margin: 0;

`

const LoginButton = styled.div`
    position: absolute;
    height: 40px;
    width: 100px;
    bottom: 30px;
    right: 30px;
    display: flex;
    background-color: ${colors.TRANSPARENT_20_WHITE};
    border-radius: 5px;
    transition: all 0.2s linear;
    &:hover{
        cursor: pointer;
        background-color: ${colors.TRANSPARENT_80};
    }
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
    animation ${fadein} 0.4s linear forwards;
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