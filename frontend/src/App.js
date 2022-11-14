import React from 'react';
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
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
    console.log("Location: " + path + ", Data: " + token);

    if (path === "/home") {
        return <Navigate replace to="/"/>
    }

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
            <Container fluid className={"h-100"}>
                <Row className={"h-100 flex-column"}>
                    <Header path={path}/>
                    <main className={"flex-grow-1 bg-light-white"}>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                        </Routes>
                    </main>
                    <Footer/>
                </Row>
            </Container>
        </DataContext.Provider>
    );
}

export default App;
