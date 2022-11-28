import React, { useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import { Container, Navbar } from "react-bootstrap";

const Header = ({ path }) => {
	const { data, clearData } = useContext(DataContext);
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
									<Navbar.Text>Semester: Spring 2023</Navbar.Text>
								</> : <></>
							}
							<Navbar.Collapse className="justify-content-end">
								<Navbar.Text>{data.profile.fullName} ({data.profile.netID})</Navbar.Text>
								<Button className="ms-2" onClick={() => {
									clearData();
									navigate("/");
								}}>Log Out</Button>
							</Navbar.Collapse>
						</> :
						<>
							{path === "/" ?
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