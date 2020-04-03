import React, { useState, useRef } from "react";
import styled from 'styled-components';
import SideMenu from '../components/sideMenu/sideMenu';
import SnackBar from '../components/notification/snackbar';
import PageLoader from './pageLoader';
import { getAllSideMenuButtonPages } from '../utils/pageSelector';
import { pageNames } from '../constants/pages';
import Storage from '../storage/storage';

const Dashboard = ({ history }) => {
    const [snackbarText, setSnackBarText] = useState("Goedemorgen Rick");
    const [currentPage, setCurrentPage] = useState(pageNames.DAY);
    const [previousPage, setPreviousPage] = useState(null);
    const [currentPageParam, setCurrentPageParam] = useState({});
    const storage = useRef(new Storage());

    const changePage = (name, param = {}) => {
        setPreviousPage(currentPage);
        setCurrentPage(name);
        setCurrentPageParam(param);
    }

    return (
        <Container>
            <PageLoader history={history} nextPage={currentPage} previousPage={previousPage} setCurrentPage={changePage} currentPageParam={currentPageParam} storage={storage.current} />
            <SideMenu history={history} setCurrentPage={changePage} sideMenuButtons={getAllSideMenuButtonPages()} />
            <SnackBar text={snackbarText} setText={setSnackBarText} timeInSeconds={3} />
        </Container>
    )
}

const Container = styled.div`
`

export default Dashboard;