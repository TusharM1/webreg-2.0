import React, {Fragment, useEffect, useState} from 'react';
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Footer from "./pages/Footer";
// import useToken from './pages/auth/useToken';
import {getToken, validToken} from "./pages/auth/Token";

function App() {
    // let { token, setToken } = useToken();
    // let { token } = useToken();
    // token = true;

    const [authenticated, setAuthenticated] = useState(false);
    let token = getToken();

    // let status = false;

    useEffect(() => {
        validToken(token).then(result => {
            setAuthenticated(result);
            // console.log(authenticated);
        });
    });

    const location = useLocation();
    if (location.pathname === "/login" && authenticated) {
        // console.log("Here 1");
        return <Navigate replace to="/dashboard"/>
    }
    else if (location.pathname === "/dashboard" && !authenticated) {
        // console.log("Here 2");
        return <Navigate replace to="/login"/>
    }
    // console.log(location.pathname + " " + token)

    return (
        <Fragment>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
            <Footer/>
        </Fragment>
    );
}

export default App;
