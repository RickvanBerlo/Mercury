import React, { memo, useEffect, useRef } from "react";
import styled from 'styled-components';
import colors from '../../constants/colors';
import getScreenResolution from '../../utils/screenResolution';
import { mobilecheck } from '../../utils/deviceCheck';
import LogOut from 'react-ionicons/lib/MdLogOut';

const INIT_LABEL_Y = 75;
const INIT_SIDEMENU_X = -300;

//this component wil only be rendered once.
const SideMenu = ({ history, setCurrentPage, sideMenuButtons = [] }) => {
    let drag = false;
    let pressed = false;
    let labelY = INIT_LABEL_Y;
    let sidemenuX = useRef(INIT_SIDEMENU_X)
    let scroll = useRef(false);
    let mouseY = null;
    let mouseX = null;
    let screenHeight = getScreenResolution().height;

    const setOffset = (event) => {
        event.preventDefault();
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
            document.getElementById("sideMenu").style.left = sidemenuX.current > 0 ? 0 : sidemenuX.current < -300 ? -300 : sidemenuX.current + "px";
            document.getElementById("sideMenu").style.transition = "none";
            toggleAnimationLabel(sidemenuX.current > 0 ? true : false);
        }
    }

    const startDrag = (event) => {
        event.preventDefault();
        mouseX = mobilecheck() ? event.touches[0].pageX : event.pageX;
        mouseY = mobilecheck() ? event.touches[0].pageY : event.pageY;
        pressed = true;
    }

    const endDrag = (event) => {
        if (pressed) {
            drag ? sidemenuX.current = sidemenuX.current >= -150 ? 0 : -300 : sidemenuX.current = sidemenuX.current === 0 ? -300 : 0;
            setPositionSideMenu(sidemenuX.current);
            pressed = false;
            drag = false;
            scroll.current = false;
        }
    }

    const setPositionSideMenu = (X) => {
        document.getElementById("label").style.cursor = "pointer";
        document.getElementById("sideMenu").style.left = X + "px";
        document.getElementById("sideMenu").style.transition = "left 0.4s linear";
        toggleAnimationLabel(X === 0 ? true : false);
    }

    const changeCurrentPage = (name) => {
        if (!scroll.current) {
            setCurrentPage(name);
            sidemenuX.current = -300;
            setPositionSideMenu(sidemenuX.current);
        }
        scroll.current = false;
    }

    useEffect(() => {
        document.getElementById("label").addEventListener("mousedown", startDrag, false);
        window.addEventListener("mouseup", endDrag, false);
        window.addEventListener("mousemove", setOffset, false);
        document.getElementById("label").addEventListener("touchstart", startDrag, false);
        window.addEventListener("touchend", endDrag, false);
        window.addEventListener("touchmove", setOffset, false);
        window.addEventListener("touchmove", () => { scroll.current = true; }, false);
    }, [])

    return (
        <Container id="sideMenu" offsetX={INIT_SIDEMENU_X}>
            <Label id="label" top={INIT_LABEL_Y}>
                <Bar1 id="bar1" />
                <Bar2 id="bar2" />
                <Bar3 id="bar3" />
            </Label>
            <ContainerTitle>
                <Title>Mercury</Title>
            </ContainerTitle>
            <ContainerButtons>
                {createSideMenuButtons(sideMenuButtons, changeCurrentPage)}
            </ContainerButtons>
            <ContainerLogoOut onTouchStart={() => { alert("WIP") }} onClick={() => { alert("WIP") }}>
                <Text>Log out</Text>
                <LogOut style={{ position: "absolute", top: 20, right: 20 }} fontSize="30px" color={colors.BLACK} />
            </ContainerLogoOut>
        </Container>
    )
}

const createSideMenuButtons = (buttons, changeCurrentPage) => {
    let array = [];
    for (let index of buttons.keys()) {
        const Icon = buttons[index].ICON;
        array.push(
            <ContainerLink key={index} onTouchEnd={() => { changeCurrentPage(buttons[index].NAME) }} onClick={() => { changeCurrentPage(buttons[index].NAME) }}>
                <Text>{buttons[index].NAME}</Text>
                <Icon style={{ position: "absolute", top: 20, right: 20 }} fontSize="30px" color={colors.BLACK} />
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

const Container = styled.div`
    position: absolute;
    z-index: 10;
    top: 0;
    left: ${props => props.offsetX}px;
    background-color: ${colors.WHITE};
    height: 100vh;
    width: 300px;
    box-shadow: 0px 0px 10px 2px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    text-align:center;
    transition: left 0.4s linear;
`

const ContainerLink = styled.div`
    text-align: center;
    position:relative;
    height: 70px;
    box-shadow: inset 0 0 15px 20px ${colors.WHITE};
    &:hover{
        background-color: ${colors.DARK_WHITE};
        cursor: pointer;
    }
    &:active{
        background-color: ${colors.LIGHT_GRAY};
    }
    transition: background-color 0.2s linear ;
`

const Text = styled.p`
    flex: 2;
    margin: auto;
    line-height: 70px;
    font-size: 20px;
    user-select: none; 
`

const ContainerLogoOut = styled.div`
    position: relative;
    z-index: 11;
    width: 100%;
    height: 70px;
    background-color: ${colors.WHITE};
    border-bottom-right-radius: 10px;
    box-shadow: 0 -3px 10px -2px ${colors.BLACK};
    &:hover{
        background-color: ${colors.DARK_WHITE};
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
    color: ${colors.DARK_GREEN};
    user-select: none; 
`

const ContainerTitle = styled.div`
    position: relative;
    z-index: 11;
    height: 70px;
    box-shadow: 0px 3px 10px -1px ${colors.BLACK};
    background-color: ${colors.DARK_WHITE};
    border-top-right-radius: 10px;
`

const Label = styled.div`
    position: absolute;
    padding-top: 10px;
    padding-left: 10px;
    top: ${props => props.top}px;
    left: 300px;
    background-color: white;
    height: 50px;
    cursor: pointer;
    width: 40px;
    box-shadow: 5px 0px 6px -2px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
`

const Bar1 = styled.div`
    width: 30px;
    height: 5px;
    background-color: #333;
    margin: 6px 0;
    transition: transform 0.3s linear;
`
const Bar2 = styled.div`
    width: 30px;
    height: 5px;
    background-color: #333;
    margin: 6px 0;
    transition: opacity 0.3s linear;
`
const Bar3 = styled.div`
    width: 30px;
    height: 5px;
    background-color: #333;
    margin: 6px 0;
    transition: transform 0.3s linear;
`

const AreEqual = (prevProps, nextProps) => {
    if (prevProps.setCurrentPage === nextProps.setCurrentPage) return true;
    return false;
}

const MemoSideMenu = memo(SideMenu, AreEqual);
export default MemoSideMenu;