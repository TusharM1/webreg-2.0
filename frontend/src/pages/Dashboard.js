import React from 'react';
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import { DegreeNavigator } from "../components/DegreeNavigator";
import { SearchCourses } from "../components/SearchCourses";
import { ViewCourses } from "../components/ViewCourses";
import { ScheduleInformation } from "../components/ScheduleInformation";
import { ViewSchedule } from "../components/ViewSchedule";

const Dashboard = () => {
    return (
        <Container fluid className={"h-100"}>
            <Row className={"h-100"}>
                <Col className={"h-100"}>
                    {/*<Tabs*/}
                    {/*    defaultActiveKey="profile"*/}
                    {/*    // id="uncontrolled-tab-example"*/}
                    {/*    // className="mb-3"*/}
                    {/*>*/}
                    {/*    <Tab eventKey="degree" title="Degree Navigator">*/}
                    {/*        <DegreeNavigator/>*/}
                    {/*    </Tab>*/}
                    {/*    <Tab eventKey="search" title="Search Courses">*/}
                    {/*        <Sonnet />*/}
                    {/*    </Tab>*/}
                    {/*</Tabs>*/}
                    <Row style={{height: "100%", background: "lightpink"}}>
                        <DegreeNavigator/>
                    </Row>
                </Col>
                <Col className={"h-100"}>
                    <Row style={{height: "40%", background: "lightcoral"}}><SearchCourses/></Row>
                    <Row style={{height: "60%", background: "lightblue"}}><ViewCourses/></Row>
                </Col>
                <Col className={"h-100"}>
                    <Row style={{height: "60%", background: "lightgreen"}}><ViewSchedule/></Row>
                    <Row style={{height: "40%", background: "lightsalmon"}}><ScheduleInformation/></Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;