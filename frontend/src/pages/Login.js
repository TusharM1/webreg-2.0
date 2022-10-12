import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import {saveToken} from "./auth/Token";
// import saveToken from './auth/useToken'
// import axios from "axios";
// import * as PropTypes from "prop-types";

// const Login = ({ setToken }) => {
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

    // const login = () => {
    //     const data = { username: username, password: password };
    //     axios.post("http://localhost:3001/login", data).then((response) => {
    //         if (response.data.error) {
    //             alert(response.data.error);
    //         } else {
    //             localStorage.setItem("accessToken", response.data.token);
    //             setAuthState({
    //                 username: response.data.username,
    //                 id: response.data.id,
    //                 status: true,
    //             });
    //             history.push("/");
    //         }
    //     });
    // };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = (await loginUser({
            username,
            password
        }))["token"];
        // console.log("Token" + JSON.stringify(token));
        // setToken(token);
        // saveToken(token);
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

// Login.propTypes = {
//     saveToken: PropTypes.func.isRequired
// };

export default Login;