import React from "react";
import "../styles/schedule.css";

export function convertTime(hours, minutes) {
	const period = hours < 12 ? " AM" : " PM";
	const hour = hours % 12 === 0 ? 12 : hours % 12;
	return hour + ":" + minutes.toString().padStart(2, "0") + period;
}

export const colorMap = {
	Blue: "lightblue",
	Yellow: "yellow",
	Green: "lightgreen",
	Orange: "orange"
}

export const locationMap = {
	"Busch": colorMap.Blue,
	"College Avenue": colorMap.Yellow,
	"Cook / Douglass": colorMap.Green,
	"Livingston": colorMap.Orange
}

export function Schedule({schedule, config}) {
	const legend = [];
	legend.push(
		<div key="campus" className={"schedule-legend"}>
			Campus Colors:
		</div>
	);
	for (let key in locationMap) {
		const colorStyle = { background: locationMap[key] }
		legend.push(
			<div key={key} className={"schedule-legend"} style={colorStyle}>
				{key}
			</div>
		);
	}

	const dayHeaders = (
		<div className={"d-flex"} style={{gridColumn: 2, textAlign: "center"}}>
			{config.days.map((day) => {
				return <div key={day} style={{flex: "1 1 0"}}>{day}</div>
			})}
		</div>
	)

	const hours = []
	for (let hour = config.startingHour; hour < config.endingHour; hour++) {
		hours.push(
			<div key={hour} style={{flex: "1 1 0"}}>
				<span className={"hour-label"}>{convertTime(hour, 0)}</span>
			</div>
		);
	}
	const hourHeaders = (
		<div className={"d-flex flex-column"} style={{gridRow: 2, textAlign: "right"}}>
			{hours}
		</div>
	)

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
		schedule["courses"].forEach((course) => {
			course["sectionBlocks"].forEach((sectionBlock) => {
				sectionBlocks.push(
					<div key={sectionBlocks.length} className={"entry"} style={{
						gridColumn: config.days.indexOf(sectionBlock.day) + 1,
						gridRowStart: Math.round(((sectionBlock.startHour - config.startingHour) * config.subdivisions) +
									(sectionBlock.startMinute / (60 / config.subdivisions)) + 1),
						gridRowEnd: Math.round((sectionBlock.endHour - config.startingHour) * config.subdivisions +
									(sectionBlock.endMinute / (60 / config.subdivisions)) + 1),
						background: locationMap[sectionBlock.location],
						position: "relative",
						overflow: "auto"
					}}>
						<div style={{position: "absolute"}}>
							<p className={"information"}>{course.name}</p>
							<p className={"information"}>{sectionBlock.location}</p>
							<p className={"information"}>
								{convertTime(sectionBlock.startHour, sectionBlock.startMinute)}
								{" - "}
								{convertTime(sectionBlock.endHour, sectionBlock.endMinute)}
							</p>
						</div>
					</div>
				);
			});
		});
	}

	return (
		<div className={"d-flex flex-column h-100"} style={{background: "lightseagreen"}}>
			<div className={"d-flex flex-row"}>
				{legend}
			</div>
			<div className={"d-grid w-100 flex-grow-1 schedule-container"}>
				{dayHeaders}
				{hourHeaders}
				<div className={"d-grid schedule"} style={{
					gridTemplateRows: "repeat(" + (config.endingHour - config.startingHour) * config.subdivisions + ", minmax(0, 1fr))",
					gridTemplateColumns: "repeat(" + config.days.length + ", minmax(0, 1fr))"
				}}>
					{rowLines}
					{columnLines}
					{sectionBlocks}
				</div>
			</div>
		</div>
	)
}