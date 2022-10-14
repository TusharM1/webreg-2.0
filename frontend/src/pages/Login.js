import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { saveToken } from "../auth/useToken";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function loginUser(username, password) {
        return axios.post("http://localhost:3001/login", { username, password })
            .then(response => response.data);
    }

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = (await loginUser(username, password))["token"];
        saveToken(token);
        navigate("/dashboard");
    };

    return (
        <main>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <span>Username: </span>
                <input type="text" onChange={e => setUsername(e.target.value)}/>
                <br/>
                <span>Password: </span>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </main>
    );
};

export default Login;