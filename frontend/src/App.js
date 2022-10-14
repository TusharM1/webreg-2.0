import React, { Fragment } from 'react';
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Footer from "./pages/Footer";
import { useToken } from "./auth/useToken";

function App() {
    const [token, setToken] = useToken();
    const location = useLocation();

    console.log("Location: " + location.pathname + ", Token: " + token);

    if (token === "loading") {
        return <div></div>;
    }

    if (location.pathname === "/login" && token) {
        return <Navigate replace to="/dashboard"/>
    }
    else if (location.pathname === "/dashboard" && !token) {
        return <Navigate replace to="/login"/>
    }

    return (
        <Fragment>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login setToken={setToken}/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
            <Footer/>
        </Fragment>
    );
}

export default App;
