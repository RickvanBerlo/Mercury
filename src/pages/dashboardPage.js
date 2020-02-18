import React, { useState } from "react";
import styled from 'styled-components';
import SideMenu from '../components/sideMenu/sideMenu';
import colors from '../constants/colors';
import SnackBar from '../components/animations/notification/snackbar';

const Dashboard = ({ history }) => {
    const [snackbarText, setSnackBarText] = useState("Good Morning");
    const [currentPage, setCurrentPage] = useState("");
    console.log(history);
    return (
        <Container>
            <SideMenu setCurrentPage={setCurrentPage} />
            <SnackBar text={snackbarText} setText={setSnackBarText} timeInSeconds={3} />
            {getCorrectPage(currentPage)}
        </Container>
    )
}

const getCorrectPage = (currentPage) => {
    switch (currentPage) {
        default: return null;
    }
}

const Container = styled.div`

`

export default Dashboard;