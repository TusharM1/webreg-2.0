import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { DataContext } from "../contexts/DataContext";
import { ScheduleContext } from "../contexts/ScheduleContext";

export function ScheduleInformation() {
	const { data } = useContext(DataContext);
	const [loaded, setLoaded] = useState(false);

	const { schedule, initializeSchedule } = useContext(ScheduleContext);

	if (!loaded) {
		initializeSchedule(data.token);
		setLoaded(true);
	}

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