import React, { useContext } from 'react';
import { DataContext } from "../user/DataContext";
import { useNavigate } from "react-router-dom";
import "../styles/header.css";

const Header = ({ path }) => {
    const { data, clearData } = useContext(DataContext);
    const navigate = useNavigate();

    return (
        <header>
            <h1>Web Registration System</h1>
            {data.token ?
                <div id={"headerContainer"}>
                    <span id={"semester"}>Semester: {data.semesters.selectedSemester}</span>
                    <div id={"logout"}>
                        <span>{data.profile.fullName} ({data.profile.netID})</span>
                        <button onClick={() => { clearData(); navigate("/"); }}>Log Out</button>
                    </div>
                </div> :
                path === "/" ?
                    <div id={"headerContainer"}>
                        <div id={"login"}>
                            <button onClick={() => navigate("/login")}>Log In</button>
                        </div>
                    </div> :
                    <></>
            }
        </header>
    )
};

export default Header;