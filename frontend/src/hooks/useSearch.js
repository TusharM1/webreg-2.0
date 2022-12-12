import { useState } from "react";
import axios from "axios";
import { useMount } from "./useMount";
import { API_URL } from "../App";

export const defaultSearch = [
	{status: "loading"}
];

export function useSearch(token) {
	const [school, setSchool] = useState(defaultSearch);
    const [department, setDepartment] = useState(defaultSearch);

	const downloadSchool = () => {
		const downloadAllInformation = async () => {
			return await axios.post(API_URL + "/search/schools", {
				token: token
			});
		}
		downloadAllInformation().then((information) => {
			setSchool(information.data);
            (axios.post(API_URL + "/search/departments", {
				token: token,
			})).then((response)=>{
                setDepartment(response.data)
            });
		})
	};

	useMount(downloadSchool);

    const downloadDept = (schoolNumber) => {
		const downloadAllInformation = async () => {
			return await axios.post(API_URL + "/search/departments", {
				token: token,
                schoolNumber: schoolNumber
			});
		}
		downloadAllInformation().then(information => {
			setDepartment(information.data);
		})
	};
	return [school, department, downloadDept];
}