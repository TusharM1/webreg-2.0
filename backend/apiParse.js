const request = require('request');

let url = "https://sis.rutgers.edu/oldsoc/courses.json?subject=198&semester=12023&campus=NB&level=UG.json";

let options = {json: true};



request(url, options, (error, res, body) => {
    if (error) {
        return  console.log(error)
    };

    if (!error && res.statusCode == 200) {
        // do something with JSON, using the 'body' variable
        //console.log(body.title)
        //console.log(typeof(body))
       // console.log(body[30]["title"])
       console.log(body[0]);
       for (i = 0; i<0; i++){
            console.log(body[i]["title"])
            console.log(body[i]["openSections"])
           // console.log(body[i]["sections"])
            for (j=0; j<body[i]["sections"].length; j++){
                //console.log(body[i]["sections"][j]["meetingTimes"][0]['startTime'])
                //console.log(body[i]["sections"][j]["meetingTimes"][0]['endTime'])
                for (k = 0; k < body[i]["sections"][j]["meetingTimes"].length; k++){
                    console.log(body[i]["sections"][j]["meetingTimes"][k]['pmCode'])
                    console.log(body[i]["sections"][j]["meetingTimes"][k]['startTime'])
                    console.log(body[i]["sections"][j]["meetingTimes"][k]['endTime'])
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