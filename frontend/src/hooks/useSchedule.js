import { useState } from "react";
import axios from "axios";
import { useMount } from "./useMount";
import { API_URL } from "../App";

export const defaultSchedule = {
	status: "loading"
};
//Creates the functionality for using and manipulating the user's schedule more easily in the rest of the frontend.
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
			console.log("Loading schedule information, found " + response.data["courses"].length + " courses");
		});
	};

	useMount(downloadSchedule);

	const addHandler = (e) => {
		console.log("add");
		e.stopPropagation();
		axios.post(API_URL + "/student/schedule/add", {
			token: token,
			sectionIndex: e.target.value
		}).then((response) => {
			if (response.data.status === "success") {
				downloadSchedule();
			}
			else {
				alert(JSON.stringify(response.data.message));
			}
		});
	};

	const dropHandler = (e) => {
		console.log(e);
		console.log(token);
		e.stopPropagation();
		axios.post(API_URL + "/student/schedule/drop", {
			token: token,
			sectionIndex: e.target.value
		}).then((response) => {
			if (response.data.status === "success") {
				downloadSchedule();
			}
			else {
				alert(JSON.stringify(response.data.message));
			}
		});
	};

	return [schedule, downloadSchedule, addHandler, dropHandler];
}