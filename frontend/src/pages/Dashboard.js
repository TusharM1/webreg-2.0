import React from 'react';
import { Col, Container, Nav, Row, Tab, TabContent } from "react-bootstrap";
import { DegreeNavigator } from "../components/DegreeNavigator";
import { CourseEngine } from "../components/CourseEngine";
import { ScheduleInformation } from "../components/ScheduleInformation";
import { ViewSchedule } from "../components/ViewSchedule";
import { DataContext } from "../user/DataContext";
import { useContext } from 'react';
import { AdminUI } from '../components/AdminUI';


const Dashboard = () => {
    const{ data } = useContext(DataContext);
    if (data["profile"]["role"] == "student"){
    return (
        <Container fluid className={"h-100"}>
            <Row className={"h-100"}>
                <Col className={"h-100"}>
                    <Tab.Container transition={false} defaultActiveKey={"degreeNavigator"}>
                        <Nav variant="tabs">
                            <Nav.Item>
                                <Nav.Link eventKey="degreeNavigator">Degree Navigator</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="searchCourses">Search Courses</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content className="h-100">
                            <Tab.Pane className={"h-100"} eventKey="degreeNavigator" title="DegreeNavigator">
                                <Row style={{height: "60%", background: "lightpink"}}><DegreeNavigator/></Row>
                                <Row style={{height: "40%", background: "lightsalmon"}}><ScheduleInformation/></Row>
                            </Tab.Pane>
                            <Tab.Pane className={"h-100"} eventKey="searchCourses" title="Search Courses">
                                <Row style={{height: "100%", background: "lightblue"}}><CourseEngine/></Row>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Col>
                <Col className={"h-100 d-flex flex-column"}>
                    <Row style={{height: "100%", background: "lightgreen"}}><ViewSchedule/></Row>
                </Col>
            </Row>
        </Container>
    );

}
else if (data["profile"]["role"] == "admin"){ 
    return (
        //<div> hello </div>
        <Container fluid className={"h-100"}>
            <Row className={"h-100"}>
                <Col className={"h-100"}>
                    <Tab.Container transition={false} defaultActiveKey={"Create or Remove Courses"}>
                        <Nav variant="tabs">
                            <Nav.Item>
                                <Nav.Link eventKey="Create or Remove Courses">Create or Remove Courses</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content className="h-100">
                            <Tab.Pane className={"h-100"} eventKey="Create or Remove Courses" title="Create or Remove Courses">
                                <Row style={{height: "100%", background: "lightblue"}}><AdminUI/></Row>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Col>
            </Row>
        </Container>
    )
}
};
export default Dashboard;