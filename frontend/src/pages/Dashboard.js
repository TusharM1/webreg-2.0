import React from 'react';
import '../styles/dashboard.css';

const Dashboard = () => {
    return (
        <main>
            <div id={"degreeContainer"}>
                Degree Navigator
            </div>
            <div id={"courseContainer"}>
                <div>Search Courses</div>
                <div>View Courses</div>
            </div>
            <div id={"scheduleContainer"}>
                <div>View Schedule</div>
                <div>Schedule Information</div>
            </div>
        </main>
    );
};

export default Dashboard;