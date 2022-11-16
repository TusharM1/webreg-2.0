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

module.exports = { courseNumbersToString, courseStringToNumbers }