import React, { useContext } from "react";
import { Accordion, Container } from "react-bootstrap";
import { DataContext } from "../contexts/DataContext";
import { ScheduleContext } from "../contexts/ScheduleContext";

export function DegreeNavigator() {
	const { data } = useContext(DataContext);
	const { schedule } = useContext(ScheduleContext);

	return (
		<Container fluid className={"d-flex flex-column"}>
			<strong>Degree Navigator</strong>
			<p>{data.profile.fullName}</p>
			{/* TODO Pull basic information from database */}
			<p>School of Arts and Sciences</p>
			<p>Major in Computer Science</p>
			<p>Completed 0 Credits</p>
			<p>Attempting 8 Credits</p>
			<Accordion alwaysOpen className={"flex-grow-1"}>
				<Accordion.Item eventKey="0">
					<Accordion.Header>SAS Core</Accordion.Header>
					<Accordion.Body>
						School of Arts and Sciences Core Requirements
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>B.S Computer Science</Accordion.Header>
					<Accordion.Body>
						Bachelor of Science Computer Science Degree Requirements
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
			<button>Edit Programs of Study</button>
		</Container>
	);
}