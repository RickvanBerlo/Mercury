import React from "react";
import { connect } from "react-redux";
import SideMenu from '../components/sideMenu/sideMenu';
import ModelsContainer from '../components/model/modelsContainer';
import DashboardRoutes from '../routes/dashboardRoutes';
import SnackBar from '../components/notification/snackbar';
import { getAllSideMenuButtonPages } from '../utils/pageSelector';
import { removeAllModels } from '../stores/models/modelActions'

const Dashboard = ({ history, removeAllModels, keycloak, init }) => {
    removeAllModels();
    return (
        <div>
            <DashboardRoutes history={history} />
            {keycloak.authenticated && <SideMenu history={history} sideMenuButtons={getAllSideMenuButtonPages()} />}
            <SnackBar />
            <ModelsContainer />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        keycloak: state.keycloakReducer.keycloak,
        init: state.keycloakReducer.init,
    };
};

const mapDispatchToProps = {
    removeAllModels,
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);