import React, { memo } from "react";
import { connect } from "react-redux";
import colors from '../../constants/colors';
import styled from 'styled-components';
import BaseConfig from './baseConfig';
import SliderButton from '../buttons/dasboard/sliderButton';
import { changeDarkmode } from '../../stores/preferences/preferencesActions';

const GeneralConfig = ({ changeDarkmode, darkmode }) => {
    const onChangeDarkmode = (bool) => {
        changeDarkmode(bool);
    }

    const createContent = () => {
        return (
            <Container>
                <ItemContainer>
                    <Description position="left">Darkmode</Description>
                    <SliderButton onChange={onChangeDarkmode} checked={darkmode}/>
                </ItemContainer>
            </Container>
        )
    }

    return (
        <BaseConfig title="General" content={createContent()} maxHeight="60px" />
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
`

const areEqual = (prevProps, nextProps) => {
    return true;
}

const mapStateToProps = state => {
    return { darkmode: state.preferencesReducer.darkmode  };
};

const mapDispatchToProps = {
    changeDarkmode
}

const MemoGeneralConfig = memo(connect(mapStateToProps, mapDispatchToProps)(GeneralConfig), areEqual)
export default MemoGeneralConfig;