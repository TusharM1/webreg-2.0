import { useState } from "react";
import axios from "axios";
import { useMount } from "./useMount";

export const defaultSchedule = {
	status: "loading",
	courseSections: []
};

export function useSchedule(token) {
	const [schedule, setSchedule] = useState(defaultSchedule);

	const addSection = (section) => {
		// post add section, swap if necessary
		// on success, update schedule
		// on fail, report error
	};

	const removeSection = (section) => {
		// post remove section
		// on success, update schedule
		// on fail, report error
	};

	const initializeSchedule = () => {
		const getInfo = async () => {
			return await axios.post("http://localhost:3001/student/schedule", {
				token: token
			});
		};
		getInfo().then(response => {
			setSchedule(response.data);
			console.log("Loading schedule information, found " + response.data.length + " courses");
		});

		// post get schedule
		// put the schedule as loading in the meantime
		// update the schedule after populated
	};

	useMount(initializeSchedule);

	return [schedule, addSection, removeSection];
}