import React from 'react';
import styled from 'styled-components';
import DefaultIcon from 'react-ionicons/lib/MdAlert';

const IconButton = ({ id, icon = DefaultIcon, fontSize = "40px", color = "#FFFFFF", hoverColor = "#0cd0d0" }) => {
    const StyledIcon = styled(icon)`
        transition: fill .3s linear;
        margin: 5px;
        &:hover{
            fill: ${hoverColor}
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