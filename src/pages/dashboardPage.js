import React, { useState } from "react";
import styled from 'styled-components';
import SideMenu from '../components/sideMenu/sideMenu';
import SnackBar from '../components/notification/snackbar';
import sideMenuButtons from '../constants/sideMenuButtons';

const Dashboard = ({ history }) => {
    const [snackbarText, setSnackBarText] = useState("Good Morning");
    const [currentPage, setCurrentPage] = useState(0);

    const Page = sideMenuButtons[currentPage].PAGE;

    return (
        <Container>
            <Page />
            <SideMenu history={history} setCurrentPage={setCurrentPage} sideMenuButtons={sideMenuButtons} />
            <SnackBar text={snackbarText} setText={setSnackBarText} timeInSeconds={3} />
        </Container>
    )
}

const Container = styled.div`
`

export default Dashboard;