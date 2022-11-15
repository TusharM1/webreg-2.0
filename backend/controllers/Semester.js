const { Semester } = require('../models');
const { Op } = require("sequelize");
const moment = require("moment");

const getEditableSemestersFromUser = async (token) => {
    // return 1 or 2 semesters and whether the hooks is allowed to register for classes
    // ex: fall 2022 and winter 2022

    // return current semester and next semester if currently in a semester
    // return just the next semester if in between semesters

    // get the date
    // const date = moment("2024-01-01", "YYYY-MM-DD");
    const date = moment(moment.now());

    // find semester where start is before this data and end is after
    const currentSemester = (await Semester.findAll({
        where: {
            [Op.and]: [{
                startDate: {
                    [Op.lte]: date.toDate()
                },
                endDate: {
                    [Op.gte]: date.toDate()
                }
            }]
        },
        order: [
            ["endDate", "ASC"]
        ],
        raw: true
    }));

    // find the earliest semester that start after this date
    const nextSemester = (await Semester.findAll({
        where: {
            startDate: {
                [Op.gt]: date.toDate()
            }
        },
        order: [
            ["endDate", "ASC"]
        ],
        raw: true
    }));

    let result = []

    if (currentSemester.length > 0)
        result.push(formatSemester(currentSemester[0], token))

    if (nextSemester.length > 0)
        result.push(formatSemester(nextSemester[0], token))

    // console.log(currentSemester);
    // console.log(nextSemester);

    return result;
}

function getUserPermissionForSemester(startDate, token) {
    // calculate number of credits for hooks
    // determine when the hooks is able to register for classes for the given semester

    /*
    modes:
        - plan: plan courses but don't sign up for them yet
        - register: add and drop courses for this semester
        - withdraw: drop courses with Withdraw on transcript
     */
    // TODO add functionality
    return "register";
}

function formatSemester(semester, token) {
    return {
        semesterName: semester.semesterName,
        permission: getUserPermissionForSemester(semester.startDate, token)
    }
}

module.exports = {getEditableSemestersFromUser}