import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../user/DataContext";
import { Container } from "react-bootstrap";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "../styles/login.css"

const Login = () => {
    const { saveData } = useContext(DataContext);

    const navigate = useNavigate();
    const loginUser = async (netID, password) => {
        const data = await axios.post("http://localhost:3001/auth", {
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
        console.log(data["message"]);
    };

    return (
        <Container fluid>
            <Formik initialValues={{ netID: '', password: ''}}
                    onSubmit={async (values, actions) => {
                        await loginUser(values["netID"], values["password"]);
                        actions.resetForm();
                    }}
                    validationSchema={Yup.object().shape({
                        netID: Yup.string().required(),
                        password: Yup.string().required()
                    })}>
                {(formik) => (
                    <div className={"login"}>
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