import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { ScheduleContext } from "../contexts/ScheduleContext";
import { convertTime } from "./Schedule";

export function ScheduleInformation() {
	const { schedule } = useContext(ScheduleContext);

	let courses = []
	for (let i = 0; i < schedule.length; i++) {
		courses.push(
			<li className="list-group-item" key={i}>
				<p>
					{[
						schedule[i].courseString,
						schedule[i].name,
						schedule[i].sectionNumber,
						schedule[i].professor,
						schedule[i].sectionType,
						schedule[i].numberOfCredits,
						schedule[i].grade
					].join(" | ")}
				</p>
				{schedule[i].sectionBlocks.map((sectionBlock, i) => {
					return (
						<p key={i}>
							{[
								sectionBlock.day,
								convertTime(sectionBlock.startHour, sectionBlock.startMinute),
								convertTime(sectionBlock.endHour, sectionBlock.endMinute),
								sectionBlock.location,
								sectionBlock.meetingType
							].join(" | ")}
						</p>
					);
				})}
			</li>
		)
	}

	return (
		<Container fluid className={"h-100 d-flex flex-column"}>
			<span>Schedule Information</span>
			<ul className="list-group overflow-auto">
				{courses}
			</ul>
		</Container>
	);
}