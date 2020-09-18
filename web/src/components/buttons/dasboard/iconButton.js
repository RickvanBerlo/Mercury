import React from 'react';
import { connect } from "react-redux";
import styled, {css} from 'styled-components';
import colorChanger from "../../../utils/colorChanger";
import DefaultIcon from 'react-ionicons/lib/MdAlert';

const IconButton = ({ id, icon = DefaultIcon, fontSize = 20, round = false, color, colors, darkmode, hoverColor = "#0cd0d0", shadow= true }) => {
    const StyledIcon = styled(icon)`
        transition: background-color 0.2s linear, fill .3s linear;
        border-radius: ${props => props.round ? "100px" : "0px"};
        box-shadow: ${props => props.shadow ? css`inset 0px 0px ${fontSize / 5}px ${fontSize / 4}px ${props => props.colors.INSET_SHADOW}` : `none`} 
        -webkit-tap-highlight-color: transparent;
        &:hover{
            fill: ${hoverColor}
            background-color: ${props => props.shadow ? css`${colorChanger(props.colors.INSET_SHADOW, darkmode ? 0.1 : -0.1)}`: `transparent`};
            cursor: pointer;
        }
        &:active{
            background-color: ${props => props.shadow ? css`${colorChanger(props.colors.INSET_SHADOW, darkmode ? 0.2 : -0.2)}` : `transparent`};
        }
        @media (max-width: 767px) {
            &:hover{
                background-color: white;
            }
            &:active{
                background-color: ${props => props.colors.SECONDARY};
            }
        }
    `
    if (id === undefined) throw new Error("IconButton: The id param is empty");
    return (
        <Container id={id} fontSize={fontSize}>
            <StyledIcon fontSize={fontSize + "px"} color={color ? color : colors.MAIN} colors={colors} round={round} shadow={shadow} />
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        colors: state.preferencesReducer.colors,
        darkmode: state.preferencesReducer.darkmode,
    };
};

const Container = styled.div`
    height: ${props => props.fontSize};

`
export default connect(mapStateToProps, undefined)(IconButton);