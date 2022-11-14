import React from 'react';
import { Accordion, Container } from "react-bootstrap";
import {Course} from '../backend/models/Course.js'






// const  createClass= async (courseString, name, credits) => {
//     const data = await axios.post("http://localhost:3001/auth", {
//         type: "login",
//         data: {
//             netID: netID,
//             password: password
//         }
//     }).then(response => response.data);
//     const saved = saveData(data);
//     if (saved) {
//         navigate("/dashboard");
//     }
//     console.log(data["message"]);
// };







export function AdminUI() {
    return (
        <Container fluid>
            <form>
                <input name='courseString' placeholder='00:000:000'></input>
                <input name='name' placeholder='Name'></input>
                {/* <input id='description' placeholder='Description'></input> */}
                <input name='credits' placeholder='Number of credits'></input>
                {/* <input id='prerequisites' placeholder='Prerequisites'></input> */}
                <button type='submit' id='createClass' 
                    onSubmit={async (values, actions) => {
                        await Course.create(values["courseString"], values["courseString"].subString(0,2), values["courseString"].subString(3,6), values["courseString"].subString(7,10), values["name"], "null", values["credits"],"null");
                        actions.resetForm();
                    }}>
                    CreateClass
                </button>
            </form>
        </Container>
    );
}