//const { Course } = require("../../models");
const {Enrollment} = require("../../models");




const createCourse = async (schoolNumber, departmentNumber, courseNumber, courseName, numberOfCredits) => {
	return await Enrollment.create({
        //alsdkjfasdlkfjasdlkfjsdlfjasdlfjaslkfjasl;kfjaslkfjs
	});
};



const removeCourse = async (netid, coursestring) => {
	return await Enrollment.destroy({
		where: {
            netID : netid,
            courseString: coursestring,
			semesterName: 'Spring 2023'
        }
	});
	
};


module.exports = { createCourse, removeCourse };