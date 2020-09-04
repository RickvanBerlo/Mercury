import React, {Suspense, lazy} from "react";
import styled from 'styled-components';
import { Switch, Redirect } from "react-router-dom";
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
import background from '../assets/background.webp';
import colors from '../constants/colors';

//pages
const Dashboard = lazy(() => import('../pages/dashboardPage'));
const CurriculemVitae = lazy(() => import('../pages/curriculemViteaPage'));

const Routes = () => {
    return (
        <Suspense fallback={<Container background={background}></Container>}>
        <Switch>
            <PublicRoute exact path="/" component={CurriculemVitae} />
            <PublicRoute path="/login" render={(routeProps) => {
                return <Redirect to={"/dashboard/home"} />
            }} />
            <PrivateRoute path={"/dashboard/*"} render={(routeProps) => {
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
    background: url(${props => props.background}) bottom;
    background-size: 100vw;
    background-repeat: no-repeat;
    background-color: ${colors.HEADER_BACKGROUND_COLOR};
`

export default Routes;