import React from "react";
import { Route } from "react-router-dom";

const PublicRoute = ({ component, ...rest }) => {
    return (
        <Route
            {...rest}
            component={component}
        />
    )
}

export default PublicRoute;

