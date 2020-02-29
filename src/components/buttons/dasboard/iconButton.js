import React from 'react';
import styled from 'styled-components';
import colors from '../../../constants/colors';
import DefaultIcon from 'react-ionicons/lib/MdAlert';

const IconButton = ({ id, icon = DefaultIcon, fontSize = "20px", color = colors.DARK_GREEN }) => {
    const StyledIcon = styled(icon)`
        transition: background-color 0.2s linear;
        box-shadow: inset 0px 0px 10px 10px ${colors.WHITE};
        -webkit-tap-highlight-color: transparent;
        &:hover{
            background-color: ${colors.GRAY}
            cursor: pointer;
        }
        &:active{
            background-color: ${colors.DARK_GRAY};
        }
        @media (max-width: 767px) {
            &:hover{
                background-color: ${colors.WHITE};
            }
            &:active{
                background-color: ${colors.GRAY};
            }
        }
    `
    if (id === undefined) throw new Error("IconButton: The id param is empty");;
    return (
        <Container id={id} >
            <StyledIcon id="calendar_next" fontSize={fontSize} color={color} />
        </Container>
    );
}

const Container = styled.a`

`
export default IconButton;