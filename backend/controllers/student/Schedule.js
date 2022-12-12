const { Enrollment, Section, Semester } = require("../../models");
const { findCourse, findSection, findSectionBlocks } = require("../Search");
const { currentSemesterName, currentSemesterStartDate } = require("./Semesters");

const addSection = async (netID, sectionIndex) => {
	const courseString = (await Section.findOne({
		where: {
			sectionIndex: sectionIndex
		},
		raw: true
	}))["courseString"];

	return await Enrollment.create({
		netID: netID,
		semesterName: currentSemesterName,
		courseString: courseString,
		sectionIndex: sectionIndex,
		grade: "N/A"
	});
};

const dropSection = async (netID, sectionIndex) => {
	return await Enrollment.destroy({
		where: {
			netID: netID,
			semesterName: currentSemesterName,
			sectionIndex: sectionIndex
		}
	});
};

const findEnrollments = async (netID) => {
	const enrollments = await Enrollment.findAll({
		where: {
			netID: netID
		},
		include: [{
			model: Semester,
			where: {
				startDate: currentSemesterStartDate
			},
			attributes: []
		}],
		order: [
			["courseString", "ASC"]
		],
		raw: true
	});

	let numberOfCredits = 0;

	const courses = await Promise.all(enrollments.map(async (enrollment) => {
		const course = await findCourse(enrollment["courseString"]);
		const section = await findSection(enrollment["sectionIndex"]);
		const sectionBlocks = await findSectionBlocks(enrollment["sectionIndex"]);

		let meetingTimes = [];
		if (sectionBlocks.length > 1 || sectionBlocks[0].blockDay !== null) {
			meetingTimes = sectionBlocks.map((sectionBlock) => {
				const start = JSON.stringify(sectionBlock.blockStart)
					.replaceAll(/"/g, "")
					.split(":")
					.map((token) => Number(token));
				const end = JSON.stringify(sectionBlock.blockEnd)
					.replaceAll(/"/g, "")
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
				};
			});
		}

		numberOfCredits += course["numberOfCredits"];

		return {
			courseString: enrollment["courseString"],
			name: course["name"],
			sectionNumber: section["sectionNumber"],
			sectionIndex: section["sectionIndex"],
			professor: section["professor"],
			sectionType: section["sectionType"],
			numberOfCredits: course["numberOfCredits"],
			grade: enrollment["grade"],
			sectionBlocks: meetingTimes
		};
	}));

	return {
		numberOfCreditsAttempting: numberOfCredits,
		courses: courses
	};
};

module.exports = { findEnrollments, addSection, dropSection };
