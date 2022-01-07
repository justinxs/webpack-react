import React, { useState, useEffect } from 'react';

export default function Loading(props: any) {
    const [count, setCount] = useState(0);
    console.log('loading', count);
    if (count < 1) {
        setCount(count + 1);
        console.log('loading1', count);
    }

    useEffect(() => {
        const originTitle = document.title;
        document.title = 'ttttttttttttttttttttttt';
        console.log(originTitle);
        return () => {
            document.title = originTitle;
        };
    });

    if (props.error) {
        return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
    } else if (props.timedOut) {
        return <div>Taking a long time... <button onClick={ props.retry }>Retry</button></div>;
    } else if (props.pastDelay) {
        return <div>Loading...</div>;
    } else {
        return null;
    }
}