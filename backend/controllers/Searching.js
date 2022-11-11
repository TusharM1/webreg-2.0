const { Course } = require('../models');
const { Section } = require('../models');
const { Op } = require("sequelize");

const getSearchedCourses = async (token) => {

    // find semester where start is before this data and end is after
    console.log("creating query for class: " + token);
    const currentSemester = (await Course.findAll({
        where: {
            name : token
        },
        order: [
            ["courseNumber", "ASC"]
        ],
        raw: true
    }));
    //find the indexes for that course
    const hold = formatSemester(currentSemester[0]);
    //console.log(currentSemester[0]["isActive"]);
    console.log("heyo: " + hold.courseName);
    if(hold){
        const isActive = hold.isActive;
        if (!isActive) {
            console.log("here....");
            return {
                error: true,
                message: "Deactivated Course"
            }
        }
        //console.log("here: " + hold);
        //return hold;
    }
    console.log("creating query to search for indexes of the course");
    const indexes = (await Section.findAll({
        where: {
            courseString : hold.courseName
        },
        order: [
            ["sectionIndex", "ASC"]
        ],
        raw: true
    }));
    console.log("printing here: " + indexes);
    const result = formatResult(hold, indexes);
    return result;
}

function formatSemester(semester) {
    return {
        courseName: semester.courseString,
        courseNumber: semester.courseNumber,
        isActive: semester.isActive
    }
}

function formatResult(course, indexes){
    console.log("setting course name to : " + course.courseName);
    return{
        courseName: course.courseName,
        courseNumber: course.courseNumber,
        isActive: course.isActive,
        indexList: indexes
    }
}

module.exports = {getSearchedCourses}