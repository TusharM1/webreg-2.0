import React, { useContext } from 'react';
import { DataContext } from "../user/DataContext";
import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import {Container, Navbar, Form} from "react-bootstrap";

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
                                    <Navbar.Text>Semester: </Navbar.Text>
                                    <Form.Select style={{width: "auto"}} className="ms-2" aria-label="Select Semester">
                                        <option value="Semester 1">Semester 1</option>
                                        <option value="Semester 2">Semester 2</option>
                                    </Form.Select>
                                </> : <></>
                            }
                            <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text>{data.profile.fullName} ({data.profile.netID})</Navbar.Text>
                                <Button className="ms-2" onClick={() => { clearData(); navigate("/"); }}>Log Out</Button>
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
    )
};



export default Header;