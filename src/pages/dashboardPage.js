import React from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import SideMenu from '../components/sideMenu/sideMenu';
import ModelsContainer from '../components/model/modelsContainer';
import DashboardRoutes from '../routes/dashboardRoutes';
import SnackBar from '../components/notification/snackbar';
import { getAllSideMenuButtonPages } from '../utils/pageSelector';
import { removeAllModels } from '../stores/models/modelActions';

const Dashboard = ({ history, removeAllModels, colors }) => {
    removeAllModels();
    return (
        <Container colors={colors}>
            <DashboardRoutes colors={colors} history={history} />
            <SideMenu history={history} sideMenuButtons={getAllSideMenuButtonPages()} />
            <SnackBar />
            <ModelsContainer />
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        colors: state.preferencesReducer.colors,
    };
};

const mapDispatchToProps = {
    removeAllModels,
}

const Container = styled.div`
    min-height: 100vh;
    width: 100vw;
    background-color: ${props => props.colors.PRIMARY};
`


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);