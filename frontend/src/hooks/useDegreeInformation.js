import { useState } from "react";
import axios from "axios";
import { API_URL } from "../App";
import { useMount } from "./useMount";

export const defaultStudyPrograms = {
	status: "loading"
};

//Creates functions to more easily access and manipulate the user's degree for degreeNavigator functionality.
export function useDegreeInformation(token) {
	const [studyPrograms, setStudyPrograms] = useState(defaultStudyPrograms);

	const downloadStudyPrograms = () => {
		//Gets all the information regarding a student's program of study, school, completed courses, and current courses
		const downloadAllInformation = async () => {
			//Gets the user's programs of study for degree navigator functionality 
			const studyProgramsResponse = await axios.post(API_URL + "/student/programs", {
				token: token
			});

			//Gets the user's enrolled school for degree navigator functionality 
			const schoolEnrollmentResponse = await axios.post(API_URL + "/student/school", {
				token: token
			});

			//Gets the user's completed courses for degree navigator functionality 
			const completedCoursesResponse = await axios.post(API_URL + "/student/courses/completed", {
				token: token
			});

			//Gets the user's current courses for degree navigator functionality 
			const attemptingCoursesResponse = await axios.post(API_URL + "/student/courses/attempting", {
				token: token
			});

			//Send the data out in easy format to where it can be used elsewhere in the frontend
			return {
				studyPrograms: studyProgramsResponse.data,
				schoolEnrollment: schoolEnrollmentResponse.data["schoolEnrollment"],
				completedCourses: completedCoursesResponse.data,
				attemptingCourses: attemptingCoursesResponse.data
			}
		}

		downloadAllInformation().then(information => {
			setStudyPrograms(information);
		})
	};

	useMount(downloadStudyPrograms);

	return [studyPrograms];
}