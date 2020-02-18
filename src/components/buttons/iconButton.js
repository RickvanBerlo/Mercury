import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import colors from '../../constants/colors';

const IconButton = ({ icon = ['fab', 'github'], padding = "20px", size = "2x", color = colors.DARK_GRAY, onClick = () => { console.log("no function") } }) => {
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
    display: block;
    cursor: pointer;
    height: auto;
    padding-left: ${props => props.padding};
    padding-right: ${props => props.padding};
    width: auto;
    -webkit-tap-highlight-color: transparent;
    &:hover ${StyledIcon} {
        color: ${colors.LIGHT_GREEN};
    }
    @media (max-width: 767px) {
        &:hover ${StyledIcon} {
            color: ${colors.WHITE};
        }
        &:active ${StyledIcon} {
            color: ${colors.LIGHT_GREEN} 
        }
    }
    
`
export default IconButton;