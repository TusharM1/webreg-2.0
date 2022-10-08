// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Footer from "./pages/Footer";

function App() {
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
