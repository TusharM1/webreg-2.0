const { School, SchoolEnrollment } = require("../../models");

//This async method finds and returns a student's school enrollment, such as School of Arts and Sciences.
const findSchoolEnrollment = async (netID) => {
	const schoolEnrollment = await SchoolEnrollment.findOne({
		where: {
			netID : netID
		},
		raw: true
	});

	if (schoolEnrollment) {
		const schoolName = await School.findOne({
			where: {
				schoolNumber: schoolEnrollment["schoolNumber"]
			},
			raw: true
		});

		return {
			schoolEnrollment: schoolName
		}
	}
}

module.exports = { findSchoolEnrollment };