import React, { useEffect} from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from '../stores/keycloak/keycloakActions';
import Keycloak from 'keycloak-js';
import props from '../constants/keycloak';

const PrivateRoute = ({ component, login, keycloak, authenticated, ...rest }) => {
    useEffect(() => {
        if(!authenticated){
            const keycloak = Keycloak(props);
            keycloak.updateToken(props.refreshTokenTime);
            keycloak.init().success(function (authenticated) {
                if(!authenticated)
                    keycloak.login();
                else{
                    login(keycloak);
                }
            }).error(function () {
                alert('failed to initialize');
            });
        }
    }, [login, authenticated])

    return (
        keycloak === null ?
            <div></div>
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

