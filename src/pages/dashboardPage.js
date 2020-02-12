import React from "react";

const Dashboard = ({ history }) => {
    console.log(history);
    return (
        <div>
            <p>Dashboard</p>
            <button onClick={history.goBack} bsStyle="success">&lt; Back</button>
        </div>
    )
}

export default Dashboard;