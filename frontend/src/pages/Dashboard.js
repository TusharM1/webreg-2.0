import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
// import '../styles/dashboard.css';

const Dashboard = () => {
    return (
        <Container fluid>
            <Row>
                <Col>
                    Degree Navigator
                </Col>
                <Col>
                    <Row>Search Courses</Row>
                    <Row>View Courses</Row>
                </Col>
                <Col>
                    <Row>View Schedule</Row>
                    <Row>Schedule Information</Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;