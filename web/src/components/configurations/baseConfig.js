import React, { useState } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';

import ArrowDownIcon from 'react-ionicons/lib/MdArrowDropdown';

const StyledIcon = styled(ArrowDownIcon)`
    transition: all 0.2s linear;
    position: absolute;
    top: 0;
    right: 0;
    margin: 7.5px;
    transform: ${props => props.bool ? "rotate(180deg)" : "none"};
    &:hover{
        transform: ${props => props.bool ? "rotate(180deg) scale(1.4)" : "scale(1.4)"};
        cursor: pointer;
    }
`

const BaseConfig = ({ title, content, maxHeight, colors }) => {
    const [open, setOpen] = useState(false);

    const onHeaderClick = (e) => {
        setOpen(!open);
    }

    return (
        <Container>
            <Header onClick={onHeaderClick}>
                <Title color={colors.MAIN}>{title}</Title>
                <StyledIcon bool={open} fontSize="30px" color={colors.MAIN} />
            </Header>
            <ContentContainer shadow={colors.SHADOW} bool={open} maxHeight={maxHeight}>
                {content}
            </ContentContainer>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: fit-content;
    position: relative;
`
const Title = styled.h3`
    line-height: 45px;
    margin: 0;
    font-size: 20px;
    color: ${props => props.color}
`

const ContentContainer = styled.div`
    width: 100vw;
    max-height: ${props => props.bool ? props.maxHeight : "0px"};
    box-shadow: inset 0px 0px 4px ${props => props.shadow}, inset 0px 0px 4px ${props => props.shadow};
    overflow: hidden;
    transition: max-height 0.3s ease-in-out, box-shadow 0.3s linear;
`

const Header = styled.div`
    height: 45px;
    width: 100vw;
    border-bottom: 0.5px solid black;
    &:hover{
        cursor: pointer;
    }
`
const mapStateToProps = state => {
    return {
        colors: state.preferencesReducer.colors
    };
};

export default connect(mapStateToProps, undefined)(BaseConfig);