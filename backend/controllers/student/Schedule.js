const { Enrollment } = require("../../models");
const { findCourse, findSection } = require("../Search");

const findEnrollments = async (netID) => {
	const enrollments = await Enrollment.findAll({
		where: {
			netID: netID
		},
		order: [
			["courseString", "ASC"]
		],
		raw: true
	});

	return Promise.all(enrollments.map(async (enrollment) => {
		const course = await findCourse(enrollment["courseString"]);
		const section = await findSection(enrollment["sectionIndex"]);

		return {
			courseString: enrollment["courseString"],
			name: course["name"],
			sectionNumber: section["sectionNumber"],
			professor: section["professor"],
			sectionType: section["sectionType"],
			numberOfCredits: course["numberOfCredits"],
			grade: enrollment["grade"]
		};
	}));
};

module.exports = { findEnrollments };
