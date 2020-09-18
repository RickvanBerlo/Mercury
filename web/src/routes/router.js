import React, {useEffect} from "react";
import {
    BrowserRouter,
} from "react-router-dom";
import Routes from './routes';
import { connect } from "react-redux";
import { init } from '../stores/keycloak/keycloakActions';


const Router = ({ init, keycloak}) => {
    useEffect(() => {
        init(keycloak);
    }, [keycloak, init])
    
    return (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    );
}

const mapStateToProps = state => {
    return {
        keycloak: state.keycloakReducer.keycloak,
    };
};

const mapDispatchToProps = {
    init
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);