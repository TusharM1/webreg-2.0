const { Enrollment } = require("../../models");

const findEnrollments = async (netID) => {
	return (await Enrollment.findAll({
		where: {
			netID: netID
		},
		order: [
			["courseString", "ASC"]
		],
		raw: true
	}));
};

module.exports = { findEnrollments };
