import React from 'react';
import styled from 'styled-components';
import image from '../../assets/profilepic.jpg';
import colors from '../../constants/colors';
import strings from '../../constants/strings';

const EndSection = ({ name }) => {
    return (
        <Container id={name}>
        </Container >
    );
}

//styles

const Container = styled.div`
    text-align: center;
    background-color: ${colors.DARK_GRAY};
    height: 780px;
`



export default EndSection;
