import React, { memo } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import BaseConfig from './baseConfig';
import SliderButton from '../buttons/dasboard/sliderButton';
import { changeClock } from '../../stores/preferences/preferencesActions';

const HomeConfig = ({ changeClock, clock, colors }) => {
    const onChangeClock = (bool) => {
        changeClock(bool);
    }

    const createContent = () => {
        return (
            <Container>
                <ItemContainer>
                    <Description color={colors.TEXT} position="left">Analog Clock</Description>
                    <SliderButton onChange={onChangeClock} checked={clock}/>
                    <Description color={colors.TEXT} position="right">Digital Clock</Description>
                </ItemContainer>
            </Container>
        )
    }

    return (
        <BaseConfig title="Home" content={createContent()} maxHeight="60px" />
    )
}

const Container = styled.div`
    height: fit-content;
    margin: auto;
    margin-top: 5px;
    margin-bottom: 5px;
    max-width: 600px;
    padding-left: 20px;
    padding-right: 20px;
    text-align: left;
`

const ItemContainer = styled.div`
    display: flex;
    height: 50px;
`

const Description = styled.p`
    font-size: 18px;
    line-height: 50px;
    flex: 1;
    margin: 0;
    text-align: ${props => props.position};
    color: ${props => props.color};
    transition: color 0.3s linear; 
`


const areEqual = (prevProps, nextProps) => {
    return true;
}

const mapStateToProps = state => {
    return { 
        clock: state.preferencesReducer.clock,
        colors: state.preferencesReducer.colors  
    };
};

const mapDispatchToProps = {
    changeClock
}

const MemoHomeConfig = memo(connect(mapStateToProps, mapDispatchToProps)(HomeConfig), areEqual)
export default MemoHomeConfig;