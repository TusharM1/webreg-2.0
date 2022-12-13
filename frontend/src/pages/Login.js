import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../contexts/DataContext";
import { Container } from "react-bootstrap";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "../styles/login.css";
import { API_URL } from "../App";

//This page handles functionality for login: account checking and leads to the other pages depending on the user's designation (Student or Admin)
const Login = () => {
	//Stores user data
	const { saveData } = useContext(DataContext);

	const navigate = useNavigate();
	//This function checks the netID and password against the database to determine if the user exists
	//Sends a call to the backend router
	const loginUser = async (netID, password) => {
		const data = await axios.post(API_URL + "/auth", {
			type: "login",
			data: {
				netID: netID,
				password: password
			}
		}).then(response => response.data);
		const saved = saveData(data);
		if (saved) {
			navigate("/dashboard");
		}
		else {
			console.log(data["message"]);
		}
	};

	return (
		<Container fluid className={"login"}>
			<Formik initialValues={{ netID: "", password: "" }}
					//calls the function above when the button is pressed and values are in the textboxes
					onSubmit={async (values, actions) => {
						await loginUser(values["netID"], values["password"]);
						actions.resetForm();
					}}
					validationSchema={Yup.object().shape({
						netID: Yup.string().required(),
						password: Yup.string().required()
					})}>
				{(formik) => (
					<div>
						<Form className={"form"}>
							<span>Login</span>
							<label htmlFor="netID">NetID: </label>
							<Field type="text"
								   name="netID"
								   placeholder="Enter NetID"
								   onChange={formik.handleChange}
								   className="form-control inp_text"
								   autoComplete="on"/>
							<label htmlFor="password">Password: </label>
							<Field type="password"
								   name="password"
								   placeholder="Enter Password"
								   onChange={formik.handleChange}
								   className="form-control"
								   autoComplete="on"/>
							<button type="submit" disabled={!(formik.isValid && formik.dirty)}>Login</button>
						</Form>
					</div>
				)}
			</Formik>
		</Container>
	);
};

export default Login;