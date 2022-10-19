import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ saveUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
        const user = await loginUser(username, password);
        saveUser(user);
        navigate("/dashboard");
    };

    return (
        <main>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <span>Username: </span>
                <input type="text" autoComplete="on" onChange={e => setUsername(e.target.value)}/>
                <br/>
                <span>Password: </span>
                <input type="password" autoComplete="on" onChange={e => setPassword(e.target.value)}/>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </main>
    );
};

export default Login;