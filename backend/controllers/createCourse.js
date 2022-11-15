const { Course } = require("../models");
// const { Section } = require('../models');
// const {Op, Sequelize} = require("sequelize");
const Sequelize = require("sequelize");

const createCourseFunction = async (coursestring, schoolNum, departmentNum, courseNum, namE, credits) => {
	const confirmation = await Course.create({
		courseString: coursestring,
		schoolNumber: schoolNum,
		departmentNumber: departmentNum,
		courseNumber: courseNum,
		name: namE,
		description: null,
		numberOfCredits: credits,
		prerequisites: null,
		isActive: true
	});

	return confirmation;
};

module.exports = { createCourseFunction };