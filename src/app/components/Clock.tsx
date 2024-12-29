"use client"
import {useEffect, useState} from "react"
export type ClockProps = {
    locale: string
}

const Clock: React.FC = () => {
    const [today, setToday] = useState(new Date())
    useEffect(() => {
      const duration = 1000
      const id = setInterval(() => {
        setToday(new Date())
      }, duration)
      return () => clearInterval(id)
    }, [])

    return (
        <div>
            <h1>It is {today.toLocaleDateString()}.</h1>
            <h2>It is {today.toLocaleTimeString()}.</h2>
        </div>
    );
}

export default Clock;