import React, {memo} from "react";
import styled from 'styled-components';
import { Switch } from "react-router-dom";
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
import { CalendarPage, ConfigPage, DayPage, EventEditPage, EventPage, HomePage, NoteEditPage, NotesPage, StoragePage } from '../constants/pages';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import '../css/dashboardTransition.css';

const DashboardRoutes = ({ history, removeAllModels }) => {
    removeAllModels();
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
                            <PublicRoute exact path={"/dashboard/home"} render={(routeProps) => {
                                return <HomePage history={history} {...routeProps} />
                            }} />
                            <PrivateRoute exact path={"/dashboard/notes/noteedit/:id"} render={(routeProps) => {
                                return <NoteEditPage history={history} {...routeProps} />
                            }} />
                            <PrivateRoute exact path={"/dashboard/calendar/:date"} render={(routeProps) => {
                                return <DayPage history={history} {...routeProps} />
                            }} />
                            <PrivateRoute exact path={"/dashboard/calendar/:date/events/:id/eventedit"} render={(routeProps) => {
                                return <EventEditPage history={history} {...routeProps} />
                            }} />
                            <PrivateRoute exact path={"/dashboard/calendar/:date/createevent/:time"} render={(routeProps) => {
                                return <EventEditPage history={history} {...routeProps} />
                            }} />
                            <PrivateRoute exact path={"/dashboard/calendar/:date/events/:id"} render={(routeProps) => {
                                return <EventPage history={history} {...routeProps} />
                            }} />
                            <PrivateRoute exact path={"/dashboard/notes/createnote"} render={(routeProps) => {
                                return <NoteEditPage history={history} {...routeProps} />
                            }} />
                            <PrivateRoute exact path={"/dashboard/calendar"} render={(routeProps) => {
                                return <CalendarPage history={history} {...routeProps} />
                            }} />
                            <PrivateRoute exact path={"/dashboard/notes"} render={(routeProps) => {
                                return <NotesPage history={history} {...routeProps} />
                            }} />
                            <PrivateRoute exact path={"/dashboard/storage"} render={(routeProps) => {
                                return <StoragePage history={history} {...routeProps} />
                            }} />
                            <PrivateRoute exact path={"/dashboard/config"} render={(routeProps) => {
                                return <ConfigPage history={history} {...routeProps} />
                            }} />
                        </Switch>
                    </section>
                </CSSTransition>
            </TransitionGroup>
        </Wrapper >
    );
}

const Wrapper = styled.div`
`;

let url = window.location.href;

const areEqual = (prevProps, nextProps) => {
    if(url === window.location.href) return true;
    url = window.location.href;
    return false;
}

const MemoDashboardRoutes = memo(DashboardRoutes, areEqual)
export default MemoDashboardRoutes;