import React, { memo, useEffect } from "react";
import styled from 'styled-components';
import colors from '../../constants/colors';
import getScreenResolution from '../../utils/screenResolution';

const INIT_LABEL_Y = 85;
const INIT_SIDEMENU_X = -300;

const SideMenu = ({ setCurrentPage }) => {
    let drag = false;
    let labelY = INIT_LABEL_Y;
    let sidemenuX = INIT_SIDEMENU_X;
    let mouseY = null;
    let mouseX = null;
    let screenHeight = getScreenResolution().height;

    const setOffset = (event) => {
        if (drag) {
            const offsetY = mouseY - labelY;
            const offsetX = mouseX - sidemenuX;
            const Y = event.pageY - offsetY;
            const X = event.pageX - offsetX;

            document.getElementById("label").style.cursor = "grab";
            document.getElementById("label").style.top = Y < 85 ? 85 : Y > screenHeight - 75 ? screenHeight - 75 : Y + "px";
            document.getElementById("sideMenu").style.left = X > 0 ? 0 : X < -300 ? -300 : X + "px";
            document.getElementById("sideMenu").style.transition = "none";
            ToggleAnimationLabel(X > 0 ? true : false);
        }
    }

    const startDrag = (event) => {
        mouseY = event.pageY;
        mouseX = event.pageX;
        drag = true
    }

    const endDrag = (event) => {
        if (drag) {
            const X = event.pageX - (mouseX - sidemenuX);

            drag = false;
            sidemenuX = X >= -150 ? 0 : -300;
            labelY = (event.pageY - (mouseY - labelY));
            document.getElementById("label").style.cursor = "pointer";
            document.getElementById("sideMenu").style.left = X >= -150 ? 0 : -300 + "px";
            document.getElementById("sideMenu").style.transition = "left 0.4s linear";
            ToggleAnimationLabel(sidemenuX === 0 ? true : false);
        }
    }

    const onClick = (event) => {
        if (event.pageX === mouseX) {
            sidemenuX = sidemenuX === 0 ? -300 : 0;
            document.getElementById("sideMenu").style.left = sidemenuX >= -150 ? 0 : -300 + "px";
            ToggleAnimationLabel(sidemenuX === 0 ? true : false);
        }
    }

    useEffect(() => {
        document.getElementById("label").addEventListener("mousedown", startDrag, false);
        window.addEventListener("mouseup", endDrag, false);
        window.addEventListener("mousemove", setOffset, false);
    }, [])

    return (
        <Container id="sideMenu" offsetX={INIT_SIDEMENU_X}>
            <Label id="label" onClick={onClick} top={INIT_LABEL_Y}>
                <Bar1 id="bar1" />
                <Bar2 id="bar2" />
                <Bar3 id="bar3" />
            </Label>
            <ContainerTitle>
                <Title>Mercury</Title>
            </ContainerTitle>
            <ContainerPages>
                <PageLink>Hallo</PageLink>
                <PageLink>Hallo</PageLink>
                <PageLink>Hallo</PageLink>
                <PageLink>Hallo</PageLink>
                <PageLink>Hallo</PageLink>
                <PageLink>Hallo</PageLink>
                <PageLink>Hallo</PageLink>
                <PageLink>Hallo</PageLink>
                <PageLink>Hallo</PageLink>
                <PageLink>Hallo</PageLink>
                <PageLink>Hallo</PageLink>
                <PageLink>Hallo</PageLink>
                <PageLink>Hallo</PageLink>
                <PageLink>Hallo</PageLink>
                <PageLink>Hsdsd</PageLink>
                <PageLink>Hsdsd</PageLink>
                <PageLink>Hsdsd</PageLink>
                <PageLink>Hsdsd</PageLink>
            </ContainerPages>
        </Container>
    )
}

const ToggleAnimationLabel = (toggle) => {
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

const ContainerPages = styled.div`
    overflow:auto;
    height: 92%;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none; 
    overflow: -moz-scrollbars-none;
    &::-webkit-scrollbar { 
        display: none;  /* Safari and Chrome */
    }
`

const PageLink = styled.p`
    padding: 20px 0px;
    font: 20px 'Open Sans Bold',sans-serif;
    margin: 0;
`

const Title = styled.h2`
    font-size: 26px;
    margin: 0;
    line-height: 70px;
    height: 100%;
    color: ${colors.BLUE}
`

const ContainerTitle = styled.div`
    height: 8%;
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