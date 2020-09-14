import React, { memo, useEffect, useRef, useState} from "react";
import styled, {keyframes, css} from 'styled-components';
import { connect } from "react-redux";
import getScreenResolution from '../../utils/screenResolution';
import { mobilecheck } from '../../utils/deviceCheck';
import { logout } from '../../stores/keycloak/keycloakActions';
import { getPreferences } from '../../stores/preferences/preferencesActions';
import { pages } from '../../constants/pages';
import LogOut from 'react-ionicons/lib/MdLogOut';
import colorChanger from '../../utils/colorChanger';

const INIT_LABEL_Y = 75;

const SIDEMENU_MIN = -300;
const SIDEMENU_MAX = 0;

//this component wil only be rendered once.
const SideMenu = ({ history, keycloak, logout, sideMenuButtons = [], init, getPreferences, colors }) => {
    let sidemenuX = useRef(SIDEMENU_MIN)
    let scroll = useRef(false);
    const [usersName, setUsersName] = useState("Mercury");
    let screenHeight = getScreenResolution().height;
    
    const AnimEndEvent = (e) => {
        if (e.target.id === "sideMenu") {
            document.getElementById("sideMenu").style.transition = "background-color 0.3s linear";
            document.getElementById("sideMenu").style.left = sidemenuX.current + "px";
            document.getElementById("sideMenu").style.transform = "translateX(0px)";
        }
    }

    const setPositionSideMenu = async (X) => {
        if (document.getElementById("sideMenu").style.left === "") document.getElementById("sideMenu").style.left = "-300px";
        let transformOffset = (X - parseInt(document.getElementById("sideMenu").style.left));
        document.getElementById("label").style.cursor = "pointer";
        document.getElementById("sideMenu").style.transform = "translateX(" + transformOffset + "px)";
        document.getElementById("sideMenu").style.transition = "background-color 0.3s linear, transform 0.4s linear";
        document.getElementById("sideMenu").style.willChange = "transform";
        toggleAnimationLabel(X === 0 ? true : false);
    }

    const changeCurrentPage = (name) => {
        if (!scroll.current) {
            history.push("/dashboard/" + name);
            sidemenuX.current = SIDEMENU_MIN;
            setPositionSideMenu(sidemenuX.current);
        }
        scroll.current = false;
    }

    const touchMove = () => {
        scroll.current = true;
    }

    const account = () => {
        window.location.href = keycloak.createAccountUrl();
    }

    useEffect(() => {
        if (init && keycloak.authenticated){
            keycloak.loadUserInfo().then(userInfo => {
                setUsersName(userInfo.name);
            })
            getPreferences();
        }
    }, [init, keycloak, getPreferences])

    useEffect(() => {
        let drag = false;
        let labelY = INIT_LABEL_Y;
        let mouseY = null;
        let mouseX = null;
        let pressed = false;

        const preloadPages = () => {
            for(const key in pages){
                pages[key].PAGE.preload();
            }
        }

        const setOffset = (event) => {
            if (pressed) {
                drag = true;

                const newMouseX = mobilecheck() ? event.touches[0].pageX : event.pageX;
                const newMouseY = mobilecheck() ? event.touches[0].pageY : event.pageY;

                //calculate new position of label and sidemenu
                //newMousePosition - oldMousePosition = offset for label and sidemenu
                labelY = labelY + (newMouseY - mouseY);
                sidemenuX.current = sidemenuX.current + (newMouseX - mouseX);

                mouseX = newMouseX;
                mouseY = newMouseY;

                document.getElementById("label").style.cursor = "grab";
                document.getElementById("label").style.top = labelY < INIT_LABEL_Y ? INIT_LABEL_Y : labelY > screenHeight - 135 ? screenHeight - 135 : labelY + "px";
                document.getElementById("sideMenu").style.left = sidemenuX.current > SIDEMENU_MAX ? SIDEMENU_MAX : sidemenuX.current < SIDEMENU_MIN ? SIDEMENU_MIN : sidemenuX.current + "px";
                document.getElementById("sideMenu").style.transition = "background-color 0.3 linear";
                toggleAnimationLabel(sidemenuX.current > SIDEMENU_MAX ? true : false);
            }
        }

        const startDrag = (event) => {
            event.preventDefault();
            mouseX = mobilecheck() ? event.touches[0].pageX : event.pageX;
            mouseY = mobilecheck() ? event.touches[0].pageY : event.pageY;
            pressed = true;
            preloadPages();
        }

        const endDrag = (event) => {
            if (pressed) {
                drag ? sidemenuX.current = sidemenuX.current >= -150 ? SIDEMENU_MAX : SIDEMENU_MIN : sidemenuX.current = sidemenuX.current === SIDEMENU_MAX ? SIDEMENU_MIN : SIDEMENU_MAX;
                setPositionSideMenu(sidemenuX.current);
                pressed = false;
                drag = false;
                scroll.current = false;
            }
        }
        const label = document.getElementById("label");
        const sideMenu = document.getElementById("sideMenu");
        label.addEventListener("mousedown", startDrag, false);
        label.addEventListener("touchstart", startDrag, { passive: true });
        window.addEventListener("mouseup", endDrag, false);
        window.addEventListener("mousemove", setOffset, false);
        window.addEventListener("touchend", endDrag, false);
        window.addEventListener("touchmove", setOffset, false);
        window.addEventListener("touchmove", touchMove, false);
        sideMenu.addEventListener("transitionend", AnimEndEvent, false);
        return () => {
            label.removeEventListener("mousedown", startDrag, false);
            window.removeEventListener("mouseup", endDrag, false);
            window.removeEventListener("mousemove", setOffset, false);
            label.removeEventListener("touchstart", startDrag, { passive: true });
            window.removeEventListener("touchend", endDrag, false);
            window.removeEventListener("touchmove", setOffset, false);
            window.removeEventListener("touchmove", touchMove, false);
            sideMenu.removeEventListener("transitionend", AnimEndEvent, false);
        }
    }, [screenHeight, keycloak])

    return (
        <Container colors={colors} id="sideMenu" offsetX={SIDEMENU_MIN} show={keycloak.authenticated}>
            <Label colors={colors} id="label" top={INIT_LABEL_Y}>
                <Bar1 color={colors.TEXT} id="bar1" />
                <Bar2 color={colors.TEXT} id="bar2" />
                <Bar3 color={colors.TEXT} id="bar3" />
            </Label>
            <ContainerTitle colors={colors} onTouchStart={() => { account() }} onClick={() => { account() }}>
                <Title color={colors.MAIN}>{usersName}</Title>
            </ContainerTitle>
            <ContainerButtons>
                {createSideMenuButtons(sideMenuButtons, changeCurrentPage, colors)}
            </ContainerButtons>
            <ContainerLogoOut colors={colors} onTouchStart={() => { logout() }} onClick={() => { logout() }}>
                <Text color={colors.TEXT}>Log out</Text>
                <LogOut style={{ position: "absolute", top: 20, right: 20, transition: "fill 0.3s linear" }} fontSize="30px" color={colors.TEXT} />
            </ContainerLogoOut>
        </Container>
    )
}

