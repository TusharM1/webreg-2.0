import React, {useContext, useState} from 'react';
import { Accordion, Container } from "react-bootstrap";
import axios from "axios";
import {DataContext} from "../contexts/DataContext";
import { Field, Form, Formik } from "formik";
import "../styles/viewer.css"
// import {ScheduleContext} from "../contexts/ScheduleContext";

export function CourseEngine() {
    const { data } = useContext(DataContext);
    // const { schedule } = useContext(ScheduleContext);

    const [courses, setCourses] = useState([]);

    function CourseViewer() {
        if (courses === [])
            return <></>;

        let count = 0;
        let courseList = []
        for (let i = 0; i < courses.length; i++) {
            const courseEventKey = count;
            count++;

            const sections = courses[i].sections;
            let sectionList = []
            for (let j = 0; j < sections.length; j++) {
                const section = (
                    <Accordion.Item eventKey={count.toString()}>
                        <Accordion.Header>{sections[j].sectionNumber}</Accordion.Header>
                        <Accordion.Body>
                            <p>{sections[j].sectionType}</p>
                            <p>{sections[j].professor}</p>
                            <p>{sections[j].numberOfCredits}</p>
                            <p>{sections[j].capacity}</p>
                        </Accordion.Body>
                    </Accordion.Item>
                );
                count++;
                sectionList.push(section);
            }

            const course = (
                <Accordion.Item eventKey={courseEventKey.toString()}>
                    <Accordion.Header>
                        <div className={"d-flex justify-content-between w-100"}>
                            <span>{courses[i].courseString}</span>
                            <span>{courses[i].name}</span>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Accordion alwaysOpen className={"flex-grow-1"}>
                            {sectionList}
                        </Accordion>
                    </Accordion.Body>
                </Accordion.Item>
            );
            courseList.push(course);
        }

        return (
            <Accordion alwaysOpen style={{height: "600px"}}>
                {courseList}
            </Accordion>
        );
    }

    const searchCourses = async (courseQuery) => {
        axios.post("http://localhost:3001/search", {
            token: data.token,
            courseQuery: courseQuery
        }).then((response) => {
            setCourses(response.data);
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
                            <Field type="text"
                                    name="courseQuery"
                                    onChange={formik.handleChange}/>
                            <button type="submit" disabled={!(formik.isValid && formik.dirty)}>Search</button>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className={"h-75 overflow-scroll"}>
                <span>View Courses</span>
                <div className={"d-flex justify-content-between w-100"}>
                    <span>Course String</span>
                    <span>Course Name</span>
                </div>
                <CourseViewer/>
            </div>
        </Container>
    );
}