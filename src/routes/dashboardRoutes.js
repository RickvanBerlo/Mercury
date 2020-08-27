import React from "react";
import styled from 'styled-components';
import { Switch } from "react-router-dom";
import PrivateRoute from './privateRoute';
import { pageNames, pages } from '../constants/pages';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import '../css/dashboardTransition.css';

const DashboardRoutes = ({ history }) => {
    const createPrivateRoutes = () => {
        const privateRoutes = [];
        for (const key in pageNames) {
            const Page = pages[pageNames[key]].PAGE;
            privateRoutes.push(
                <PrivateRoute key={key} path={"/dashboard/" + pageNames[key]} render={(routeProps) => {
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