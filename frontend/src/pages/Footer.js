import React from 'react';
import { Outlet } from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <h2>Footer</h2>
            <Outlet />
        </div>
    )
};

export default Footer;