import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { saveToken } from "./auth/useToken";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function loginUser(credentials) {
        return (await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
        })).json();
    }

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = (await loginUser({
            username,
            password
        }))["token"];
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