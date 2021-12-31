import '@/styles/App.css';
import '@/styles/global.less';
import React from 'react';
import createRouter from '@/routes';


export default function App() {
    const element = createRouter();
    return (
        <>
            {element}
        </>
    );
}
