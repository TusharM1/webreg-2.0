import React, { useContext, useState } from "react";
import { Accordion, Card, Container, Button, useAccordionButton } from "react-bootstrap";
import axios from "axios";
import { DataContext } from "../contexts/DataContext";
import { Field, Form, Formik } from "formik";
import "../styles/viewer.css";
import { API_URL } from "../App";

//This function handles the search courses, create courses, drop courses user stories
export function CourseEngine({ schedule, addHandler, dropHandler }) {
	//Gets user basic data
	const { data } = useContext(DataContext);
	const [ courses, setCourses ] = useState([]);

	function CardContainer({ children, eventKey }) {
		return (
			<div onClick={useAccordionButton(eventKey, () => {})}>
				{children}
			</div>
		);
	}

	const viewMode = schedule ? "student" : "admin";

	function CourseViewer() {
		if (courses.length === 0)
			return <></>;

		let count = 0;
		let courseList = [];
		for (let i = 0; i < courses.length; i++) {
			const courseEventKey = count;
			count++;

			const sections = courses[i].sections;
			let sectionList = [];
			let openSections = 0;
			for (let j = 0; j < sections.length; j++) {
				let button = <></>;
				if (viewMode === "student") {
					if (schedule["courses"].some((course) => {
						return course.courseString === courses[i].courseString &&
							course.sectionNumber === sections[j].sectionNumber;
					})) {
						button = <Button value={sections[j].sectionIndex} className={"add-drop-button"}
										 onClick={dropHandler}>Drop</Button>
					}
					else {
						button = <Button value={sections[j].sectionIndex} className={"add-drop-button"}
										 onClick={addHandler}>Add</Button>
					}
				}

				if (sections[j].filled < sections[j].capacity)
					openSections++;

				const section = (
					<Card key={count.toString()}>
						<Card.Header style={{padding: 0}}>
							<CardContainer eventKey={count.toString()}>
								<span>{[
									sections[j].sectionNumber,
									sections[j].sectionType,
									"Taught by " + sections[j].professor,
									courses[i].numberOfCredits + " credits"
								].join(" | ")}
								</span>
								<div className={"d-inline-block float-end"}>
									<span>
										{sections[j].filled + " / " + sections[j].capacity + " spots filled"}
									</span>
									{button}
								</div>
							</CardContainer>
						</Card.Header>
						<Accordion.Collapse eventKey={count.toString()}>
							<Card.Body>
								{sections[j].comments}
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				);

				count++;
				sectionList.push(section);
			}

			const course = (
				<Accordion.Item key={count.toString()} eventKey={courseEventKey.toString()}>
					<Accordion.Header>
						<div className={"d-flex justify-content-between w-100"}>
							<span>
								{courses[i].courseString}
								{" | "}
								{courses[i].name}
							</span>
							<span className={"float-right"}>
								{openSections + " / " + sections.length + " open sections"}
							</span>
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

		console.log("Found " + courseList.length + " courses");

		return (
			<Accordion className={"overflow-auto flex-grow-1"} alwaysOpen style={{ flexBasis: 0 }}>
				{courseList}
			</Accordion>
		);
	}

	//This function connects to the database to search for courses. Connects to the backend through a router
	const searchCourses = async (courseQuery) => {
		console.log("Searching query: " + courseQuery);
		axios.post(API_URL + "/search", {
			token: data.token,
			courseQuery: courseQuery
		}).then((response) => {
			setCourses(response.data);
		});
	};

	return (
		<Container fluid>
			<div className={"h-25 bg-light-coral"}>
				<span>Search Courses</span>
				<Formik initialValues={{ courseQuery: "" }}
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
							<Button type="submit" disabled={!(formik.isValid && formik.dirty)}>Search</Button>
						</Form>
					)}
				</Formik>
			</div>
			<div className={"h-75 d-flex flex-column"}>
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