const request = require('request');

let url = "https://sis.rutgers.edu/oldsoc/courses.json?subject=198&semester=12023&campus=NB&level=UG.json";

let options = {json: true};

const fs = require('fs');

let content = '';


request(url, options, (error, res, body) => {
    if (error) {
        return  console.log(error)
    };

    if (!error && res.statusCode == 200) {
        // do something with JSON, using the 'body' variable
        //console.log(body.title)
        //console.log(typeof(body))
       // console.log(body[30]["title"])
       //console.log(body[0])
       for (i = 0; i<body.length; i++){
            //console.log(body[i]["title"])
            //console.log(body[i]["openSections"])
            let contentCourseString = `'${body[i]['offeringUnitCode']}:${body[i]['subject']}:${body[i]['courseNumber']}'`
            let contentSchoolNumber = `'${body[i]['offeringUnitCode']}'`
            let contentDepartmentNumber = `'${body[i]['subject']}'`
            let contentName = `'${body[i]['title']}'`
            let contentDescription;
            if (body[i]['courseDescription'] != null){
                contentDescription = `'${body[i]['courseDescription']}'`
            }
            else {
                contentDescription = `'null'`; //make this null later
            }
            let contentNumberOfCredits;
            if (body[i]['credits'] != null){
                contentNumberOfCredits = `${body[i]['credits']}`
            }
            else{
                contentNumberOfCredits = 0;
            }
            
            let contentPrerequisites;
            if (body[i]['preReqNotes'] != null){
                contentPrerequisites = `'${body[i]['preReqNotes']}'`
            }
            else{
                contentPrerequisites = `'null'` //make this null later
            }
            
            let contentIsActive = true
            content = `INSERT INTO course VALUES(${contentCourseString},${contentSchoolNumber},${contentDepartmentNumber},${contentName},${contentDescription},${contentNumberOfCredits},${contentPrerequisites},${contentIsActive});\n`
            fs.appendFile('./test.txt', content, err => {
                if (err) {
                  console.error(err);
                }
              });
            
            for (j=0; j<body[i]["sections"].length; j++){ //Sections
 
                for (k = 0; k < body[i]["sections"][j]["meetingTimes"].length; k++){ //section meeting times
                    //console.log(body[i]["sections"][j]["meetingTimes"][k]['pmCode'])
                    //console.log(body[i]["sections"][j]["meetingTimes"][k]['startTime'])
                    //console.log(body[i]["sections"][j]["meetingTimes"][k]['endTime'])
                }
                //console.log(body[i]["sections"][j]["index"])
            }
            // for (j=0; j<body[i].length; j++){
            //     if (body[i][j] === )
            //     console.log(body[i][j][])
            // }
       }
      // console.log(body.length)
    };
    
});