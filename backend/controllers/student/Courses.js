const { Enrollment, Semester } = require("../../models");
const { Op } = require("sequelize");
const { currentSemesterStartDate } = require("./Semesters");
const { findCourse } = require("../Search");

const findCompletedCourses = async (netID) => {
	const completedCourses = await Enrollment.findAll({
		where: {
			netID: netID,
		},
		include: [{
			model: Semester,
			where: {
				startDate: {
					[Op.lt]: currentSemesterStartDate
				}
			},
			attributes: []
		}],
		attributes: ['semesterName', 'courseString', 'grade'],
		raw: true
	});

	let numberOfCreditsCompleted = 0
	await Promise.all(completedCourses.map(async (enrollment) => {
		const course = await findCourse(enrollment["courseString"]);
		numberOfCreditsCompleted += course.numberOfCredits
	}));

	return {
		numberOfCreditsCompleted: numberOfCreditsCompleted,
		completedCourses: completedCourses
	}
}

const findAttemptingCourses = async (netID) => {
	return await Enrollment.findAll({
		where: {
			netID: netID,
		},
		include: [{
			model: Semester,
			where: {
				startDate: currentSemesterStartDate
			},
			attributes: []
		}],
		attributes: ['semesterName', 'courseString', 'grade'],
		raw: true
	});
}

module.exports = { findCompletedCourses, findAttemptingCourses };