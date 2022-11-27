import React from "react";
import "../styles/schedule.css";

export function convertTime(hours, minutes) {
	const period = hours < 12 ? " AM" : " PM";
	return (hours % 12) + ":" + minutes.toString().padStart(2, "0") + period;
}

export const colorMap = {
	Blue: "lightblue",
	Yellow: "yellow",
	Green: "lightgreen",
	Orange: "orange",
}

export const locationMap = {
	"Busch": colorMap.Blue,
	"College Avenue": colorMap.Yellow,
	"Cook / Douglass": colorMap.Green,
	"Livingston": colorMap.Orange,
}

export function Schedule({schedule, config}) {
	const rowLines = [];
	for (let i = 0; i < config.endingHour - config.startingHour; i++) {
		rowLines.push(
			<div className="horizontal-line" key={i} style={{gridRowStart: i * config.subdivisions + 1}}></div>
		);
	}

	const columnLines = config.days.map((day, i) => {
		return <div className="vertical-line" key={day} style={{gridColumn: i + 1}}></div>
	});

	let sectionBlocks = [];
	if (schedule && schedule.status !== "loading") {
		schedule.forEach((course) => {
			course["sectionBlocks"].forEach((sectionBlock) => {
				const startTime = convertTime(sectionBlock.startHour, sectionBlock.startMinute);
				const endTime = convertTime(sectionBlock.endHour, sectionBlock.endMinute);
				sectionBlocks.push(
					<div key={sectionBlocks.length} className={"entry"} style={{
						gridColumn: config.days.indexOf(sectionBlock.day) + 1,
						gridRowStart: Math.round(((sectionBlock.startHour - config.startingHour) * config.subdivisions) +
									(sectionBlock.startMinute / (60 / config.subdivisions)) + 1),
						gridRowEnd: Math.round((sectionBlock.endHour - config.startingHour) * config.subdivisions +
									(sectionBlock.endMinute / (60 / config.subdivisions)) + 1),
						background: locationMap[sectionBlock.location],
						position: "relative",
						overflow: "scroll"
					}}>
						<div style={{position: "absolute"}}>
							<p className={"information"}>{course.name}</p>
							<p className={"information"}>{sectionBlock.location}</p>
							<p className={"information"}>{startTime} - {endTime}</p>
						</div>
					</div>
				);
			});
		});
	}

	return (
		<div className={"d-flex flex-row h-100"}>
			<div className={"d-grid schedule"} style={{
				gridTemplateRows: "repeat(" + (config.endingHour - config.startingHour) * config.subdivisions + ", minmax(0, 1fr))",
				gridTemplateColumns: "repeat(" + config.days.length + ", minmax(0, 1fr))"
			}}>
				{rowLines}
				{columnLines}
				{sectionBlocks}
			</div>
		</div>
	)
}