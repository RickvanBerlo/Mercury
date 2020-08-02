import React from 'react';
import styled from 'styled-components';
import colors from '../../../constants/colors';
import DefaultIcon from 'react-ionicons/lib/MdAlert';

const IconButton = ({ id, icon = DefaultIcon, fontSize = "40px", color = colors.WHITE }) => {
    const StyledIcon = styled(icon)`
        transition: fill .3s linear;
        margin: 5px;
        &:hover{
            fill: ${colors.LIGHT_GREEN}
            cursor: pointer;
        }
    `
    if (id === undefined) throw new Error("IconButton: The id param is empty");
    return (
        <Container id={id} fontSize={fontSize}>
            <StyledIcon fontSize={fontSize} color={color} />
        </Container>
    );
}

const Container = styled.div`
    height: ${props => props.fontSize};

`
export default IconButton;