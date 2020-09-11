import React, { memo, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import GeneralConfig from '../components/configurations/generalConfig';
import HomeConfig from '../components/configurations/homeConfig';
import { savePreferences } from '../stores/preferences/preferencesActions';

const Config = ({ state, savePreferences }) => {
    const currentState = useRef(state);

    useEffect(() => {
        currentState.current = state;
    }, [state])

    useEffect(() => {
        return () => {
            savePreferences(currentState.current)
        }
    }, [savePreferences])
    return (
        <Container colors={state.colors}>
            <TopBar colors={state.colors}>
                <TitleContainer>
                    <Title color={state.colors.MAIN}>Config</Title>
                </TitleContainer>
            </TopBar>
            <Content colors={state.colors}>
                <GeneralConfig/>
                <HomeConfig/>
            </Content>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    text-align: center;
    background-color: ${props => props.colors.PRIMARY};
    transition: background-color 0.3s linear;
`
const Content = styled.div`
    position: fixed;
    top: 50px;
    width: 100%;
    overflow: scroll;
    background-color: ${props => props.colors.PRIMARY};
    transition: background-color 0.3s linear;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    height: calc(100% -  50px);
    &::-webkit-scrollbar {
        display: none;
    }
`

const Title = styled.p`
    font-size: 25px;
    width: 100vw;
    margin: auto;
    line-height: 50px;
    overflow: hidden;
    color: ${props => props.color};
`

const TitleContainer = styled.div`
    text-align:center;
`

const TopBar = styled.div`
    position: fixed;
    justify-content: space-between;
    z-index: 1;
    display: flex;
    width: 100vw;
    height: 50px;
    background-color: ${props => props.colors.SECONDARY};
    transition: background-color 0.3s linear;
    box-shadow: 0px 2px 5px 0px black;
`

const areEqual = (prevProps, nextProps) => {
    return true;
}

const mapStateToProps = state => {
    return { state: state.preferencesReducer};
};

const mapDispatchToProps = {
    savePreferences
}

const MemoConfig = memo(connect(mapStateToProps, mapDispatchToProps)(Config), areEqual)
export default MemoConfig;