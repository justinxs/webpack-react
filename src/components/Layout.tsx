import { Outlet } from "react-router-dom";
import React from 'react';

export default function Layout() {
    return (
        <div className='layout'>
            <h1>page laout!</h1>
            <main>
                <Outlet />
            </main>
        </div>
    );
}