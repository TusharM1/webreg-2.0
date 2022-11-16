import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import Footer from "./pages/Footer";
import { DataContext } from "./contexts/DataContext";
import { useData } from "./hooks/useData";
import { AdminDashboard } from "./pages/AdminDashboard";

function App() {
	const [data, saveData, clearData] = useData();
	const location = useLocation();

	const token = data["token"];
	const path = location.pathname;
	console.log("Location: " + path + ", Data: " + token);

	if (path === "/home") {
		return <Navigate replace to="/"/>;
	}

	if (token === "loading") {
		return <div></div>;
	}

	if (path === "/login" && token) {
		return <Navigate replace to="/dashboard"/>;
	} else if (path === "/dashboard" && !token) {
		return <Navigate replace to="/login"/>;
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
							{data.profile.role === "admin" ?
								<Route path="/dashboard" element={<AdminDashboard/>}/>:
								<Route path="/dashboard" element={<StudentDashboard/>}/>}
						</Routes>
					</main>
					<Footer/>
				</Row>
			</Container>
		</DataContext.Provider>
	);
}

export default App;
