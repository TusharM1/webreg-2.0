import React from 'react';
import { Accordion, Container } from "react-bootstrap";

export function CourseEngine() {
    return (
        <Container fluid>
            <div className={"h-25 bg-light-coral"}>
                <span>Search Courses</span>
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