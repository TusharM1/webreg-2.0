import './App.css';
import React, {useState} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./pages/Header";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Footer from "./pages/Footer";

function App() {
    const [token, setToken] = useState();

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/">
                    <Route path="login" element={<Login/>} />
                    <Route path="dashboard" element={<Dashboard/>} />
                </Route>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
