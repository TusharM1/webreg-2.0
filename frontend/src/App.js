import React, {Fragment, useEffect, useState} from 'react';
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Footer from "./pages/Footer";
import {useToken2} from "./auth/useToken2";
// import { deleteToken, validateToken } from "./auth/useToken";

function App() {
    // const [loading, setLoading] = useState(true);
    const [token, setToken] = useToken2();
    const location = useLocation();

    // useEffect(() => {
    //     validateToken().then(result => {
    //         setLoading(false);
    //         if (!result)
    //             deleteToken();
    //         setAuthenticated(result);
    //     });
    // });

    console.log("Page Loaded " + location.pathname);

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
                <Route path="/login" setToken={setToken} element={<Login/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
            <Footer/>
        </Fragment>
    );
}

export default App;
