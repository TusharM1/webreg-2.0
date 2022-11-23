import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { ScheduleContext } from "../contexts/ScheduleContext";
import axios from "axios";
import { DataContext } from "../contexts/DataContext";


export function ScheduleInformation() {
	const { schedule } = useContext(ScheduleContext);
	const { data } = useContext(DataContext);

	const dropCourse = async (coursestring) => {
		axios.post("http://localhost:3001/student/schedule/remove", {
			token: data.token,
			courseString: coursestring
		}).then((response) => {
			alert(JSON.stringify(response.data));
		});
	};

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
					<button onClick={ async (values, actions) => { 
						await dropCourse(schedule[i].courseString);
					}}>  Drop</button>
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