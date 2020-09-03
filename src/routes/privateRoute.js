import React, { useEffect} from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import styled from 'styled-components';
import colors from '../constants/colors';
import { login } from '../stores/keycloak/keycloakActions';
import BackgroundImage from '../components/backgroundImage/backgroundImage';
import backgroundImage from '../assets/background.webp';
import mobileBackgroundImage from '../assets/backgroundmobile.webp';
import Keycloak from 'keycloak-js';
import props from '../constants/keycloak';

const PrivateRoute = ({ component, login, keycloak, authenticated, ...rest }) => {
    useEffect(() => {
        if(!authenticated){
            const keycloak = Keycloak(props);
            keycloak.updateToken(props.refreshTokenTime);
            keycloak.init().then(function (authenticated) {
                if(!authenticated)
                    keycloak.login();
                else{
                    login(keycloak);
                }
            }).catch(function () {
                alert('failed to initialize');
            });
        }
    }, [login, authenticated])

    return (
        keycloak === null ?
            <Container><BackgroundImage backgroundImage={backgroundImage} mobileBackgroundImage={mobileBackgroundImage}></BackgroundImage></Container>
        :
            authenticated ?
            <Route
                {...rest}
                component={component}
            /> :
            <Redirect
                to='/'
            />
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
        authenticated: state.keycloakReducer.authenticated,
        keycloak: state.keycloakReducer.keycloak,
    };
};

const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);

