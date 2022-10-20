import React from 'react';
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Footer from "./pages/Footer";
import { DataContext } from "./user/DataContext";
import { useData } from "./user/useData";

function App() {
    const [data, saveData, clearData] = useData();
    const location = useLocation();

    const token = data["token"];
    const path = location.pathname;
    console.log("Location: " + path + ", Data: "
        // + JSON.stringify(data, null, 4)
        + token
    );

    if (token === "loading") {
        return <div></div>;
    }

    if (path === "/login" && token) {
        return <Navigate replace to="/dashboard"/>
    }
    else if (path === "/dashboard" && !token) {
        return <Navigate replace to="/login"/>
    }

    return (
        <DataContext.Provider value={{ data, saveData, clearData }}>
            <Header path={path}/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
            <Footer/>
        </DataContext.Provider>
    );
}

export default App;
