import React from 'react';
import styled from 'styled-components';
import colors from '../../constants/colors';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const HorizontalScroller = ({ items = [], createItem = () => { console.error("no createItem function is given") }, onSelect = () => { console.error("no onSelect function is given") } }) => {
    return (
        <ScrollMenu
            data={Menu(items, createItem)}
            arrowLeft={<StyledIcon icon={"arrow-left"} size={"2x"} color={colors.WHITE} />}
            arrowRight={<StyledIcon icon={"arrow-right"} size={"2x"} color={colors.WHITE} />}
            onSelect={onSelect}
            itemStyle={{ padding: "0px 15px", outline: "none" }}
            alignCenter={true}
            wheel={false}
        />
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
    @media (max-width: 767px) {
        &:hover{
            color: ${colors.WHITE};
        }
        &:active {
            color: ${colors.BLUE} 
        }
    }
`
export default HorizontalScroller;
