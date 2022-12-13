import { useState } from "react";
import axios from "axios";
import { useMount } from "./useMount";
import { API_URL } from "../App";

let defaultInformation = [];

export function useSearch(token) {
	const [school, setSchool] = useState(defaultInformation);
	const [department, setDepartment] = useState(defaultInformation);

	const downloadSchools = () => {
		const getInformation = async () => {
			return await axios.post(API_URL + "/search/schools", {
				token: token
			});
		};
		getInformation().then((information) => {
			setSchool(information.data);
			(axios.post(API_URL + "/search/departments", {
				token: token
			})).then((response) => {
				defaultInformation = response.data
				setDepartment(defaultInformation);
			});
		});
	};

	useMount(downloadSchools);

	const downloadDepartments = (schoolNumber) => {
		const getInformation = async () => {
			return await axios.post(API_URL + "/search/departments", {
				token: token,
				schoolNumber: schoolNumber
			});
		};
		getInformation().then(information => {
			setDepartment(information.data);
		});
	};

	const clearDepartments = () => {
		setDepartment(defaultInformation);
	}

	return [school, department, downloadDepartments, clearDepartments];
}