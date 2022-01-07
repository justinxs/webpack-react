import { Link } from "react-router-dom";
import logo from '@/images/logo.svg';
import React, { useState, useEffect } from 'react';

export default function Home() {
    const [count, setCount] = useState(0);
    const [time, setTime] = useState(new Date());
    const styleObj = {
        marginRight: '10px'
    };
    console.log('render home');
    useEffect(() => {
        document.title = String(count);
        console.log(count, 'cccccccccccure')
        return () => {
            console.log(count, 'prevppppppppppppppppppppppppppp')
        }
    }, [count]);
    return (
        <>
            <h2>page Home!</h2>
            <img src={logo} alt="" />
            <button onClick={() => setCount(count + 1)}>{count}</button>
            <button onClick={() => setTime(new Date(time.getTime() + 24 * 60 * 60 * 1000))}>{time.toLocaleString()}</button>
            <nav>
                <Link to="/dashboard/invoices/21324234" style={styleObj}>invoices</Link>
                <Link to="/dashboard" style={styleObj}>dashboard</Link>
                <Link to="/about" style={styleObj}>about/</Link>
            </nav>
        </>
    );
}