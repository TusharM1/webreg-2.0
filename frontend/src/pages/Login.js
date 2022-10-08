import React from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/dashboard");
    };

    return (
        <main>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <span>Username: </span>
                <input type="text"/>
                <br/>
                <span>Password: </span>
                <input type="password"/>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </main>
    );
};

export default Login;