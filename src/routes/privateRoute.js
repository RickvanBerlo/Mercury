import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component, ...rest }) => {
    //check if logged in
    const login = true;

    return (
        login ?
            <Route
                {...rest}
                component={component}
            /> :
            <Redirect
                to='/authentication'
            />
    )
}

export default PrivateRoute;

