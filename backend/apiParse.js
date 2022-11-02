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
       for (i = 0; i<3; i++){
            console.log(body[i]["title"])
            console.log(body[i]["openSections"])
           // console.log(body[i]["sections"])
            for (j=0; j<body[i]["sections"].length; j++){
                //console.log(body[i]["sections"][j]["meetingTimes"])
                console.log(body[i]["sections"][j]["index"])
            }
            // for (j=0; j<body[i].length; j++){
            //     if (body[i][j] === )
            //     console.log(body[i][j][])
            // }
       }
      // console.log(body.length)
    };
});