const { Course } = require("../../models");
//This method concatenates course information into one string and returns it, to uniquely identify a course.
function courseNumbersToString(schoolNumber, departmentNumber, courseNumber) {
	return schoolNumber + ":" + departmentNumber + ":" + courseNumber;
}
//This method splits up a course string into three components, so we can access them individually.
function courseStringToNumbers(courseString) {
	const numbers = courseString.split(":");
	return {
		schoolNumber: numbers[0],
		departmentNumber: numbers[1],
		courseNumber: numbers[2]
	}
}
//This async method creates a course in the database using the parameters passed in by a webreg admin.
const createCourse = async (schoolNumber, departmentNumber, courseNumber, courseName, numberOfCredits) => {
	return await Course.create({
		courseString: courseNumbersToString(schoolNumber, departmentNumber, courseNumber),
		schoolNumber: schoolNumber,
		departmentNumber: departmentNumber,
		courseNumber: courseNumber,
		name: courseName,
		description: null,
		numberOfCredits: numberOfCredits,
		prerequisites: null,
		isActive: true
	});
};
//This async method updates a course in the database depending on the parameters passed in by a webreg admin.
const editCourse = async (schoolNumber, departmentNumber, courseNumber, courseName, numberOfCredits) => {
	return await Course.update(
		{
			name: courseName,
			numberOfCredits: numberOfCredits
		},
		{
			where: {
				courseString: courseNumbersToString(schoolNumber, departmentNumber, courseNumber)
			}
		}
	);
};
//This async method finds and removes a course from the database using parameters passed in by a webreg admin.
const removeCourse = async (schoolNumber, departmentNumber, courseNumber) => {
	return await Course.destroy({
		where: {
			courseString: courseNumbersToString(schoolNumber, departmentNumber, courseNumber)
		}
	});
};


module.exports = { createCourse, editCourse, removeCourse, courseNumbersToString, courseStringToNumbers };