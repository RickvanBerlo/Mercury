import React from "react";
import styled from 'styled-components';
import { Switch } from "react-router-dom";
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
import { pages } from '../constants/pages';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import '../css/dashboardTransition.css';

const DashboardRoutes = ({ history }) => {
    const createPrivateRoutes = () => {
        const privateRoutes = [];
        for (const key in pages) {
            const Page = pages[key].PAGE;
            privateRoutes.push(
                pages[key].PUBLIC === true ? 
                    <PublicRoute exact key={key} path={"/dashboard/" + key} render={(routeProps) => {
                        return <Page history={history} {...routeProps} />
                    }} />
                :
                <PrivateRoute exact key={key} path={"/dashboard/" + key} render={(routeProps) => {
                    return <Page history={history} {...routeProps} />
                }} />
            )
        }
        return privateRoutes;
    }
    return (
        <Wrapper>
            <TransitionGroup>
                <CSSTransition
                    key={history.location.key}
                    timeout={{ enter: 600, exit: 300 }}
                    classNames="fade"
                >
                    <section className="route-section">
                        <Switch location={history.location}>
                            {createPrivateRoutes()}
                        </Switch>
                    </section>
                </CSSTransition>
            </TransitionGroup>
        </Wrapper >
    );
}

const Wrapper = styled.div`
`;

export default DashboardRoutes;