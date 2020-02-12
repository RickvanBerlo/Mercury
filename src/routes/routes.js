import React from "react";
import {
    Switch
} from "react-router-dom";
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';

//pages
import LogIn from '../pages/logInPage';
import Register from '../pages/registerPage';
import Dashboard from '../pages/dashboardPage';
import CurriculemVitae from "../pages/curriculemViteaPage";

const Routes = () => {
    return (
        <Switch>
            <PublicRoute exact path="/" component={CurriculemVitae} />
            <PublicRoute path="/login" component={LogIn} />
            <PublicRoute path="/register" component={Register} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PublicRoute component={CurriculemVitae} />
        </Switch>
    );
}

export default Routes;