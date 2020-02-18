import React from "react";
import {
    Switch
} from "react-router-dom";
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';

//pages
import Authentication from '../pages/authenticationPage';
import Dashboard from '../pages/dashboardPage';
import CurriculemVitae from "../pages/curriculemViteaPage";

const Routes = () => {
    return (
        <Switch>
            <PublicRoute exact path="/" component={CurriculemVitae} />
            <PublicRoute path="/authentication" render={(routeProps) => {
                return <Authentication ToggleLogin={true} {...routeProps} />
            }} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PublicRoute component={CurriculemVitae} />
        </Switch>
    );
}

export default Routes;