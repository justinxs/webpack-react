import { Outlet } from "react-router-dom";
import React from 'react';

export default function Dashboard() {
    return (
        <div>
            <p>dashboard!</p>
            <Outlet />
        </div>
    );
}