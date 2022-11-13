import React from 'react';
import {Accordion, Container, Table} from "react-bootstrap";
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
        
        axios.post("http://localhost:3001/search", userData).then((response) =>{
            console.log(response.status);
            console.log("course name: " + response.data.courseName
                                + " courseNumber: " + response.data.courseNumber
                                + " isActive: " + response.data.isActive
                                + " indexes: " + response.data.indexList);
            let result = "";
            for(let i = 0; i < response.data.indexList.length; i++){
                result += response.data.indexList[i].sectionIndex + " | ";
            }
            alert("Course: " + response.data.courseName + "\nIndexes: " + result);
        });
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
            
            <Table>
                <thead>
                    <th>Course String</th>
                    <th>Course Name</th>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <Accordion alwaysOpen className={"flex-grow-1"}>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <div className={"d-flex justify-content-between w-100"}>
                                            <span>XX:YYY:ZZZ</span>
                                            <span className={"float-right"}>Course 1</span>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Accordion alwaysOpen className={"flex-grow-1"}>
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>Section 1</Accordion.Header>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="2">
                                                <Accordion.Header>Section 2</Accordion.Header>
                                            </Accordion.Item>
                                        </Accordion>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>
                                        <div className={"d-flex justify-content-between w-100"}>
                                            <span>XX:YYY:ZZZ</span>
                                            <span className={"float-right"}>Course 2</span>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Accordion alwaysOpen className={"flex-grow-1"}>
                                            <Accordion.Item eventKey="4">
                                                <Accordion.Header>Section 1</Accordion.Header>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="5">
                                                <Accordion.Header>Section 2</Accordion.Header>
                                            </Accordion.Item>
                                        </Accordion>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
}