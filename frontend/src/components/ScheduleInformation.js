import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { DataContext } from "../contexts/DataContext";
import { ScheduleContext } from "../contexts/ScheduleContext";

export function ScheduleInformation() {
	const { data } = useContext(DataContext);
	const [loaded, setLoaded] = useState(false);

	const { schedule, initializeSchedule } = useContext(ScheduleContext);

	// useEffect(() => {
	//     const stuff = async () => {
	//         await initializeSchedule(data.token);
	//     }
	//     stuff().then(() => {});
	// });

	if (!loaded) {
		initializeSchedule(data.token);
		setLoaded(true);
	}

	return (
		<Container fluid>
			<span>Schedule Information</span>
			<span>{JSON.stringify(schedule)}</span>
		</Container>
	);
}