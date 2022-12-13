import React, { useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import { Container, Navbar } from "react-bootstrap";

//Handles the header element that remains on all pages. Stores and displays basic user info and contains the navigation to the logout and login 
const Header = ({ path }) => {
	//Basic user data stored here
	const { data, clearData } = useContext(DataContext);
	//Navigation functionality (logout, login)
	const navigate = useNavigate();

	return (
		<header className={"bg-light-red"}>
			<Navbar>
				<Container fluid>
					<Navbar.Brand className={"color-light"}>Web Registration System</Navbar.Brand>
					{data.token ?
						<>
							{path === "/dashboard" ?
								<>
									//For a full realese outside the bounds of the project, this would be dependent on the page
									<Navbar.Text>Semester: Spring 2023</Navbar.Text>
								</> : <></>
							}
							<Navbar.Collapse className="justify-content-end">
								<Navbar.Text>{data.profile.fullName} ({data.profile.netID})</Navbar.Text>
								//Logs the User out
								<Button className="ms-2" onClick={() => {
									clearData();
									navigate("/");
								}}>Log Out</Button>
							</Navbar.Collapse>
						</> :
						<>
							{path === "/" ?
								//Takes the user to the login page
								<Navbar.Collapse className="justify-content-end">
									<Button onClick={() => navigate("/login")}>Log In</Button>
								</Navbar.Collapse> : <></>
							}
						</>
					}
				</Container>
			</Navbar>
		</header>
	);
};


export default Header;