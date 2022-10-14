import React, {Fragment} from 'react';
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Footer from "./pages/Footer";
import { useToken } from "./auth/useToken";
import axios from "axios";

function App() {
    // const [loading, setLoading] = useState(true);
    const [token, setToken] = useToken();
    const location = useLocation();

    // useEffect(() => {
    //     validateToken().then(result => {
    //         setLoading(false);
    //         if (!result)
    //             deleteToken();
    //         setAuthenticated(result);
    //     });
    // });

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

    // const validate = async () => {
    //     // console.log("useToken validate");
    //     const token = "admin_token";
    //     const username = "f";
    //     const password = "f";
    //     // return (await axios.post("http://localhost:3001/token", {token}).then(response => response.data["valid"]))
    //     return await axios.post("http://localhost:3001/login", {username, password}) .then(response => response.data["token"]);
    // }
    //
    // validate().then(r => console.log(r));

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
