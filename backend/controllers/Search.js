const { School, Department, SchoolDepartment, Course, Section, Enrollment, SectionBlock } = require("../models");
const { Op, Sequelize } = require("sequelize");
//This async method searches the database for a course matching the passed in course string, invoked by the search bar.
const findCourse = async (courseString) => {
	return await Course.findOne({
		where: {
			courseString: courseString
		},
		raw: true
	});
}
//This async method searches the database for a course section matching the passed in section index, invoked by the search bar.
const findSection = async (sectionIndex) => {
	return await Section.findOne({
		where: {
			sectionIndex: sectionIndex
		},
		raw: true
	});
}
//This async method searches the database for a section blocks, matching the passed in section index, invoked by the search bar.
const findSectionBlocks = async (sectionIndex) => {
	return await SectionBlock.findAll({
		where: {
			sectionIndex: sectionIndex
		},
		raw: true
	});
}
//This async method searches the database for multiple courses matching the user's search query, and all sections of these courses, invoked by the search bar.
const searchCoursesAndSections = async (courseQuery) => {
	const searchedCourses = (await Course.findAll({
		where: {
			[Op.and]: [{
				name: Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("name")), "LIKE", "%" + courseQuery + "%"),
				isActive: true
			}]
		},
		order: [
			["courseString", "ASC"]
		],
		raw: true
	}));

	const searchedSections = await Promise.all(searchedCourses.map(async (course) => {
		const sections = await Section.findAll({
				where: {
					courseString: course["courseString"]
				},
				order: [
					["sectionIndex", "ASC"]
				],
				raw: true
			}
		);

		let registeredStudents = await Promise.all(sections.map(async (section) => {
			const count = await Enrollment.findAndCountAll({
				where: {
					sectionIndex: section["sectionIndex"]
				}
			});
			if (!count || count.error) {
				return 0;
			}
			else {
				return count["count"];
			}
		}));

		return [sections, registeredStudents]
	}));

	let courses = [];
	for (let i = 0; i < searchedCourses.length; i++) {
		let sections = [];
		for (let j = 0; j < searchedSections[i][0].length; j++) {
			let currentSection = searchedSections[i][0][j];
			let section = {
				sectionIndex: currentSection.sectionIndex,
				sectionNumber: currentSection.sectionNumber,
				sectionType: currentSection.sectionType,
				professor: currentSection.professor,
				filled: searchedSections[i][1][j],
				capacity: currentSection.capacity,
				comments: currentSection.comments,

			};
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
		};
		courses.push(course);
	}

	return courses;
};
//This async method finds and returns all schools at Rutgers, e.g. School of Arts and Sciences, School of Engineering, etc.
const getAllSchools = async () => {
	return await School.findAll({
		raw: true
	});
}
//This async method finds and returns all departments at Rutgers, e.g. Computer Science, Psychology, etc.
const getAllDepartments = async () => {
	return await Department.findAll({
		raw: true
	});
}
//This async method finds and returns all departments in a particular school, e.g. Computer Science, Psychology in School of Arts and Sciences, Biomedical/Electrical Engineering in School of Engineering, etc.
const getDepartmentsBySchool = async (schoolNumber) => {
	return await Department.findAll({
		include: [{
			model: SchoolDepartment,
			where: {
				schoolNumber: schoolNumber
			},
			attributes: []
		}],
		raw: true
	});
}

module.exports = { getAllSchools, getAllDepartments, getDepartmentsBySchool, findCourse, findSection, findSectionBlocks, searchCoursesAndSections };