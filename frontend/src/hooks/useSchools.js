import { useState } from "react";
import axios from "axios";
import { API_URL } from "../App";
import { useMount } from "./useMount";

export const defaultStudyPrograms = {
	status: "loading"
};

export function useSchools(token) {
	const [studyPrograms, setStudyPrograms] = useState(defaultStudyPrograms);

	const downloadStudyPrograms = () => {
		const downloadAllInformation = async () => {
			const studyProgramsResponse = await axios.post(API_URL + "/student/programs", {
				token: token
			});

			const schoolEnrollmentResponse = await axios.post(API_URL + "/student/school", {
				token: token
			});

			const completedCoursesResponse = await axios.post(API_URL + "/student/courses/completed", {
				token: token
			});

			const attemptingCoursesResponse = await axios.post(API_URL + "/student/courses/attempting", {
				token: token
			});

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