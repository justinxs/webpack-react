import { Link } from "react-router-dom";
import logo from '@/images/logo.svg';
import React from 'react';

export default function Home() {
    const styleObj = {
        marginRight: '10px'
    };
    return (
        <>
            <h2>page Home!</h2>
            <img src={logo} alt="" />
            <nav>
                <Link to="/dashboard/invoices/21324234" style={styleObj}>invoices</Link>
                <Link to="/dashboard" style={styleObj}>dashboard</Link>
                <Link to="/about" style={styleObj}>about/</Link>
            </nav>
        </>
    );
}