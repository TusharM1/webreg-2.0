const { StudyProgram, StudyProgramStudent } = require("../../models");

//This async method finds and returns a student's degree study program, such as Computer Science.
const findStudyPrograms = async (netID) => {
	const enrolledStudyPrograms = await StudyProgramStudent.findAll({
		where: {
			netID: netID
		},
		raw: true
	});

	let programInfo = [];
	for (let enrolledStudyProgram of enrolledStudyPrograms) {
		const studyProgram = await StudyProgram.findOne({
			where: {
				studyProgramCode: enrolledStudyProgram["studyProgramCode"]
			},
			raw: true
		});
		programInfo.push(studyProgram);
	}

	return programInfo;
};

module.exports = { findStudyPrograms };