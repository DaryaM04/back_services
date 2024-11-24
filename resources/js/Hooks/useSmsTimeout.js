import {useEffect, useState} from "react";

export default function useSmsTimeout(wait_time) {
    // random value to update timer
    const [rerun, setRerun] = useState(new Date());
    const run = () => {
        setRerun(new Date())
    }

    const [remain, setRemain] = useState(0);
    const available = remain <= 0;

    useEffect(() => {
        const start_time = new Date()
        const stop_time = start_time.setSeconds(start_time.getSeconds() + wait_time)
        const calculate_remain = () => {
            const now = new Date().getTime()
            return Math.floor((stop_time - now) / 1000)
        }
        setRemain(calculate_remain());
        const interval_id = setInterval(() => {
            const remain = calculate_remain()
            if (remain >= 0) {
                setRemain(remain);
            } else {
                setRemain(0)
                clearInterval(interval_id)
            }
        }, 1000)
        return () => clearInterval(interval_id)
    }, [rerun])

    return {run, available, remain}
}
