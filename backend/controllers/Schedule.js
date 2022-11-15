const { Enrollment } = require("../models");

const findEnrollments = async (netID) => {
	const enrollments = (await Enrollment.findAll({
		where: {
			netID: netID
		},
		order: [
			["courseString", "ASC"]
		],
		raw: true
	}));

	return enrollments;
};
module.exports = { findEnrollments };
