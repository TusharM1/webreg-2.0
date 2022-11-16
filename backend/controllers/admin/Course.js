const { Course } = require("../../models");

function courseNumbersToString(schoolNumber, departmentNumber, courseNumber) {
	return schoolNumber + ":" + departmentNumber + ":" + courseNumber;
}

function courseStringToNumbers(courseString) {
	const numbers = courseString.split(":");
	return {
		schoolNumber: numbers[0],
		departmentNumber: numbers[1],
		courseNumber: numbers[2]
	}
}

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

const removeCourse = async (schoolNumber, departmentNumber, courseNumber) => {
	return await Course.destroy({
		where: {
			courseString: courseNumbersToString(schoolNumber, departmentNumber, courseNumber)
		}
	});
};


module.exports = { createCourse, editCourse, removeCourse, courseNumbersToString, courseStringToNumbers };