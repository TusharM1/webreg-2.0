import React from 'react';
import { Col, Container, Row } from "react-bootstrap";

const Dashboard = () => {
    return (
        <Container fluid className={"h-100"}>
            <Row className={"h-100"}>
                <Col className={"h-100"} style={{background: "lightpink"}}>
                    Degree Navigator
                </Col>
                <Col className={"h-100"}>
                    <Row style={{height: "40%", background: "lightcoral"}}>Search Courses</Row>
                    <Row style={{height: "60%", background: "lightblue"}}>View Courses</Row>
                </Col>
                <Col className={"h-100"}>
                    <Row style={{height: "60%", background: "lightgreen"}}>View Schedule</Row>
                    <Row style={{height: "40%", background: "lightsalmon"}}>Schedule Information</Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;