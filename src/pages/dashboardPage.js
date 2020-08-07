import React, { useState } from "react";
import styled from 'styled-components';
import SideMenu from '../components/sideMenu/sideMenu';
import DashboardRoutes from '../routes/dashboardRoutes';
import SnackBar from '../components/notification/snackbar';
import { getAllSideMenuButtonPages } from '../utils/pageSelector';

const Dashboard = ({ history }) => {

    return (
        <Container>
            <DashboardRoutes history={history} />
            <SideMenu history={history} sideMenuButtons={getAllSideMenuButtonPages()} />
            <SnackBar />
        </Container>
    )
}

const Container = styled.div`
`

export default Dashboard;