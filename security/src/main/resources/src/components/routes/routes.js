import React from "react";
import { Switch } from "react-router-dom";
import PublicRoute from './publicRoute';

//pages
import Authentication from '../pages/authenticationPage';

const Routes = () => {
    return (
        <Switch>
            <PublicRoute path="/login" render={(routeProps) => {
                return <Authentication ToggleLogin={true} {...routeProps} />
            }} />
            <PublicRoute path="/register" render={(routeProps) => {
                return <Authentication ToggleLogin={false} {...routeProps} />
            }} />
        </Switch>
    );
}

export default Routes;