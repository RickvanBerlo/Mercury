import React, { useState } from "react";
import styled from 'styled-components';
import SideMenu from '../components/sideMenu/sideMenu';
import SnackBar from '../components/notification/snackbar';
import PageLoader from './pageLoader';
import sideMenuButtons from '../constants/sideMenuButtons';

const Dashboard = ({ history }) => {
    const [snackbarText, setSnackBarText] = useState("Goede morgen Rick");
    const [currentPage, setCurrentPage] = useState(0);
    const [previousPage, setPreviousPage] = useState(null);

    const changePage = (page) => {
        setPreviousPage(currentPage);
        setCurrentPage(page);
    }

    return (
        <Container>
            <PageLoader history={history} nextPage={currentPage} previousPage={previousPage} />
            <SideMenu history={history} setCurrentPage={changePage} sideMenuButtons={sideMenuButtons} />
            <SnackBar text={snackbarText} setText={setSnackBarText} timeInSeconds={3} />
        </Container>
    )
}

const Container = styled.div`
`

export default Dashboard;