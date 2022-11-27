const { Enrollment } = require("../../models");
const { findCourse, findSection, findSectionBlocks } = require("../Search");

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
		const sectionBlocks = await findSectionBlocks(enrollment["sectionIndex"]);

		const meetingTimes = sectionBlocks.map((sectionBlock) => {
			const start = JSON.stringify(sectionBlock.blockStart)
				.replaceAll(/"/g, '')
				.split(":")
				.map((token) => Number(token));
			const end = JSON.stringify(sectionBlock.blockEnd)
				.replaceAll(/"/g, '')
				.split(":")
				.map((token) => Number(token));

			return {
				day: sectionBlock.blockDay,
				startHour: start[0],
				startMinute: start[1],
				endHour: end[0],
				endMinute: end[1],
				location: sectionBlock.location,
				meetingType: sectionBlock.meetingType
			}
		})

		return {
			courseString: enrollment["courseString"],
			name: course["name"],
			sectionNumber: section["sectionNumber"],
			professor: section["professor"],
			sectionType: section["sectionType"],
			numberOfCredits: course["numberOfCredits"],
			grade: enrollment["grade"],
			sectionBlocks: meetingTimes
		};
	}));
};

module.exports = { findEnrollments };
