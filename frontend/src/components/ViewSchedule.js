import React from 'react';
import {Container} from "react-bootstrap";
import "../styles/schedule.css"

const timesTable = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "3:00 PM",
    "2:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
]

export function ViewSchedule() {
    const config = {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        // startTime: "08:00",
        // endTime: "23:00",
        divisions: 15,
        granularity: 5
    }

    // const data = [
    //     {
    //         day: "Monday",
    //         label: "Event 1",
    //         startTime: "10:10",
    //         endTime: "11:10",
    //         color: "blue"
    //     }
    // ]

    return (
        <Container fluid className={"bg-light"}>
            {/*<span>View Schedule</span>*/}
            <table>
                <thead>
                    <tr>
                        <th className={"tableHeader"}></th>
                        {config.days.map((day) => <th>{day}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {timesTable.map((time, index) =>
                        <tr key={index}>
                            <th className={"tableHeader"}>{time}</th>
                            <td>A</td>
                            <td>B</td>
                            <td>C</td>
                            <td>D</td>
                            <td>E</td>
                        </tr>)}
                </tbody>
            </table>
        </Container>
    );
}
