import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { ScheduleContext } from "../contexts/ScheduleContext";
import { Schedule } from "./Schedule";

export function ViewSchedule() {
	const { schedule } = useContext(ScheduleContext);

	const config = {
		days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
		startingHour: 8,
		endingHour: 23,
		subdivisions: 12
	};

	return (
		<Container fluid className={"d-flex flex-column"} style={{background: "lightgoldenrodyellow"}}>
			<span>View Schedule</span>
			<Schedule schedule={schedule} config={config}/>
		</Container>
	);
}
