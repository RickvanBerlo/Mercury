import React, { useEffect, useRef, memo, useCallback } from "react";
import colors from '../../constants/colors';
import styled from 'styled-components';
import IconButton from '../buttons/dasboard/iconButton';
import generateUUID from '../../utils/GenerateUUID';
import { connect } from "react-redux";
import { setModelInactive } from '../../stores/models/modelActions';

import AddIcon from 'react-ionicons/lib/MdClose';

const Model = ({ setModelInactive, activeModels, id, title, content }) => {
    const UUID_Background = useRef(generateUUID());
    const UUID_CloseButton = useRef(generateUUID());

    const isEnabled = useCallback(() => {
        return activeModels.some((modelId) => modelId === id);
    }, [activeModels, id]);

    const getIndex = useCallback(() => {
        return Math.abs(activeModels.findIndex((modelId) => modelId === id)) + 1;
    }, [activeModels, id]);

    useEffect(() => {
        const hideModel = () => {
            setModelInactive(id);
        }
        const modelContainer = document.getElementById(UUID_Background.current);
        const closeButton = document.getElementById(UUID_CloseButton.current);
        modelContainer.addEventListener("click", hideModel, false);
        modelContainer.addEventListener("touchend", hideModel, false);
        closeButton.addEventListener("click", hideModel, false);
        closeButton.addEventListener("touchend", hideModel, false);
        return () => {
            modelContainer.removeEventListener("click", hideModel, false);
            modelContainer.removeEventListener("touchend", hideModel, false);
            closeButton.removeEventListener("click", hideModel, false);
            closeButton.removeEventListener("touchend", hideModel, false);
        }
    }, [setModelInactive, id]);

    return (
        <div>
            <BackgroundPopup id={UUID_Background.current} enable={isEnabled()} index={getIndex()} />
            <Popup enable={isEnabled()} index={getIndex()}>
                <TopBar>
                    <Title>{title}</Title>
                    <CloseButtonContainer>
                        <IconButton id={UUID_CloseButton.current} icon={AddIcon} color={colors.BLACK} fontSize="30px" round={false} />
                    </CloseButtonContainer>
                </TopBar>
                <MiddleContainer>
                    {content}
                </MiddleContainer>
            </Popup>
        </div>
    )
}

const mapStateToProps = state => {
    return { activeModels: state.modelReducer.activeModels };
};

const mapDispatchToProps = {
    setModelInactive,
}

const CloseButtonContainer = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`

const Popup = styled.div`
    position: absolute;
    text-align: left;
    max-width: 70%;
    top: ${props => props.enable ? "10%" : "-1000px"};
    z-index: ${props => props.index};
    border-radius: 10px;
    left: 50%;
    transform: translate(-50%, 0%);
    background-color: ${colors.WHITE};
    box-shadow: 0px 2px 5px 0px ${colors.BLACK};
    transition: top 0.5s linear;

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
    z-index: ${props => props.index};
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: ${props => props.enable ? colors.TRANSPARENT_80 : colors.TRANSPARENT};
    visibility: ${props => props.enable ? "visible" : "hidden"}
    transition: visibility 0.1s ${props => props.enable ? "0s" : "0.5s"} linear, background-color 0.4s linear;
`

const areEqual = (prevProps, nextProps) => {
    return true;
}

const MemoModel = memo(connect(mapStateToProps, mapDispatchToProps)(Model), areEqual)
export default MemoModel;
