import React from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import colorChanger from "../../../utils/colorChanger";
import DefaultIcon from 'react-ionicons/lib/MdAlert';

const IconButton = ({ id, icon = DefaultIcon, fontSize = "20px", round = false, colors, darkmode }) => {
    const StyledIcon = styled(icon)`
        transition: background-color 0.2s linear;
        border-radius: ${props => props.round ? "100px" : "0px"};
        box-shadow: inset 0px 0px 7px 15px ${props => props.colors.INSET_SHADOW};
        -webkit-tap-highlight-color: transparent;
        &:hover{
            background-color: ${props => colorChanger(props.colors.INSET_SHADOW, darkmode ? 0.1 : -0.1)};
            cursor: pointer;
        }
        &:active{
            background-color: ${props => colorChanger(props.colors.INSET_SHADOW, darkmode ? 0.2 : -0.2)};
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
            <StyledIcon fontSize={fontSize} color={colors.MAIN} colors={colors} round={round} />
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