import React, { useEffect} from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import styled from 'styled-components';
import colors from '../constants/colors';
import { login } from '../stores/keycloak/keycloakActions';
import BackgroundImage from '../components/backgroundImage/backgroundImage';
import backgroundImage from '../assets/background.webp';

const PrivateRoute = ({ component, login, keycloak, init, authenticated, ...rest }) => {
    useEffect(() => {
        if (init && !keycloak.authenticated){
            login();
        }
    }, [login, init, keycloak])

    return (
        keycloak.authenticated ?
            <Route
                {...rest}
                component={component}
            /> 
        :
            <Container><BackgroundImage backgroundImage={backgroundImage}></BackgroundImage></Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    text-align: center;
    background-image: linear-gradient(${colors.HEADER_BACKGROUND_COLOR} 80%, ${colors.DARK_GRAY} 1%, ${colors.DARK_GRAY});
`

const mapStateToProps = state => {
    return { 
        init: state.keycloakReducer.init,
        keycloak: state.keycloakReducer.keycloak,
    };
};

const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);

