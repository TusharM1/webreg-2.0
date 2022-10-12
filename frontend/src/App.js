import React, {Fragment, useEffect, useState} from 'react';
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Footer from "./pages/Footer";
import { getToken, validToken } from "./pages/auth/useToken";

function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const token = getToken();

    useEffect(() => {
        validToken(token).then(result => setAuthenticated(result));
    });

    const location = useLocation();
    if (location.pathname === "/login" && authenticated) {
        return <Navigate replace to="/dashboard"/>
    }
    else if (location.pathname === "/dashboard" && !authenticated) {
        return <Navigate replace to="/login"/>
    }

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
