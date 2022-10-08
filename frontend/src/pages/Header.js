import React from 'react';
import { Outlet } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <h2>Header</h2>
            <Outlet />
        </div>
    )
};

export default Header;