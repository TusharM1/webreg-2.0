import React from 'react';
import { Accordion, Container } from "react-bootstrap";






const  createClass= async (courseString, name, credits) => {
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







export function AdminUI() {
    return (
        <Container fluid>
            onSubmit= createClass {async (values, actions) => {
                        await (values["courseString"], values["name"], values["credits"]);
                        actions.resetForm();
                    }}
            {/* <div className={"h-25 bg-light-coral"}>
                <span>Search Courses</span>
            </div>
            <span>View Courses</span>
            <div className={"d-flex justify-content-between w-100"}>
                <span>Course String</span>
                <span>Course Name</span>
            </div> */}
            <div>
                <input name='courseString' placeholder='00:000:000'></input>\
                <input name='name' placeholder='Name'></input>
                {/* <input id='description' placeholder='Description'></input> */}
                <input name='credits' placeholder='Number of credits'></input>
                {/* <input id='prerequisites' placeholder='Prerequisites'></input> */}
                <button type='submit' id='createClass'>
                    CreateClass
                </button>
            </div>
        </Container>
    );
}