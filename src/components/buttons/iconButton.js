import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconButton = ({ icon = "times", padding = "20px", size = "2x", color = "black", onClick = () => { console.log("no function") } }) => {
    return (
        <Container padding={padding} onClick={onClick}>
            <StyledIcon icon={icon} size={size} color={color} />
        </Container>
    );
}

//styles
const StyledIcon = styled(FontAwesomeIcon)`
  color: ${props => props.color};
  transition: color 0.5s linear; /* vendorless fallback */
    -o-transition: color 0.3s linear; /* opera */
    -ms-transition: color 0.3s linear; /* IE 10 */
    -moz-transition: color 0.3s linear; /* Firefox */
    -webkit-transition: color 0.3s linear; /*safari and chrome */
`
const Container = styled.a`
    display: inline-block !important;
    text-align: center; 
    font: 15px 'opensans-bold',sans-serif;
    display: block;
    cursor: pointer;
    height: auto;
    padding-left: ${props => props.padding};
    padding-right: ${props => props.padding};
    width: auto;
    &:hover ${StyledIcon} {
     color:#0676F6;
   }
    
`
export default IconButton;