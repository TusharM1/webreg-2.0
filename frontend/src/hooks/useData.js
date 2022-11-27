import axios from "axios";
import { useState } from "react";
import { API_URL } from "../App";

export const defaultData = {
	token: "",
	profile: {
		netID: "",
		fullName: "",
		role: ""
	},
	semesters: {
		selectedSemester: "",
		register: [],
		plan: [],
		drop: []
	}
};

export const cloneJSONAndOverride = (json, newData) => {
	let copy = JSON.parse(JSON.stringify(json));
	for (const key in newData) {
		copy[key] = newData[key];
	}
	return copy;
};

export function useData() {
	const tokenValue = localStorage.getItem("token");
	const [loading, setLoading] = useState(!!tokenValue);

	let loadingData = loading ? cloneJSONAndOverride(defaultData, { token: "loading" }) : defaultData;
	const [data, setData] = useState(loadingData);

	const clearData = () => {
		setData(defaultData);
		localStorage.removeItem("token");
	};

	const saveData = (newData) => {
		if (newData && !newData["error"]) {
			const profile = {
				netID: newData.netID,
				fullName: newData.fullName,
				role: newData.role
			};
			setData(cloneJSONAndOverride(data, { token: newData.token, profile }));
			localStorage.setItem("token", newData["token"]);
			return true;
		} else {
			clearData();
			return false;
		}
	};

	const validate = async () => {
		return (await axios.post(API_URL + "/auth", {
			type: "token",
			data: {
				token: tokenValue
			}
		}).then(response => response.data));
	};

	if (loading) {
		validate().then(data => {
			saveData(data);
			setLoading(false);
		});
	}

	return [data, saveData, clearData];
}
