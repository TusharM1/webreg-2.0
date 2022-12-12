// import request from "request";
const request = require('request');

let counter = 0;
let arr = [];
for (let major = 0; major < 1000; major++) {
	let zeroMajor = "";
	if (major < 100) {
		zeroMajor = "0" + major;
	}
	else {
		zeroMajor = major;
	}

	let url = `https://sis.rutgers.edu/oldsoc/courses.json?subject=${zeroMajor}&semester=12023&campus=NB&level=UG.json`;
	//   console.log(url);
	// //let url = "https://sis.rutgers.edu/oldsoc/courses.json?subject=198&semester=12023&campus=NB&level=UG.json";

	let options = { json: true };

	const fs = require("graceful-fs");
	//const fs = require('fs');
	const { getSystemErrorMap } = require("util");

	let content = "";
	let sectionPrint = "";

	request(url, options, (error, res, body) => {
		if (error) {
			return console.log(error);
		}

		if (!error && res.statusCode === 200) {

			if (body.length === 0) {
				// console.log("zero"); aka DO NOTHING
			}
			else {
				console.log(arr.includes(zeroMajor) + "" + counter);
				arr[counter] = zeroMajor;
				counter += 1;

				//console.log(zeroMajor +' ' +counter);
				//console.log('---------------' + zeroMajor + '--------------------');
				for (let i = 0; i < body.length; i++) {
					let contentCourseString = `'${body[i]["offeringUnitCode"]}:${body[i]["subject"]}:${body[i]["courseNumber"]}'`;
					let contentSchoolNumber = `'${body[i]["offeringUnitCode"]}'`;
					let contentDepartmentNumber = `'${body[i]["subject"]}'`;
					let contentCourseNumber = `'${body[i]["courseNumber"]}'`;
					let contentName = `'${body[i]["title"].replaceAll("'", "")}'`;
					let contentDescription;
					if (body[i]["courseDescription"] != null) {
						contentDescription = `'${body[i]["courseDescription"]}'`;
					}
					else {
						contentDescription = `'null'`; //make this null later
					}
					let contentNumberOfCredits;
					if (body[i]["credits"] != null) {
						contentNumberOfCredits = `${body[i]["credits"]}`;
					}
					else {
						contentNumberOfCredits = 0;
					}

					let contentPrerequisites;
					if (body[i]["preReqNotes"] != null) {
						contentPrerequisites = `'${body[i]["preReqNotes"]}'`;
					}
					else {
						contentPrerequisites = `'null'`; //make this null later
					}

					let contentIsActive = true;
					content = `INSERT INTO course
                               VALUES (${contentCourseString}, ${contentSchoolNumber}, ${contentDepartmentNumber},
                                       ${contentCourseNumber}, ${contentName}, ${contentDescription},
                                       ${contentNumberOfCredits}, ${contentPrerequisites}, ${contentIsActive});  `;
					fs.appendFile("./csCourses_INACCURATE_OLD_DO_NOT_USE.txt", content, err => {
						if (err) {
							console.error(err);
						}
					});

					for (j = 0; j < body[i]["sections"].length; j++) { //Sections
						let sectionIndex = `'${body[i]["sections"][j]["index"]}'`; //string
						let courseString = `${contentCourseString}`; //string
						let sectionNumber = `'${body[i]["sections"][j]["number"]}'`;//string
						let sectionType = ``; //string gotta do this in the loop
						let professor;
						try {
							professor = `'${body[i]["sections"][j]["instructors"][0]["name"].replaceAll("'", "")}'`; //string
						} catch (e) {
							professor = `'null'`;
						}

						let capacity = 5; //Setting default to 5 for now
						let comments = "";
						try {
							comments = `'${body[i]["sections"][j]["comments"][0]["description"]}'`; //string
						} catch (e) {
							comments = `'null'`;
						}


						const Asynchronous = body[i]["sections"][j]["meetingTimes"].length;
						const In_Person = 0;
						let sectionMeetingTypeCounter = 0;

						for (let k = 0; k < body[i]["sections"][j]["meetingTimes"].length; k++) { //section meeting times aka section BLOCK

							let sectionIndex = `'${body[i]["sections"][j]["index"]}'`; //String
							let blockDay = `'${body[i]["sections"][j]["meetingTimes"][k]["meetingDay"]}'`; //String
							let blockStart;
							let blockEnd;
							if (body[i]["sections"][j]["meetingTimes"][k]["startTime"] == null) {
								blockStart = `${body[i]["sections"][j]["meetingTimes"][k]["startTime"]}`; //Time
								blockEnd = `${body[i]["sections"][j]["meetingTimes"][k]["endTime"]}`; //Time
							}
							else {
								let isAm = (body[i]["sections"][j]["meetingTimes"][k]["pmCode"] === "p");
								if (!isAm) { //is a pm course
									let hourStart = Number(body[i]["sections"][j]["meetingTimes"][k]["startTime"].substring(0, 2)) + 12;
									if (hourStart >= 24) {
										hourStart -= 24;
										if (hourStart === 0) {
											hourStart = "00";
										}
									}
									let minuteStart = body[i]["sections"][j]["meetingTimes"][k]["startTime"].substring(2, 4);
									let hourEnd = Number(body[i]["sections"][j]["meetingTimes"][k]["endTime"].substring(0, 2)) + 12;
									let minuteEnd = body[i]["sections"][j]["meetingTimes"][k]["endTime"].substring(2, 4);
									blockStart = `'${hourStart}:${minuteStart}'`;
									blockEnd = `'${hourEnd}:${minuteEnd}'`;
								}
								else if (isAm) {
									let hourStart = Number(body[i]["sections"][j]["meetingTimes"][k]["startTime"].substring(0, 2));
									let minuteStart = body[i]["sections"][j]["meetingTimes"][k]["startTime"].substring(2, 4);
									let hourEnd = Number(body[i]["sections"][j]["meetingTimes"][k]["endTime"].substring(0, 2));
									let minuteEnd = body[i]["sections"][j]["meetingTimes"][k]["endTime"].substring(2, 4);
									if (hourEnd < hourStart) {
										hourEnd += 12;
									}
									blockStart = `'${hourStart}:${minuteStart}'`;
									blockEnd = `'${hourEnd}:${minuteEnd}'`;
								}
							}
							let location = `'${body[i]["sections"][j]["meetingTimes"][k]["campusLocation"]}'`;//String
							let meetingType = ``;
							if (location === `'O'` || location === `'null'`) {
								meetingType = `'Online'`; //String
								sectionMeetingTypeCounter++;
							}
							else {
								meetingType = `'In-Person'`; //String
							}
							let SectionBlockPrint = `INSERT INTO sectionBlock
                                                     VALUES (uuid(), ${sectionIndex}, ${blockDay}, ${blockStart},
                                                             ${blockEnd}, ${location}, ${meetingType});  `;
							fs.appendFile("./csSectionsBlocks.txt", SectionBlockPrint, err => {
								if (err) {
									console.error(err);
								}
							});

						}

						if (sectionMeetingTypeCounter >= Asynchronous) {
							sectionType = `'Asynchronous'`;
						}
						else if (sectionMeetingTypeCounter <= 0) {
							sectionType = `'In-Person'`;
						}
						else {
							sectionType = `'Hybrid'`;
						}

						sectionPrint = `INSERT INTO section
                                        VALUES (${sectionIndex}, ${courseString}, ${sectionNumber}, ${sectionType},
                                                ${professor}, ${capacity}, ${comments});  `;
						fs.appendFile("./csSections.txt", sectionPrint, err => {
							if (err) {
								console.error(err);
							}
						});
					}

				}
				//for (majorCourses=0; majorCourses<body.length; majorCourses++){
				//console.log(body[majorCourses]['title']);
				//console.log(body[0]);
				//}
			}
		}
	});
}

	
