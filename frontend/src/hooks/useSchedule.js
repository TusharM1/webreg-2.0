import { useState } from "react";
import axios from "axios";
import { useMount } from "./useMount";
import { API_URL } from "../App";

export const defaultSchedule = {
	status: "loading",
	courseSections: []
};

export function useSchedule(token) {
	const [schedule, setSchedule] = useState(defaultSchedule);

	const downloadSchedule = () => {
		const getInfo = async () => {
			return await axios.post(API_URL + "/student/schedule", {
				token: token
			});
		};
		getInfo().then(response => {
			setSchedule(response.data);
			console.log("Loading schedule information, found " + response.data.length + " courses");
		});
	};

	useMount(downloadSchedule);

	return [schedule, downloadSchedule];
}