const createSideMenuButtons = (buttons, changeCurrentPage, colors) => {
    let array = [];
    for (const key in buttons) {
        const Icon = buttons[key].ICON;
        array.push(
            <ContainerLink colors={colors} key={key} onTouchEnd={() => { changeCurrentPage(key.toLowerCase()) }} onClick={() => { changeCurrentPage(key.toLowerCase()) }}>
                <Text color={colors.TEXT}>{key}</Text>
                <Icon style={{ position: "absolute", top: 20, right: 20, transition: "fill 0.3s linear" }} fontSize="30px" color={colors.TEXT} />
            </ContainerLink>
        )
    }
    return array;
}

const toggleAnimationLabel = (toggle) => {
    document.getElementById("bar1").style.transform = toggle ? "rotate(-45deg) translate(-9px, 6px)" : "rotate(0deg) translate(0px, 0px)";
    document.getElementById("bar2").style.opacity = toggle ? 0 : 1;
    document.getElementById("bar3").style.transform = toggle ? "rotate(45deg) translate(-9px, -7px)" : "rotate(0deg) translate(0px, 0px)";
}

const mapStateToProps = state => {
    return {
        keycloak: state.keycloakReducer.keycloak,
        init: state.keycloakReducer.init,
        colors: state.preferencesReducer.colors,   
    };
};

