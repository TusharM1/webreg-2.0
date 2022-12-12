const { School, Department, Course, Section, Enrollment, SectionBlock } = require("../models");
const { Op, Sequelize } = require("sequelize");

const findCourse = async (courseString) => {
	return await Course.findOne({
		where: {
			courseString: courseString
		},
		raw: true
	});
}

const findSection = async (sectionIndex) => {
	return await Section.findOne({
		where: {
			sectionIndex: sectionIndex
		},
		raw: true
	});
}

const findSectionBlocks = async (sectionIndex) => {
	return await SectionBlock.findAll({
		where: {
			sectionIndex: sectionIndex
		},
		raw: true
	});
}

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

const getAllSchools = async () => {
	return await School.findAll({
		raw: true
	});
}

const getAllDepartments = async () => {
	return await Department.findAll({
		raw: true
	});
}

// const getDepartmentsBySchool = async (school) => {
// 	return await School.findAll({
// 		where: {
// 			schoolName: school
// 		},
// 		raw: true
// 	});
// }

module.exports = { getAllSchools, getAllDepartments, findCourse, findSection, findSectionBlocks, searchCoursesAndSections };