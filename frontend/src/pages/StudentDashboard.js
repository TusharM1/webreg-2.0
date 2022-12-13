import React, { useContext } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { DegreeNavigator } from "../components/DegreeNavigator";
import { CourseEngine } from "../components/CourseEngine";
import { ScheduleInformation } from "../components/ScheduleInformation";
import { ViewSchedule } from "../components/ViewSchedule";
import { DataContext } from "../contexts/DataContext";
import { ScheduleContext } from "../contexts/ScheduleContext";
import { useSchedule } from "../hooks/useSchedule";

//This function handles the page for a Student user
const StudentDashboard = () => {
	//This data keeps track of the token
	const { data } = useContext(DataContext);
	//This keeps track of the student's schedule information.
	const [schedule, downloadSchedule, addHandler, dropHandler] = useSchedule(data.token);

	return (
		<ScheduleContext.Provider value={{ schedule, downloadSchedule, addHandler, dropHandler }}>
			<Container fluid className={"h-100"}>
				<Row className={"h-100"}>
					<Col className={"h-100 d-flex flex-column"}>
						<Tab.Container transition={false} defaultActiveKey={"degreeNavigator"}>
							<Nav variant="tabs">
								<Nav.Item>
									<Nav.Link eventKey="degreeNavigator">Degree Navigator</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="searchCourses">Search Courses</Nav.Link>
								</Nav.Item>
							</Nav>
							<Tab.Content className={"flex-grow-1"}>
								<Tab.Pane className={"h-100"} eventKey="degreeNavigator" title="DegreeNavigator">
									{/*the element that shows degree navigation*/}
									<Row style={{ height: "60%", background: "lightpink" }}><DegreeNavigator/></Row>
									{/*the tab element that shows the schedule information*/}
									<Row style={{
										height: "40%",
										background: "lightsalmon"
									}}><ScheduleInformation/></Row>
								</Tab.Pane>
								<Tab.Pane className={"h-100"} eventKey="searchCourses" title="Search Courses">
									<Row style={{ height: "100%", background: "plum" }}>
										{/*This handles the course search as well as the links to the add/drop functionality*/}
										<CourseEngine schedule={schedule} addHandler={addHandler}
													  dropHandler={dropHandler}/>
									</Row>
								</Tab.Pane>
							</Tab.Content>
						</Tab.Container>
					</Col>
					<Col className={"h-100 d-flex flex-column"}>
						<Row style={{ height: "100%" }}>
							<ViewSchedule/>
						</Row>
					</Col>
				</Row>
			</Container>
		</ScheduleContext.Provider>
	);
};
export default StudentDashboard;