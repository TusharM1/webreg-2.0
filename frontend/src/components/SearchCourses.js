import React from 'react';
import {Container} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

export function SearchCourses() {
    const [data, setData] = useState({
        courseString: "",
        test: ""
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //create a query
        const userData = {
            courseString: data.courseString,
            test: data.test 
        };
       // alert('Test: ' + userData.courseString);

        const res = axios.post("http://localhost:3001/search", userData).then((response) =>{
            console.log(response.status);
            console.log("course name: " + response.data.courseName
                                + " courseNumber: " + response.data.courseNumber
                                + " isActive: " + response.data.isActive);
        });
        console.log("a: " + res[0]);
        //console.log("returned: " + res.data);
    };
    

    return (
        <Container fluid>
            <span><strong>Search Courses</strong></span>
            <form onSubmit={handleSubmit}>
                <label>Course Name:
                    <input 
                        type="courseNameText"
                        name="courseString"
                        value={data.courseName}
                        onChange={handleChange}
                    />
                </label>
                <input type="submit"/>
            </form>
            
        </Container>
    );
}