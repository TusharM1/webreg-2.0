import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { ScheduleContext } from "../contexts/ScheduleContext";
import { Schedule } from "./Schedule";

//This function handles the functionality for viewing the user schedule in a calender format. The calender is processed in components/Schedule.js
export function ViewSchedule() {
	//User schedule Data
	const { schedule } = useContext(ScheduleContext);

	//The configuration for the calender. Limited to the Weekdays and limited from 8 am to 11 pm to account for regular class schedule
	const config = {
		days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
		startingHour: 8,
		endingHour: 23,
		subdivisions: 12
	};

	return (
		<Container fluid className={"bg-light d-flex flex-column"}>
			<span>View Schedule</span>
			<Schedule schedule={schedule} config={config}/>
		</Container>
	);
}
