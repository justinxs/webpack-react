import '@/styles/global.less';
import formatMessage from '@/utils/formatMessage';
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
