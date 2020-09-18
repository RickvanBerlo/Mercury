import React, {Suspense, lazy} from "react";
import { Switch, Redirect } from "react-router-dom";
import PublicRoute from './publicRoute';

//pages
const Dashboard = lazy(() => import('../pages/dashboardPage'));
const CurriculemVitae = lazy(() => import('../pages/curriculemViteaLoadingPage'));

const Routes = () => {
    return (

        <Suspense fallback={<div/>}>
            <Switch>
                <PublicRoute exact path="/" component={CurriculemVitae} />
                <PublicRoute exact path="/silent-check-sso.html"/>
                <PublicRoute path="/login" render={(routeProps) => {
                    return <Redirect to={"/dashboard/home"} />
                }} />
                    <PublicRoute path={"/dashboard/*"} render={(routeProps) => {
                    return <Dashboard {...routeProps} />
                }} />
            </Switch>
        </Suspense >
    );
}

export default Routes;