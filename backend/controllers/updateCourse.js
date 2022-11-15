const { Course } = require('../models');
// const { Section } = require('../models');
// const {Op, Sequelize} = require("sequelize");
const Sequelize = require("sequelize");
const { where } = require('sequelize');

const updateCourseFunction = async (coursestring, namE, credits) => {
    const confirmation = await Course.update(
        {
            name: namE,
            numberOfCredits: credits
        },
        {
            where: {courseString: coursestring}
        }
    );
    return confirmation;
}

module.exports = { updateCourseFunction }