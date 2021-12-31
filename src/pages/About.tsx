import { Link } from "react-router-dom";
import React from 'react';

export default function About() {
    return (
        <>
            <h2>Who are we?</h2>
            <p>
                That feels like an existential question, don't you
                think?
            </p>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}