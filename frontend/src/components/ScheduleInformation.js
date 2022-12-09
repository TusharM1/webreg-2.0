import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { ScheduleContext } from "../contexts/ScheduleContext";
import { convertTime } from "./Schedule";
import Button from "react-bootstrap/Button";

export function ScheduleInformation() {
	const { schedule, dropHandler } = useContext(ScheduleContext);

	let courses = []
	for (let i = 0; i < schedule.length; i++) {
		courses.push(
			<li className="list-group-item d-flex justify-content-between" key={i}>
				<div>
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
				</div>
				<Button style={{margin: "auto 0", height: "fit-content"}} value={schedule[i].sectionIndex} onClick={dropHandler}>Drop</Button>
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