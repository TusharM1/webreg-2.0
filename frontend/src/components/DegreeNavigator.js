import React, { useContext } from "react";
import { Accordion, Container } from "react-bootstrap";
import { DataContext } from "../contexts/DataContext";
import { ScheduleContext } from "../contexts/ScheduleContext";
import { useDegreeInformation } from "../hooks/useDegreeInformation";

//This function handles the degree navigator functionality
export function DegreeNavigator() {
	//Gets the User basic data
	const { data } = useContext(DataContext);
	//Gets the User's schedule data
	const { schedule } = useContext(ScheduleContext);

	//The four following functions get the user's degree navigator information
	const [degreeInformation] = useDegreeInformation(data.token);
	const studyPrograms = degreeInformation["studyPrograms"];
	const schoolEnrollment = degreeInformation["schoolEnrollment"];
	const completedCourses = degreeInformation["completedCourses"];

	let programs = [];
	if (studyPrograms) {
		for (let i = 0; i < studyPrograms.length; i++) {
			programs.push(
				<Accordion.Item key={i} eventKey={i.toString()}>
					<Accordion.Header>{studyPrograms[i].name}</Accordion.Header>
					<Accordion.Body>{studyPrograms[i].studyProgramCode}</Accordion.Body>
				</Accordion.Item>
			);
		}
	}

	console.log(degreeInformation);

	//Displays the user degree navigator information
	return (
		<Container fluid className={"d-flex flex-column"}>
			<strong>Degree Navigator</strong>
			<p>
				{data.profile.fullName}
				{" | "}
				{schoolEnrollment ? schoolEnrollment["schoolName"] + " | " : ""}
				Completed {completedCourses ? completedCourses["numberOfCreditsCompleted"] : "0"} Credits
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