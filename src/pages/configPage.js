import React, { memo, useEffect, useRef } from "react";
import { connect } from "react-redux";
import colors from '../constants/colors';
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
        <Container>
            <TopBar>
                <TitleContainer>
                    <Title>Config</Title>
                </TitleContainer>
            </TopBar>
            <Content>
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
`
const Content = styled.div`
    position: fixed;
    top: 50px;
    width: 100%;
    overflow: scroll;
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
    color: ${colors.DARK_GREEN};
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
    box-shadow: 0px 2px 5px 0px ${colors.BLACK};
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