const mapDispatchToProps = {
    logout,
    getPreferences
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
    position: fixed;
    opacity: 0;
    z-index: 10;
    top: 0;
    left: ${props => props.offsetX}px;
    background-color: ${props => props.colors.PRIMARY};
    height: 100vh;
    width: 300px;
    box-shadow: 0px 0px 5px 1px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    text-align:center;
    transition: left 0.4s linear, background-color 0.3s linear;
    animation ${props => props.show ? css`${fadein} 0.2s linear forwards` : "none"};
`

const ContainerLink = styled.div`
    text-align: center;
    position:relative;
    height: 70px;
    box-shadow: inset 0 0 15px 20px ${props => props.colors.PRIMARY};
    transition: background-color 0.3s linear, box-shadow 0.3s linear;
    &:hover{
        background-color: ${props => props.colors.SECONDARY};
        cursor: pointer;
    }
    &:active{
        background-color: ${props => props.colors.SECONDARY};
    }
`

const Text = styled.p`
    flex: 2;
    margin: auto;
    line-height: 70px;
    font-size: 20px;
    color: ${props => props.color}
    user-select: none; 
    transition: color 0.3s linear;
`

const ContainerLogoOut = styled.div`
    position: relative;
    z-index: 11;
    width: 100%;
    height: 70px;
    background-color: ${props => props.colors.SECONDARY};
    border-bottom-right-radius: 10px;
    box-shadow: 0 -3px 10px -2px black;
    &:hover{
        background-color: ${props => colorChanger(props.colors.SECONDARY, -0.1)};
        cursor: pointer;
    }
    transition: background-color 0.2s linear;
`

const ContainerButtons = styled.div`
    overflow:auto;
    height: calc(100% - 140px);
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none; 
    &::-webkit-scrollbar { 
        display: none;  /* Safari and Chrome */
    }
`

const Title = styled.h2`
    font-size: 26px;
    margin: 0;
    line-height: 70px;
    height: 100%;
    color: ${props => props.color};
    user-select: none; 
    transition: color 0.3s linear;
`

const ContainerTitle = styled.div`
    position: relative;
    z-index: 11;
    height: 70px;
    box-shadow: 0px 3px 10px -1px black;
    background-color: ${props => props.colors.SECONDARY};
    border-top-right-radius: 10px;
    transition: background-color 0.2s linear;
    &:hover{
        background-color: ${props => colorChanger(props.colors.SECONDARY, -0.1)};
        cursor: pointer;
    }
`

const Label = styled.div`
    position: absolute;
    padding-top: 10px;
    padding-left: 10px;
    top: ${props => props.top}px;
    left: 300px;
    background-color: ${props => props.colors.PRIMARY};
    height: 50px;
    cursor: pointer;
    width: 40px;
    box-shadow: 4px 0px 3px -2px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transition: background-color 0.3s linear;
`

const Bar1 = styled.div`
    width: 30px;
    height: 5px;
    background-color: ${props => props.color};
    margin: 6px 0;
    transition: transform 0.3s linear, background-color 0.3s linear;
`
const Bar2 = styled.div`
    width: 30px;
    height: 5px;
    background-color: ${props => props.color};
    margin: 6px 0;
    transition: opacity 0.3s linear, background-color 0.3s linear;
`
const Bar3 = styled.div`
    width: 30px;
    height: 5px;
    background-color: ${props => props.color};
    margin: 6px 0;
    transition: transform 0.3s linear, background-color 0.3s linear;
`

const AreEqual = (prevProps, nextProps) => {
    return false;
}

const MemoSideMenu = memo(connect(mapStateToProps, mapDispatchToProps)(SideMenu), AreEqual);
export default MemoSideMenu;