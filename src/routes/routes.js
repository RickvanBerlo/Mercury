import React from "react";
import { Switch } from "react-router-dom";
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
            <PublicRoute path="/login" render={(routeProps) => {
                return <Authentication ToggleLogin={true} {...routeProps} />
            }} />
            <PublicRoute path="/register" render={(routeProps) => {
                return <Authentication ToggleLogin={false} {...routeProps} />
            }} />
            <PrivateRoute path={"/*"} render={(routeProps) => {
                return <Dashboard {...routeProps} />
            }} />
        </Switch>
    );
}

export default Routes;