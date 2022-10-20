import React from 'react';
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Footer from "./pages/Footer";
// import { useToken } from "./auth/useToken";
import { UserContext } from "./context/UserContext";
import {useData} from "./auth/useData";
// import {useData} from "./auth/useData";

function App() {
    // const [userData, setUserData] = useState(defaultUserData);
    // const [token, setToken] = useToken(setUserData);
    const [data, saveData] = useData();
    const location = useLocation();

    const token = data["token"];
    console.log("Location: " + location.pathname + ", Data: ");
    console.log(data);

    if (data["token"] === "loading") {
        return <div></div>;
    }

    if (location.pathname === "/login" && token) {
        return <Navigate replace to="/dashboard"/>
    }
    else if (location.pathname === "/dashboard" && !token) {
        return <Navigate replace to="/login"/>
    }

    return (
        <UserContext.Provider value={{ data, saveData }}>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
            <Footer/>
        </UserContext.Provider>
    );
}

export default App;
