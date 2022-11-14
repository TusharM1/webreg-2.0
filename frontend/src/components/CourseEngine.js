import React, {useContext, useState} from 'react';
import { Accordion, Container } from "react-bootstrap";
import axios from "axios";
import {DataContext} from "../user/DataContext";
import { Field, Form, Formik } from "formik";

export function CourseEngine() {
    const { data } = useContext(DataContext);

    const searchCourses = async (courseQuery) => {
        axios.post("http://localhost:3001/search", {
            token: data.token,
            courseQuery: courseQuery
        }).then((response) => {
            alert(JSON.stringify(response.data));
        }).catch(() => {});
    };

    return (
        <Container fluid>
            <div className={"h-25 bg-light-coral"}>
                <span>Search Courses</span>
                <Formik initialValues={{ courseQuery: ''}}
                    onSubmit={async (values, actions) => {
                        await searchCourses(values["courseQuery"]);
                        actions.resetForm();
                    }}>
                    {(formik) => (
                        <Form>
                            <label>Course Name:</label>
                            <Field
                                type="text"
                                name="courseQuery"
                                onChange={formik.handleChange}
                            />
                            <button type="submit" disabled={!(formik.isValid && formik.dirty)}>Login</button>
                        </Form>
                    )}
                </Formik>
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