const { Course } = require('../models');
const { Section } = require('../models');
const {Op, Sequelize} = require("sequelize");

const searchCoursesAndSections = async (courseQuery) => {
    const searchedCourses = (await Course.findAll({
        where: {
            [Op.and]: [{
                name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + courseQuery + '%'),
                isActive: true
            }]
        },
        order: [
            ["courseString", "ASC"]
        ],
        raw: true
    }));

    const searchedSections = await Promise.all(searchedCourses.map(async (course) =>
        await Section.findAll({
            where: {
                courseString: course["courseString"]
            },
            order: [
                ["sectionIndex", "ASC"]
            ],
            raw: true
        }
    )));

    let courses = []
    for (let i = 0; i < searchedCourses.length; i++) {
        let sections = []
        for (let j = 0; j < searchedSections[i].length; j++) {
            let currentSection = searchedSections[i][j];
            let section = {
                sectionIndex: currentSection.sectionIndex,
                sectionNumber: currentSection.sectionNumber,
                sectionType: currentSection.sectionType,
                professor: currentSection.professor,
                capacity: currentSection.capacity,
                comments: currentSection.comments
            }
            sections.push(section);
        }

        let course = {
            courseString: searchedCourses[i].courseString,
            schoolNumber: searchedCourses[i].schoolNumber,
            departmentNumber: searchedCourses[i].departmentNumber,
            courseNumber: searchedCourses[i].courseNumber,
            name: searchedCourses[i].name,
            description: searchedSections[i].name,
            numberOfCredits: searchedCourses[i].numberOfCredits,
            prerequisites: searchedCourses[i].prerequisites,
            sections: sections
        }
        courses.push(course);
    }

    return courses;
}

module.exports = { searchCoursesAndSections }