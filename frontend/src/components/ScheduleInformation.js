import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { ScheduleContext } from "../contexts/ScheduleContext";

export function ScheduleInformation() {
	const { schedule } = useContext(ScheduleContext);

	let courses = []
	for (let i = 0; i < schedule.length; i++) {
		courses.push(
			<li className="list-group-item" key={i}>
				{[schedule[i].courseString,
					schedule[i].name,
					schedule[i].number,
					schedule[i].professor,
					schedule[i].sectionType,
					schedule[i].numberOfCredits,
					schedule[i].grade].join(" | ")}
			</li>
		)
	}

	return (
		<Container fluid>
			<span>Schedule Information</span>
			<ul className="list-group">
				{courses}
			</ul>
		</Container>
	);
}