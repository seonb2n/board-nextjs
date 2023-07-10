import {useEffect, useState} from "react";

export default function Tab() {

    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
                const currentDate = new Date();
                const hours = currentDate.getHours();
                const minutes = currentDate.getMinutes();
                const seconds = currentDate.getSeconds();
                console.log(`현재 시간: ${hours}:${minutes}:${seconds}`);
            },
            1000);
        return () => {
            clearInterval(interval);
        };
    }, []);


    return (
        <div>
            <h1>Timer</h1>
            <p>{seconds} seconds</p>
        </div>
    );
}