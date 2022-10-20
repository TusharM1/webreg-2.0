import React, {useContext, useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {UserContext} from "../context/UserContext";

const Login = ({ setToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { userData, setUserData } = useContext(UserContext);

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
        const data = await loginUser(username, password);
        setToken(data["token"]);
        // todo fill in here
        // setUserData(data)
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