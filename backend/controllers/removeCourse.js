const { Course } = require("../models");
// const { Section } = require('../models');
// const {Op, Sequelize} = require("sequelize");
const Sequelize = require("sequelize");

const removeCourseFunction = async (coursestring) => {
	const confirmation = await Course.destroy({
		where: { courseString: coursestring }
	});
	return confirmation;
};

module.exports = { removeCourseFunction };