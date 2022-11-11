const { Course } = require('../models');
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
    //console.log(currentSemester[0]["isActive"]);
    const hold = formatSemester(currentSemester[0]);
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
        console.log("here: " + hold);
        return hold;
    }

   /* let result = []

    if (currentSemester.length > 0)
        result.push(formatSemester(currentSemester[0]))

    if (nextSemester.length > 0)
        result.push(formatSemester(nextSemester[0]))
    */

    // console.log(currentSemester);
    // console.log(nextSemester);

    return result;
}

function formatSemester(semester) {
    return {
        courseName: semester.courseString,
        courseNumber: semester.courseNumber,
        isActive: semester.isActive
    }
}

module.exports = {getSearchedCourses}