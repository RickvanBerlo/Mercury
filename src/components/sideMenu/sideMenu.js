import React, { useState, memo } from "react";
import styled from 'styled-components';
import colors from '../../constants/colors';

const SideMenu = ({ setCurrentPage }) => {
    const [show, setShow] = useState(false);
    const items = ["Agenda"];

    return (
        <Container show={show}>
            <Label onClick={() => { setShow(!show) }} show={show}>
                <Bar1 show={show} />
                <Bar2 show={show} />
                <Bar3 show={show} />
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

const Container = styled.div`
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    background-color: ${colors.WHITE};
    height: 100vh;
    width: 300px;
    box-shadow: 0px 0px 10px 2px;
    transition: transform 0.3s linear;
    transform: translateX(${props => props.show ? "0px" : "-300px"});
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    text-align:center;
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
    top: 10%;
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
    transform: rotate(${props => props.show ? "-45deg" : "0deg"}) translate(${props => props.show ? "-9px, 6px" : "0px 0px"});
`
const Bar2 = styled.div`
    width: 30px;
    height: 5px;
    background-color: #333;
    margin: 6px 0;
    transition: opacity 0.3s linear;
    opacity: ${props => props.show ? 0 : 1};
`
const Bar3 = styled.div`
    width: 30px;
    height: 5px;
    background-color: #333;
    margin: 6px 0;
    transition: transform 0.3s linear;
    transform: rotate(${props => props.show ? "45deg" : "0deg"}) translate(${props => props.show ? "-9px, -7px" : "0px 0px"});
`

const AreEqual = (prevProps, nextProps) => {
    if (prevProps.setCurrentPage === nextProps.setCurrentPage) return true;
    return false;
}

const MemoSideMenu = memo(SideMenu, AreEqual);
export default MemoSideMenu;