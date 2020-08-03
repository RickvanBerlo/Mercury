import React, { useState } from "react";
import styled from 'styled-components';
import SideMenu from '../components/sideMenu/sideMenu';
import DashboardRoutes from '../routes/dashboardRoutes';
import SnackBar from '../components/notification/snackbar';
import { getAllSideMenuButtonPages } from '../utils/pageSelector';

const Dashboard = ({ history }) => {
    const [snackbarText, setSnackBarText] = useState("Goedemorgen Rick");

    return (
        <Container>
            <DashboardRoutes history={history} setSnackBarText={setSnackBarText} />
            <SideMenu history={history} sideMenuButtons={getAllSideMenuButtonPages()} />
            <SnackBar text={snackbarText} setText={setSnackBarText} timeInSeconds={3} />
        </Container>
    )
}

const Container = styled.div`
`

export default Dashboard;