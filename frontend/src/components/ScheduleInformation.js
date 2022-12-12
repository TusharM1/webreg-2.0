import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { ScheduleContext } from "../contexts/ScheduleContext";
import { convertTime } from "./Schedule";
import Button from "react-bootstrap/Button";

export function ScheduleInformation() {
	const { schedule, dropHandler } = useContext(ScheduleContext);

	let scheduleCourses = schedule.courses;
	let courses = [];

	if (schedule.courses) {
		for (let i = 0; i < scheduleCourses.length; i++) {
			courses.push(
				<li className="list-group-item d-flex justify-content-between" key={i}>
					<div>
						<p>
							{[
								scheduleCourses[i].courseString,
								scheduleCourses[i].name,
								scheduleCourses[i].sectionNumber,
								scheduleCourses[i].professor,
								scheduleCourses[i].sectionType,
								scheduleCourses[i].numberOfCredits,
								scheduleCourses[i].grade
							].join(" | ")}
						</p>
						{scheduleCourses[i].sectionBlocks.map((sectionBlock, i) => {
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
					<Button style={{ margin: "auto 0", height: "fit-content" }} value={scheduleCourses[i].sectionIndex}
							onClick={dropHandler}>Drop</Button>
				</li>
			);
		}
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