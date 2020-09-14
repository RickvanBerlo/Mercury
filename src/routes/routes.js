import React, {Suspense, lazy} from "react";
import styled from 'styled-components';
import { Switch, Redirect } from "react-router-dom";
import PublicRoute from './publicRoute';
import background from '../assets/background.webp';

//pages
const Dashboard = lazy(() => import('../pages/dashboardPage'));
const CurriculemVitae = lazy(() => import('../pages/curriculemViteaPage'));

const Routes = () => {
    return (
        <Suspense fallback={<Container background={background}></Container>}>
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
        </Suspense>
    );
}

const Container = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    background: url(${background}) no-repeat center center fixed;
    background-size: cover;
`

export default Routes;