import React, { useContext } from 'react';
import { DataContext } from "../user/DataContext";
import { useNavigate } from "react-router-dom";

const Header = ({ path }) => {
    const { data, clearData } = useContext(DataContext);
    const navigate = useNavigate();

    return (
        <header>
            <h1>Web Registration System</h1>
            {data.token ?
                <div>
                    <span>Semester: {data.semesters.selectedSemester}</span>
                    <span>{data.profile.fullName} ({data.profile.netID})</span>
                    <button onClick={() => { clearData(); navigate("/"); }}>Log Out</button>
                </div> :
                path === "/" ?
                    <div>
                        <button onClick={() => navigate("/login")}>Log In</button>
                    </div> :
                    <></>
            }
        </header>
    )
};

export default Header;