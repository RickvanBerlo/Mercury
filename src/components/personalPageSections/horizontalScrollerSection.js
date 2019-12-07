import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import image from '../../assets/profilepic.jpg';
import colors from '../../constants/colors';
import screenResolution from '../../utils/screenResolution';
import Background from '../../assets/projectsBackground.jpeg';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const HorizontalScrollerSection = ({ items = [], createItem = () => { console.error("no createItem function is given") }, onSelect = () => { console.error("no onSelect function is given") } }) => {
    const { height, width } = screenResolution();
    return (
        <Container width={width}>
            <ScrollMenu
                data={Menu(items, createItem)}
                arrowLeft={<StyledIcon icon={"arrow-left"} size={"2x"} color={colors.WHITE} />}
                arrowRight={<StyledIcon icon={"arrow-right"} size={"2x"} color={colors.WHITE} />}
                onSelect={onSelect}
            />
        </Container>
    );
}

const Menu = (items, createItem) => {
    return items.map((item, index) => {
        return createItem(item, index);
    });
}

//styles
const StyledIcon = styled(FontAwesomeIcon)`
  color: ${props => props.color};
  padding: 10px;
  transition: color 0.5s linear; /* vendorless fallback */
    -o-transition: color 0.3s linear; /* opera */
    -ms-transition: color 0.3s linear; /* IE 10 */
    -moz-transition: color 0.3s linear; /* Firefox */
    -webkit-transition: color 0.3s linear; /*safari and chrome */
    &:hover {
        color:#0676F6;
    }
`

const Container = styled.div`
    width: ${props => props.width};
    padding-top: 100px;
    padding-bottom: 100px;
    background: ${colors.DARK_GRAY} url(${Background});
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
`

export default HorizontalScrollerSection;
