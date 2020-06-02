import React, { useEffect, useRef } from "react";
import colors from '../../constants/colors';
import styled, { keyframes, css } from 'styled-components';
import IconButton from '../buttons/dasboard/iconButton';
import generateUUID from '../../utils/GenerateUUID';

import AddIcon from 'react-ionicons/lib/MdClose';

const Model = ({ toggle, setToggle, title, content }) => {
    const UUID = useRef(generateUUID());

    useEffect(() => {
        const hideModel = () => {
            setToggle(false);
        }
        const modelContainer = document.getElementById(UUID.current);
        const closeButton = document.getElementById("closeButton");
        modelContainer.addEventListener("click", hideModel, false);
        modelContainer.addEventListener("touchend", hideModel, false);
        closeButton.addEventListener("click", hideModel, false);
        closeButton.addEventListener("touchend", hideModel, false);
        return () => {
            modelContainer.removeEventListener("click", hideModel, false);
            modelContainer.removeEventListener("touchend", hideModel, false);
            closeButton.addEventListener("click", hideModel, false);
            closeButton.addEventListener("touchend", hideModel, false);
        }
    }, [setToggle]);

    return (
        <div>
            <BackgroundPopup id={UUID.current} enable={toggle} />
            <Popup enable={toggle}>
                <TopBar>
                    <Title>{title}</Title>
                    <CloseButtonContainer>
                        <IconButton id="closeButton" icon={AddIcon} color={colors.BLACK} fontSize="30px" round={false} />
                    </CloseButtonContainer>
                </TopBar>
                <MiddleContainer>
                    {content}
                </MiddleContainer>
            </Popup>
        </div>
    )
}

const Show = keyframes`
    from{
        top: -100%;
    }
    to {
        top: 10%;
    }
`
const Hide = keyframes`
    from{
        top: 10%;
    }
    to {
        top: -100%;
    }
`

const CloseButtonContainer = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`

const Popup = styled.div`
    position: absolute;
    text-align: left;
    max-width: 70%;
    top: -100%;
    z-index: 3;
    border-radius: 10px;
    left: 50%;
    transform: translate(-50%, 0%);
    background-color: ${colors.WHITE};
    box-shadow: 0px 2px 5px 0px ${colors.BLACK};
    animation: ${props => props.enable == null ? `none` : props.enable ? css`${Show} 0.4s ease-out forwards` : css`${Hide} 0.4s ease-in forwards`};

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

const MiddleContainer = styled.div`
    margin-left:20px;
    margin-right: 20px;
`

const BackgroundPopup = styled.div`
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: ${props => props.enable ? colors.TRANSPARENT_80 : colors.TRANSPARENT};
    visibility: ${props => props.enable ? "visible" : "hidden"}
    transition: visibility 0.1s ${props => props.enable ? "0s" : "0.5s"} linear, background-color 0.4s linear;
`

export default Model;
