import React from 'react';
import {Accordion, Container, Table} from "react-bootstrap";

export function ViewCourses() {
    return (
        <Container fluid>
            <span>View Courses</span>
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