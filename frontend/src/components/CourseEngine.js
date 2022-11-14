import React, {useState} from 'react';
import { Accordion, Container } from "react-bootstrap";
import axios from "axios";

export function CourseEngine() {
    const [data, setData] = useState({courseQuery: ""});

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const courseQuery = {
            courseQuery: data.courseQuery
        }

        axios.post("http://localhost:3001/search", courseQuery).then((response) => {
            alert(JSON.stringify(response));
        }).catch(() => {});
    };

    return (
        <Container fluid>
            <div className={"h-25 bg-light-coral"}>
                <span>Search Courses</span>
                <form onSubmit={handleSubmit}>
                    <label>Course Name:
                        <input
                            type="text"
                            name="courseQuery"
                            value={data.courseQuery}
                            onChange={handleChange}
                        />
                    </label>
                    <input type="submit"/>
                </form>
            </div>
            <span>View Courses</span>
            <div className={"d-flex justify-content-between w-100"}>
                <span>Course String</span>
                <span>Course Name</span>
            </div>
            <Accordion alwaysOpen className={"flex-grow-1"}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <div className={"d-flex justify-content-between w-100"}>
                            <span>XX:YYY:ZZZ</span>
                            <span>Course 1</span>
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
                            <span>Course 2</span>
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
        </Container>
    );
}