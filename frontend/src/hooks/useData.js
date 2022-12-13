import axios from "axios";
import { useState } from "react";
import { API_URL } from "../App";

//Format for basic user information
export const defaultData = {
	token: "",
	profile: {
		netID: "",
		fullName: "",
		role: ""
	}
};

export const cloneJSONAndOverride = (json, newData) => {
	let copy = JSON.parse(JSON.stringify(json));
	for (const key in newData) {
		copy[key] = newData[key];
	}
	return copy;
};
//Gets the user data, saves the user data, authenticates the user data
export function useData() {
	const tokenValue = localStorage.getItem("token");
	const [loading, setLoading] = useState(!!tokenValue);

	let loadingData = loading ? cloneJSONAndOverride(defaultData, { token: "loading" }) : defaultData;
	const [data, setData] = useState(loadingData);

	//This function clears the user data from local storage
	const clearData = () => {
		setData(defaultData);
		localStorage.removeItem("token");
	};

	//This function saves the user data to the local storage
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
		}
		else {
			clearData();
			return false;
		}
	};

	//This function autheticates user token by checking it against the database. Connect to backend through a router
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
