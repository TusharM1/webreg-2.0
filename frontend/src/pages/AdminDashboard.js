import React, { useContext } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import axios from "axios";
import { DataContext } from "../contexts/DataContext";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { CourseEngine } from "../components/CourseEngine";
import { API_URL } from "../App";

export function AdminDashboard() {
	const { data } = useContext(DataContext);

	const createCourse = async (schoolNumber, departmentNumber, courseNumber, courseName, numberOfCredits) => {
		axios.post(API_URL + "/admin/course/create", {
			token: data.token,
			schoolNumber: schoolNumber,
			departmentNumber: departmentNumber,
			courseNumber: courseNumber,
			courseName: courseName,
			numberOfCredits: numberOfCredits
		}).then((response) => {
			alert(JSON.stringify(response.data));
		});
	};

	const removeCourse = async (schoolNumber, departmentNumber, courseNumber) => {
		axios.post(API_URL + "/admin/course/remove", {
			token: data.token,
			schoolNumber: schoolNumber,
			departmentNumber: departmentNumber,
			courseNumber: courseNumber
		}).then((response) => {
			alert(JSON.stringify(response.data));
		});
	};

	const editCourse = async (schoolNumber, departmentNumber, courseNumber, courseName, numberOfCredits) => {
		axios.post(API_URL + "/admin/course/edit", {
			token: data.token,
			schoolNumber: schoolNumber,
			departmentNumber: departmentNumber,
			courseNumber: courseNumber,
			courseName: courseName,
			numberOfCredits: numberOfCredits
		}).then((response) => {
			alert(JSON.stringify(response.data));
		});
	};

	return (
		<Container fluid className={"h-100"}>
			<Row className={"h-100"}>
				<Col className={"h-100 d-flex flex-column"}>
					<Tab.Container transition={false} defaultActiveKey={"createCourse"}>
						<Nav variant="tabs">
							<Nav.Item>
								<Nav.Link eventKey="createCourse">Create Course</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="editCourse">Edit Course</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="removeCourse">Remove Course</Nav.Link>
							</Nav.Item>
						</Nav>
						<Tab.Content className={"flex-grow-1"}>
							<Tab.Pane className={"h-100"} eventKey="createCourse" title="Create Course">
								<Row style={{ height: "100%", background: "lightpink" }}>
									<Formik
										initialValues={{
											schoolNumber: "",
											departmentNumber: "",
											courseNumber: "",
											courseName: "",
											numberOfCredits: ""
										}}
										onSubmit={async (values, actions) => {
											await createCourse(values["schoolNumber"],
												values["departmentNumber"],
												values["courseNumber"],
												values["courseName"],
												values["numberOfCredits"]);
											actions.resetForm();
										}}
										validationSchema={Yup.object().shape({
											schoolNumber: Yup.string().required().matches(/^\d+$/),
											departmentNumber: Yup.string().required().matches(/^\d+$/),
											courseNumber: Yup.string().required().matches(/^\d+$/),
											courseName: Yup.string().required(),
											numberOfCredits: Yup.number().required()
										})}>
										{(formik) => (
											<Form>
												<span>Create Course</span><br/>

												<Field type="text"
													   autoComplete="on"
													   onChange={formik.handleChange}
													   name="schoolNumber"
													   placeholder="School Number">
												</Field><br/>
												<Field type="text"
													   autoComplete="on"
													   onChange={formik.handleChange}
													   name="departmentNumber"
													   placeholder="Department Number">
												</Field><br/>
												<Field type="text"
													   autoComplete="on"
													   onChange={formik.handleChange}
													   name="courseNumber"
													   placeholder="Course Number">
												</Field><br/>
												<Field type="text"
													   autoComplete="on"
													   onChange={formik.handleChange}
													   name="courseName"
													   placeholder="Course Name">
												</Field><br/>
												<Field type="text"
													   autoComplete="on"
													   onChange={formik.handleChange}
													   name="numberOfCredits"
													   placeholder="Number of Credits">
												</Field><br/>

												<button type="submit"
														id="createCourse"
														disabled={!(formik.isValid && formik.dirty)}>
													Create Course
												</button>
											</Form>
										)}
									</Formik>
								</Row>
							</Tab.Pane>
							<Tab.Pane className={"h-100"} eventKey="editCourse" title="Edit Course">
								<Row style={{ height: "100%", background: "lightblue" }}>
									<Formik
										initialValues={{
											schoolNumber: "",
											departmentNumber: "",
											courseNumber: "",
											courseName: "",
											numberOfCredits: ""
										}}
										onSubmit={async (values, actions) => {
											await editCourse(values["schoolNumber"],
												values["departmentNumber"],
												values["courseNumber"],
												values["courseName"],
												values["numberOfCredits"]);
											actions.resetForm();
										}}
										validationSchema={Yup.object().shape({
											schoolNumber: Yup.string().required().matches(/^\d+$/),
											departmentNumber: Yup.string().required().matches(/^\d+$/),
											courseNumber: Yup.string().required().matches(/^\d+$/),
											courseName: Yup.string().required(),
											numberOfCredits: Yup.number().required()
										})}>
										{(formik) => (
											<Form>
												<span>Edit Course</span><br/>

												<Field type="text"
													   autoComplete="on"
													   onChange={formik.handleChange}
													   name="schoolNumber"
													   placeholder="School Number">
												</Field><br/>
												<Field type="text"
													   autoComplete="on"
													   onChange={formik.handleChange}
													   name="departmentNumber"
													   placeholder="Department Number">
												</Field><br/>
												<Field type="text"
													   autoComplete="on"
													   onChange={formik.handleChange}
													   name="courseNumber"
													   placeholder="Course Number">
												</Field><br/>
												<Field type="text"
													   autoComplete="on"
													   onChange={formik.handleChange}
													   name="courseName"
													   placeholder="New Course Name">
												</Field><br/>
												<Field type="text"
													   autoComplete="on"
													   onChange={formik.handleChange}
													   name="numberOfCredits"
													   placeholder="New Number of Credits">
												</Field><br/>

												<button type="submit"
														id="editCourse"
														disabled={!(formik.isValid && formik.dirty)}>
													Edit Course
												</button>
											</Form>
										)}
									</Formik>
								</Row>
							</Tab.Pane>
							<Tab.Pane className={"h-100"} eventKey="removeCourse" title="Remove Course">
								<Row style={{ height: "100%", background: "lightgreen" }}>
									<Formik
										initialValues={{
											schoolNumber: "",
											departmentNumber: "",
											courseNumber: ""
										}}
										onSubmit={async (values, actions) => {
											await removeCourse(values["schoolNumber"],
												values["departmentNumber"],
												values["courseNumber"]);
											actions.resetForm();
										}}
										validationSchema={Yup.object().shape({
											schoolNumber: Yup.string().required().matches(/^\d+$/),
											departmentNumber: Yup.string().required().matches(/^\d+$/),
											courseNumber: Yup.string().required().matches(/^\d+$/)
										})}>
										{(formik) => (
											<Form>
												<span>Remove Course</span><br/>

												<Field type="text"
													   autoComplete="on"
													   onChange={formik.handleChange}
													   name="schoolNumber"
													   placeholder="School Number">
												</Field><br/>
												<Field type="text"
													   autoComplete="on"
													   onChange={formik.handleChange}
													   name="departmentNumber"
													   placeholder="Department Number">
												</Field><br/>
												<Field type="text"
													   autoComplete="on"
													   onChange={formik.handleChange}
													   name="courseNumber"
													   placeholder="Course Number">
												</Field><br/>

												<button type="submit"
														id="removeCourse"
														disabled={!(formik.isValid && formik.dirty)}>
													Remove Course
												</button>
											</Form>
										)}
									</Formik>
								</Row>
							</Tab.Pane>
						</Tab.Content>
					</Tab.Container>
				</Col>
				<Col className={"h-100 d-flex flex-column"}>
					<Row style={{ height: "100%", background: "lightblue" }}><CourseEngine/></Row>
				</Col>
			</Row>
		</Container>
	);
}