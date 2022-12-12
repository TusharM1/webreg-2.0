import React, { useContext } from "react";
import { Accordion, Container } from "react-bootstrap";
import { DataContext } from "../contexts/DataContext";
import { ScheduleContext } from "../contexts/ScheduleContext";
import { useDegreeInformation } from "../hooks/useDegreeInformation";

export function DegreeNavigator() {
	const { data } = useContext(DataContext);
	const { schedule } = useContext(ScheduleContext);

	const [ degreeInformation ] = useDegreeInformation(data.token);
	const studyPrograms = degreeInformation["studyPrograms"]
	const schoolEnrollment = degreeInformation["schoolEnrollment"]
	const completedCourses = degreeInformation["completedCourses"]


	let programs = []
	if (studyPrograms) {
		for (let i = 0; i < studyPrograms.length; i++) {
			programs.push(
				<Accordion.Item key={i} eventKey={i.toString()}>
					<Accordion.Header>{studyPrograms[i].name}</Accordion.Header>
					<Accordion.Body>{studyPrograms[i].studyProgramCode}</Accordion.Body>
				</Accordion.Item>
			)
		}
	}

	console.log(degreeInformation)

	return (
		<Container fluid className={"d-flex flex-column"}>
			<strong>Degree Navigator</strong>
			<p>
				{data.profile.fullName}
				{" | "}
				{schoolEnrollment ? schoolEnrollment["schoolName"] + " | ": ""}
				Completed {completedCourses ? completedCourses["numberOfCompletedCourses"] : "0"} Credits
				{" | "}
				Attempting {schedule["numberOfCreditsAttempting"]} Credits
			</p>
			<Accordion alwaysOpen className={"flex-grow-1"}>
				{programs}
			</Accordion>
			<button>Edit Programs of Study</button>
		</Container>
	);
}