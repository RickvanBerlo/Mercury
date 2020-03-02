import React, { useState } from "react";
import styled from 'styled-components';
import SideMenu from '../components/sideMenu/sideMenu';
import SnackBar from '../components/notification/snackbar';
import PageLoader from './pageLoader';
import sideMenuButtons from '../constants/sideMenuButtons';

const Dashboard = ({ history }) => {
    const [snackbarText, setSnackBarText] = useState("Goede morgen Rick");
    const [currentPage, setCurrentPage] = useState(1);
    const [previousPage, setPreviousPage] = useState(null);
    const [currentPageParam, setCurrentPageParam] = useState({});

    const changePage = (page, param = {}) => {
        setPreviousPage(currentPage);
        setCurrentPage(page);
        setCurrentPageParam(param);
    }

    return (
        <Container>
            <PageLoader history={history} nextPage={currentPage} previousPage={previousPage} setCurrentPage={changePage} currentPageParam={currentPageParam} />
            <SideMenu history={history} setCurrentPage={changePage} sideMenuButtons={sideMenuButtons} />
            <SnackBar text={snackbarText} setText={setSnackBarText} timeInSeconds={3} />
        </Container>
    )
}

const Container = styled.div`
`

export default Dashboard;