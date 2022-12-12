const { Enrollment, Semester } = require("../../models");
const { Op } = require("sequelize");
const { currentSemesterStartDate } = require("./Semesters");

const findCompletedCourses = async (netID) => {
	return await Enrollment.findAll({
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