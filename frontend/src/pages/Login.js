import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../user/DataContext";
import {Container} from "react-bootstrap";

const Login = () => {
    const [netID, setNetID] = useState("");
    const [password, setPassword] = useState("");

    const { saveData } = useContext(DataContext);

    async function loginUser(username, password) {
        return await axios.post("http://localhost:3001/auth", {
            type: "login",
            data: {
                netID: username,
                password: password
            }
        }).then(response => response.data);
    }

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await loginUser(netID, password);
        const saved = saveData(data);
        if (saved) {
            navigate("/dashboard");
        }
        else {
            console.log(data["message"]);
        }
    };

    return (
        <Container fluid>
            <span>Login</span>
            <form onSubmit={handleSubmit}>
                <span>NetID: </span>
                <input type="text" autoComplete="on" onChange={e => setNetID(e.target.value)}/>
                <br/>
                <span>Password: </span>
                <input type="password" autoComplete="on" onChange={e => setPassword(e.target.value)}/>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </Container>
    );
};

export default Login;