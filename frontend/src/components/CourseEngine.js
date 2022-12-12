import React, { useContext, useState } from "react";
import { Accordion, Card, Container, Button, useAccordionButton } from "react-bootstrap";
import axios from "axios";
import { DataContext } from "../contexts/DataContext";
import { Field, Form, Formik } from "formik";
import "../styles/viewer.css";
import { API_URL } from "../App";
import { useSearch } from "../hooks/useSearch";
import Select from "react-select";

export function CourseEngine({ schedule, addHandler, dropHandler }) {
	const { data } = useContext(DataContext);
	const [searchedCourses, setSearchedCourses] = useState([]);
	const [schools, departments, downloadDepartments] = useSearch(data.token);
	const [selectedDepartment, setSelectedDepartment] = useState();

	function CardContainer({ children, eventKey }) {
		return (
			<div onClick={useAccordionButton(eventKey, () => {
			})}>
				{children}
			</div>
		);
	}

	const viewMode = schedule ? "student" : "admin";

	function CourseViewer() {
		if (searchedCourses.length === 0)
			return <></>;

		let count = 0;
		let courseList = [];
		for (let i = 0; i < searchedCourses.length; i++) {
			const courseEventKey = count;
			count++;

			const sections = searchedCourses[i].sections;
			let sectionList = [];
			let openSections = 0;
			for (let j = 0; j < sections.length; j++) {
				let button = <></>;
				if (viewMode === "student") {
					if (schedule["courses"].some((course) => {
						return course.courseString === searchedCourses[i].courseString &&
							course.sectionNumber === sections[j].sectionNumber;
					})) {
						button = <Button value={sections[j].sectionIndex} className={"add-drop-button"}
										 onClick={dropHandler}>Drop</Button>;
					}
					else {
						button = <Button value={sections[j].sectionIndex} className={"add-drop-button"}
										 onClick={addHandler}>Add</Button>;
					}
				}

				if (sections[j].filled < sections[j].capacity)
					openSections++;

				const section = (
					<Card key={count.toString()}>
						<Card.Header style={{ padding: 0 }}>
							<CardContainer eventKey={count.toString()}>
								<span>{[
									sections[j].sectionNumber,
									sections[j].sectionType,
									"Taught by " + sections[j].professor,
									searchedCourses[i].numberOfCredits + " credits"
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
								{searchedCourses[i].courseString}
								{" | "}
								{searchedCourses[i].name}
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

	const searchCourses = async (courseQuery) => {
		console.log("Searching query: " + courseQuery);
		axios.post(API_URL + "/search", {
			token: data.token,
			courseQuery: courseQuery
		}).then((response) => {
			setSearchedCourses(response.data);
		});
	};

	let listOfSchools = schools.map((school) => {
		return {
			value: school.schoolNumber,
			label: school.schoolName
		};
	});

	let listOfDepartments = departments.map((department) => {
		return {
			value: department.departmentNumber,
			label: department.departmentName
		};
	});

	const changeSchoolSelection = (selectedOption) => {
		downloadDepartments(selectedOption.value);
		setSelectedDepartment(null);
	};

	return (
		<Container fluid className={"d-flex flex-column"}>
			<div className={"bg-light-coral"}>
				<span>Search Courses</span>
				<Formik initialValues={{ courseQuery: "" }}
						onSubmit={async (values, actions) => {
							await searchCourses(values["courseQuery"]);
							actions.resetForm();
						}}>
					{(formik) => (
						<Form>
							<div>
								<label>Course Name: </label>
								<Field type="text"
									   name="courseQuery"
									   onChange={formik.handleChange}/><br/>
							</div>
							<div className={"d-flex"}>
								<label className={"m-auto"}>Sort by School: </label>
								<Select options={listOfSchools}
										className={"flex-grow-1"}
										onChange={changeSchoolSelection}/><br/>
							</div>
							<div className={"d-flex"}>
								<label className={"m-auto"}>Sort by Department: </label>
								<Select options={listOfDepartments}
										className={"flex-grow-1"}
										key={selectedDepartment}
										defaultValue={selectedDepartment}
										onChange={selectedOption => setSelectedDepartment(selectedOption)}/><br/>
							</div>
							<Button type="submit" disabled={!(formik.isValid && formik.dirty)}>Search</Button>
						</Form>
					)}
				</Formik>
			</div>
			<div className={"h-75 d-flex flex-column flex-grow-1"}>
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